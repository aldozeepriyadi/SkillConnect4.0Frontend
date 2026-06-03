interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({ size = "md", className = "" }: LogoProps) {
  const sizeMap = {
    sm: "w-6 h-6",
    md: "w-9 h-9",
    lg: "w-12 h-12",
  };

  return (
    <img
      src="/logo.png"
      alt="SkillConnect4.0 Logo"
      className={`${sizeMap[size]} ${className}`}
      style={{ objectFit: "contain" }}
    />
  );
}
