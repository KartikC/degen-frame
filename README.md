Degen Frame is a Farcaster Frame that shows the user the gain or loss on their $DEGEN position.

## Try it yourself!

- It's live [here](https://warpcast.com/sathaxe/0x5f6cdaed)


[<img width="617" alt="image" src="https://github.com/KartikC/degen-frame/assets/1454812/6bc34ca8-6c95-4f14-987a-156f24f2838d">
](https://warpcast.com/sathaxe/0x5f6cdaed)

## How it works

- Gets the users connected address using the [Searchcaster API](https://searchcaster.xyz/docs)
- Finds all related $DEGEN trasactions using the [Zerion API](https://developers.zerion.io/reference/intro/getting-started)
- Gets your name from ENS using the [ensdata API](https://ensdata.net)
- Calculates your profit/loss in USD and % terms and displays them!

## Limitations

- Only considers the farcast user's first connected address
- No pagination, only takes into account the last 100 $DEGEN related transactions

## Todo

- A frame for users who don't have any $DEGEN instead of returning an error
- Consider all transactions, not just the last 100 $DEGEN transactions
- Support multiple connected addresses
- Support delegate.xyz addresses from your main connected address
- Leaderboard

## Contact

- @sathaxe on Warpcast, Telegram, and X.
- You can check out [the Degen Frame GitHub repository](https://github.com/KartikC/degen-frame) - your feedback and contributions are welcome!
