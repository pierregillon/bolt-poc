import { expect } from '@playwright/test';
import { test } from './fixtures/TodoApp';

test.describe('Todo Management', () => {
  test('should add a new todo', async ({ page }) => {
    await page.goto('/');
    
    // Add new todo
    await page.getByPlaceholder('Add a task for today...').fill('New test todo');
    await page.getByRole('button', { name: 'Add Task' }).click();

    // Verify todo was added
    await expect(page.getByText('New test todo')).toBeVisible();
  });

  test('should mark todo as completed', async ({ page, addTodo }) => {
    const todo = await addTodo('Test completion');
    await page.goto('/');

    // Complete todo
    await page.getByRole('button', { name: '' }).first().click();

    // Verify todo is marked as completed
    await expect(page.getByText('Test completion')).toHaveClass(/line-through/);
  });

  test('should edit todo description', async ({ page, addTodo }) => {
    await addTodo('Original todo');
    await page.goto('/');

    // Start editing
    await page.getByRole('button').filter({ has: page.getByText('Edit2') }).click();
    
    // Edit and save
    await page.getByRole('textbox').fill('Updated todo');
    await page.getByRole('button').filter({ has: page.getByText('Check') }).click();

    // Verify update
    await expect(page.getByText('Updated todo')).toBeVisible();
    await expect(page.getByText('Original todo')).not.toBeVisible();
  });

  test('should delete todo', async ({ page, addTodo }) => {
    await addTodo('Todo to delete');
    await page.goto('/');

    // Delete todo
    await page.getByRole('button').filter({ has: page.getByText('Trash2') }).click();

    // Verify deletion
    await expect(page.getByText('Todo to delete')).not.toBeVisible();
    await expect(page.getByText('No tasks for this period')).toBeVisible();
  });
});