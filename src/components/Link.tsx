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
      <a // eslint-disable-line jsx-a11y/anchor-has-content
        className={classNames(styles.link, className)}
        rel="noopener noreferrer"
        target="blank"
        {...otherProps as AnchorHTMLAttributes<HTMLAnchorElement>}
      />
    );
  }

  return (
    <button // eslint-disable-line react/button-has-type
      className={classNames(styles.link, className)}
      {...otherProps as ButtonHTMLAttributes<HTMLButtonElement>}
    />
  );
}
