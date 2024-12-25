import { useState } from 'react';
import { Period } from './types/todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { PeriodSelector } from './components/PeriodSelector';
import { TodoInput } from './components/TodoInput';
import { useTodos } from './hooks/useTodos';

function App() {
  const [currentPeriod, setCurrentPeriod] = useState<Period>('today');
  const { todos, addTodo, setTodoStatus, updateDescription, moveToPeriod, deleteTodo } = useTodos();

  const filteredTodos = todos.filter((todo) => todo.period === currentPeriod);

  const handleAddTodo = (description: string) => {
    addTodo(description, currentPeriod);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto p-6">
        <Header />
        
        <div className="space-y-6">
          <div className="flex justify-center">
            <PeriodSelector
              currentPeriod={currentPeriod}
              onPeriodChange={setCurrentPeriod}
            />
          </div>

          <TodoList
            todos={filteredTodos}
            onToggle={setTodoStatus}
            onUpdate={updateDescription}
            onMoveToPeriod={moveToPeriod}
            onDelete={deleteTodo}
          />

          <TodoInput onAdd={handleAddTodo} period={currentPeriod} />
        </div>
      </div>
    </div>
  );
}

export default App;