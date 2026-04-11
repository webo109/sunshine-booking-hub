export const SunshineLogo = ({ className = "h-10 w-auto" }: { className?: string }) => (
  <svg viewBox="0 0 200 60" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Sun */}
    <circle cx="30" cy="25" r="10" fill="#FFB800" />
    {/* Sun rays */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <line
        key={angle}
        x1={30 + 13 * Math.cos((angle * Math.PI) / 180)}
        y1={25 + 13 * Math.sin((angle * Math.PI) / 180)}
        x2={30 + 17 * Math.cos((angle * Math.PI) / 180)}
        y2={25 + 17 * Math.sin((angle * Math.PI) / 180)}
        stroke="#FFB800"
        strokeWidth="2"
        strokeLinecap="round"
      />
    ))}
    {/* Camel silhouette */}
    <path
      d="M15 42 Q18 35 22 38 L24 36 Q26 32 28 36 L30 38 Q32 34 34 36 L36 38 Q40 35 42 38 L44 42 Q46 38 48 40 L48 42 L15 42Z"
      fill="#FFB800"
    />
    {/* Ground line */}
    <line x1="10" y1="44" x2="55" y2="44" stroke="#FFB800" strokeWidth="1.5" />
    {/* Text */}
    <text x="62" y="28" fontFamily="'Playfair Display', Georgia, serif" fontSize="16" fontWeight="700" fill="#FFFFFF">
      Sunshine Tours
    </text>
    <text x="62" y="42" fontFamily="'DM Sans', sans-serif" fontSize="10" fontWeight="400" fill="#FFB800" letterSpacing="2">
      OMAN
    </text>
  </svg>
);
