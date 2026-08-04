/**
 * API Service for ResourceHub backend endpoints
 */

export interface AIGenerateRequest {
  moduleType: 'resource' | 'article' | 'seo' | 'email' | 'social' | 'product' | 'prompt' | 'grammar';
  prompt: string;
  systemInstruction?: string;
}

export interface AIGenerateResponse {
  success: boolean;
  content?: string;
  model?: string;
  error?: string;
}

export async function generateAIContent(params: AIGenerateRequest): Promise<AIGenerateResponse> {
  try {
    const response = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `Server returned ${response.status}`);
    }

    return await response.json();
  } catch (err: any) {
    console.error('API call failed:', err);
    return {
      success: false,
      error: err.message || 'Failed to communicate with AI server',
    };
  }
}

export async function runSEOAudit(data: { title: string; metaDescription: string; category?: string; textContent?: string }) {
  try {
    const res = await fetch('/api/ai/optimize-seo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function subscribeNewsletter(email: string, source: string = 'footer') {
  try {
    const res = await fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source }),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function trackAnalyticsEvent(eventType: string, itemId?: string, itemTitle?: string) {
  try {
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventType, itemId, itemTitle }),
    }).catch(() => {});
  } catch (err) {
    // Ignore silent analytics errors
  }
}
