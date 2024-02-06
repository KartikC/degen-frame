export default function handler(req, res) {
  const { tokenAddress } = req.query;

  // Check if tokenAddress is provided
  if (!tokenAddress) {
    return res.status(400).json({ error: "Token address is required" });
  }

  // Redirect to Uniswap
  res.redirect(302, `https://app.uniswap.org/tokens/base/${tokenAddress}`);
}
