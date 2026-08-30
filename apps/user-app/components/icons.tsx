const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const HomeIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
    <path d="M9.5 21v-6h5v6" />
  </svg>
);

export const TransferIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <path d="M4 8h13l-3.5-3.5" />
    <path d="M20 16H7l3.5 3.5" />
  </svg>
);

export const TransactionsIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M7 9h10" />
    <path d="M7 13h6" />
    <path d="M7 17h4" />
  </svg>
);
