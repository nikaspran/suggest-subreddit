import React from 'react';
import styles from './Suggestions.module.scss';
import { SimilarityResult } from '../utils/similarSubreddits';
import Suggestion from './Suggestion';

export default function Suggestions({
  className,
  data,
  totalSubreddits,
}: {
  className?: string;
  data: SimilarityResult;
  totalSubreddits: number;
}) {
  return (
    <div className={className}>
      {Object.entries(data).map(([subreddit, meta]) => (
        <Suggestion
          key={subreddit}
          subreddit={subreddit}
          score={meta.score / totalSubreddits}
          contributors={meta.contributors}
          className={styles.suggestion}
        />
      ))}
    </div>
  );
}
