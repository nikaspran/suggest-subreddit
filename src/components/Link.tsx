import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './Link.module.scss';

export default function Link({
  className,
  element = 'a',
  ...otherProps
}: (
  ({ element?: 'a' } & AnchorHTMLAttributes<HTMLAnchorElement>) |
  ({ element: 'button' } & ButtonHTMLAttributes<HTMLButtonElement>)
)) {
  if (element === 'a') {
    return (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a
        className={classNames(styles.link, className)}
        rel="noopener noreferrer"
        target="blank"
        {...otherProps as AnchorHTMLAttributes<HTMLAnchorElement>}
      />
    );
  }

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      className={classNames(styles.link, className)}
      {...otherProps as ButtonHTMLAttributes<HTMLButtonElement>}
    />
  );
}
