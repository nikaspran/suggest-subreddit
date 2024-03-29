import React from 'react';
import styles from './LoginPage.module.scss';
import { useRedditApi } from './RedditApiProvider';
import CallToAction from './CallToAction';
import Suggestions from './Suggestions';
import Layout from './Layout';
import mockSuggestions from '../assets/mockSuggestions.json';
import Footer from './Footer';
import FlexSpacer from './FlexSpacer';
import ErrorNotification from './ErrorNotification';

export default function LoginPage() {
  const { login, authError } = useRedditApi();

  return (
    <Layout className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <FlexSpacer />

        <h1 className={styles.title}>Suggest me a subreddit</h1>
        <CallToAction type="button" onClick={login}>Fetch my subreddits via Reddit</CallToAction>
        <p className={styles.disclaimer}>All data stays in your browser only</p>

        {authError && (
          <ErrorNotification title="Could not authenticate with Reddit">
            The request might have been blocked due to tracking protection
            {' - '}
            you can try disabling blockers or try again later
          </ErrorNotification>
        )}

        <FlexSpacer />

        <Footer />
      </div>
      <div className={styles.example}>
        <Suggestions data={mockSuggestions} totalSubreddits={34} />
      </div>
    </Layout>
  );
}
