import React, { useState, useRef, useEffect } from 'react';
import { Check, X, Edit2 } from 'lucide-react';
import { Todo } from '../types/todo';
import { TodoActions } from './TodoActions';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  onMoveToPeriod: (id: string, period: Period) => void;
}

export function TodoItem({ todo, onToggle, onUpdate, onMoveToPeriod }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleSubmit = () => {
    if (text.trim()) {
      onUpdate(todo.id, text);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm group hover:shadow-md transition-shadow">
      <button
        onClick={() => onToggle(todo.id)}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
          ${todo.completed 
            ? 'bg-emerald-500 border-emerald-500' 
            : 'border-gray-300 hover:border-emerald-500'}`}
      >
        {todo.completed && <Check size={12} className="text-white" />}
      </button>
      
      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            className="flex-1 bg-gray-50 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={handleSubmit}
            className="text-emerald-500 hover:text-emerald-600"
          >
            <Check size={18} />
          </button>
          <button
            onClick={() => {
              setText(todo.text);
              setIsEditing(false);
            }}
            className="text-red-500 hover:text-red-600"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <>
          <span className={`flex-1 ${todo.completed ? 'text-gray-400 line-through' : ''}`}>
            {todo.description}
          </span>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100">
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-400 hover:text-gray-600"
            >
              <Edit2 size={16} />
            </button>
            <TodoActions
              id={todo.id}
              period={todo.period}
              onMoveToPeriod={onMoveToPeriod}
            />
          </div>
        </>
      )}
    </div>
  );
}