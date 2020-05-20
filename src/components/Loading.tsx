import React from 'react';
import styles from './Loading.module.scss';
import { ReactComponent as Spinner } from '../assets/spinner.svg';

export default function Loading() {
  return (
    <Spinner className={styles.loading} />
  );
}
