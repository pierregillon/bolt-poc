import { Period } from '../types/todo';

export function isWithinPeriod(date: Date, period: Period): boolean {
  const now = new Date();
  const start = new Date(now);
  
  switch (period) {
    case 'today':
      return date.toDateString() === now.toDateString();
    case 'week':
      start.setDate(now.getDate() - now.getDay());
      return date >= start && date <= now;
    case 'month':
      start.setDate(1);
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    case 'quarter':
      const quarter = Math.floor(now.getMonth() / 3);
      start.setMonth(quarter * 3, 1);
      const end = new Date(start);
      end.setMonth(start.getMonth() + 3, 0);
      return date >= start && date <= end;
    case 'year':
      return date.getFullYear() === now.getFullYear();
    default:
      return false;
  }
}