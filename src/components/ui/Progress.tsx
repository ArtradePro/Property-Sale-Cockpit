interface ProgressProps {
  value: number;
  label?: string;
  showPercentage?: boolean;
}

export function Progress({ value, label, showPercentage = true }: ProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  
  return (
    <div>
      {(label || showPercentage) && (
        <div className="flex justify-between mb-1">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showPercentage && <span className="text-sm text-gray-500">{clampedValue}%</span>}
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
