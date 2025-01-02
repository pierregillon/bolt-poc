import { ChevronLeft, ChevronRight } from "lucide-react";
import { Period } from "../types/todo";

const periods: Period[] = ["today", "week", "month", "quarter", "year"];

interface PeriodSelectorProps {
  currentPeriod: Period;
  onPeriodChange: (period: Period) => void;
}

export function PeriodSelector({
  currentPeriod,
  onPeriodChange,
}: PeriodSelectorProps) {
  const currentIndex = periods.indexOf(currentPeriod);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onPeriodChange(periods[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < periods.length - 1) {
      onPeriodChange(periods[currentIndex + 1]);
    }
  };

  return (
    <div className="flex items-center gap-4 bg-white rounded-lg p-2 shadow-sm">
      <button
        onClick={handlePrevious}
        disabled={currentIndex === 0}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={20} />
      </button>

      <span className="text-lg font-medium capitalize min-w-[100px] text-center">
        {currentPeriod}
      </span>

      <button
        onClick={handleNext}
        disabled={currentIndex === periods.length - 1}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
