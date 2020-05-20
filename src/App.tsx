import React from 'react';
import RedditApiProvider, { useRedditApi } from './components/RedditApiProvider';
import LoginPage from './components/LoginPage';
import SuggestionPage from './components/SuggestionPage';

function App() {
  const { redditApi } = useRedditApi();

  return redditApi ? (
    <SuggestionPage />
  ) : (
    <LoginPage />
  );
}

export default () => (
  <RedditApiProvider>
    <App />
  </RedditApiProvider>
);
