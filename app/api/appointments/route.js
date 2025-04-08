import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';
import { AppointmentSchema, AppointmentResponseSchema } from '@/app/lib/schema';

// GET /api/appointments
export async function GET() {
  try {
    const appointments = await query('SELECT * FROM appointments ORDER BY startDateTime');
    return NextResponse.json(appointments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}

// POST /api/appointments
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = AppointmentSchema.parse(body);
    
    // Insert the appointment
    const result = await query(
      'INSERT INTO appointments (title, "startDateTime", "endDateTime") VALUES ($1, $2, $3) RETURNING *',
      [validatedData.title, validatedData.startDateTime, validatedData.endDateTime]
    );
    
    const appointment = result[0];
    const validatedResponse = AppointmentResponseSchema.parse(appointment);
    
    return NextResponse.json(validatedResponse, { status: 201 });
  } catch (error) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 });
  }
} 