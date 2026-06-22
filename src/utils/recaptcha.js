import config from '../config';

const API_BASE = config.apiUrl.replace(/\/$/, '');

export async function verifyRecaptchaToken(token, action) {
  if (config.recaptchaBypass) {
    return {
      success: true,
      score: 1,
      reasons: ['VITE_RECAPTCHA_BYPASS_ENABLED'],
    };
  }

  const response = await fetch(`${API_BASE}/recaptcha/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, action }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'reCAPTCHA verification failed.');
  }

  return data;
}
