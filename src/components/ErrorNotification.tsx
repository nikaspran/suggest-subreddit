import React, { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './ErrorNotification.module.scss';

export default function ErrorNotification({
  title,
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={classNames(styles.error, className)}>
      {title && <strong>{title}</strong>}
      <p>
        {children}
      </p>
    </div>
  );
}
