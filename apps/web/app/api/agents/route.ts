/**
 * API Route: Agents Status & Communication
 * Serverless runtime for agent orchestration
 * Manages the 6 autonomous AI agents: Dispatcher, Fleet, Maintenance, CRM, Finance, Sales/GTM
 */

import { NextRequest, NextResponse } from 'next/server';

// Use serverless runtime for heavy computation
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface AgentStatus {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'processing' | 'error';
  lastActive: string;
  tasksCompleted: number;
  currentTask?: string;
}

const AGENTS: AgentStatus[] = [
  {
    id: 'dispatcher',
    name: 'Dispatcher Agent',
    status: 'active',
    lastActive: new Date().toISOString(),
    tasksCompleted: 12,
    currentTask: 'Monitoring shipment requests',
  },
  {
    id: 'fleet',
    name: 'Fleet Management Agent',
    status: 'active',
    lastActive: new Date().toISOString(),
    tasksCompleted: 8,
    currentTask: 'Tracking vehicle locations',
  },
  {
    id: 'maintenance',
    name: 'Maintenance Agent',
    status: 'idle',
    lastActive: new Date().toISOString(),
    tasksCompleted: 3,
    currentTask: 'Waiting for maintenance alerts',
  },
  {
    id: 'crm',
    name: 'CRM Agent',
    status: 'active',
    lastActive: new Date().toISOString(),
    tasksCompleted: 15,
    currentTask: 'Processing customer inquiries',
  },
  {
    id: 'finance',
    name: 'Finance Agent',
    status: 'idle',
    lastActive: new Date().toISOString(),
    tasksCompleted: 6,
    currentTask: 'Awaiting transaction updates',
  },
  {
    id: 'sales',
    name: 'Sales/GTM Agent',
    status: 'active',
    lastActive: new Date().toISOString(),
    tasksCompleted: 10,
    currentTask: 'Managing lead pipeline',
  },
];

/**
 * GET /api/agents
 * Returns status of all agents
 */
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      agents: AGENTS,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[API Agents] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agent status' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/agents
 * Send message to specific agent or broadcast to all
 * Body: { agentId?: string, action: string, payload?: any }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { agentId, action, payload } = body;

    if (!agentId || !action) {
      return NextResponse.json(
        { error: 'agentId and action are required' },
        { status: 400 }
      );
    }

    // In production, this would publish to Vercel KV pub/sub
    console.log('[Agent Message]', {
      agentId,
      action,
      payload,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: `Agent ${agentId} processed action: ${action}`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[API Agents POST] Error:', error);
    return NextResponse.json(
      { error: 'Failed to process agent action' },
      { status: 400 }
    );
  }
}
