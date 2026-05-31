import { useId } from 'react';

function CubeMark({ id, className = 'h-12 w-[4.75rem]' }) {
  const glow = `${id}-glow`;
  const chrome = `${id}-chrome`;
  const blue = `${id}-blue`;
  const deep = `${id}-deep`;
  const ring = `${id}-ring`;
  const cyan = `${id}-cyan`;

  return (
    <svg className={className} viewBox="0 0 148 96" role="img" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id={glow} x="-40%" y="-45%" width="180%" height="190%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="4.5" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.06 0 0 0 0 0.72 0 0 0 0 1 0 0 0 0.62 0" />
          <feBlend in="SourceGraphic" mode="screen" />
        </filter>
        <linearGradient id={chrome} x1="47" y1="13" x2="98" y2="76" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="0.18" stopColor="#dce8f4" />
          <stop offset="0.46" stopColor="#74879c" />
          <stop offset="0.66" stopColor="#f8fcff" />
          <stop offset="1" stopColor="#7f8fa2" />
        </linearGradient>
        <linearGradient id={blue} x1="75" y1="31" x2="105" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#eef8ff" />
          <stop offset="0.38" stopColor="#415468" />
          <stop offset="1" stopColor="#020916" />
        </linearGradient>
        <linearGradient id={deep} x1="42" y1="35" x2="78" y2="83" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d4e4f1" />
          <stop offset="0.25" stopColor="#1b3042" />
          <stop offset="1" stopColor="#020711" />
        </linearGradient>
        <linearGradient id={ring} x1="18" y1="37" x2="132" y2="62" gradientUnits="userSpaceOnUse">
          <stop stopColor="#07111c" />
          <stop offset="0.18" stopColor="#edf7ff" />
          <stop offset="0.48" stopColor="#405365" />
          <stop offset="0.78" stopColor="#ffffff" />
          <stop offset="1" stopColor="#07111c" />
        </linearGradient>
        <linearGradient id={cyan} x1="39" y1="67" x2="109" y2="67" gradientUnits="userSpaceOnUse">
          <stop stopColor="#04c8ff" stopOpacity="0" />
          <stop offset="0.16" stopColor="#46e8ff" />
          <stop offset="0.5" stopColor="#b8fbff" />
          <stop offset="0.84" stopColor="#37ddff" />
          <stop offset="1" stopColor="#04c8ff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g filter={`url(#${glow})`}>
        <ellipse cx="74" cy="49.5" rx="58" ry="17.5" stroke={`url(#${ring})`} strokeWidth="4" opacity="0.92" />
        <path d="M35 64.5c9.4 11.6 68.8 11.6 78 0" stroke={`url(#${cyan})`} strokeWidth="5" strokeLinecap="round" />
        <path d="M41.5 65.5c13.6 6.8 51.8 7.2 66 0" stroke="#05d9ff" strokeWidth="1.3" strokeLinecap="round" opacity="0.9" />
        <path d="M74 19 101 34.7v31.5L74 82 47 66.2V34.7L74 19Z" fill="#010712" />
        <path d="M74 19 101 34.7 74 50.5 47 34.7 74 19Z" fill={`url(#${chrome})`} />
        <path d="M101 34.7v31.5L74 82V50.5l27-15.8Z" fill={`url(#${blue})`} />
        <path d="M47 34.7v31.5L74 82V50.5L47 34.7Z" fill={`url(#${deep})`} />
        <path d="M74 19v31.5M47 34.7l27 15.8 27-15.8M74 50.5V82" stroke="#eaf8ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
        <path d="M55 39.4 74 50.4 93 39.4" stroke="#ffffff" strokeWidth="2.1" strokeLinecap="round" opacity="0.82" />
        <path d="M74 22.5 98.5 36.7" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.68" />
        <path d="M100.5 35.4 74 51.2" stroke="#0b0f17" strokeWidth="4.2" strokeLinecap="round" opacity="0.92" />
        <path d="M47.8 35.4 74 51.2" stroke="#0b0f17" strokeWidth="3.4" strokeLinecap="round" opacity="0.82" />
      </g>
    </svg>
  );
}

function WordmarkText({ compact = false }) {
  return (
    <span className="flex items-baseline leading-none">
      <span className="bg-gradient-to-b from-white via-slate-300 to-slate-700 bg-clip-text font-black uppercase tracking-[0.32em] text-transparent drop-shadow-[0_0_10px_rgba(226,241,255,0.3)]">
        KREONIX
      </span>
      {!compact && (
        <span className="ml-1 bg-gradient-to-b from-cyan-100 via-slate-300 to-slate-600 bg-clip-text font-black uppercase tracking-[0.22em] text-transparent drop-shadow-[0_0_10px_rgba(34,211,238,0.35)]">
          .IO
        </span>
      )}
    </span>
  );
}

export default function KreonixLogo({ variant = 'horizontal', className = '' }) {
  const reactId = useId().replace(/:/g, '');

  if (variant === 'icon') {
    return (
      <span className={`inline-flex items-center ${className}`} aria-label="kreonix.io">
        <CubeMark id={`kreonix-${reactId}`} className="h-11 w-[4.75rem] sm:h-12 sm:w-20" />
      </span>
    );
  }

  if (variant === 'integrated-k') {
    return (
      <span className={`inline-flex items-center gap-2 ${className}`} aria-label="kreonix.io">
        <span className="relative inline-flex h-10 w-12 items-center justify-center">
          <span className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-full bg-gradient-to-b from-white via-slate-300 to-slate-700 shadow-[0_0_18px_rgba(34,211,238,0.35)]" />
          <CubeMark id={`kreonix-k-${reactId}`} className="absolute -right-5 h-11 w-[4.75rem]" />
        </span>
        <span className="bg-gradient-to-b from-white via-slate-300 to-slate-700 bg-clip-text font-black uppercase tracking-[0.28em] text-transparent">REONIX</span>
        <span className="-ml-1 bg-gradient-to-b from-cyan-100 via-slate-300 to-slate-600 bg-clip-text font-black uppercase tracking-[0.2em] text-transparent">.IO</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} aria-label="kreonix.io">
      <CubeMark id={`kreonix-${reactId}`} className="h-11 w-[4.75rem] sm:h-12 sm:w-20" />
      <WordmarkText />
    </span>
  );
}
