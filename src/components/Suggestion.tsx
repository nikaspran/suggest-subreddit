import React, { AnchorHTMLAttributes } from 'react';
import classNames from 'classnames';
import { Score } from '../utils/similarSubreddits';
import styles from './Suggestion.module.scss';
import CommaSeparatedList from './CommaSeparatedList';
import { ReactComponent as Cross } from '../assets/cross.svg';

function LinkTo({ subreddit, ...otherProps }: { subreddit: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={`https://www.reddit.com/r/${subreddit}`}
      target="_blank"
      rel="noopener noreferrer"
      {...otherProps}
    >
      /r/{subreddit}
    </a>
  );
}

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
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <LinkTo subreddit={subreddit} className={styles.title} />

          <div className={styles.description}>
            Similar to <strong>{Math.round(Number(score.toFixed(2)) * 100)}%</strong> of your subreddits
          </div>
        </div>

        <div className={styles.controls}>
          <button type="button" className={styles.excludeButton} title="Exclude subreddit">
            <Cross />
          </button>
        </div>
      </div>

      <div className={styles.details}>
        Because you subscribe to
        {' '}
        <CommaSeparatedList>
          {Object.keys(contributors).map((contributor) => (
            <LinkTo subreddit={contributor} key={contributor} />
          ))}
        </CommaSeparatedList>
      </div>
    </div>
  );
}
