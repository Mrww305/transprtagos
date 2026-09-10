/**
 * Edge Runtime: A/B Testing & Feature Flags
 * Lightweight feature flag system with percentage-based rollouts
 */

import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

interface ExperimentConfig {
  id: string;
  name: string;
  description: string;
  variants: {
    id: string;
    weight: number; // Percentage (0-100)
    value: any;
  }[];
  active: boolean;
  startDate?: Date;
  endDate?: Date;
}

// Default experiments for PakTransit OS
const DEFAULT_EXPERIMENTS: ExperimentConfig[] = [
  {
    id: 'driver-ui-v2',
    name: 'Driver UI Redesign',
    description: 'Test new driver-friendly mobile interface with larger buttons',
    variants: [
      { id: 'control', weight: 50, value: { version: 'v1' } },
      { id: 'treatment', weight: 50, value: { version: 'v2', largeButtons: true } },
    ],
    active: true,
  },
  {
    id: 'urdu-first',
    name: 'Urdu-First Language Selection',
    description: 'Show Urdu as default language for drivers',
    variants: [
      { id: 'control', weight: 70, value: { defaultLang: 'en' } },
      { id: 'treatment', weight: 30, value: { defaultLang: 'ur' } },
    ],
    active: true,
  },
];

/**
 * Hash function for consistent user assignment
 * Uses simple hash for edge compatibility
 */
function hashUserId(userId: string, buckets: number = 100): number {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    const char = userId.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash) % buckets;
}

/**
 * Assign user to experiment variant based on hash
 */
export function assignVariant(experiment: ExperimentConfig, userId: string) {
  if (!experiment.active) {
    return experiment.variants[0]; // Return control if inactive
  }

  // Check date range
  const now = new Date();
  if (experiment.startDate && now < experiment.startDate) {
    return experiment.variants[0]; // Not started yet
  }
  if (experiment.endDate && now > experiment.endDate) {
    return experiment.variants[0]; // Experiment ended
  }

  const bucket = hashUserId(userId);
  let cumulativeWeight = 0;

  for (const variant of experiment.variants) {
    cumulativeWeight += variant.weight;
    if (bucket < cumulativeWeight) {
      return variant;
    }
  }

  return experiment.variants[0]; // Fallback to control
}

/**
 * Get all active experiments for a user
 */
export function getActiveExperiments(userId: string) {
  const results: Record<string, any> = {};

  for (const experiment of DEFAULT_EXPERIMENTS) {
    const variant = assignVariant(experiment, userId);
    results[experiment.id] = {
      experimentId: experiment.id,
      variantId: variant.id,
      value: variant.value,
    };
  }

  return results;
}

/**
 * Track experiment exposure (for analytics)
 */
export async function trackExposure(
  userId: string,
  experimentId: string,
  variantId: string
) {
  try {
    const key = `ab:exposure:${experimentId}:${variantId}`;
    await kv.incr(key);
    await kv.sadd(`ab:user:${userId}:experiments`, experimentId);
  } catch (error) {
    console.error('[Edge A/B] Tracking error:', error);
  }
}

/**
 * API Route Handler for /api/ab-test
 * Returns experiment assignments for the current user
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId') || 
                   request.headers.get('x-user-id') ||
                   request.headers.get('x-forwarded-for') ||
                   'anonymous';

    const experiments = getActiveExperiments(userId);

    return NextResponse.json(
      { experiments },
      {
        headers: {
          'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        },
      }
    );
  } catch (error) {
    console.error('[Edge A/B] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch experiments' },
      { status: 500 }
    );
  }
}

/**
 * API Route Handler for /api/ab-track
 * Tracks experiment exposure
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, experimentId, variantId } = body;

    if (!userId || !experimentId || !variantId) {
      return NextResponse.json(
        { error: 'userId, experimentId, and variantId are required' },
        { status: 400 }
      );
    }

    await trackExposure(userId, experimentId, variantId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Edge A/B Track] Error:', error);
    return NextResponse.json(
      { error: 'Failed to track exposure' },
      { status: 500 }
    );
  }
}
