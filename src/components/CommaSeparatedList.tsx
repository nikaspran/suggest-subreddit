import React, { ReactNode } from 'react';

export default function CommaSeparatedList({
  children,
}: {
  children: ReactNode[];
}) {
  return (
    <>
      {children.reduce((previous: ReactNode[], current, index) => {
        if (index === 0) {
          return [current];
        }
        return [...previous, index === children.length - 1 ? ' and ' : ', ', current];
      }, [])}
    </>
  );
}
