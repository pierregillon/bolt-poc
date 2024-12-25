import { Todo, Period } from '../../types/todo';

export interface TodoItemProps {
  todo: Todo;
  onStatusChange: (id: string, completed: boolean) => void;
  onDescriptionUpdate: (id: string, description: string) => void;
  onPeriodChange: (id: string, period: Period) => void;
  onDelete: (id: string) => void;
}