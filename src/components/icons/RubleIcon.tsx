import { LucideProps } from "lucide-react";

export const RubleIcon = (props: LucideProps) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Main vertical line */}
    <path d="M7 4v16" strokeWidth="2.5" />
    {/* Top horizontal part forming the P */}
    <path d="M7 4h6a4 4 0 0 1 0 8H7" strokeWidth="2.5" />
    {/* First horizontal line */}
    <path d="M5 11h8" strokeWidth="2" />
    {/* Second horizontal line */}
    <path d="M5 15h6" strokeWidth="2" />
    {/* Decorative elements */}
    <circle cx="15" cy="8" r="1" fill="currentColor" opacity="0.6" />
    <circle cx="13" cy="6" r="0.5" fill="currentColor" opacity="0.4" />
  </svg>
);