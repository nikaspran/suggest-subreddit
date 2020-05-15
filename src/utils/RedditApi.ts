import config from '../config';

const randomString = () => '4';

function toQueryString(params: object) {
  return Object.entries(params).map(([key, value]) => `${key}=${window.encodeURIComponent(value)}`).join('&');
}

function withQuery(url: string, params: object) {
  if (!Object.keys(params).length) {
    return url;
  }

  return `${url}?${toQueryString(params)}`;
}

export function redirectToAuth() {
  window.location.href = withQuery('https://www.reddit.com/api/v1/authorize', {
    client_id: config.REDDIT_CLIENT_ID,
    response_type: 'code',
    state: randomString(),
    redirect_uri: config.REDDIT_REDIRECT_URI,
    duration: 'temporary',
    scope: 'mysubreddits',
  });
}

export interface RedditAuthToken {
  access_token: string;
  expires_in: number;
  expires_at: number;
  scope: string;
  token_type: string;
}

export async function fetchAccessToken(code: string) {
  const response = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${config.REDDIT_CLIENT_ID}:`)}`
    },
    body: toQueryString({
      grant_type: 'authorization_code',
      code,
      redirect_uri: config.REDDIT_REDIRECT_URI,
    }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const json = await response.json();
  if (json.error) {
    throw new Error(json.error);
  }

  return {
    ...json,
    expires_at: Date.now() + json.expires_in * 1000,
  } as RedditAuthToken;
}

interface Subreddit {
  kind: string;
  data: {
    display_name: string;
  }
}

interface Listing {
  kind: 'Listing';
  data: {
    after: string;
    children: Subreddit[];
  }
}

export default class RedditApi {
  constructor(private token: RedditAuthToken) {
  }

  private async iterateAndCollectListing(url: string, after?: string): Promise<Subreddit[]> {
    const response = await fetch(withQuery(url, {
      limit: 100,
      ...after ? { after } : {}
    }), {
      headers: {
        Authorization: `bearer ${this.token.access_token}`,
      }
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const json = await response.json() as Listing;

    return [
      ...json.data.children,
      ...json.data.after ? await this.iterateAndCollectListing(url, json.data.after) : [],
    ]
  }

  async fetchSubscribedSubreddits() {
    return this.iterateAndCollectListing('https://oauth.reddit.com/subreddits/mine/subscriber');
  }
}
