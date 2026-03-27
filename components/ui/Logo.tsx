interface LogoProps {
  /** Width in pixels; height is derived from the viewBox aspect ratio (526:477). */
  size?: number;
}

const ASPECT = 477 / 526; // viewBox height / width

export function Logo({ size = 28 }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 526 477"
      width={size}
      height={Math.round(size * ASPECT)}
      aria-label="Aether logo"
    >
      {/* Top face — violet-primary */}
      <polygon fill="#7F77DD" points="263,36 488,192 403,244 263,146 122,244 38,192" />
      {/* Right face — violet-light */}
      <polygon fill="#AFA9EC" points="403,244 478,418 263,372 263,146" />
      {/* Left face — violet-dark */}
      <polygon fill="#534AB7" points="122,244 48,418 263,372 263,146" />
      {/* Bottom face — violet-deep */}
      <polygon fill="#3C3489" points="48,418 263,477 478,418 263,372" />
    </svg>
  );
}
