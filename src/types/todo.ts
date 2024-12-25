export type Period = 'today' | 'week' | 'month' | 'quarter' | 'year';

export interface Todo {
  id: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  period: Period;
}