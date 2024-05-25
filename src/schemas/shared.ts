import { SupabaseClient } from '@supabase/supabase-js';
import { getTranslations } from 'next-intl/server';

import { Database } from './supabase';

export type ReactSerializable =
  | Record<string, unknown>
  | Array<Record<string, unknown>>
  | Array<string>
  | Array<number>
  | Array<boolean>
  | string
  | number
  | boolean
  | undefined
  | object;

export type ServerActionResult<T = undefined> = {
  status: 'error' | 'success';
  message?: string;
  data?: T;
};

export type ServerActionInjected<T = undefined> = {
  supabase: SupabaseClient<Database>;
  t: Awaited<ReturnType<typeof getTranslations<'results'>>>;
  values: T;
};

export interface NestedObjects {
  [key: string]:
    | string
    | number
    | NestedObjects
    | Array<string | number | NestedObjects>;
}

export type BigCalendarView = 'month' | 'week' | 'work_week' | 'day' | 'agenda';
