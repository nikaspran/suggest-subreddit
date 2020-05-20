import React from 'react';
import styles from './Suggestions.module.scss';
import { SimilarityResult } from '../utils/similarSubreddits.worker';
import Suggestion from './Suggestion';
import { Subreddit } from '../utils/RedditApi';

export default function Suggestions({
  className,
  data,
  subscribedSubreddits,
}: {
  className?: string;
  data: SimilarityResult;
  subscribedSubreddits: Subreddit[];
}) {
  return (
    <div className={className}>
      {Object.entries(data).map(([subreddit, meta]) => (
        <Suggestion
          key={subreddit}
          subreddit={subreddit}
          score={meta.score / subscribedSubreddits.length}
          contributors={meta.contributors}
          className={styles.suggestion}
        />
      ))}
    </div>
  );
}
