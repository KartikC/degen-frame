// pages/api/og/[walletAddress].js
import satori from "satori";
import fs from "fs";
import path from "path";
import {
  getTransactionsData,
  getCurrentPrice,
  getEnsData,
} from "../../../utils/transactionsHelper";

export default async function handler(req, res) {
  const { walletAddress } = req.query;

  // Load the Inter font file
  const interFontBuffer = fs.readFileSync(
    path.resolve(process.cwd(), "src/fonts", "Inter.ttf")
  );

  try {
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
    const svg = await satori(
      <svg width="1910" height="1000" xmlns="http://www.w3.org/2000/svg">
        <img
          src="https://degen-frame.vercel.app/happy.png"
          alt=""
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
              fontSize: "48px",
              color: "#CBD5E1",
            }}
          >
            {name}
          </p>
          <p style={{ fontSize: "96px", color: "#38BDF8" }}>${gainLossUsd}</p>
          <p style={{ fontSize: "72px", color: "#CBD5E1" }}>
            {gainLossPercentage}%
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

    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
