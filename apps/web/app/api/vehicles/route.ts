/**
 * API Route: Vehicles Fleet Management
 * Serverless runtime for database operations
 * Handles vehicle tracking, status updates, and fleet management
 */

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface Vehicle {
  id: string;
  name: string;
  driverName: string;
  driverPhone: string;
  location: string;
  status: 'moving' | 'stopped' | 'idle' | 'maintenance' | 'offline';
  lat: number;
  lng: number;
  speed?: number; // km/h
  fuelLevel?: number; // percentage
  lastUpdate: string;
  route?: {
    origin: string;
    destination: string;
    progress: number; // percentage
  };
}

// Mock vehicles data - represents 12 animated vehicles from prototype
const MOCK_VEHICLES: Vehicle[] = [
  {
    id: 'v-001',
    name: 'Truck-001',
    driverName: 'Muhammad Ali',
    driverPhone: '+92-300-1111111',
    location: 'Lahore',
    status: 'moving',
    lat: 31.5497,
    lng: 74.3436,
    speed: 65,
    fuelLevel: 78,
    lastUpdate: new Date().toISOString(),
    route: { origin: 'Lahore', destination: 'Karachi', progress: 15 },
  },
  {
    id: 'v-002',
    name: 'Truck-002',
    driverName: 'Ahmed Khan',
    driverPhone: '+92-300-2222222',
    location: 'Multan',
    status: 'stopped',
    lat: 30.1575,
    lng: 71.5249,
    speed: 0,
    fuelLevel: 45,
    lastUpdate: new Date().toISOString(),
    route: { origin: 'Lahore', destination: 'Karachi', progress: 35 },
  },
  {
    id: 'v-003',
    name: 'Truck-003',
    driverName: 'Usman Malik',
    driverPhone: '+92-300-3333333',
    location: 'Sukkur',
    status: 'moving',
    lat: 27.7058,
    lng: 68.8574,
    speed: 70,
    fuelLevel: 62,
    lastUpdate: new Date().toISOString(),
    route: { origin: 'Lahore', destination: 'Karachi', progress: 55 },
  },
  {
    id: 'v-004',
    name: 'Truck-004',
    driverName: 'Bilal Ahmed',
    driverPhone: '+92-300-4444444',
    location: 'Hyderabad',
    status: 'moving',
    lat: 25.3960,
    lng: 68.3728,
    speed: 60,
    fuelLevel: 88,
    lastUpdate: new Date().toISOString(),
    route: { origin: 'Lahore', destination: 'Karachi', progress: 80 },
  },
  {
    id: 'v-005',
    name: 'Truck-005',
    driverName: 'Nasir Hussain',
    driverPhone: '+92-300-5555555',
    location: 'Karachi',
    status: 'idle',
    lat: 24.8607,
    lng: 67.0011,
    speed: 0,
    fuelLevel: 92,
    lastUpdate: new Date().toISOString(),
  },
  {
    id: 'v-006',
    name: 'Van-001',
    driverName: 'Tariq Jameel',
    driverPhone: '+92-300-6666666',
    location: 'Islamabad',
    status: 'moving',
    lat: 33.6844,
    lng: 73.0479,
    speed: 55,
    fuelLevel: 71,
    lastUpdate: new Date().toISOString(),
    route: { origin: 'Islamabad', destination: 'Lahore', progress: 40 },
  },
];

/**
 * GET /api/vehicles
 * Returns all vehicles with optional filtering
 * Query params: status?, location?, limit?
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const location = searchParams.get('location');
    const limit = searchParams.get('limit') || '50';

    let filteredVehicles = [...MOCK_VEHICLES];

    if (status) {
      filteredVehicles = filteredVehicles.filter(v => v.status === status);
    }

    if (location) {
      filteredVehicles = filteredVehicles.filter(v => 
        v.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    return NextResponse.json({
      success: true,
      vehicles: filteredVehicles.slice(0, parseInt(limit)),
      total: filteredVehicles.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[API Vehicles GET] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vehicles' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/vehicles
 * Update vehicle status or location
 * Body: { vehicleId, location?, status?, lat?, lng?, speed?, fuelLevel? }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { vehicleId, location, status, lat, lng, speed, fuelLevel } = body;

    if (!vehicleId) {
      return NextResponse.json(
        { error: 'vehicleId is required' },
        { status: 400 }
      );
    }

    // In production: validate with Zod, update in database
    console.log('[Vehicle Update]', {
      vehicleId,
      location,
      status,
      lat,
      lng,
      speed,
      fuelLevel,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: `Vehicle ${vehicleId} updated successfully`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[API Vehicles POST] Error:', error);
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
