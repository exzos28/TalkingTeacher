import {PromiseQueue, QueueItem, TaskOptions} from './PromiseQueue';

export default class PromiseQueueImpl implements PromiseQueue {
  private readonly _queue: QueueItem[] = [];
  private _isProcessing = false;

  enqueue<T>(task: () => Promise<T>, options: TaskOptions): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const taskWithCallback = (async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }) as () => Promise<T>;

      this._queue.push({task: taskWithCallback, options});
      if (!this._isProcessing) {
        // noinspection JSIgnoredPromiseFromCall
        this._processQueue();
      }
    });
  }

  private async _processQueue() {
    this._isProcessing = true;
    while (this._queue.length > 0) {
      const item = this._queue.shift();
      if (!item) {
        break;
      }
      await item.task();
      if (this._queue.length !== 0) {
        await stay(item.options.delayBetween ?? 0);
      }
    }
    this._isProcessing = false;
  }
}

const stay = (n: number) =>
  new Promise(resolve => setTimeout(() => resolve(undefined), n));
