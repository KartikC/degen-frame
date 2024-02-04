// pages/api/og/[walletAddress].js
import { generateImage } from "./index";

export default async function handler(req, res) {
  const { walletAddress } = req.query;

  try {
    const svg = await generateImage(walletAddress);
    res.setHeader("Content-Type", "image/png");
    res.send(svg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
