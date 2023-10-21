export interface Sharing {
  shareFile(fileName: string, content: string): Promise<void>;
}
