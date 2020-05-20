import React from 'react';
import styles from './Suggestions.module.scss';
import { SimilarityResult } from '../utils/similarSubreddits.worker';
import Suggestion from './Suggestion';
import { Subreddit } from '../utils/RedditApi';

function include<T>(set: Set<T>, element: T) {
  const newSet = new Set(set);
  newSet.add(element);
  return newSet;
}

function exclude<T>(set: Set<T>, element: T) {
  const newSet = new Set(set);
  newSet.delete(element);
  return newSet;
}

export default function Suggestions({
  className,
  data,
  subscribedSubreddits,
  detailsShown = new Set(),
  onDetailsShownChanged = () => undefined,
}: {
  className?: string;
  data: SimilarityResult;
  subscribedSubreddits: Subreddit[];
  detailsShown?: Set<string>;
  onDetailsShownChanged?: (newDetailsShown: Set<string>) => unknown;
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
          showDetails={detailsShown.has(subreddit)}
          onShowDetails={(shouldShow) => (
            onDetailsShownChanged(shouldShow ? include(detailsShown, subreddit) : exclude(detailsShown, subreddit))
          )}
        />
      ))}
    </div>
  );
}
