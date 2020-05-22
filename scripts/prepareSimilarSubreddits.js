/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const dataDir = path.resolve(require.resolve('sayit-data/1/count.json'), '..');

const filenames = fs.readdirSync(dataDir);

const data = {};
filenames.forEach((filename) => {
  if (!filename.match(/\d+_[\w\d]+\.json/)) {
    return;
  }

  const groups = require(`sayit-data/1/${filename}`);
  groups.forEach(([subreddit, ...similarSubreddits]) => {
    data[subreddit.toLowerCase()] = similarSubreddits.reduce((previous, sub) => ({
      ...previous,
      [sub]: 1,
    }), {});
  });
});

fs.writeFileSync(path.resolve('public', 'similarSubreddits.json'), JSON.stringify(data, null, 2));
