import React from 'react';
import classNames from 'classnames';
import { Score } from '../utils/similarSubreddits.worker';
import styles from './Suggestion.module.scss';
import CommaSeparatedList from './CommaSeparatedList';
import { ReactComponent as Cross } from '../assets/cross.svg';

export default function Suggestion({
  className,
  subreddit,
  score,
  contributors,
  showDetails = false,
  onShowDetails = () => undefined,
}: {
  className?: string;
  subreddit: string;
  score: Score;
  contributors: { [contributor: string]: Score };
  showDetails?: boolean;
  onShowDetails?: (nextState: boolean) => unknown;
}) {
  return (
    <div className={classNames(styles.suggestion, className)}>
      <div className={styles.contentContainer}>
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
        </div>

        <div className={styles.controls}>
          <button type="button" className={styles.excludeButton} title="Exclude subreddit">
            <Cross />
          </button>
          {/* <button
            type="button"
            className={styles.infoButton}
            onClick={() => onShowDetails(!showDetails)}
          >
            ?
          </button> */}
        </div>
      </div>

      <div className={classNames(styles.details, showDetails && styles.visible)}>
        Because you subscribe to
        {' '}
        <CommaSeparatedList>
          {Object.keys(contributors).map((contributor) => (
            <a href={`https://www.reddit.com/r/${contributor}`}>/r/{contributor}</a>
          ))}
        </CommaSeparatedList>
      </div>
    </div>
  );
}
