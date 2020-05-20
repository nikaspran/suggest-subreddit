import React, { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Layout.module.scss';

export default function Layout({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={classNames(styles.layout, className)}>
      {children}
    </div>
  );
}
