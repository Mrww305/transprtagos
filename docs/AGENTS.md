# PakTransit OS Agent System

## Overview

PakTransit OS features 6 autonomous AI agents that work together to manage Pakistan's transport logistics. Each agent has specific responsibilities but communicates with others to achieve optimal fleet operations.

## Agent Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Agent Communication Layer                 │
│                     (Vercel KV + Events)                     │
└─────────────────────────────────────────────────────────────┘
         ▲              ▲              ▲              ▲
         │              │              │              │
    ┌────┴────┐   ┌────┴────┐   ┌────┴────┐   ┌────┴────┐
    │Dispatcher│   │  Fleet  │   │Maintenance│  │   CRM   │
    │  Agent   │◄──┤  Agent  │◄──│   Agent   │◄─┤  Agent  │
    └────┬─────┘   └────┬────┘   └────┬──────┘  └────┬────┘
         │              │              │              │
    ┌────┴──────────────┴──────────────┴──────────────┴────┐
    │                  Shared Event Bus                     │
    └────┬──────────────┬──────────────┬──────────────┬────┘
         │              │              │              │
    ┌────┴─────┐   ┌────┴────┐   ┌────┴──────┐  ┌────┴────┐
    │ Finance  │   │ Sales   │   │  External │  │  User   │
    │  Agent   │   │  Agent  │   │  Systems  │  │ Inputs  │
    └──────────┘   └─────────┘   └───────────┘  └─────────┘
```

## The Six Agents

### 1. Dispatcher Agent 🚚

**File**: `packages/agents-core/src/dispatcher.ts`

**Responsibilities**:
- Assign shipments to available vehicles
- Optimize routes across 10 Pakistani cities
- Balance load distribution among drivers
- Handle priority shipments (express, fragile, hazardous)
- Coordinate with Fleet Agent for vehicle availability
- Notify Maintenance Agent of route-specific wear concerns

**State Machine**:
```
IDLE → EVALUATING → ASSIGNING → CONFIRMED → IN_PROGRESS → COMPLETED
                         ↓
                   REASSIGNING (if vehicle unavailable)
```

**Key Algorithms**:
- Route optimization (Lahore → Multan → Sukkur → Hyderabad → Karachi)
- Load balancing based on vehicle capacity
- Priority queue for urgent shipments
- Driver rest time compliance

**Events Emitted**:
- `shipment.assigned`
- `route.optimized`
- `driver.notified`
- `reassignment.required`

**Events Listened**:
- `vehicle.available`
- `vehicle.unavailable`
- `shipment.created`
- `maintenance.scheduled`

---

### 2. Fleet Agent 🚛

**File**: `packages/agents-core/src/fleet.ts`

**Responsibilities**:
- Track 12 animated vehicles in real-time
- Monitor driver status and location
- Report vehicle availability to Dispatcher
- Alert Maintenance Agent of issues
- Update CRM Agent on delivery progress
- Handle offline vehicles gracefully

**State Machine**:
```
AVAILABLE → IN_TRANSIT → DELIVERING → RETURNING → AVAILABLE
               ↓              ↓
          OFFLINE       MAINTENANCE
```

**Tracking Features**:
- GPS coordinates updated every 30 seconds
- Progress percentage on current route
- Estimated arrival time calculations
- Fuel level monitoring (simulated)
- Driver behavior scoring

**Events Emitted**:
- `vehicle.location_updated`
- `vehicle.arrived`
- `vehicle.departed`
- `vehicle.issue_detected`
- `driver.checked_in`

**Events Listened**:
- `shipment.assigned`
- `maintenance.completed`
- `route.changed`

---

### 3. Maintenance Agent 🔧

**File**: `packages/agents-core/src/maintenance.ts`

**Responsibilities**:
- Predictive maintenance scheduling
- Track mileage-based service intervals
- Monitor vehicle health reports from drivers
- Schedule repairs during low-demand periods
- Alert Fleet Agent when vehicles are unavailable
- Coordinate with Finance Agent for budget approval

**State Machine**:
```
MONITORING → ALERT_TRIGGERED → SCHEDULED → IN_REPAIR → COMPLETED
                                      ↓
                                 EMERGENCY
```

**Maintenance Triggers**:
- Mileage threshold (every 5,000 km)
- Time-based (every 3 months)
- Driver-reported issues
- Post-long-trip inspection (Karachi → Lahore)
- Seasonal preparation (monsoon, winter)

**Events Emitted**:
- `maintenance.required`
- `maintenance.scheduled`
- `maintenance.completed`
- `vehicle.unavailable`

**Events Listened**:
- `vehicle.mileage_updated`
- `driver.issue_reported`
- `trip.completed`

---

### 4. CRM Agent 📞

**File**: `packages/agents-core/src/crm.ts`

**Responsibilities**:
- Manage customer relationships
- Track shipment history per customer
- Handle customer inquiries and complaints
- Coordinate with Sales Agent on lead conversion
- Update customers on delivery status
- Generate satisfaction reports

**State Machine**:
```
INQUIRY → QUOTED → BOOKED → IN_TRANSIT → DELIVERED → FOLLOW_UP
                                   ↓
                              ISSUE_REPORTED
```

**Customer Touchpoints**:
- Initial inquiry response (< 1 hour)
- Quote generation
- Booking confirmation
- Real-time tracking updates
- Delivery confirmation
- Post-delivery feedback

**Events Emitted**:
- `customer.inquiry_received`
- `quote.generated`
- `booking.confirmed`
- `delivery.completed`
- `feedback.requested`

**Events Listened**:
- `lead.converted`
- `shipment.dispatched`
- `vehicle.arrived`

---

### 5. Finance Agent 💰

**File**: `packages/agents-core/src/finance.ts`

**Responsibilities**:
- Calculate fares in Pakistani Rupee (₨/PKR)
- Track revenue, expenses, profitability
- Generate invoices and receipts
- Monitor payment collection
- Coordinate with Maintenance Agent on repair budgets
- Report daily/weekly/monthly financials

**State Machine**:
```
QUOTE_SENT → BOOKING_CONFIRMED → INVOICE_GENERATED → PAYMENT_PENDING → PAID
                                                              ↓
                                                         OVERDUE
```

**Financial Calculations**:
- Base fare by distance (PKR/km)
- Weight surcharges
- Priority fees (express delivery)
- Return trip discounts
- Fuel adjustment factors
- Driver commissions

**Events Emitted**:
- `invoice.generated`
- `payment.received`
- `payment.overdue`
- `revenue.updated`
- `budget.approved`

**Events Listened**:
- `booking.confirmed`
- `delivery.completed`
- `maintenance.cost_estimate`

---

### 6. Sales/GTM Agent 📈

**File**: `packages/agents-core/src/sales.ts`

**Responsibilities**:
- Manage lead generation pipeline (Kanban board)
- Convert leads to customers
- Track marketing campaign effectiveness
- Coordinate with CRM Agent on handoffs
- Identify upsell opportunities
- Analyze market trends in Pakistan logistics

**State Machine**:
```
NEW_LEAD → CONTACTED → QUALIFIED → PROPOSAL → NEGOTIATION → CLOSED_WON
                                                       ↓
                                                 CLOSED_LOST
```

**Pipeline Stages**:
1. **New Lead**: Initial contact (website, referral, cold call)
2. **Contacted**: First outreach completed
3. **Qualified**: Budget, authority, need, timeline confirmed
4. **Proposal**: Pricing sent for specific routes
5. **Negotiation**: Terms discussion
6. **Closed Won**: Contract signed
7. **Closed Lost**: Lost to competitor or no decision

**Events Emitted**:
- `lead.created`
- `lead.stage_changed`
- `lead.converted`
- `campaign.performance_updated`

**Events Listened**:
- `customer.feedback_received`
- `market.trend_detected`

---

## Inter-Agent Communication

### Communication Channels

1. **Vercel KV (Redis) Pub/Sub**
   - Real-time event broadcasting
   - Low-latency agent coordination
   - Ephemeral state sharing

2. **Event Bus (In-Memory + Persistent)**
   - Structured event emission
   - Event sourcing for audit trails
   - Replay capability for debugging

3. **API Routes**
   - RESTful state queries
   - Cross-agent HTTP calls
   - External system integration

### Event Format

```typescript
interface AgentEvent {
  id: string;
  type: string;
  sourceAgent: 'dispatcher' | 'fleet' | 'maintenance' | 'crm' | 'finance' | 'sales';
  timestamp: string;
  payload: Record<string, unknown>;
  correlationId?: string; // For tracing related events
}
```

### Example Event Flow

```
1. Sales Agent: lead.converted
   → CRM Agent creates customer record
   
2. CRM Agent: customer.inquiry_received
   → Dispatcher Agent evaluates capacity
   
3. Dispatcher Agent: shipment.assigned
   → Fleet Agent updates vehicle status
   → Driver notified (Urdu voice call)
   
4. Fleet Agent: vehicle.departed
   → CRM Agent sends tracking link to customer
   
5. Fleet Agent: vehicle.arrived
   → CRM Agent marks delivery complete
   → Finance Agent generates invoice
   
6. Finance Agent: payment.received
   → Sales Agent logs revenue for campaign ROI
```

---

## Agent State Persistence

### Short-Term State (Vercel KV)
- Current vehicle locations
- Active shipment assignments
- Real-time availability flags
- Rate limiting counters

### Long-Term State (Vercel Postgres)
- Customer records
- Shipment history
- Maintenance logs
- Financial transactions
- Lead pipeline data

### Ephemeral State (Memory)
- Current event batch being processed
- Temporary calculation results
- In-flight API responses

---

## Failure Handling

### Agent Recovery Strategy

| Failure Type | Recovery Action |
|-------------|-----------------|
| Agent timeout | Retry with exponential backoff (3 attempts) |
| Database unavailable | Queue events, retry connection |
| Invalid event schema | Log error, skip event, alert developer |
| Circular dependency | Detect via correlationId, break cycle |
| Conflicting states | Last-write-wins with timestamp |

### Dead Letter Queue

Failed events are stored in a dead letter queue for:
- Manual inspection
- Automated retry after fix deployment
- Audit trail compliance

---

## Scaling Considerations

### Horizontal Scaling

Each agent can scale independently:
- **Dispatcher**: Scale during peak booking hours (9 AM - 6 PM PKT)
- **Fleet**: Constant scaling based on active vehicles
- **Maintenance**: Low scale, event-driven
- **CRM**: Scale during customer service hours
- **Finance**: End-of-day/month scaling for reports
- **Sales**: Business hours scaling

### Edge vs Serverless

| Agent Component | Runtime | Reason |
|----------------|---------|--------|
| Geolocation routing | Edge | Low latency for drivers |
| Rate limiting | Edge | Per-request enforcement |
| Event processing | Serverless | Complex logic, DB access |
| Invoice generation | Serverless | PDF generation needs Node.js |
| Lead scoring | Serverless | ML model inference |

---

## Monitoring & Observability

### Key Metrics per Agent

**Dispatcher**:
- Shipments assigned per hour
- Average assignment latency
- Reassignment rate

**Fleet**:
- Location update frequency
- On-time delivery percentage
- Vehicle utilization rate

**Maintenance**:
- Predictive accuracy (issues caught early)
- Average repair time
- Vehicle downtime reduction

**CRM**:
- Customer response time
- Satisfaction score trend
- Inquiry resolution rate

**Finance**:
- Invoice generation time
- Payment collection rate
- Revenue recognition accuracy

**Sales**:
- Lead conversion rate
- Pipeline velocity
- Campaign ROI

### Alerting Rules

- Agent unresponsive for > 5 minutes
- Event queue depth > 1000
- Database connection failures > 10/minute
- Circular event detection
- Revenue calculation errors

---

## Future Enhancements

### LLM Integration
- Natural language queries: "Show me all delayed shipments"
- Automated customer support responses
- Intelligent lead scoring based on conversation analysis

### Advanced Features
- Multi-agent negotiation for complex shipments
- Reinforcement learning for route optimization
- Predictive demand forecasting
- Dynamic pricing based on market conditions

### Pakistan-Specific
- Urdu NLP for driver voice commands
- WhatsApp integration for customer updates
- Jazz Cash/Easy Paisa payment automation
- Regional holiday-aware scheduling
