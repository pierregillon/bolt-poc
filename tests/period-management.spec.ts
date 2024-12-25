import { expect } from '@playwright/test';
import { test } from './fixtures/TodoApp';

test.describe('Period Management', () => {
  test('should switch between periods', async ({ page, mockTodoRepository }) => {
    // Setup todos for different periods
    await mockTodoRepository.setInitialTodos([
      {
        id: '1',
        description: 'Today task',
        completed: false,
        createdAt: new Date(),
        period: 'today'
      },
      {
        id: '2',
        description: 'Week task',
        completed: false,
        createdAt: new Date(),
        period: 'week'
      }
    ]);

    await page.goto('/');

    // Verify today's task is visible
    await expect(page.getByText('Today task')).toBeVisible();
    await expect(page.getByText('Week task')).not.toBeVisible();

    // Switch to week view
    await page.getByRole('button').filter({ has: page.getByText('ChevronRight') }).click();

    // Verify week's task is visible
    await expect(page.getByText('Week task')).toBeVisible();
    await expect(page.getByText('Today task')).not.toBeVisible();
  });

  test('should move todo between periods', async ({ page, addTodo }) => {
    await addTodo('Movable todo');
    await page.goto('/');

    // Open todo actions
    await page.getByRole('button').filter({ has: page.getByText('MoreHorizontal') }).hover();
    
    // Move to week
    await page.getByRole('button', { name: /Move to week/ }).click();

    // Verify todo disappeared from today
    await expect(page.getByText('Movable todo')).not.toBeVisible();

    // Switch to week view
    await page.getByRole('button').filter({ has: page.getByText('ChevronRight') }).click();

    // Verify todo appears in week view
    await expect(page.getByText('Movable todo')).toBeVisible();
  });
});