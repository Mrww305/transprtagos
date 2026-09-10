# PakTransit OS API Documentation

## Base URL

- **Production**: `https://paktransit-os.vercel.app/api`
- **Preview**: `https://paktransit-os-git-[branch]-vercel-org.vercel.app/api`
- **Local**: `http://localhost:3000/api`

## Authentication

Most endpoints require authentication via NextAuth.js session token.

```bash
Authorization: Bearer <nextauth-session-token>
```

## Endpoints

---

### GET `/api/agents`

**Runtime**: Serverless (Node.js)  
**Description**: Retrieve status of all 6 autonomous agents

**Response**:
```json
{
  "success": true,
  "data": {
    "dispatcher": {
      "status": "active",
      "activeShipments": 5,
      "lastUpdate": "2024-01-15T10:30:00Z"
    },
    "fleet": {
      "status": "active",
      "totalVehicles": 12,
      "availableVehicles": 8,
      "lastUpdate": "2024-01-15T10:29:45Z"
    },
    "maintenance": {
      "status": "active",
      "pendingRepairs": 2,
      "scheduledMaintenance": 3,
      "lastUpdate": "2024-01-15T10:28:00Z"
    },
    "crm": {
      "status": "active",
      "activeCustomers": 45,
      "pendingInquiries": 7,
      "lastUpdate": "2024-01-15T10:27:30Z"
    },
    "finance": {
      "status": "active",
      "todayRevenue": "₨125,450",
      "pendingInvoices": 12,
      "lastUpdate": "2024-01-15T10:26:00Z"
    },
    "sales": {
      "status": "active",
      "activeLeads": 23,
      "conversionsToday": 4,
      "lastUpdate": "2024-01-15T10:25:00Z"
    }
  }
}
```

---

### POST `/api/agents/dispatch`

**Runtime**: Serverless (Node.js)  
**Description**: Instruct Dispatcher Agent to assign a shipment

**Request Body**:
```json
{
  "shipmentId": "SHP-2024-001",
  "origin": "Lahore",
  "destination": "Karachi",
  "weight": 5000,
  "priority": "high"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "assignmentId": "ASG-2024-0156",
    "vehicleId": "VEH-007",
    "driverName": "محمد علی",
    "estimatedDeparture": "2024-01-15T14:00:00Z",
    "route": ["Lahore", "Multan", "Sukkur", "Hyderabad", "Karachi"],
    "estimatedArrival": "2024-01-16T08:00:00Z"
  }
}
```

---

### GET `/api/vehicles`

**Runtime**: Serverless (Node.js)  
**Description**: Get real-time status of all fleet vehicles

**Query Parameters**:
- `status` (optional): `available` | `in-transit` | `maintenance` | `offline`
- `location` (optional): City name filter

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "VEH-001",
      "registration": "LEA-1234",
      "type": "Truck",
      "capacity": "10 tons",
      "status": "in-transit",
      "currentLocation": {
        "city": "Multan",
        "lat": 30.1575,
        "lng": 71.5249
      },
      "destination": "Karachi",
      "driver": {
        "name": "احمد حسن",
        "phone": "+92-300-1234567",
        "urduVoiceEnabled": true
      },
      "shipment": "SHP-2024-001",
      "progress": 45
    }
  ]
}
```

---

### POST `/api/leads`

**Runtime**: Serverless (Node.js)  
**Description**: Create a new lead in the CRM pipeline

**Request Body**:
```json
{
  "companyName": "Al-Rehman Traders",
  "contactPerson": "عبدالرحمن خان",
  "phone": "+92-321-7654321",
  "email": "contact@alrehman.pk",
  "source": "website",
  "requirement": "Regular Lahore-Karachi shipments, 3x per week",
  "estimatedValue": 150000
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "leadId": "LEAD-2024-0089",
    "stage": "new",
    "assignedTo": "Sales Agent",
    "createdAt": "2024-01-15T11:00:00Z",
    "nextFollowUp": "2024-01-16T10:00:00Z"
  }
}
```

---

### GET `/api/leads`

**Runtime**: Serverless (Node.js)  
**Description**: Retrieve leads from CRM pipeline

**Query Parameters**:
- `stage` (optional): `new` | `contacted` | `qualified` | `proposal` | `negotiation` | `closed-won` | `closed-lost`
- `assignedTo` (optional): User ID or agent name

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "leadId": "LEAD-2024-0089",
      "companyName": "Al-Rehman Traders",
      "contactPerson": "عبدالرحمن خان",
      "phone": "+92-321-7654321",
      "stage": "qualified",
      "estimatedValue": "₨150,000",
      "probability": 75,
      "lastContact": "2024-01-14T15:30:00Z",
      "nextFollowUp": "2024-01-16T10:00:00Z"
    }
  ],
  "meta": {
    "total": 23,
    "byStage": {
      "new": 5,
      "contacted": 4,
      "qualified": 6,
      "proposal": 3,
      "negotiation": 3,
      "closed-won": 2,
      "closed-lost": 0
    }
  }
}
```

---

### PATCH `/api/leads/:leadId`

**Runtime**: Serverless (Node.js)  
**Description**: Update lead stage or details

**Request Body**:
```json
{
  "stage": "proposal",
  "notes": "Sent pricing for 3x weekly Lahore-Karachi route",
  "nextFollowUp": "2024-01-18T10:00:00Z"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "leadId": "LEAD-2024-0089",
    "stage": "proposal",
    "updatedAt": "2024-01-15T11:30:00Z",
    "updatedBy": "user-123"
  }
}
```

---

### GET `/api/nearest-hub`

**Runtime**: Edge  
**Description**: Find nearest distribution hub based on user location

**Query Parameters**:
- `lat` (required): Latitude
- `lng` (required): Longitude

**Response**:
```json
{
  "success": true,
  "data": {
    "nearestHub": {
      "id": "HUB-LHR-01",
      "name": "Lahore Distribution Center",
      "address": "Bedian Road, Lahore",
      "phone": "+92-42-111-222-333",
      "distance": 3.2,
      "distanceUnit": "km",
      "eta": "12 mins"
    },
    "alternativeHubs": [
      {
        "name": "Lahore Canal Hub",
        "distance": 5.8,
        "distanceUnit": "km"
      }
    ]
  }
}
```

---

### POST `/api/webhooks`

**Runtime**: Serverless (Node.js)  
**Description**: Handle incoming webhooks from external services

**Headers**:
```
X-Webhook-Signature: sha256=<hmac-signature>
X-Webhook-Event: <event-name>
```

**Supported Events**:
- `payment.received`: Update Finance Agent
- `shipment.delivered`: Notify CRM and Dispatcher
- `vehicle.maintenance_due`: Alert Maintenance Agent
- `lead.source_updated`: Sync with Sales Agent

**Request Body** (example for payment):
```json
{
  "eventId": "evt_123456",
  "type": "payment.received",
  "data": {
    "shipmentId": "SHP-2024-001",
    "amount": 45000,
    "currency": "PKR",
    "method": "jazz-cash",
    "timestamp": "2024-01-15T12:00:00Z"
  }
}
```

**Response**:
```json
{
  "success": true,
  "message": "Webhook processed",
  "processedBy": "Finance Agent"
}
```

---

### GET `/api/rate-limit-check`

**Runtime**: Edge  
**Description**: Check current rate limit status for the requesting IP

**Response**:
```json
{
  "success": true,
  "data": {
    "ip": "203.124.56.78",
    "limit": 100,
    "remaining": 87,
    "resetAt": "2024-01-15T13:00:00Z",
    "windowMs": 3600000
  }
}
```

---

### POST `/api/ab-test`

**Runtime**: Edge  
**Description**: Assign user to an A/B test variant

**Request Body**:
```json
{
  "testId": "driver-ui-v2",
  "userId": "user-123"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "testId": "driver-ui-v2",
    "variant": "B",
    "variantName": "Urdu First Layout",
    "assignedAt": "2024-01-15T12:30:00Z"
  }
}
```

---

### POST `/api/ab-track`

**Runtime**: Serverless (Node.js)  
**Description**: Track exposure and conversion for A/B tests

**Request Body**:
```json
{
  "testId": "driver-ui-v2",
  "userId": "user-123",
  "variant": "B",
  "event": "conversion",
  "metadata": {
    "action": "completed_shipment_booking",
    "value": 25000
  }
}
```

**Response**:
```json
{
  "success": true,
  "message": "Event tracked"
}
```

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request body",
    "details": [
      {
        "field": "phone",
        "message": "Phone number must be in +92-XXX-XXXXXXX format"
      }
    ]
  },
  "timestamp": "2024-01-15T12:00:00Z"
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Zod validation failed |
| `UNAUTHORIZED` | 401 | Missing or invalid auth token |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

---

## Rate Limiting

- **Default**: 100 requests per hour per IP
- **Authenticated**: 500 requests per hour per user
- **Edge endpoints**: 1000 requests per minute per IP

Rate limit headers included in all responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1705320000
```

---

## Webhook Security

All webhooks must include an HMAC signature:

```javascript
const crypto = require('crypto');

function verifyWebhook(body, signature, secret) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(body))
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(`sha256=${expected}`)
  );
}
```

---

## Pakistan-Specific Formatting

### Currency
All monetary values use Pakistani Rupee format:
- Symbol: `₨` or `PKR`
- Format: `₨125,450` or `PKR 125,450`
- No decimal places for whole amounts

### Phone Numbers
- Format: `+92-XXX-XXXXXXX`
- Example: `+92-300-1234567`

### Cities
Supported cities (10):
- Lahore
- Multan
- Sukkur
- Hyderabad
- Karachi
- Islamabad
- Rawalpindi
- Peshawar
- Quetta
- Faisalabad

### Timezone
All timestamps use Pakistan Standard Time (PKT, UTC+5).

---

## SDK Usage Example

```typescript
// Install: npm install paktransit-sdk

import { PakTransitClient } from 'paktransit-sdk';

const client = new PakTransitClient({
  apiKey: process.env.PAKTRANSIT_API_KEY,
  baseUrl: 'https://paktransit-os.vercel.app/api'
});

// Get fleet status
const fleet = await client.vehicles.list({ status: 'in-transit' });

// Create a lead
const lead = await client.leads.create({
  companyName: 'New Customer Ltd',
  contactPerson: 'Ali Khan',
  phone: '+92-321-7654321',
  requirement: 'Weekly shipments'
});

// Move lead through pipeline
await client.leads.update(lead.leadId, {
  stage: 'proposal',
  notes: 'Pricing sent'
});
```
