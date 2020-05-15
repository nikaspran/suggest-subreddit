const dev = {
  REDDIT_CLIENT_ID: 'ocEV8buEyuz35w',
  REDDIT_REDIRECT_URI: 'http://localhost:3000',
};

const prod = {
  REDDIT_CLIENT_ID: 'ocEV8buEyuz35w',
  REDDIT_REDIRECT_URI: 'http://localhost:3000',
};

export default process.env.NODE_ENV === 'production' ? prod : dev;
