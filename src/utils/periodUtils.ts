import { Period } from '../types/todo';

const periods: Period[] = ['today', 'week', 'month', 'quarter', 'year'];

export function getAdjacentPeriods(currentPeriod: Period) {
  const currentIndex = periods.indexOf(currentPeriod);
  return {
    previous: currentIndex > 0 ? periods[currentIndex - 1] : null,
    next: currentIndex < periods.length - 1 ? periods[currentIndex + 1] : null,
  };
}