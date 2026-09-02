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
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22l-4-9-9-4 20-7z" />
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

export const P2PTransferIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <circle cx="8" cy="8" r="3" />
    <circle cx="16" cy="8" r="3" />
    <path d="M3.5 19c.6-2.4 2.4-4 4.5-4s3.9 1.6 4.5 4" />
    <path d="M11.5 19c.6-2.4 2.4-4 4.5-4s3.9 1.6 4.5 4" />
  </svg>
);

export const BellIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3s3-2 3-9" />
    <path d="M10 21a2 2 0 0 0 4 0" />
  </svg>
);

export const PlusIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

export const QrIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <path d="M14 14h3v3h-3z" />
    <path d="M20 14v7" />
    <path d="M14 20h4" />
  </svg>
);

export const EyeIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const EyeOffIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <path d="M3 3l18 18" />
    <path d="M10.6 10.6a3 3 0 0 0 4.2 4.2" />
    <path d="M9.9 5.1A11 11 0 0 1 12 5c6 0 10 7 10 7a18 18 0 0 1-3.2 3.9" />
    <path d="M6.1 6.1A18 18 0 0 0 2 12s4 7 10 7c1.3 0 2.6-.3 3.7-.8" />
  </svg>
);

export const ArrowInIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <path d="M15 9 9 15" />
    <path d="M9 9v6h6" />
  </svg>
);

export const ArrowOutIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <path d="M9 15 15 9" />
    <path d="M9 9h6v6" />
  </svg>
);

export const WalletIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <rect x="3" y="6" width="18" height="14" rx="2" />
    <path d="M3 10h18" />
    <circle cx="16" cy="15" r="1.2" fill="currentColor" />
  </svg>
);

export const BankIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <path d="M3 10 12 4l9 6" />
    <path d="M5 10v8" />
    <path d="M10 10v8" />
    <path d="M14 10v8" />
    <path d="M19 10v8" />
    <path d="M3 18h18" />
  </svg>
);

export const CardIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20" />
    <path d="M6 15h4" />
  </svg>
);

export const SearchIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const DownloadIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <path d="M12 4v11" />
    <path d="m7 11 5 5 5-5" />
    <path d="M5 20h14" />
  </svg>
);

export const PhoneIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <rect x="7" y="2" width="10" height="20" rx="2" />
    <path d="M11 18h2" />
  </svg>
);
