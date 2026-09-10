/**
 * API Route: Leads Management (CRM/Sales)
 * Serverless runtime for database operations
 * Handles lead creation, updates, and pipeline management
 */

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface Lead {
  id: string;
  companyName: string;
  contactName: string;
  phone: string;
  email?: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  value: number; // in PKR
  source: 'website' | 'referral' | 'cold-call' | 'social' | 'walk-in';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Mock leads data - will be replaced with database
const MOCK_LEADS: Lead[] = [
  {
    id: 'lead-001',
    companyName: 'Al-Rehman Textiles',
    contactName: 'Muhammad Ahmed',
    phone: '+92-300-1234567',
    email: 'ahmed@alrehmantextiles.pk',
    status: 'qualified',
    value: 500000,
    source: 'referral',
    notes: 'Regular Lahore-Karachi route, 10 trucks needed',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'lead-002',
    companyName: 'Peshawar Trading Co',
    contactName: 'Khan Wali',
    phone: '+92-311-9876543',
    status: 'new',
    value: 300000,
    source: 'cold-call',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

/**
 * GET /api/leads
 * Returns all leads with optional filtering
 * Query params: status?, source?, limit?
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const source = searchParams.get('source');
    const limit = searchParams.get('limit') || '50';

    let filteredLeads = [...MOCK_LEADS];

    if (status) {
      filteredLeads = filteredLeads.filter(lead => lead.status === status);
    }

    if (source) {
      filteredLeads = filteredLeads.filter(lead => lead.source === source);
    }

    return NextResponse.json({
      success: true,
      leads: filteredLeads.slice(0, parseInt(limit)),
      total: filteredLeads.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[API Leads GET] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/leads
 * Create a new lead
 * Body: { companyName, contactName, phone, email?, value, source, notes? }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { companyName, contactName, phone, email, value, source, notes } = body;

    // Validation
    if (!companyName || !contactName || !phone || !value || !source) {
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          required: ['companyName', 'contactName', 'phone', 'value', 'source']
        },
        { status: 400 }
      );
    }

    // In production: validate with Zod, save to database
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      companyName,
      contactName,
      phone,
      email,
      status: 'new',
      value: parseInt(value),
      source,
      notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log('[New Lead Created]', newLead);

    return NextResponse.json(
      {
        success: true,
        lead: newLead,
        message: 'Lead created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API Leads POST] Error:', error);
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    );
  }
}
