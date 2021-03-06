let waitForSimilarities;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function fetchSimilarities() {
  // fetch is not supported by WebWorkers widely yet
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function listener() {
      try {
        resolve(JSON.parse(this.responseText));
      } catch (error) {
        reject(error);
      }
    }

    const request = new XMLHttpRequest();
    request.addEventListener('load', listener);
    try {
      // eslint-disable-next-line no-restricted-globals
      request.open('GET', `${self.location.origin}/suggest-subreddit/similarSubreddits.json`);
      request.send();
    } catch (error) {
      reject(error);
    }
  });
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function getSimilarSubreddits({ sourceSubreddits, count = 10, exclude }) {
  waitForSimilarities = waitForSimilarities || fetchSimilarities();

  const similarTo = await waitForSimilarities;

  const alreadyInSource = new Set(sourceSubreddits.map((subreddit) => subreddit.toLowerCase()));

  const result = {};
  sourceSubreddits.forEach((subreddit) => {
    const similarSubreddits = similarTo[subreddit] || [];
    Object.entries(similarSubreddits).forEach(([similarSubreddit, score]) => {
      if (alreadyInSource.has(similarSubreddit.toLowerCase())) {
        return;
      }

      result[similarSubreddit] = result[similarSubreddit] || { score: 0, contributors: {} };
      result[similarSubreddit].score += score;
      result[similarSubreddit].contributors[subreddit] = score;
    });
  });


  const sortedEntries = Object.entries(result)
    .filter(([subreddit]) => !exclude.has(subreddit))
    .sort(([, a], [, b]) => b.score - a.score)
    .slice(0, count);

  return sortedEntries.reduce((previous, [key, value]) => ({
    ...previous,
    [key]: value,
  }), {});
}

// eslint-disable-next-line no-restricted-globals
self.addEventListener('message', async (event) => {
  const { data } = event;

  try {
    const result = await getSimilarSubreddits(data);

    postMessage({
      invocationKey: data.invocationKey,
      result,
    });
  } catch (error) {
    postMessage({
      invocationKey: data.invocationKey,
      error: error.toString(),
    });
  }
});
