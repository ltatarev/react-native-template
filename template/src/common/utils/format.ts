const KILOBYTE = 1024;
const MEGABYTE = KILOBYTE ** 2;
const GIGABYTE = KILOBYTE ** 3;
/** Below this many gigabytes, keep one decimal; above it, whole numbers. */
const GIGABYTE_DECIMAL_CEILING = 10;

/**
 * `1.2 GB` / `340 MB` / `12 KB`, rounded honestly.
 *
 * Never reports `0 KB` for a file that exists: a byte count under a kilobyte
 * still rounds up to one, because "0" reads as "nothing there".
 */
export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return '0 MB';
  }

  if (bytes >= GIGABYTE) {
    const value = bytes / GIGABYTE;
    const rounded =
      value >= GIGABYTE_DECIMAL_CEILING
        ? Math.round(value)
        : Math.round(value * 10) / 10;

    return `${rounded} GB`;
  }

  if (bytes >= MEGABYTE) {
    return `${Math.round(bytes / MEGABYTE)} MB`;
  }

  return `${Math.max(1, Math.round(bytes / KILOBYTE))} KB`;
}

const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 3600;

/** `1:23`, `12:05`, `1:02:33`. Hours only appear when there are any. */
export function formatDuration(totalSeconds: number): string {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(seconds / SECONDS_PER_HOUR);
  const minutes = Math.floor((seconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE);
  const remainder = seconds % SECONDS_PER_MINUTE;
  const pad = (value: number) => String(value).padStart(2, '0');

  if (hours > 0) {
    return `${hours}:${pad(minutes)}:${pad(remainder)}`;
  }

  return `${minutes}:${pad(remainder)}`;
}

/**
 * `Jun 12`, or `Jun 12, 2024` when the date is not in the current year.
 *
 * Formatted through `toLocaleDateString` with no explicit locale, so it follows
 * the device. An unparseable or missing date renders as an empty string rather
 * than as `Invalid Date`.
 */
export function formatShortDate(
  isoDate: string | undefined,
  now: Date = new Date(),
): string {
  if (!isoDate) {
    return '';
  }

  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() === now.getFullYear() ? undefined : 'numeric',
  });
}
