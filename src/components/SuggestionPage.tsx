import React, { useEffect, useState } from 'react';
import styles from './SuggestionPage.module.scss';
import Suggestions from './Suggestions';
import { useRedditApi } from './RedditApiProvider';
import { Subreddit } from '../utils/RedditApi';
import { getSimilarSubreddits } from '../utils/similarSubreddits';
import { SimilarityResult } from '../utils/similarSubreddits.worker';
import Loading from './Loading';
import Layout from './Layout';
import LinkButton from './LinkButton';

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
            <h1 className={styles.title}>Suggest me a subreddit</h1>
            <LinkButton onClick={logout}>Logout</LinkButton>
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
