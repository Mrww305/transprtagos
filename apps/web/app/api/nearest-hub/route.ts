/**
 * API Route: Nearest Hub Detection
 * Edge Runtime optimized for low-latency geolocation
 * Used by drivers to find closest logistics hub
 */

import { NextRequest, NextResponse } from 'next/server';

// Force Edge Runtime for this route
export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Pakistan major cities with coordinates
const HUBS = [
  { id: 'khi', name: 'Karachi', lat: 24.8607, lng: 67.0011 },
  { id: 'hyd', name: 'Hyderabad', lat: 25.3960, lng: 68.3728 },
  { id: 'skr', name: 'Sukkur', lat: 27.7058, lng: 68.8574 },
  { id: 'multan', name: 'Multan', lat: 30.1575, lng: 71.5249 },
  { id: 'lhr', name: 'Lahore', lat: 31.5204, lng: 74.3587 },
  { id: 'isb', name: 'Islamabad', lat: 33.6844, lng: 73.0479 },
  { id: 'raw', name: 'Rawalpindi', lat: 33.5651, lng: 73.0169 },
  { id: 'pes', name: 'Peshawar', lat: 34.0151, lng: 71.5249 },
  { id: 'qta', name: 'Quetta', lat: 30.1798, lng: 66.9750 },
  { id: 'fsd', name: 'Faisalabad', lat: 31.4504, lng: 73.1350 },
];

/**
 * Calculate distance between two points using Haversine formula
 */
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * GET /api/nearest-hub?lat={number}&lng={number}
 * Returns nearest hub and distance in kilometers
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    if (!lat || !lng) {
      return NextResponse.json(
        { error: 'Latitude and longitude are required' },
        { status: 400 }
      );
    }

    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);

    if (isNaN(userLat) || isNaN(userLng)) {
      return NextResponse.json(
        { error: 'Invalid coordinates' },
        { status: 400 }
      );
    }

    // Find nearest hub
    let nearestHub = HUBS[0];
    let minDistance = Infinity;

    for (const hub of HUBS) {
      const distance = calculateDistance(userLat, userLng, hub.lat, hub.lng);
      if (distance < minDistance) {
        minDistance = distance;
        nearestHub = hub;
      }
    }

    return NextResponse.json(
      {
        hub: nearestHub,
        distance: Math.round(minDistance * 10) / 10,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
          'X-PakTransit-Hub': nearestHub.id,
        },
      }
    );
  } catch (error) {
    console.error('[API Nearest Hub] Error:', error);
    return NextResponse.json(
      { error: 'Failed to determine nearest hub' },
      { status: 500 }
    );
  }
}
