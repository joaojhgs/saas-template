'use server';

import { ServerActionInjected } from '@/schemas';
import { ICreateScheduleBarberInput } from '@/schemas/schedules';
import { throwIfError } from '@/utils/result-handling';

import serverActionHof from '../server-action';
import { getCurrentUser } from './auth';

export const getBarberSchedules = serverActionHof(
  async ({ supabase }: ServerActionInjected) => {
    const query = supabase.from('schedule').select(
      `
        id,
        id_barber,
        start_time,
        end_time,
        additional_information,
        status,
        allow_notifications,
        user_phone,
        user_name,
        service_type (
            id,
            name
        ),
        barber (
            id,
            name
        )
    `,
    );
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },
);

export const createScheduleByBarber = serverActionHof(
  async ({
    supabase,
    values,
  }: ServerActionInjected<ICreateScheduleBarberInput>) => {
    const { data: user } = await throwIfError(getCurrentUser());
    const { data, error } = await supabase
      .from('schedule')
      .insert({
        ...values,
        id_barber: user?.user.id,
      })
      .select();
    if (error) throw error;
    return data;
  },
);
