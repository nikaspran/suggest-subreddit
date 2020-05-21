import React, { useEffect, useState } from 'react';
import styles from './SuggestionPage.module.scss';
import Suggestions from './Suggestions';
import { useRedditApi } from './RedditApiProvider';
import { Subreddit } from '../utils/RedditApi';
import { getSimilarSubreddits, SimilarityResult } from '../utils/similarSubreddits';
import Loading from './Loading';
import Layout from './Layout';
import Link from './Link';
import FlexSpacer from './FlexSpacer';
import Footer from './Footer';

export default function SuggestionPage() {
  const { redditApi, logout } = useRedditApi();
  const [similarSubreddits, setSimilarSubreddits] = useState<SimilarityResult>();
  const [subscribedSubreddits, setSubscribedSubreddits] = useState<Subreddit[]>();
  const [loadingState, setLoadingState] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!redditApi) {
      return;
    }

    setLoadingState('Fetching your subreddits (1/2)...');
    redditApi.fetchSubscribedSubreddits()
      .then((subreddits) => {
        setSubscribedSubreddits(subreddits);
        setLoadingState('Calculating similar subreddits (2/2)...');

        const subredditNames = subreddits.map((subreddit) => subreddit.data.display_name.toLowerCase());
        return getSimilarSubreddits(subredditNames);
      })
      .then(setSimilarSubreddits)
      .then(() => {
        setLoadingState(undefined);
      });
  }, [redditApi]);

  return (
    <Layout className={styles.container}>
      {similarSubreddits ? (
        <>
          <div className={styles.description}>
            <FlexSpacer />

            <h1 className={styles.title}>Suggest me a subreddit</h1>
            <Link element="button" onClick={logout} className={styles.logoutLink}>Logout</Link>

            <FlexSpacer />

            <Footer />
          </div>
          <Suggestions
            data={similarSubreddits}
            className={styles.suggestions}
            totalSubreddits={subscribedSubreddits?.length || 0}
          />
        </>
      ) : (
        <div className={styles.loadingContainer}>
          <div>{loadingState}</div>
          <Loading />
        </div>
      )}
    </Layout>
  );
}
