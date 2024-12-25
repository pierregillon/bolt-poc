import { ListTodo } from 'lucide-react';

export function Header() {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="bg-emerald-500 p-3 rounded-lg">
        <ListTodo size={24} className="text-white" />
      </div>
      <h1 className="text-2xl font-bold text-gray-800">
        Periodic Todo List
      </h1>
    </div>
  );
}