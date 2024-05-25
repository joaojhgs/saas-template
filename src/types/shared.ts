export type ReactSerializable =
  | Record<string, unknown>
  | Array<Record<string, unknown>>
  | Array<string>
  | Array<number>
  | Array<boolean>
  | string
  | number
  | boolean;

export type ServerActionResult<T> = {
  status: 'error' | 'success';
  message?: string;
  data?: T;
};
