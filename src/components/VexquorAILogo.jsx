export default function VexquorAILogo({ variant = 'horizontal', className = '' }) {
  const sizeClass = variant === 'icon'
    ? 'h-12 w-24 sm:h-14 sm:w-28'
    : 'h-12 w-44 sm:h-14 sm:w-52';

  return (
    <span className={`inline-flex items-center ${className}`} aria-label="VexquorAI">
      <img
        src="/vexquorai-logo.png"
        alt="VexquorAI"
        className={`${sizeClass} object-contain drop-shadow-[0_0_18px_rgba(34,211,238,0.35)]`}
      />
    </span>
  );
}
