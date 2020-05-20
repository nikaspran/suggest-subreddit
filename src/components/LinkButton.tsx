import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './LinkButton.module.scss';

export default function LinkButton({
  className,
  ...otherProps
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button className={classNames(styles.linkButton, className)} {...otherProps} />
  );
}
