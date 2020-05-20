import React from 'react';
import classNames from 'classnames';
import { Score } from '../utils/similarSubreddits.worker';
import styles from './Suggestion.module.scss';
import CommaSeparatedList from './CommaSeparatedList';

export default function Suggestion({
  className,
  subreddit,
  score,
  contributors,
}: {
  className?: string;
  subreddit: string;
  score: Score;
  contributors: { [contributor: string]: Score };
}) {
  return (
    <div className={classNames(styles.suggestion, className)}>
      <div className={styles.content}>
        <a
          href={`https://www.reddit.com/r/${subreddit}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.title}
        >
          /r/{subreddit}
        </a>

        <div className={styles.description}>
          Similar to <strong>{Math.round(Number(score.toFixed(2)) * 100)}%</strong> of your subreddits
        </div>
        {/* <div className={styles.contributors}>
          Because you subscribe to
          {' '}
          <CommaSeparatedList>
            {Object.keys(contributors).map((contributor) => (
              <a href={`https://www.reddit.com/r/${contributor}`}>/r/{contributor}</a>
            ))}
          </CommaSeparatedList>
        </div> */}
      </div>

      {/* <div className={styles.score}>{Math.round(Number(score.toFixed(2)) * 100)}</div> */}

      <div className={styles.controls}>
        <button type="button" className={styles.excludeButton} title="Exclude subreddit">X</button>
        <button type="button" className={styles.infoButton}>?</button>
      </div>
    </div>
  );
}
