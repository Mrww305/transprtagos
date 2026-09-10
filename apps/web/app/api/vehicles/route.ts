import { NextResponse } from 'next/server'

export async function GET() {
  // Mock vehicle data - in production fetch from database with real-time updates
  const vehicles = [
    { id: 1, name: 'Truck-001', driver: 'Muhammad Ali', location: 'Lahore', status: 'moving', lat: 31.5497, lng: 74.3436 },
    { id: 2, name: 'Truck-002', driver: 'Ahmed Khan', location: 'Multan', status: 'stopped', lat: 30.1575, lng: 71.5249 },
    { id: 3, name: 'Truck-003', driver: 'Usman Malik', location: 'Sukkur', status: 'moving', lat: 27.7058, lng: 68.8574 },
  ]

  return NextResponse.json({
    success: true,
    data: vehicles,
    timestamp: new Date().toISOString(),
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { vehicleId, location, status } = body

    // In production: update vehicle state in database
    console.log(`Updating vehicle ${vehicleId}:`, { location, status })

    return NextResponse.json({
      success: true,
      message: `Vehicle ${vehicleId} updated successfully`,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    )
  }
}
