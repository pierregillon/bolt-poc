import { Todo, Period } from '../types/todo';

export interface TodoRepository {
  listTodos(): Promise<Todo[]>;
  createTodo(description: string, period: Period): Promise<Todo>;
  setTodoStatus(id: string, completed: boolean): Promise<Todo>;
  updateDescription(id: string, description: string): Promise<Todo>;
  moveToPeriod(id: string, period: Period): Promise<Todo>;
  deleteTodo(id: string): Promise<void>;
}