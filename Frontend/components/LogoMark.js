// The signature mark: a plug meeting a socket — the literal action this app
// exists to help with. Kept as simple geometric strokes, not a mascot.
export default function LogoMark({ size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="24" height="24" rx="6" fill="#0B7A4B" />
      <path
        d="M12 12V10M20 12V10"
        stroke="#F5F6F2"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M11 12H21V15C21 18 18.5 20 16 20C13.5 20 11 18 11 15V12Z"
        stroke="#F5F6F2"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M16 20V23" stroke="#F2A93B" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
