import { Todo, Period } from '../types/todo';

export type TodoAction =
  | { type: 'SET_TODOS'; payload: Todo[] }
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'EDIT_DESCRIPTION'; payload: { id: string; description: string } }
  | { type: 'SET_DONE'; payload: string }
  | { type: 'SET_TO_DO'; payload: string }
  | { type: 'RESCHEDULE_TO_PERIOD'; payload: { id: string; period: Period } }
  | { type: 'DELETE_TODO'; payload: string };

export function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'SET_TODOS':
      return action.payload;

    case 'ADD_TODO':
      return [...state, action.payload];

    case 'EDIT_DESCRIPTION':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, description: action.payload.description }
          : todo
      );

    case 'SET_DONE':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: true }
          : todo
      );

    case 'SET_TO_DO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: false }
          : todo
      );

    case 'RESCHEDULE_TO_PERIOD':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, period: action.payload.period }
          : todo
      );

    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);

    default:
      return state;
  }
}