# Suggest Subreddit

Recommend subreddits based on what the user is already subscribed to

## How it works

This currently uses subreddit similarity data from [anvaka/sayit](https://github.com/anvaka/sayit#the-data). To summarise, **two subreddits are considered similar if the same people comment in boths**. While not perfect, it is a decent approximation of similarity. Further work could include computing new similarity data which would be based on subscriptions, not commenters (i.e. subreddits are similar if they share a lot of subscribers).
