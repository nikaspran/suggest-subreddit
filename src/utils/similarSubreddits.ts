/* eslint-disable import/prefer-default-export */
const TIMEOUT_S = 10;

let worker: Worker | undefined;

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

function createWorker() {
  return new Worker(`${process.env.PUBLIC_URL}/similarSubreddits.worker.js`);
}

export async function getSimilarSubreddits(sourceSubreddits: string[], {
  count = 20,
  exclude = new Set(),
}: {
  count?: number;
  exclude?: Set<string>;
} = {}): Promise<SimilarityResult> {
  return new Promise((resolve, reject) => {
    worker = worker || createWorker();

    const invocationKey = `invocation_${Math.random()}`;

    worker.postMessage({
      invocationKey,
      sourceSubreddits,
      exclude,
      count,
    } as WorkerInput);

    const timeout = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      worker!.removeEventListener('message', resultListener);
      reject(new Error(`TIMEOUT: could not calculate similar subreddits in ${TIMEOUT_S} seconds`));
    }, TIMEOUT_S * 1000);

    function resultListener(event: MessageEvent) {
      const data = event.data as WorkerOutput;

      if (data.invocationKey !== invocationKey) {
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      worker!.removeEventListener('message', resultListener);
      clearTimeout(timeout);

      resolve(data.result);
    }

    worker.addEventListener('message', resultListener);
  });
}
