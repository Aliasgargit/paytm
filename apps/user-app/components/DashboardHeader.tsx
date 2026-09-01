import { BellIcon } from "./icons";

export function DashboardHeader({
  displayName,
  initials,
}: {
  displayName: string;
  initials: string;
}) {
  return (
    <header className="flex items-center justify-end gap-4 border-b border-slate-200 bg-white px-6 py-3 md:px-8">
      <button
        type="button"
        className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
        aria-label="Notifications"
      >
        <BellIcon />
      </button>
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F7FC] text-sm font-semibold text-[#0078AD]">
          {initials}
        </span>
        <span className="hidden text-sm font-medium text-slate-800 sm:inline">
          {displayName}
        </span>
      </div>
    </header>
  );
}
