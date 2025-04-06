// TimerApp con supporto dark mode completo + mini floating timer (attivo quando i numeri escono)
import { useState, useEffect, useRef } from 'react';

const PHASES = [
  { label: 'Work', duration: 45 * 60 },
  { label: 'Stand Up', duration: 10 * 60 },
  { label: 'Break', duration: 5 * 60 },
];

const BREAK_WORKOUT = [
  {
    name: 'Jumping Jack',
    videoUrl: 'https://www.youtube.com/embed/gG2Z1siSvkk',
    duration: '30 sec'
  },
  {
    name: 'Squats',
    videoUrl: 'https://www.youtube.com/embed/Zqc_lc93hak',
    duration: '20 ripetizioni'
  },
  {
    name: 'Push-up',
    videoUrl: 'https://www.youtube.com/embed/v9LABVJzv8A',
    duration: '15 ripetizioni'
  },
  {
    name: 'Plank',
    videoUrl: 'https://www.youtube.com/embed/B296mZDhrP4',
    duration: '30 sec'
  },
];

const vibrate = (pattern: number | number[]) => {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
};

type Bubble = {
  id: number;
  left: number;
  duration: number;
};

export default function TimerApp() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [remaining, setRemaining] = useState(PHASES[0].duration);
  const [isRunning, setIsRunning] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [showMiniTimer, setShowMiniTimer] = useState(false);
  const numberRef = useRef<HTMLDivElement | null>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wasLongPress = useRef(false);

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

  useEffect(() => {
    const bubbleInterval = setInterval(() => {
      setBubbles((prev) => [
        ...prev,
        {
          id: Date.now(),
          left: Math.random() * 80 + 10,
          duration: Math.random() * 2 + 3,
        },
      ]);
    }, 2000);
    return () => clearInterval(bubbleInterval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowMiniTimer(!entry.isIntersecting),
      { threshold: 1.0 }
    );
    if (numberRef.current) observer.observe(numberRef.current);
    return () => {
      if (numberRef.current) observer.unobserve(numberRef.current);
    };
  }, []);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleNextPhase = () => {
    vibrate([100, 100, 100]);
    const nextIndex = (phaseIndex + 1) % PHASES.length;
    setPhaseIndex(nextIndex);
    setRemaining(PHASES[nextIndex].duration);
  };

  const handleReset = () => {
    setRemaining(PHASES[phaseIndex].duration);
  };

  const handleLongPress = () => {
    wasLongPress.current = true;
    setMenuVisible(true);
    vibrate(300);
  };

  const handleTouchStart = () => {
    wasLongPress.current = false;
    longPressTimer.current = setTimeout(handleLongPress, 800);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    if (!wasLongPress.current) {
      setIsRunning((r) => !r);
      vibrate(100);
    }
  };

  return (
    <div
      className="w-full flex flex-col items-center text-center select-none bg-white text-black dark:bg-black dark:text-white min-h-screen"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >

      <h1 className="text-2xl font-semibold mb-6">{PHASES[phaseIndex].label}</h1>

      <div className="relative w-72 h-72 rounded-full overflow-hidden bg-[#1e3a8a] border-4 border-[#1e3a8a] shadow-xl">
        <div className="absolute left-0 bottom-0 w-full h-full flex justify-center items-end overflow-hidden pointer-events-none">
          <div
            className="w-full origin-bottom animate-slosh relative transition-all duration-[1400ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ height: `${percentage}%` }}
          >
            <svg viewBox="0 0 1000 80" preserveAspectRatio="none" className="absolute top-0 left-0 w-[200%] h-8 text-[#60a5fa] fill-current animate-wave">
              <path d="M0 30 C 125 50, 375 10, 500 30 C 625 50, 875 10, 1000 30 V 80 H 0 Z" />
            </svg>
            <svg viewBox="0 0 1000 80" preserveAspectRatio="none" className="absolute top-0 left-0 w-[200%] h-8 text-[#3b82f6] fill-current animate-wave-slow">
              <path d="M0 30 C 125 50, 375 10, 500 30 C 625 50, 875 10, 1000 30 V 80 H 0 Z" />
            </svg>
            <div className="absolute top-8 bottom-0 left-0 right-0 bg-[#60a5fa]" />
          </div>
        </div>

        {bubbles.map((b) => (
          <div
            key={b.id}
            className="bubble"
            style={{
              left: `${b.left}%`,
              bottom: `${percentage}%`,
              animationDuration: `${b.duration}s`,
            }}
          />
        ))}

        <div
          ref={numberRef}
          className={`absolute inset-0 flex items-center justify-center text-5xl font-mono transition-colors duration-300 ${percentage > 50 ? 'text-black' : 'text-white'}`}
        >
          {formatTime(remaining)}
        </div>
      </div>

      <p className="mt-4 text-gray-500 dark:text-[#aaa] text-sm">
        Tap to pause/resume · Long press to open menu
      </p>

      {PHASES[phaseIndex].label === 'Break' && (
        <div className="mt-6 space-y-4 w-full max-w-md px-4">
          <h2 className="text-lg font-bold text-center">Mini Workout</h2>
          {BREAK_WORKOUT.map((exercise) => (
            <div key={exercise.name} className="bg-white dark:bg-neutral-900 shadow rounded-lg overflow-hidden">
              <div className="p-4">
                <h3 className="font-medium text-gray-800 dark:text-white mb-1">{exercise.name}</h3>
                <p className="text-sm text-gray-500 dark:text-[#aaa] mb-2">{exercise.duration}</p>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    className="w-full h-48"
                    src={exercise.videoUrl}
                    title={exercise.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showMiniTimer && (
        <div className="fixed top-4 right-4 bg-blue-700 text-white px-3 py-1 rounded-full text-sm shadow z-50 flex items-center gap-2 animate-fade-in">
          <span>⏱ {PHASES[phaseIndex].label}</span>
          <strong>{formatTime(remaining)}</strong>
        </div>
      )}

      {menuVisible && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
          <div
            className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-white rounded-xl shadow-lg p-6 space-y-4 w-[90%] max-w-xs text-center"
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold">Timer Menu</h2>
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
                window.location.href = '/workout.html';
              }}
            >
              ✅ End Day
            </button>
            <button
              className="text-gray-500 dark:text-[#aaa] underline text-sm mt-2"
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
