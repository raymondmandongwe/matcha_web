import type { OperatingHours } from './stores';

const DAY_MAP: Record<string, number> = {
  Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
};

function parseDayRange(str: string): number[] {
  const clean = str.replace(/& PH/g, '').trim();
  if (clean === 'Daily') return [0, 1, 2, 3, 4, 5, 6];

  if (clean.includes('–') || clean.includes('-')) {
    const parts = clean.split(/[–-]/).map((s) => s.trim());
    const start = DAY_MAP[parts[0]];
    const end = DAY_MAP[parts[1]];
    if (start === undefined || end === undefined) return [];
    if (start <= end) return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    // Wrap-around (e.g. Sat – Sun = 6, 0)
    return [
      ...Array.from({ length: 7 - start }, (_, i) => start + i),
      ...Array.from({ length: end + 1 }, (_, i) => i),
    ];
  }

  return clean.split(',').map((s) => DAY_MAP[s.trim()]).filter((d) => d !== undefined);
}

function parseMinutes(timeStr: string): number {
  const [h, m] = timeStr.trim().split(':').map(Number);
  return h * 60 + (m || 0);
}

export function isOpenNow(hours: OperatingHours[]): boolean {
  const now = new Date();
  const currentDay = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  for (const slot of hours) {
    const days = parseDayRange(slot.days);
    if (!days.includes(currentDay)) continue;
    const [openStr, closeStr] = slot.hours.split('–').map((s) => s.trim());
    if (!openStr || !closeStr) continue;
    if (currentMinutes >= parseMinutes(openStr) && currentMinutes < parseMinutes(closeStr)) return true;
  }
  return false;
}
