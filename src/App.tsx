import React, { useEffect } from 'react';
import './App.css';
import RedditApiProvider, { useRedditApi } from './components/RedditApiProvider';
import { getSimilarSubreddits } from './utils/similarSubreddits';

function App() {
  const { redditApi, login } = useRedditApi();

  useEffect(() => {
    if (!redditApi) {
      return;
    }

    redditApi.fetchSubscribedSubreddits().then((subreddits) => {
      const subredditNames = subreddits.map(subreddit => subreddit.data.display_name.toLowerCase());
      console.log(subredditNames);

      getSimilarSubreddits(subredditNames).then((similarSubreddits) => {
        console.log('Similar subs', similarSubreddits);
      });
    });
  }, [redditApi]);

  return (
    <div>
      {redditApi ? (
        <div>Logged in!</div>
      ) : (
        <div>
          <button onClick={login}>Log in</button>
        </div>
      )}
    </div>
  );
}

export default () => (
  <RedditApiProvider>
    <App />
  </RedditApiProvider>
);
