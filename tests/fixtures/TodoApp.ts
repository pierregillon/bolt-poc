import { test as base } from '@playwright/test';
import { MockTodoRepository } from '../../src/repositories/MockTodoRepository';
import { Todo } from '../../src/types/todo';

type TodoFixtures = {
  mockTodoRepository: MockTodoRepository;
  addTodo: (description: string) => Promise<Todo>;
};

export const test = base.extend<TodoFixtures>({
  mockTodoRepository: async ({}, use) => {
    const repository = new MockTodoRepository();
    await use(repository);
    repository.reset();
  },

  addTodo: async ({ page, mockTodoRepository }, use) => {
    await use(async (description: string) => {
      const todo = await mockTodoRepository.createTodo(description, 'today');
      await mockTodoRepository.setInitialTodos([todo]);
      return todo;
    });
  },
});