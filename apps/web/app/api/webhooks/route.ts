/**
 * API Route: Webhooks Handler
 * Serverless runtime for external integrations
 * Handles webhooks from payment gateways, SMS providers, and partner systems
 */

import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Webhook secret for signature verification (in production, use environment variable)
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'paktransit-webhook-secret';

/**
 * Verify webhook signature
 * Supports GitHub-style HMAC SHA256 signatures
 */
function verifySignature(payload: string, signature: string): boolean {
  try {
    const expectedSignature = createHmac('sha256', WEBHOOK_SECRET)
      .update(payload)
      .digest('hex');
    
    return `sha256=${expectedSignature}` === signature;
  } catch (error) {
    console.error('[Webhook Signature] Verification error:', error);
    return false;
  }
}

interface WebhookEvent {
  type: 'payment.completed' | 'payment.failed' | 'sms.delivered' | 'shipment.created' | 'vehicle.tracked';
  provider: 'stripe' | 'jazzcash' | 'easypaisa' | 'twilio' | 'partner';
  data: Record<string, any>;
  timestamp: string;
}

/**
 * POST /api/webhooks
 * Universal webhook handler for multiple providers
 * Headers required:
 * - x-webhook-signature: HMAC signature
 * - x-webhook-provider: stripe|jazzcash|easypaisa|twilio|partner
 * - x-webhook-event: event type
 */
export async function POST(request: NextRequest) {
  try {
    const provider = request.headers.get('x-webhook-provider');
    const signature = request.headers.get('x-webhook-signature');
    const eventType = request.headers.get('x-webhook-event');

    if (!provider) {
      return NextResponse.json(
        { error: 'Missing x-webhook-provider header' },
        { status: 400 }
      );
    }

    const rawBody = await request.text();
    
    // Verify signature for sensitive webhooks (payments)
    if (provider === 'stripe' || provider === 'jazzcash' || provider === 'easypaisa') {
      if (!signature) {
        return NextResponse.json(
          { error: 'Missing webhook signature' },
          { status: 401 }
        );
      }
      
      if (!verifySignature(rawBody, signature)) {
        console.warn('[Webhook] Invalid signature from:', provider);
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        );
      }
    }

    let payload: WebhookEvent;
    
    try {
      payload = JSON.parse(rawBody);
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    // Process webhook based on type
    console.log('[Webhook Received]', {
      provider,
      eventType: eventType || payload.type,
      timestamp: new Date().toISOString(),
    });

    // Route to appropriate handler
    switch (payload.type || eventType) {
      case 'payment.completed':
        await handlePaymentCompleted(payload.data);
        break;
      case 'payment.failed':
        await handlePaymentFailed(payload.data);
        break;
      case 'sms.delivered':
        await handleSmsDelivered(payload.data);
        break;
      case 'shipment.created':
        await handleShipmentCreated(payload.data);
        break;
      case 'vehicle.tracked':
        await handleVehicleTracked(payload.data);
        break;
      default:
        console.log('[Webhook] Unhandled event type:', payload.type);
    }

    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully',
      receivedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[API Webhooks] Error:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}

// Webhook event handlers
async function handlePaymentCompleted(data: Record<string, any>) {
  console.log('[Webhook Handler] Payment completed:', {
    amount: data.amount,
    currency: data.currency || 'PKR',
    orderId: data.order_id,
    customerEmail: data.customer_email,
  });
  
  // In production:
  // - Update order status in database
  // - Notify Finance Agent
  // - Send confirmation SMS/email
}

async function handlePaymentFailed(data: Record<string, any>) {
  console.log('[Webhook Handler] Payment failed:', {
    reason: data.failure_reason,
    orderId: data.order_id,
  });
  
  // In production:
  // - Update order status
  // - Notify CRM Agent
  // - Trigger retry logic
}

async function handleSmsDelivered(data: Record<string, any>) {
  console.log('[Webhook Handler] SMS delivered:', {
    messageId: data.message_id,
    phoneNumber: data.phone_number,
    status: data.status,
  });
  
  // In production:
  // - Update message delivery status
  // - Track SMS metrics
}

async function handleShipmentCreated(data: Record<string, any>) {
  console.log('[Webhook Handler] Shipment created:', {
    shipmentId: data.shipment_id,
    origin: data.origin,
    destination: data.destination,
    weight: data.weight,
  });
  
  // In production:
  // - Create shipment record
  // - Assign to Dispatcher Agent
  // - Calculate route
}

async function handleVehicleTracked(data: Record<string, any>) {
  console.log('[Webhook Handler] Vehicle tracked:', {
    vehicleId: data.vehicle_id,
    location: data.location,
    lat: data.lat,
    lng: data.lng,
    speed: data.speed,
  });
  
  // In production:
  // - Update vehicle location in real-time
  // - Notify Fleet Agent if anomaly detected
}
