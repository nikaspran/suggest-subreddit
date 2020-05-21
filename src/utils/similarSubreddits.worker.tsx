type Similarities = { [subreddit: string]: { [subreddit: string]: number } };

export interface WorkerInput {
  invocationKey: string;
  sourceSubreddits: string[];
  count: number;
}

export type Score = number;
export interface SimilarityResult {
  [subreddit: string]: {
    score: Score;
    contributors: { [contributor: string]: Score };
  };
}

export interface WorkerOutput {
  invocationKey: string;
  result: SimilarityResult;
}

export default () => {
  let waitForSimilarities: ReturnType<typeof fetchSimilarities> | undefined;

  async function fetchSimilarities(): Promise<Similarities> {
    // fetch is not supported by WebWorkers widely yet
    return new Promise((resolve, reject) => {
      function listener(this: XMLHttpRequest) {
        resolve(JSON.parse(this.responseText));
      }

      const request = new XMLHttpRequest();
      request.addEventListener('load', listener);
      try {
        // eslint-disable-next-line no-restricted-globals
        console.log(`${self.location.origin}${process.env.PUBLIC_URL}/similarSubreddits.json`);
        // eslint-disable-next-line no-restricted-globals
        request.open('GET', `${self.location.origin}${process.env.PUBLIC_URL}/similarSubreddits.json`);
        request.send();
      } catch (error) {
        reject(error);
      }
    });
  }

  async function getSimilarSubreddits({
    sourceSubreddits,
    count = 10,
  }: {
    sourceSubreddits: string[];
    count: number;
  }): Promise<SimilarityResult> {
    waitForSimilarities = waitForSimilarities || fetchSimilarities();

    const similarTo = await waitForSimilarities;

    const alreadyInSource = new Set(sourceSubreddits.map((subreddit) => subreddit.toLowerCase()));

    const result: SimilarityResult = {};
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
      .sort(([, a], [, b]) => b.score - a.score)
      .slice(0, count);

    return Object.fromEntries(sortedEntries);
  }

  // eslint-disable-next-line no-restricted-globals
  self.addEventListener('message', async (event: MessageEvent) => {
    const data = event.data as WorkerInput;

    postMessage({
      invocationKey: event.data.invocationKey,
      result: await getSimilarSubreddits(data),
    } as WorkerOutput, undefined as never);
  });
};
