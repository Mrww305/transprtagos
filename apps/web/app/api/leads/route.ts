import { NextResponse } from 'next/server'
import { z } from 'zod'

const leadSchema = z.object({
  company: z.string().min(1),
  contact: z.string().min(1),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  value: z.string().optional(),
})

export async function GET() {
  // Mock leads - in production fetch from database
  const leads = [
    { id: 1, company: 'Faisalabad Fabrics', contact: 'Nasir Mahmood', stage: 'new', value: '₨ 500,000' },
    { id: 2, company: 'Sialkot Sports', contact: 'Tariq Jameel', stage: 'contacted', value: '₨ 750,000' },
  ]

  return NextResponse.json({ success: true, data: leads })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = leadSchema.parse(body)

    // In production: save to database via Drizzle ORM
    console.log('Creating lead:', validated)

    return NextResponse.json({
      success: true,
      data: { id: Date.now(), ...validated, stage: 'new' },
      message: 'Lead created successfully',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, error: 'Failed to create lead' },
      { status: 500 }
    )
  }
}
