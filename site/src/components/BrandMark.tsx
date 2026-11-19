export function BrandMark({ className = "brand-mark" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M10 56 32 8l22 48"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="square"
      />
      <path
        d="M20.5 43h23"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="square"
      />
      <path d="M32 18.5 38.5 26.5 32 34.5 25.5 26.5Z" fill="currentColor" />
    </svg>
  );
}

export function BrandLockup({ ariaLabel }: { ariaLabel: string }) {
  return (
    <span className="brand" aria-label={ariaLabel}>
      <BrandMark />
      <span>
        <span className="brand-word">ALMAS</span>
        <span className="brand-place">AARAU</span>
      </span>
    </span>
  );
}
