import React, { ReactNode, useContext, useState } from 'react';

const TOKEN_KEY = 'excludedSubreddits';

function parseExclusions() {
  const exclusionString = localStorage.getItem(TOKEN_KEY);
  return new Set(exclusionString && exclusionString.split(','));
}

const ExclusionContext = React.createContext({
  excludedSubreddits: new Set<string>(),
  exclude: (subreddit: string) => undefined as void,
});

export default function ExclusionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [excludedSubreddits, setExcludedSubreddits] = useState(parseExclusions());

  function exclude(subreddit: string) {
    setExcludedSubreddits((previous) => {
      const newSet = new Set(previous);
      newSet.add(subreddit);
      localStorage.setItem(TOKEN_KEY, Array.from(newSet.values()).join(','));
      return newSet;
    });
  }

  return (
    <ExclusionContext.Provider
      value={{
        excludedSubreddits,
        exclude,
      }}
    >
      {children}
    </ExclusionContext.Provider>
  );
}

export function useExclusions() {
  return useContext(ExclusionContext);
}
