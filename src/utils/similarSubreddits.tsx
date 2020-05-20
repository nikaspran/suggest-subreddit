/* eslint-disable import/prefer-default-export */
import workerFn, { WorkerInput, WorkerOutput, SimilarityResult } from './similarSubreddits.worker';

const TIMEOUT_S = 10;

let worker: Worker | undefined;

function createWorker() {
  const code = workerFn.toString();
  const blob = new Blob([`(${code})()`]);
  return new Worker(URL.createObjectURL(blob));
}

export async function getSimilarSubreddits(sourceSubreddits: string[], {
  count = 10,
}: {
  count?: number;
} = {}): Promise<SimilarityResult> {
  return new Promise((resolve, reject) => {
    worker = worker || createWorker();

    const invocationKey = `invocation_${Math.random()}`;

    worker.postMessage({
      invocationKey,
      sourceSubreddits,
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
