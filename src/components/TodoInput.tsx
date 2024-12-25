import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Period } from '../types/todo';

interface TodoInputProps {
  onAdd: (text: string) => void;
  period: Period;
}

export function TodoInput({ onAdd, period }: TodoInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={`Add a task for ${period}...`}
        className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 flex items-center gap-2"
      >
        <Plus size={20} />
        Add Task
      </button>
    </form>
  );
}