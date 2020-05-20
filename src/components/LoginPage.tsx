import React from 'react';
import classnames from 'classnames';
import styles from './LoginPage.module.scss';
import { useRedditApi } from './RedditApiProvider';
import CallToAction from './CallToAction';
import Suggestions from './Suggestions';

// eslint-disable-next-line
const mockSuggestions = {"linux":{"score":2,"contributors":{"programming":1, "javascript": 1}},"ProgrammerHumor":{"score":1,"contributors":{"programming":1}},"webdev":{"score":1,"contributors":{"programming":1}},"Python":{"score":1,"contributors":{"programming":1}},"javascript":{"score":1,"contributors":{"programming":1}},"learnprogramming":{"score":1,"contributors":{"programming":1}},"cscareerquestions":{"score":1,"contributors":{"programming":1}},"gamedev":{"score":1,"contributors":{"programming":1}},"rust":{"score":1,"contributors":{"programming":1}},"technology":{"score":1,"contributors":{"programming":1}}};

export default function LoginPage({
  className,
}: {
  className?: string;
}) {
  const { login } = useRedditApi();

  return (
    <div className={classnames(styles.root, className)}>
      <div className={styles.loginContainer}>
        <h1 className={styles.title}>Suggest me a subreddit</h1>
        <CallToAction type="button" onClick={login}>Get my subreddits via Reddit</CallToAction>
      </div>
      <div className={styles.example}>
        <Suggestions data={mockSuggestions} subscribedSubreddits={[]} />
      </div>
    </div>
  );
}
