/**
 * Own the asynchronous lifecycle of one authenticated wine-image request.
 * Browser APIs are injected so request ordering and URL cleanup stay testable.
 */
export class WineImageLoader {
  private objectUrl: string | null = null;
  private loadedPath: string | null = null;
  private pendingPath: string | null = null;
  private attemptedPath: string | null = null;
  private request = 0;

  constructor(
    private readonly createObjectUrl: (blob: Blob) => string = (blob) =>
      URL.createObjectURL(blob),
    private readonly revokeObjectUrl: (url: string) => void = (url) =>
      URL.revokeObjectURL(url),
  ) {}

  async load(
    imagePath: string | null,
    fetchImage: ((path: string) => Promise<Response>) | undefined,
    onChange: (url: string | null) => void,
  ): Promise<void> {
    if (
      imagePath === this.loadedPath &&
      (this.objectUrl !== null ||
        this.pendingPath === imagePath ||
        this.attemptedPath === imagePath)
    ) return;

    const request = ++this.request;
    this.revokeCurrent();
    onChange(null);
    this.loadedPath = imagePath;
    this.pendingPath = imagePath;
    this.attemptedPath = null;
    if (!imagePath) {
      this.pendingPath = null;
      return;
    }
    if (!fetchImage) {
      // Do not mark the path as attempted until Home Assistant can fetch it.
      this.loadedPath = null;
      this.pendingPath = null;
      return;
    }

    this.attemptedPath = imagePath;
    try {
      const response = await fetchImage(imagePath);
      if (!response.ok) return;
      const blob = await response.blob();
      if (request !== this.request) return;
      const objectUrl = this.createObjectUrl(blob);
      this.objectUrl = objectUrl;
      onChange(objectUrl);
    } catch {
      // A missing photo must never prevent the wine details from rendering.
    } finally {
      if (request === this.request) this.pendingPath = null;
    }
  }

  dispose(onChange?: (url: string | null) => void): void {
    this.request += 1;
    this.loadedPath = null;
    this.pendingPath = null;
    this.attemptedPath = null;
    this.revokeCurrent();
    onChange?.(null);
  }

  private revokeCurrent(): void {
    if (this.objectUrl !== null) {
      this.revokeObjectUrl(this.objectUrl);
      this.objectUrl = null;
    }
  }
}
