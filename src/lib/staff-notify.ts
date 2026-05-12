/** Événement DOM + BroadcastChannel pour alerter le dock « équipe » (nouvelle activité site). */
export const STAFF_NOTIFY_EVENT = "archanges-staff-notify";

const CHANNEL = "archanges-staff";

export function notifyStaffActivity(detail: { source?: string } = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(STAFF_NOTIFY_EVENT, { detail }));
  try {
    const bc = new BroadcastChannel(CHANNEL);
    bc.postMessage({ ...detail, at: Date.now() });
    bc.close();
  } catch {
    /* navigateur sans BroadcastChannel */
  }
}
