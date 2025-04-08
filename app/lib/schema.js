import { z } from 'zod';

export const AppointmentSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  startDateTime: z.union([z.string().datetime(), z.date()]),
  endDateTime: z.union([z.string().datetime(), z.date()]),
});

export const AppointmentResponseSchema = AppointmentSchema.extend({
  id: z.string(),
}); 