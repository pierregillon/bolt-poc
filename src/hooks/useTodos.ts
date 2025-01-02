import { useReducer, useEffect, useCallback } from "react";
import { Period, Todo } from "../types/todo";
import { todoReducer } from "../reducers/todoReducer";
import { TodoRepository } from "../repositories/TodoRepository";
import { HttpTodoRepository } from "../repositories/HttpTodoRepository";

const todoRepository: TodoRepository = new HttpTodoRepository();

export function useTodos() {
  const [todos, dispatch] = useReducer(todoReducer, []);

  useEffect(() => {
    todoRepository.listTodos().then((todos) => {
      dispatch({ type: "SET_TODOS", payload: todos });
    });
  }, []);

  const addTodo = useCallback(async (description: string, period: Period) => {
    const newTodo = await todoRepository.createTodo(description, period);
    dispatch({ type: "ADD_TODO", payload: newTodo });
  }, []);

  const setTodoStatus = useCallback(async (id: string, completed: boolean) => {
    await todoRepository.setTodoStatus(id, completed);
    dispatch({
      type: completed ? "SET_DONE" : "SET_TO_DO",
      payload: id,
    });
  }, []);

  const updateDescription = useCallback(
    async (id: string, description: string) => {
      await todoRepository.updateDescription(id, description);
      dispatch({
        type: "EDIT_DESCRIPTION",
        payload: { id, description },
      });
    },
    []
  );

  const moveToPeriod = useCallback(async (id: string, period: Period) => {
    await todoRepository.moveToPeriod(id, period);
    dispatch({
      type: "RESCHEDULE_TO_PERIOD",
      payload: { id, period },
    });
  }, []);

  const deleteTodo = useCallback(async (id: string) => {
    await todoRepository.deleteTodo(id);
    dispatch({ type: "DELETE_TODO", payload: id });
  }, []);

  return {
    todos,
    addTodo,
    setTodoStatus,
    updateDescription,
    moveToPeriod,
    deleteTodo,
  };
}
