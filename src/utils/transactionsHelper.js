// utils/transactionsHelper.js
export async function getTransactionsData(walletAddress) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: process.env.ZERION_AUTH_TOKEN,
    },
  };

  const apiUrl = `https://api.zerion.io/v1/wallets/${walletAddress}/transactions/?currency=usd&page[size]=100&filter[asset_types]=fungible&filter[chain_ids]=base&filter[fungible_ids]=d590ac9c-6971-42db-b900-0bd057033ae0&filter[trash]=only_non_trash`;
  const response = await fetch(apiUrl, options);
  const data = await response.json();
  return calculateAverageCostBasis(data);
}

export async function getEnsData(walletAddress) {
  const response = await fetch(`https://ensdata.net/${walletAddress}`);
  const data = await response.json();
  return data;
}

export async function getCurrentPrice() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: process.env.ZERION_AUTH_TOKEN,
    },
  };

  const response = await fetch(
    "https://api.zerion.io/v1/fungibles/d590ac9c-6971-42db-b900-0bd057033ae0?currency=usd",
    options
  );
  const data = await response.json();
  return data.data.attributes.market_data.price;
}

export function calculateAverageCostBasis(apiResponse) {
  let totalQuantity = 0;
  let totalUsdValue = 0;

  apiResponse.data.forEach((transaction) => {
    if (
      transaction.attributes.operation_type === "trade" ||
      transaction.attributes.operation_type === "receive"
    ) {
      transaction.attributes.transfers.forEach((transfer) => {
        if (
          transfer.direction === "in" &&
          transfer.fungible_info.symbol === "DEGEN"
        ) {
          const quantity = parseFloat(transfer.quantity.numeric);
          totalQuantity += quantity;
          totalUsdValue += transfer.value;
        }
      });
    }
  });

  return {
    totalQuantity,
    totalUsdValue,
  };
}
