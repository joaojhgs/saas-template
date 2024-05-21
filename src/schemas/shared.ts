export type ReactSerializable =
  | Record<string, unknown>
  | Array<Record<string, unknown>>
  | Array<string>
  | Array<number>
  | Array<boolean>
  | string
  | number
  | boolean
  | undefined;

export type ServerActionResult<T = undefined> = {
  status: 'error' | 'success';
  message?: string;
  data?: T;
};

export interface NestedObjects {
  [key: string]:
    | string
    | number
    | NestedObjects
    | Array<string | number | NestedObjects>;
}

export type BigCalendarView = 'month' | 'week' | 'work_week' | 'day' | 'agenda';
