/**
 * Get today's date as a YYYY-MM-DD string in local timezone
 * This ensures we always get the correct date regardless of timezone
 */
export function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Get a date string for a date object in YYYY-MM-DD format (local timezone)
 */
export function getDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Check if a date string matches today
 */
export function isToday(dateStr: string): boolean {
  return dateStr === getTodayDateString();
}

