import React, { useEffect, useState, useMemo } from 'react';
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
import { useExclusions } from './ExclusionProvider';

function without<T extends { [key: string]: unknown }>(obj: T, excludedKey: string) {
  return Object.keys(obj).reduce((previous, current) => {
    if (current === excludedKey) {
      return previous;
    }
    return { ...previous, [current]: obj[current] };
  }, {}) as T;
}

export default function SuggestionPage() {
  const { redditApi, logout } = useRedditApi();
  const { excludedSubreddits, exclude } = useExclusions();
  const [similarSubreddits, setSimilarSubreddits] = useState<SimilarityResult>();
  const [subscribedSubreddits, setSubscribedSubreddits] = useState<Subreddit[]>();
  const [loadingState, setLoadingState] = useState<string | undefined>(undefined);
  const [refreshVisible, setRefreshVisible] = useState(false);

  const refreshSuggestions = useMemo(() => () => {
    if (!redditApi) {
      return;
    }

    setLoadingState('Fetching your subreddits (1/2)...');
    redditApi.fetchSubscribedSubreddits()
      .then((subreddits) => {
        setSubscribedSubreddits(subreddits);
        setLoadingState('Calculating similar subreddits (2/2)...');

        const subredditNames = subreddits.map((subreddit) => subreddit.data.display_name.toLowerCase());
        return getSimilarSubreddits(subredditNames, {
          count: 20,
          exclude: excludedSubreddits,
        });
      })
      .then(setSimilarSubreddits)
      .then(() => {
        setLoadingState(undefined);
      });
  }, [redditApi, excludedSubreddits]);

  useEffect(() => {
    if (!similarSubreddits) {
      refreshSuggestions();
    }
  }, [similarSubreddits, refreshSuggestions]);

  return (
    <Layout className={styles.container}>
      {(!loadingState && similarSubreddits) ? (
        <>
          <div className={styles.description}>
            <FlexSpacer />

            <h1 className={styles.title}>Suggest me a subreddit</h1>
            <Link element="button" onClick={logout} className={styles.logoutLink}>Logout</Link>

            <FlexSpacer />

            <Footer />
          </div>

          <div>
            {refreshVisible && (
              <Link element="button" onClick={refreshSuggestions} className={styles.refreshButton}>Refresh</Link>
            )}

            <Suggestions
              data={similarSubreddits}
              className={styles.suggestions}
              totalSubreddits={subscribedSubreddits?.length || 0}
              onExclude={(subreddit) => {
                setRefreshVisible(true);
                setSimilarSubreddits((previous) => without(previous || {}, subreddit));
                exclude(subreddit);
              }}
            />
          </div>
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
