enum ActionStatus {
  ERROR = 'error',
  SUCCESS = 'success',
}

export class ServerError {
  public status;
  public message;
  constructor(public e: unknown) {
    this.status = ActionStatus.ERROR;
    if (typeof e === 'object' && e && 'message' in e) {
      this.message = e.message;
    }
  }
  public stringfy() {
    return JSON.stringify(this);
  }
}

export class ServerSuccess {
  public status;
  constructor(public data?: Record<string, unknown>) {
    this.status = ActionStatus.SUCCESS;
    this.data = data;
  }
  public stringfy() {
    return JSON.stringify(this);
  }
}
