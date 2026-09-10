/**
 * Edge Runtime: Rate limiting middleware using Vercel KV
 * Prevents API abuse with sliding window algorithm
 */

import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
}

const DEFAULT_CONFIG: RateLimitConfig = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 10, // 10 requests per minute
};

/**
 * Check if request is rate limited
 * Uses Redis sorted set for sliding window rate limiting
 */
export async function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = DEFAULT_CONFIG
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const now = Date.now();
  const windowStart = now - config.windowMs;
  const key = `ratelimit:${identifier}`;

  try {
    // Remove old entries outside the window
    await kv.zremrangebyscore(key, 0, windowStart);

    // Count current requests in window
    const currentCount = await kv.zcard(key);

    if (currentCount >= config.maxRequests) {
      // Get the oldest entry to calculate reset time
      const oldestEntry = await kv.zrange(key, 0, 0, { withScores: true });
      const resetAt = oldestEntry[0]?.score 
        ? Math.ceil((oldestEntry[0].score as number + config.windowMs) / 1000)
        : Math.ceil((now + config.windowMs) / 1000);

      return {
        allowed: false,
        remaining: 0,
        resetAt,
      };
    }

    // Add current request
    await kv.zadd(key, { score: now, member: `${now}-${Math.random()}` });
    
    // Set expiry on the key
    await kv.expire(key, Math.ceil(config.windowMs / 1000));

    return {
      allowed: true,
      remaining: config.maxRequests - currentCount - 1,
      resetAt: Math.ceil((now + config.windowMs) / 1000),
    };
  } catch (error) {
    console.error('[Edge Rate Limit] Error:', error);
    // Fail open - allow request if Redis is unavailable
    return {
      allowed: true,
      remaining: config.maxRequests,
      resetAt: Math.ceil((now + config.windowMs) / 1000),
    };
  }
}

/**
 * Create rate limit headers for response
 */
function createRateLimitHeaders(remaining: number, resetAt: number): Record<string, string> {
  return {
    'X-RateLimit-Limit': DEFAULT_CONFIG.maxRequests.toString(),
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': resetAt.toString(),
  };
}

/**
 * Middleware wrapper for rate limiting API routes
 */
export function withRateLimit<T extends (...args: any[]) => Promise<NextResponse>>(
  handler: T,
  config?: RateLimitConfig
) {
  return async function wrappedHandler(request: NextRequest, ...args: any[]) {
    // Extract identifier (IP address or API key)
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    const apiKey = request.headers.get('x-api-key');
    const identifier = apiKey ? `api:${apiKey}` : `ip:${ip}`;

    const result = await checkRateLimit(identifier, config);

    if (!result.allowed) {
      return NextResponse.json(
        { 
          error: 'Too many requests', 
          message: 'Rate limit exceeded. Please try again later.',
          retryAfter: result.resetAt - Math.floor(Date.now() / 1000)
        },
        { 
          status: 429,
          headers: createRateLimitHeaders(result.remaining, result.resetAt),
        }
      );
    }

    const response = await handler(request, ...args);

    // Add rate limit headers to successful responses
    Object.entries(createRateLimitHeaders(result.remaining, result.resetAt)).forEach(
      ([key, value]) => {
        response.headers.set(key, value);
      }
    );

    return response;
  };
}
