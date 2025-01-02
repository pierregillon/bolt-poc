import { Todo, Period } from "../types/todo";
import { TodoRepository } from "./TodoRepository";

export class HttpTodoRepository implements TodoRepository {
  private readonly API_URL = "https://api.example.com/v1/todos";

  async listTodos(): Promise<Todo[]> {
    const response = await fetch(this.API_URL);
    if (!response.ok) throw new Error("Failed to fetch todos");

    const todos = await response.json();
    return todos.map((todo: any) => ({
      ...todo,
      createdAt: new Date(todo.createdAt),
    }));
  }

  async createTodo(description: string, period: Period): Promise<Todo> {
    const response = await fetch(this.API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description, period }),
    });

    if (!response.ok) throw new Error("Failed to create todo");
    const todo = await response.json();
    return { ...todo, createdAt: new Date(todo.createdAt) };
  }

  async setTodoStatus(id: string, completed: boolean): Promise<Todo> {
    const response = await fetch(`${this.API_URL}/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });

    if (!response.ok) throw new Error("Failed to update todo status");
    const todo = await response.json();
    return { ...todo, createdAt: new Date(todo.createdAt) };
  }

  async updateDescription(id: string, description: string): Promise<Todo> {
    const response = await fetch(`${this.API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    });

    if (!response.ok) throw new Error("Failed to update todo");
    const todo = await response.json();
    return { ...todo, createdAt: new Date(todo.createdAt) };
  }

  async moveToPeriod(id: string, period: Period): Promise<Todo> {
    const response = await fetch(`${this.API_URL}/${id}/period`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ period }),
    });

    if (!response.ok) throw new Error("Failed to move todo");
    const todo = await response.json();
    return { ...todo, createdAt: new Date(todo.createdAt) };
  }

  deleteTodo(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
