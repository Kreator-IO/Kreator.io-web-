import { useEffect, useState } from 'react';
import { RefreshCw, ShieldCheck } from 'lucide-react';
import config from '../config';

const isLocalhost = typeof window !== 'undefined'
  && ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname);

export default function GoogleRecaptchaGate({ action = 'submit', onToken }) {
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isLocalhost || window.grecaptcha?.enterprise) return undefined;

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${config.recaptchaSiteKey}`;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  useEffect(() => {
    const handleToken = (event) => {
      if (!event.detail) return;
      setIsVerified(true);
      setMessage('Human verified.');
      onToken?.(event.detail);
    };

    window.addEventListener('recaptcha-token', handleToken);
    return () => window.removeEventListener('recaptcha-token', handleToken);
  }, [onToken]);

  const verify = () => {
    setIsVerifying(true);
    setMessage('');

    if (isLocalhost) {
      setIsVerified(true);
      setIsVerifying(false);
      setMessage('Development verification active.');
      onToken?.(config.recaptchaDevToken);
      return;
    }

    if (!window.grecaptcha?.enterprise) {
      setIsVerifying(false);
      setMessage('reCAPTCHA is still loading. Try again.');
      return;
    }

    window.grecaptcha.enterprise.ready(async () => {
      try {
        const token = await window.grecaptcha.enterprise.execute(config.recaptchaSiteKey, { action });
        setIsVerified(true);
        setMessage('Human verified.');
        onToken?.(token);
      } catch (error) {
        setIsVerified(false);
        setMessage('reCAPTCHA failed. Please try again.');
        onToken?.('');
      } finally {
        setIsVerifying(false);
      }
    });
  };

  const reset = () => {
    setIsVerified(false);
    setMessage('');
    onToken?.('');
  };

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-[1fr_auto] gap-3">
        <button
          type="button"
          className={`g-recaptcha flex min-h-[3.6rem] items-center gap-3 rounded-xl border px-4 text-left transition ${
            isVerified
              ? 'border-emerald-400/60 bg-emerald-500/10 text-emerald-200'
              : 'border-white/15 bg-slate-950/40 text-slate-200 hover:border-cyan-300/60'
          }`}
          data-sitekey={config.recaptchaSiteKey}
          data-callback="onSubmit"
          data-action={action}
          onClick={verify}
          disabled={isVerifying}
        >
          <ShieldCheck size={20} />
          <span className="text-sm font-semibold">
            {isVerifying ? 'Checking...' : isVerified ? 'Human verified' : 'Verify with reCAPTCHA'}
          </span>
        </button>
        <button
          type="button"
          onClick={reset}
          className="flex h-[3.6rem] w-[3.6rem] items-center justify-center rounded-xl border border-white/15 bg-slate-950/40 text-slate-200 hover:border-cyan-300/60"
          aria-label="Reset reCAPTCHA"
        >
          <RefreshCw size={19} />
        </button>
      </div>
      <p className={`min-h-[1.25rem] text-xs ${isVerified ? 'text-emerald-300' : 'text-red-300'}`}>
        {message}
      </p>
    </div>
  );
}
