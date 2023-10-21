export interface PromiseQueue {
  enqueue<T>(task: () => Promise<T>, options: TaskOptions): Promise<T>;
}

export type QueueItem = {task: () => Promise<unknown>; options: TaskOptions};

export type TaskOptions = {
  delayBetween?: number;
};
