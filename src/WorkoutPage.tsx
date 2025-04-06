import { useEffect, useState } from 'react';

const hiitRoutine = [
  {
    name: 'Burpees',
    videoUrl: 'https://www.youtube.com/embed/E-Oc0zjeqWo',
  },
  {
    name: 'Jump Squats',
    videoUrl: 'https://www.youtube.com/embed/bv7as8mDXLQ',
  },
  {
    name: 'Mountain Climbers',
    videoUrl: 'https://www.youtube.com/embed/w2iTOneGPdU',
  },
  {
    name: 'Plank',
    videoUrl: 'https://www.youtube.com/embed/B296mZDhrP4',
  },
];

export default function WorkoutPage() {
  const [isActive, setIsActive] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(30);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === 1) {
          const nextPhaseIsRest = !isResting;
          setIsResting(nextPhaseIsRest);
          return nextPhaseIsRest ? 15 : 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive, isResting]);

  return (
    <div className="p-4 max-w-md mx-auto space-y-6 pb-24 bg-white text-black  min-h-screen">

      <h1 className="text-2xl font-bold text-center">End of Day HIIT</h1>
      <p className="text-center text-[#aaa]">4–5 giri del seguente circuito:</p>

      <div className="space-y-6">
        {hiitRoutine.map((exercise) => (
          <div key={exercise.name} className="bg-neutral-900 shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <h3 className="font-medium text-white mb-1">{exercise.name}</h3>
              <p className="text-sm text-[#aaa] mb-2">30 sec attività · 15 sec riposo</p>
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

      <div className="text-center mt-8">
        <button
          onClick={() => (window.location.href = '/')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Torna all'inizio
        </button>
      </div>

      {/* Floating Timer */}
      <div className="fixed bottom-4 right-4 bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg text-lg flex items-center gap-2">
        <span className="text-2xl">⏱️</span>
        {isResting ? 'Riposo' : 'Esercizio'}: {secondsLeft}s
        <button
          onClick={() => setIsActive((prev) => !prev)}
          className="ml-2 text-2xl"
        >
          {isActive ? '⏸️' : '▶️'}
        </button>
      </div>
    </div>
  );
}
