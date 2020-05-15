import workerFn, { WorkerInput, WorkerOutput } from './similarSubreddits.worker';

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
  count?: number
} = {}) {
  return new Promise((resolve, reject) => {
    worker = worker || createWorker();

    const invocationKey = `invocation_${Math.random()}`;

    worker.postMessage({
      invocationKey,
      sourceSubreddits,
      count,
    } as WorkerInput);

    const timeout = setTimeout(() => {
      worker!.removeEventListener('message', resultListener);
      reject(`TIMEOUT: could not calculate similar subreddits in ${TIMEOUT_S} seconds`)
    }, TIMEOUT_S * 1000);

    function resultListener(event: MessageEvent) {
      const data = event.data as WorkerOutput;

      if (data.invocationKey !== invocationKey) {
        return;
      }

      worker!.removeEventListener('message', resultListener);
      clearTimeout(timeout);

      resolve(data.result);
    };

    worker.addEventListener('message', resultListener);
  });
}
