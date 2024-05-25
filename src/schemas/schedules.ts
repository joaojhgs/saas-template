import dayjs from 'dayjs';
import { z } from 'zod';

export const CreateScheduleBarberInput = z
  .object({
    start_time: z
      .string()
      .date()
      .refine((v) => new Date(v[0]) > new Date(), {
        params: { i18n: 'start-must-be-after-now' },
        path: ['start_time'],
      }),
    end_time: z
      .string()
      .date()
      .refine((v) => new Date(v[0]) > new Date(), {
        params: { i18n: 'end-must-be-after-now' },
        path: ['end_time'],
      }),
    additional_information: z.string().max(255),
    status: z.enum(['pending', 'approved', 'canceled']),
    allow_notifications: z.boolean(),
    user_phone: z.string().max(20),
    user_name: z.string().max(80),
    service_type_id: z.string().uuid(),
  })
  .refine((v) => dayjs(v.end_time).isAfter(v.start_time), {
    params: { i18n: 'end-must-be-after-start' },
    path: ['schedule_range'],
  });

// export const CreateSchedulePublicInput = CreateScheduleBarberInput.extend({
//   id_barber: z.string().uuid(),
// });

export type ICreateScheduleBarberInput = z.infer<
  typeof CreateScheduleBarberInput
>;
