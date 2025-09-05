export class HttpError extends Error {
  status: number;
  body?: string;

  constructor(status: number, message: string, body?: string) {
    super(`HTTP ${status}: ${message}`);
    this.name = "HttpError";
    this.status = status;
    this.body = body;
  }
}
