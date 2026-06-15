import { useEffect, useState } from 'react';
import { RefreshCw, ShieldCheck } from 'lucide-react';

const RECAPTCHA_SITE_KEY = '6LdiYyAtAAAAABf10ux3lNcU-rXwIAITKy160RNC';

export default function GoogleRecaptchaGate({ action = 'submit', onToken }) {
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [message, setMessage] = useState('');

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

    if (!window.grecaptcha?.enterprise) {
      setIsVerifying(false);
      setMessage('reCAPTCHA is still loading. Try again.');
      return;
    }

    window.grecaptcha.enterprise.ready(async () => {
      try {
        const token = await window.grecaptcha.enterprise.execute(RECAPTCHA_SITE_KEY, { action });
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
          data-sitekey={RECAPTCHA_SITE_KEY}
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
