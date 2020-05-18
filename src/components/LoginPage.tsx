import React from 'react';
import classnames from 'classnames';
import styles from './LoginPage.module.scss';
import { useRedditApi } from './RedditApiProvider';
import CallToAction from './CallToAction';

export default function LoginPage({
  className,
}: {
  className?: string;
}) {
  const { login } = useRedditApi();

  return (
    <div className={classnames(styles.root, className)}>
      <div className={styles.loginContainer}>
        <CallToAction type="button" onClick={login}>Log in via Reddit</CallToAction>
      </div>
      <div className={styles.example}>
        Example UI
      </div>
    </div>
  );
}
