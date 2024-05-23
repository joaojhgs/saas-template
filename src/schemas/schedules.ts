import { z } from 'zod';

export const CreateScheduleBarberInput = z.object({
  start_time: z.string().date(),
  end_time: z.string().date(),
  additional_information: z.string().max(255),
  status: z.enum(['pending', 'approved', 'canceled']),
  allow_notifications: z.boolean(),
  user_phone: z.string().max(20),
  user_name: z.string().max(80),
  service_type_id: z.string().uuid(),
});

export const CreateSchedulePublicInput = CreateScheduleBarberInput.extend({
  id_barber: z.string().uuid(),
});

export type ICreateScheduleBarberInput = z.infer<
  typeof CreateScheduleBarberInput
>;
