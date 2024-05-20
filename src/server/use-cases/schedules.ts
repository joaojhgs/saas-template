'use server';

import serverActionHof from '../server-action';

export const getBarberSchedules = serverActionHof(async (supabase) => {
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
});
