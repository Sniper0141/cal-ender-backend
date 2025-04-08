import { z } from 'zod';

export const AppointmentSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  startDateTime: z.string().datetime(),
  endDateTime: z.string().datetime(),
});

export const AppointmentResponseSchema = AppointmentSchema.extend({
  id: z.string(),
}); 