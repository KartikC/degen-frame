// pages/api/og/[walletAddress].js
import { generateImage } from "../og/index";

export default async function handler(req, res) {
  const { address } = req.query;

  try {
    const svg = await generateImage(address);
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
