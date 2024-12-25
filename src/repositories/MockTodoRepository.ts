import { TodoRepository } from './TodoRepository';
import { Todo, Period } from '../types/todo';

export class MockTodoRepository implements TodoRepository {
  private todos: Todo[] = [];

  async listTodos(): Promise<Todo[]> {
    return this.todos;
  }

  async createTodo(description: string, period: Period): Promise<Todo> {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      description,
      completed: false,
      createdAt: new Date(),
      period,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  async setTodoStatus(id: string, completed: boolean): Promise<Todo> {
    const todo = this.todos.find(t => t.id === id);
    if (!todo) throw new Error('Todo not found');
    todo.completed = completed;
    return todo;
  }

  async updateDescription(id: string, description: string): Promise<Todo> {
    const todo = this.todos.find(t => t.id === id);
    if (!todo) throw new Error('Todo not found');
    todo.description = description;
    return todo;
  }

  async moveToPeriod(id: string, period: Period): Promise<Todo> {
    const todo = this.todos.find(t => t.id === id);
    if (!todo) throw new Error('Todo not found');
    todo.period = period;
    return todo;
  }

  async deleteTodo(id: string): Promise<void> {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  // Test helpers
  reset(): void {
    this.todos = [];
  }

  setInitialTodos(todos: Todo[]): void {
    this.todos = [...todos];
  }
}