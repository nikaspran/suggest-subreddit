import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './CallToAction.module.scss';

export default function CallToAction({
  className,
  ...otherProps
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classNames(styles.callToAction, className)} {...otherProps} /> // eslint-disable-line react/button-has-type
  );
}
