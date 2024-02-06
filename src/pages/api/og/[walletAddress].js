// pages/api/og/[walletAddress].js
import { generateImage, generateErrorImage } from "./index";

export default async function handler(req, res) {
  const { walletAddress } = req.query;

  try {
    let svg;
    if (walletAddress) {
      svg = await generateImage(walletAddress);
    } else {
      svg = await generateErrorImage(
        "No connected wallet!",
        "please connect a wallet to your account"
      );
    }
    res.setHeader("Content-Type", "image/png");
    res.send(svg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
