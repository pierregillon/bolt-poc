import { Todo, Period } from '../types/todo';
import { TodoItem } from './TodoItem/TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string, completed: boolean) => void;
  onUpdate: (id: string, description: string) => void;
  onMoveToPeriod: (id: string, period: Period) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, onToggle, onUpdate, onMoveToPeriod, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        No tasks for this period. Add some tasks to get started!
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onStatusChange={onToggle}
          onDescriptionUpdate={onUpdate}
          onPeriodChange={onMoveToPeriod}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}