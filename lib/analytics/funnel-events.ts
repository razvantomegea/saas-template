/**
 * No-op funnel analytics stub. The template ships without a funnel-events
 * table or admin funnel dashboard — swap this for a real implementation
 * (e.g. write to a `funnel_events` table) if you add product analytics.
 */
export type FunnelEventName = "support_ticket_created" | (string & {});

export type RecordFunnelEventParams = {
  event: FunnelEventName;
  userId?: string | null;
  metadata?: Record<string, unknown>;
};

export async function recordFunnelEvent(
  _params: RecordFunnelEventParams,
): Promise<void> {
  void _params;
  // Intentionally a no-op — see module comment above.
}
