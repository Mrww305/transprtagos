/**
 * API Route: A/B Test Exposure Tracking
 * Serverless runtime for database writes
 */

import { NextRequest, NextResponse } from 'next/server';

// Use serverless runtime for KV/database operations
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/ab-track
 * Tracks experiment exposure for analytics
 * Body: { userId: string, experimentId: string, variantId: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, experimentId, variantId } = body;

    if (!userId || !experimentId || !variantId) {
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          required: ['userId', 'experimentId', 'variantId']
        },
        { status: 400 }
      );
    }

    // In production, this would write to Vercel KV or database
    // For now, we log and return success
    console.log('[A/B Track]', {
      userId,
      experimentId,
      variantId,
      timestamp: new Date().toISOString(),
    });

    // TODO: Implement actual tracking with Vercel KV
    // await kv.incr(`ab:exposure:${experimentId}:${variantId}`);
    // await kv.sadd(`ab:user:${userId}:experiments`, experimentId);

    return NextResponse.json({ 
      success: true,
      message: 'Exposure tracked successfully'
    });
  } catch (error) {
    console.error('[API A/B Track] Error:', error);
    return NextResponse.json(
      { error: 'Failed to track exposure' },
      { status: 500 }
    );
  }
}
