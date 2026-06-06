type GtagFn = (command: 'event', eventName: string, params?: Record<string, unknown>) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
  }
}

function sendEvent(name: string, params?: Record<string, unknown>): void {
  if (process.env.NODE_ENV === 'production') {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', name, params);
    }
  } else {
    console.log('[analytics]', name, params);
  }
}

export function trackWhatsappClick(): void {
  sendEvent('whatsapp_click');
}

export function trackCallClick(): void {
  sendEvent('call_click');
}

export function trackFormSubmit(): void {
  sendEvent('form_submit');
}

export function trackBookingOpen(): void {
  sendEvent('booking_open');
}
