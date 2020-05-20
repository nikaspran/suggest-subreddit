import React, { useEffect } from 'react';
import styles from './App.module.scss';
import RedditApiProvider, { useRedditApi } from './components/RedditApiProvider';
import LoginPage from './components/LoginPage';
import SuggestionPage from './components/SuggestionPage';

function App() {
  const { redditApi } = useRedditApi();

  return (
    <div>
      {redditApi ? (
        <SuggestionPage />
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
