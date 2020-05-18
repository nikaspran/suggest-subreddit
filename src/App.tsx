import React, { useEffect } from 'react';
import styles from './App.module.scss';
import RedditApiProvider, { useRedditApi } from './components/RedditApiProvider';
import { getSimilarSubreddits } from './utils/similarSubreddits';
import LoginPage from './components/LoginPage';

function App() {
  const { redditApi } = useRedditApi();

  useEffect(() => {
    if (!redditApi) {
      return;
    }

    redditApi.fetchSubscribedSubreddits().then((subreddits) => {
      const subredditNames = subreddits.map((subreddit) => subreddit.data.display_name.toLowerCase());
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
        <LoginPage className={styles.loginPage} />
      )}
    </div>
  );
}

export default () => (
  <RedditApiProvider>
    <App />
  </RedditApiProvider>
);
