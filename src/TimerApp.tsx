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
  const wasLongPress = useRef(false);
  const [menuVisible, setMenuVisible] = useState(false);

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
    wasLongPress.current = true;
    setMenuVisible(true);
  };

  const handleTouchStart = (): void => {
    wasLongPress.current = false;
    longPressTimer.current = setTimeout(() => {
      handleLongPress();
    }, 800);
  };

  const handleTouchEnd = (): void => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    if (!wasLongPress.current) setIsRunning((r) => !r);
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
        Tap to pause/resume · Long press to open menu
      </p>

      {menuVisible && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4 w-[90%] max-w-xs text-center transform scale-100 transition duration-200 ease-out">
            <h2 className="text-lg font-bold text-gray-700">Timer Menu</h2>
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
              onClick={() => {
                handleReset();
                setMenuVisible(false);
              }}
            >
              🔁 Reset Phase
            </button>
            <button
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded"
              onClick={() => {
                handleNextPhase();
                setMenuVisible(false);
              }}
            >
              ⏭ Skip Phase
            </button>
            <button
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
              onClick={() => {
                setMenuVisible(false);
                alert('End of Day! 🎉');
              }}
            >
              ✅ End Day
            </button>
            <button
              className="text-gray-500 underline text-sm mt-2"
              onClick={() => setMenuVisible(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
