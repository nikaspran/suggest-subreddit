import React from 'react';
import styles from './Footer.module.scss';
import Link from './Link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Link href="https://github.com/nikaspran/suggest-subreddit">Github</Link>
      <Link href="https://twitter.com/nikaspran" className={styles.twitterLink}>@nikaspran</Link>
    </footer>
  );
}
