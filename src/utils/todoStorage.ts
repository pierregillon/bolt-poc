import { Todo } from '../types/todo';

const STORAGE_KEY = 'todos';

const defaultTodos: Todo[] = [
  {
    id: '1',
    text: 'Complete project documentation',
    completed: false,
    createdAt: new Date(),
    period: 'today',
  },
  {
    id: '2',
    text: 'Review pull requests',
    completed: false,
    createdAt: new Date(),
    period: 'today',
  },
  {
    id: '3',
    text: 'Update dependencies',
    completed: true,
    createdAt: new Date(),
    period: 'today',
  },
];

export function loadTodos(): Todo[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    saveTodos(defaultTodos);
    return defaultTodos;
  }
  
  try {
    const parsed = JSON.parse(stored);
    return parsed.map((todo: any) => ({
      ...todo,
      createdAt: new Date(todo.createdAt)
    }));
  } catch {
    return defaultTodos;
  }
}

export function saveTodos(todos: Todo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}