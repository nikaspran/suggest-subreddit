import React from 'react';
import styles from './LoginPage.module.scss';
import { useRedditApi } from './RedditApiProvider';
import CallToAction from './CallToAction';
import Suggestions from './Suggestions';
import Layout from './Layout';
import mockSuggestions from '../assets/mockSuggestions.json';

export default function LoginPage() {
  const { login } = useRedditApi();

  return (
    <Layout className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <h1 className={styles.title}>Suggest me a subreddit</h1>
        <CallToAction type="button" onClick={login}>Fetch my subreddits via Reddit</CallToAction>
      </div>
      <div className={styles.example}>
        <Suggestions data={mockSuggestions} totalSubreddits={34} />
      </div>
    </Layout>
  );
}
