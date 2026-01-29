interface ExternalLinkIconProps {
  className?: string;
}

export default function ExternalLinkIcon({ className }: ExternalLinkIconProps) {
  return (
    <svg
      className={className || "inline-block w-3 h-3 ml-1"}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M7 17L17 7M17 7H7M17 7V17"
      />
    </svg>
  );
}
