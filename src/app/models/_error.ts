export class Error {
  error?: ErrorDetails;
  isError: boolean;

  constructor(obj: any) {
    this.error = obj.title ?? null;
    this.isError = obj.isError ?? false;
  }
}

export class ErrorDetails {
  title: string;
  detail: string;
  status: string;

  constructor(obj: any) {
    this.title = obj.title ?? '';
    this.detail = obj.detail ?? '';
    this.status = obj.status ?? '';
  }
}
