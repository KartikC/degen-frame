// pages/api/og/[walletAddress].js
import { createCanvas, registerFont, loadImage } from "canvas";
import {
  getTransactionsData,
  getCurrentPrice,
  getEnsData,
} from "../../../utils/transactionsHelper";

export default async function handler(req, res) {
  const { walletAddress } = req.query;

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

    // Placeholder for the actual canvas drawing function
    const width = 800;
    const height = 400;
    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");

    // Background
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);

    // Text: Wallet Address
    context.font = "bold 20pt Arial";
    context.fillStyle = "#000";

    let name = `walletAddress.substring(0, 6)}...${walletAddress.substring(
      walletAddress.length - 4
    )}`;

    try {
      const { ens, avatar_url } = await getEnsData(walletAddress);
      console.log(avatar_url);
      if (ens) {
        name = ens;
      }
      if (avatar_url) {
        //TODO: Not Working
        const response = await fetch(avatar_url);
        const buffer = await response.buffer();
        const img = await loadImage(buffer);
        context.drawImage(img, 50, 150, 100, 100); // Draw the image on the canvas
      }
    } catch (error) {
      console.error(error);
      //res.status(500).json({ error: "Internal Server Error" });
    }

    context.fillText(name, 50, 100);

    // Text: Gain/Loss USD
    context.font = "bold 30pt Arial";
    context.fillStyle = gainLossUsd >= 0 ? "#4CAF50" : "#F44336";
    context.fillText(`$${gainLossUsd} USD`, 50, 200);

    // Text: Gain/Loss Percentage
    context.font = "bold 20pt Arial";
    context.fillText(`${gainLossPercentage}%`, 50, 300);

    const buffer = canvas.toBuffer("image/png");
    res.setHeader("Content-Type", "image/png");
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
