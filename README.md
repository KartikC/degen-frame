Degen Frame is a Farcaster Frame that shows the user the gain or loss on their $DEGEN position.

## How it works

- Gets the users connected address using the [Searchcaster API](https://searchcaster.xyz/docs)
- Finds all related $DEGEN trasactions using the [Zerion API](https://developers.zerion.io/reference/intro/getting-started)
- Gets your name from ENS using the [ensdata API](https://ensdata.net)
- Calculates your profit/loss in USD and % terms and displays them!

## Limitations

- Only considers the farcast user's first connected address
- No pagination, only takes into account the last 100 $DEGEN related transactions

## Todo

- Consider all transactions, not just the last 100 $DEGEN transactions
- Support multiple connected addresses
- Support delegate.xyz addresses from your main connected address
- Leaderboard

## Contact

- @sathaxe on Warpcast, Telegram, and X.
- You can check out [the Degen Frame GitHub repository](https://github.com/KartikC/degen-frame) - your feedback and contributions are welcome!
