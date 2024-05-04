enum ActionStatus {
  ERROR = 'error',
  SUCCESS = 'success',
}
export type ServerActionResult = {
  type: ActionStatus.ERROR;
  message: string;
} & { type: ActionStatus.SUCCESS; message: string; data?: string };

export class ServerError extends Error {
  constructor(
    public message: string,
    public data?: string,
  ) {
    super(message);
  }
}

export class ServerSuccess extends Error {
  constructor(
    public message: string,
    public data?: string,
  ) {
    super(message);
  }
}
