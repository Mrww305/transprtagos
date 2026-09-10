/**
 * API Route: A/B Test Assignment
 * Edge Runtime for real-time experiment assignment
 */

import { NextRequest, NextResponse } from 'next/server';

// Force Edge Runtime
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

interface ExperimentConfig {
  id: string;
  name: string;
  variants: {
    id: string;
    weight: number;
    value: Record<string, any>;
  }[];
  active: boolean;
}

const EXPERIMENTS: ExperimentConfig[] = [
  {
    id: 'driver-ui-v2',
    name: 'Driver UI Redesign',
    variants: [
      { id: 'control', weight: 50, value: { version: 'v1' } },
      { id: 'treatment', weight: 50, value: { version: 'v2', largeButtons: true } },
    ],
    active: true,
  },
  {
    id: 'urdu-first',
    name: 'Urdu-First Language',
    variants: [
      { id: 'control', weight: 70, value: { defaultLang: 'en' } },
      { id: 'treatment', weight: 30, value: { defaultLang: 'ur' } },
    ],
    active: true,
  },
];

function hashUserId(userId: string, buckets: number = 100): number {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    const char = userId.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash) % buckets;
}

function assignVariant(experiment: ExperimentConfig, userId: string) {
  if (!experiment.active) return experiment.variants[0];

  const bucket = hashUserId(userId);
  let cumulativeWeight = 0;

  for (const variant of experiment.variants) {
    cumulativeWeight += variant.weight;
    if (bucket < cumulativeWeight) {
      return variant;
    }
  }

  return experiment.variants[0];
}

/**
 * GET /api/ab-test?userId={string}
 * Returns experiment assignments for the user
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = 
      searchParams.get('userId') ||
      request.headers.get('x-user-id') ||
      request.headers.get('x-forwarded-for') ||
      'anonymous';

    const experiments: Record<string, any> = {};

    for (const experiment of EXPERIMENTS) {
      const variant = assignVariant(experiment, userId);
      experiments[experiment.id] = {
        experimentId: experiment.id,
        variantId: variant.id,
        value: variant.value,
      };
    }

    return NextResponse.json(
      { experiments },
      {
        headers: {
          'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        },
      }
    );
  } catch (error) {
    console.error('[API A/B Test] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch experiments' },
      { status: 500 }
    );
  }
}
