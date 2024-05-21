import { ReactSerializable, ServerActionResult } from '@/schemas';

enum ActionStatus {
  ERROR = 'error',
  SUCCESS = 'success',
}

export function createServerActionError(e: Error): ServerActionResult {
  const status = ActionStatus.ERROR;
  let message = '';
  if (typeof e === 'object' && e && 'message' in e) {
    message = e.message;
  }
  return {
    status,
    message,
  };
}

export function createServerActionSuccess<Data extends ReactSerializable>(
  data?: Data,
): ServerActionResult<Data> {
  const status = ActionStatus.SUCCESS;
  return {
    status,
    data,
  };
}

/*
  This function will receive the string JSON of a server action, parse it, and throw an error if the status is 'error'.
  Allowing the normal error handling flow using react-query.
  The parsing is needed because client components can only receive JSON for communication and not objects nor classes
  (Even though we're just calling a function, there's a HTTP request involved)
*/
export async function handleSAResult<Input extends ServerActionResult<Input>>(
  data: Promise<Input>,
): Promise<ServerActionResult<Input>> {
  const result = await data;
  if (result.status === ActionStatus.ERROR) {
    throw new Error(result.message);
  }
  return result;
}
