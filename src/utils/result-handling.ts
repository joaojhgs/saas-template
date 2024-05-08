import { ServerActionResult } from './interfaces';

enum ActionStatus {
  ERROR = 'error',
  SUCCESS = 'success',
}

export class ServerActionError {
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

export class ServerActionSuccess {
  public status;
  constructor(public data?: Record<string, unknown>) {
    this.status = ActionStatus.SUCCESS;
    this.data = data;
  }
  public stringfy() {
    return JSON.stringify(this);
  }
}

/*
  This function will receive the string JSON of a server action, parse it, and throw an error if the status is 'error'.
  Allowing the normal error handling flow using react-query.
*/
export const handleSAResult = async (
  data: Promise<string>,
): Promise<ServerActionResult> => {
  const result = await data;
  const parsed = JSON.parse(result);
  if (parsed.status === ActionStatus.ERROR) {
    throw new Error(parsed.message);
  }
  return parsed;
};
