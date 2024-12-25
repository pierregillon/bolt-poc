import { Todo, Period } from '../types/todo';
import { TodoRepository } from './TodoRepository';

export class LocalStorageTodoRepository implements TodoRepository {
  private readonly STORAGE_KEY = 'todos';

  private async getTodos(): Promise<Todo[]> {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return [];
    
    try {
      const parsed = JSON.parse(stored);
      return parsed.map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      }));
    } catch {
      return [];
    }
  }

  private async saveTodos(todos: Todo[]): Promise<void> {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
  }

  async listTodos(): Promise<Todo[]> {
    return this.getTodos();
  }

  async createTodo(description: string, period: Period): Promise<Todo> {
    const todos = await this.getTodos();
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      description,
      completed: false,
      createdAt: new Date(),
      period,
    };
    
    await this.saveTodos([...todos, newTodo]);
    return newTodo;
  }

  async setTodoStatus(id: string, completed: boolean): Promise<Todo> {
    const todos = await this.getTodos();
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) throw new Error('Todo not found');

    const updatedTodo = {
      ...todos[todoIndex],
      completed
    };
    
    todos[todoIndex] = updatedTodo;
    await this.saveTodos(todos);
    return updatedTodo;
  }

  async updateDescription(id: string, description: string): Promise<Todo> {
    const todos = await this.getTodos();
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) throw new Error('Todo not found');

    const updatedTodo = { ...todos[todoIndex], description };
    todos[todoIndex] = updatedTodo;
    await this.saveTodos(todos);
    return updatedTodo;
  }

  async moveToPeriod(id: string, period: Period): Promise<Todo> {
    const todos = await this.getTodos();
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) throw new Error('Todo not found');

    const updatedTodo = { ...todos[todoIndex], period };
    todos[todoIndex] = updatedTodo;
    await this.saveTodos(todos);
    return updatedTodo;
  }

  async deleteTodo(id: string): Promise<void> {
    const todos = await this.getTodos();
    const filteredTodos = todos.filter(todo => todo.id !== id);
    await this.saveTodos(filteredTodos);
  }
}