import { useEffect, useState } from 'react';

const warmupRoutine = [
  {
    name: 'Riscaldamento Classico',
    image: 'https://darebee.com/images/workouts/classic-warmup-workout.jpg',
  },
];

export default function WorkoutPage() {
  const [isActive, setIsActive] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [modalImage, setModalImage] = useState<string | null>(null);

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
    <div className="p-4 max-w-md mx-auto space-y-6 pb-24 bg-white text-black dark:bg-black dark:text-white min-h-screen">

      <h1 className="text-2xl font-bold text-center">Preparazione</h1>
      <p className="text-center text-gray-600 dark:text-[#aaa]">10 minuti per attivare corpo e mente</p>

      <div className="space-y-4">
        {warmupRoutine.map((item) => (
          <div key={item.name} className="bg-white dark:bg-neutral-900 shadow rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="mt-4 w-full rounded-lg cursor-pointer shadow"
                onClick={() => setModalImage(item.image)}
              />
            )}
          </div>
        ))}
      </div>

      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setModalImage(null)}
        >
          <img src={modalImage} className="max-w-full max-h-full rounded-lg shadow-lg" alt="Modal" />
        </div>
      )}

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
        {isResting ? 'Pausa' : 'Attiva'}: {secondsLeft}s
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
