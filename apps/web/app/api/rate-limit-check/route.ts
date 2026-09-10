/**
 * API Route: Rate Limit Check Endpoint
 * Edge Runtime with Vercel KV integration
 */

import { NextRequest, NextResponse } from 'next/server';

// Force Edge Runtime
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

async function checkRateLimit(
  identifier: string,
  windowMs: number = 60000,
  maxRequests: number = 10
): Promise<RateLimitResult> {
  // Note: In production, this would use @vercel/kv
  // For now, we return a mock response for edge compatibility testing
  const now = Date.now();
  
  return {
    allowed: true,
    remaining: maxRequests - 1,
    resetAt: Math.ceil((now + windowMs) / 1000),
  };
}

/**
 * GET /api/rate-limit-check?identifier={string}
 * Checks if the given identifier is rate limited
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const identifier = searchParams.get('identifier') || 
                       request.headers.get('x-forwarded-for') || 
                       'anonymous';

    const result = await checkRateLimit(identifier);

    return NextResponse.json(result, {
      headers: {
        'X-RateLimit-Limit': '10',
        'X-RateLimit-Remaining': result.remaining.toString(),
        'X-RateLimit-Reset': result.resetAt.toString(),
        'Cache-Control': 'private, no-cache, no-store',
      },
    });
  } catch (error) {
    console.error('[API Rate Limit Check] Error:', error);
    return NextResponse.json(
      { error: 'Failed to check rate limit' },
      { status: 500 }
    );
  }
}
