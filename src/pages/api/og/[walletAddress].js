// pages/api/og/[walletAddress].js
import satori from "satori";
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
      <div style={{ color: "black" }}>
        <p>{name}</p>
        <p>${gainLossUsd} USD</p>
        <p>{gainLossPercentage}%</p>
      </div>,
      {
        width: 800,
        height: 400,
      }
    );

    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
