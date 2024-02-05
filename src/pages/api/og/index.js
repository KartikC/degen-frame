// pages/api/og/index.js
import satori from "satori";
import fs from "fs";
import sharp from "sharp";
import path from "path";
import {
  getTransactionsData,
  getCurrentPrice,
  getEnsData,
} from "../../../utils/transactionsHelper";

export async function generateImage(walletAddress) {
  // Load the Inter font file
  const interFontBuffer = fs.readFileSync(
    path.resolve(process.cwd(), "src/fonts", "Inter.ttf")
  );

  const transactionsData = await getTransactionsData(walletAddress);
  const currentPrice = await getCurrentPrice();
  const gainLossUsd = (
    currentPrice * transactionsData.totalQuantity -
    transactionsData.totalUsdValue
  ).toFixed(2);
  const gainLossPercentage = (
    (gainLossUsd / transactionsData.totalUsdValue) *
    100
  ).toFixed(2);

  let name = `${walletAddress.substring(0, 6)}...${walletAddress.substring(
    walletAddress.length - 4
  )}`;

  try {
    const { ens, avatar_url } = await getEnsData(walletAddress);
    if (ens) {
      name = ens;
    }
  } catch (error) {
    console.error(error);
  }

  // Generate SVG with Satori
  const imageUrl =
    gainLossUsd > 0
      ? "https://degen-frame.vercel.app/happy.png"
      : gainLossUsd < 0
      ? "https://degen-frame.vercel.app/sad.png"
      : "https://degen-frame.vercel.app/cry.png";

  const formattedGainLossUsd = parseFloat(gainLossUsd).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const svg = await satori(
    <svg width="1910" height="1000" xmlns="http://www.w3.org/2000/svg">
      <img
        src={imageUrl}
        alt="happy or sad bg-image"
        style={{ position: "absolute", top: 0, left: 0 }}
      />
      <div
        xmlns="http://www.w3.org/1999/xhtml"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontFamily: "Inter", // Using the Inter font
          width: "1910px",
          height: "1000px",
        }}
      >
        <p
          style={{
            marginBottom: "20px",
            fontSize: "84px",
            color: "#CBD5E1",
          }}
        >
          {name}
        </p>
        <p style={{ fontSize: "128px", color: "#38BDF8" }}>
          ${formattedGainLossUsd}
        </p>
        <p style={{ fontSize: "84px", color: "#CBD5E1" }}>
          {Math.round(gainLossPercentage)}%
        </p>
      </div>
    </svg>,
    {
      width: 1910,
      height: 1000,
      fonts: [
        {
          name: "Inter",
          data: interFontBuffer,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );

  // Convert SVG to PNG using sharp
  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return png;
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Handle POST request
    const { untrustedData } = req.body;
    if (untrustedData && untrustedData.fid) {
      const fid = untrustedData.fid;
      // Make a request to the API
      const response = await fetch(
        `https://searchcaster.xyz/api/profiles?fid=${fid}`
      );
      const data = await response.json();

      // Store the connectedAddress
      const connectedAddress = data[0].connectedAddress;
      // console.log(connectedAddress);

      try {
        res.status(200).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="https://degen-frame.vercel.app/api/og/${connectedAddress}" />
          </head>
        </html>
      `);
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      return res.status(400).json({ error: "No data received" });
    }
  } else if (req.method === "GET") {
    const { walletAddress } = req.query;

    // Proceed only if walletAddress is provided
    if (!walletAddress) {
      return res.status(400).json({ error: "Wallet address is required" });
    }

    try {
      const svg = await generateImage(walletAddress);
      res.setHeader("Content-Type", "image/png");
      res.send(svg);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Handle other HTTP methods or return an error
    res.status(405).send({ error: "Method Not Allowed" });
  }
}
