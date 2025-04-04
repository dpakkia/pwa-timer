import { useState, useEffect, useRef } from 'react';

const PHASES = [
  { label: 'Work', duration: 45 * 60 },
  { label: 'Stand Up', duration: 10 * 60 },
  { label: 'Break', duration: 5 * 60 },
];

export default function TimerApp() {
  const [phaseIndex, setPhaseIndex] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(PHASES[0].duration);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = PHASES[phaseIndex].duration;
  const percentage = ((total - remaining) / total) * 100;

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          handleNextPhase();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, phaseIndex]);

  const formatTime = (sec: number): string => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleNextPhase = (): void => {
    const nextIndex = (phaseIndex + 1) % PHASES.length;
    setPhaseIndex(nextIndex);
    setRemaining(PHASES[nextIndex].duration);
  };

  const handleReset = (): void => {
    setRemaining(PHASES[phaseIndex].duration);
  };

  const handleLongPress = (): void => {
    const reset = confirm('Reset current phase?');
    if (reset) handleReset();
  };

  const handleTouchStart = (): void => {
    longPressTimer.current = setTimeout(handleLongPress, 1000);
  };

  const handleTouchEnd = (): void => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      setIsRunning((r) => !r);
    }
  };

  return (
    <div
      className="w-full flex flex-col items-center text-center select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <h1 className="text-2xl font-semibold mb-6 text-gray-700">
        {PHASES[phaseIndex].label}
      </h1>

      <div className="relative w-72 h-72 rounded-full overflow-hidden bg-[#1e3a8a] border-4 border-[#1e3a8a] shadow-xl">
        <div
          className="absolute left-0 bottom-0 w-full bg-[#60a5fa] transition-all duration-500 ease-in-out"
          style={{ height: `${percentage}%` }}
        />
        <div
          className={`absolute inset-0 flex items-center justify-center text-5xl font-mono transition-colors duration-300 ${
            percentage > 50 ? 'text-black' : 'text-white'
          }`}
        >
          {formatTime(remaining)}
        </div>
      </div>

      <p className="mt-4 text-gray-400 text-sm">
        Tap to pause/resume · Long press to reset
      </p>
    </div>
  );
}
