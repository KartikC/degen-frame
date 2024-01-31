// pages/api/[walletAddress].js
import {
  getTransactionsData,
  getCurrentPrice,
} from "../../utils/transactionsHelper";

export default async function handler(req, res) {
  const { walletAddress } = req.query;

  try {
    const transactionsData = await getTransactionsData(walletAddress);
    const currentPrice = await getCurrentPrice();
    const initialInvestment = transactionsData.totalUsdValue;
    const currentValue = currentPrice * transactionsData.totalQuantity;
    const gainLossUsd = currentValue - initialInvestment;
    const gainLossPercentage = (gainLossUsd / initialInvestment) * 100;

    res.status(200).json({ gainLossUsd, gainLossPercentage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
