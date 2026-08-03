import { cn } from '@/utils';

interface LogoProps {
  className?: string;
  /** Controls the overall size scale */
  size?: 'sm' | 'md' | 'lg';
  /** Force a specific colour for the wordmark — defaults to currentColor */
  color?: string;
  /** Show/hide the tagline beneath */
  tagline?: boolean;
}

const scales = { sm: 'h-8', md: 'h-10', lg: 'h-14' };

export default function Logo({ className, size = 'md', color, tagline = true }: LogoProps) {
  const fill = color ?? 'currentColor';

  return (
    <span className={cn('inline-flex flex-col items-start leading-none select-none', scales[size], className)}>
      <svg
        viewBox="0 0 220 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
        aria-label="Gift Collection"
        role="img"
      >
        {/* ── Gift-box icon mark ── */}
        {/* Ribbon vertical */}
        <rect x="15" y="4" width="3" height="28" fill="#D4AF37" />
        {/* Ribbon horizontal */}
        <rect x="5" y="14" width="23" height="3" fill="#D4AF37" />
        {/* Box body */}
        <rect x="5" y="17" width="23" height="15" fill={fill} opacity="0.12" />
        <rect x="5" y="17" width="23" height="15" stroke={fill} strokeWidth="1.5" />
        {/* Lid */}
        <rect x="3" y="11" width="27" height="6" fill={fill} opacity="0.12" />
        <rect x="3" y="11" width="27" height="6" stroke={fill} strokeWidth="1.5" />
        {/* Bow left loop */}
        <path
          d="M16.5 11 C12 7, 6 7, 7 11"
          stroke="#D4AF37"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Bow right loop */}
        <path
          d="M16.5 11 C21 7, 27 7, 26 11"
          stroke="#D4AF37"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* ── Wordmark ── */}
        {/* "GIFT" */}
        <text
          x="38"
          y="22"
          fontFamily="'Playfair Display', Georgia, serif"
          fontWeight="700"
          fontSize="16"
          letterSpacing="3"
          fill={fill}
        >
          GIFT
        </text>
        {/* Thin divider line between words */}
        <rect x="38" y="24.5" width="42" height="0.8" fill="#D4AF37" opacity="0.6" />
        {/* "COLLECTION" — slightly smaller, spaced */}
        <text
          x="38"
          y="34"
          fontFamily="'Poppins', system-ui, sans-serif"
          fontWeight="400"
          fontSize="8"
          letterSpacing="4"
          fill="#D4AF37"
        >
          COLLECTION
        </text>
      </svg>
    </span>
  );
}
