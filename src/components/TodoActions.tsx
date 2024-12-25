import { MoreHorizontal, ArrowLeft, ArrowRight } from 'lucide-react';
import { Period } from '../types/todo';
import { getAdjacentPeriods } from '../utils/periodUtils';

interface TodoActionsProps {
  id: string;
  period: Period;
  onMoveToPeriod: (id: string, period: Period) => void;
}

export function TodoActions({ id, period, onMoveToPeriod }: TodoActionsProps) {
  const { previous, next } = getAdjacentPeriods(period);
  
  return (
    <div className="relative group">
      <button className="p-1 rounded-full hover:bg-gray-100">
        <MoreHorizontal size={16} className="text-gray-400" />
      </button>
      
      <div className="absolute right-0 mt-1 invisible group-hover:visible bg-white rounded-lg shadow-lg py-1 min-w-[160px] z-10">
        {previous && (
          <button
            onClick={() => onMoveToPeriod(id, previous)}
            className="w-full px-4 py-2 text-sm text-left flex items-center gap-2 hover:bg-gray-50"
          >
            <ArrowLeft size={16} />
            <span>Move to {previous}</span>
          </button>
        )}
        
        {next && (
          <button
            onClick={() => onMoveToPeriod(id, next)}
            className="w-full px-4 py-2 text-sm text-left flex items-center gap-2 hover:bg-gray-50"
          >
            <ArrowRight size={16} />
            <span>Move to {next}</span>
          </button>
        )}
      </div>
    </div>
  );
}