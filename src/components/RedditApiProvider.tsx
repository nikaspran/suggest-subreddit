import React, { ReactNode, useEffect, useState, useContext } from 'react';
import RedditApi, { RedditAuthToken, fetchAccessToken, redirectToAuth } from '../utils/RedditApi';

const TOKEN_KEY = 'redditApiToken';
const EXPIRATION_BUFFER_MS = 10 * 60 * 1000;

function login() {
  redirectToAuth();
}

function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

const RedditApiContext = React.createContext<{
  redditApi: RedditApi | undefined;
  authError: string | undefined;
  login: typeof login;
  logout: typeof logout;
}>({ redditApi: undefined, authError: undefined, login, logout });

function retrieveToken() {
  const storedToken = localStorage.getItem(TOKEN_KEY);
  if (!storedToken) {
    return undefined;
  }

  const jsonToken = JSON.parse(storedToken) as RedditAuthToken;
  if (!jsonToken.expires_at || jsonToken.expires_at < Date.now() - EXPIRATION_BUFFER_MS) {
    logout();
    return undefined;
  }
  return jsonToken;
}

function storeToken(token: RedditAuthToken) {
  const tokenString = JSON.stringify(token);
  localStorage.setItem(TOKEN_KEY, tokenString);
}


export default function RedditApiProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [redditApi, setRedditApi] = useState<RedditApi>();
  const [authError, setAuthError] = useState<string>();

  useEffect(() => {
    const token = retrieveToken();

    if (token) {
      setRedditApi(new RedditApi(token));
      return;
    }

    const [, code] = window.location.search.match(/code=([^&]+)/) || [];
    if (code) {
      window.history.replaceState(null, '', window.location.pathname);
      fetchAccessToken(code)
        .then((newToken) => {
          storeToken(newToken);
          setRedditApi(new RedditApi(newToken));
        })
        .catch(() => {
          setAuthError('Could not authenticate with Reddit, please try again later');
        });
    }
  }, []);

  return (
    <RedditApiContext.Provider
      value={{
        redditApi,
        authError,
        login,
        logout: () => {
          logout();
          setRedditApi(undefined);
        },
      }}
    >
      {children}
    </RedditApiContext.Provider>
  );
}

export function useRedditApi() {
  return useContext(RedditApiContext);
}
