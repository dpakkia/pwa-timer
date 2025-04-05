import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle.tsx';

const warmup = [
  { name: 'Jumping Jack', duration: '2 min' },
  { name: 'Affondi in camminata', duration: '10 per gamba' },
  { name: 'Rotazioni braccia e spalle', duration: '1 min' },
  { name: 'Squat leggeri', duration: '15 ripetizioni' },
];

const circuit = [
  'Burpees',
  'Push-up',
  'Squat Jump',
  'Plank',
  'Mountain Climbers',
];

const strength = [
  'Trazioni all elastico x 3 serie',
  'Dips su sedia x 3 serie da 8-10',
  'Pike Push-up x 3 serie da 10',
  'Hollow Hold x 3 serie da 30 sec'
];

export default function CorpoLibero() {
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
    <div className="p-4 max-w-md mx-auto space-y-6 pb-24 bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
      <ThemeToggle />

      <h1 className="text-2xl font-bold text-center">Allenamento Corpo Libero</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Riscaldamento (15 min)</h2>
        <ul className="space-y-1">
          {warmup.map((item) => (
            <li key={item.name} className="text-sm">✅ {item.name} - {item.duration}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mt-6 mb-2">Circuito Full Body (4 giri)</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">30 sec esercizio / 1 min riposo tra i giri</p>
        <ul className="space-y-1 mt-1">
          {circuit.map((ex) => (
            <li key={ex} className="text-sm">🔁 {ex}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mt-6 mb-2">Allenamento di Forza Calisthenics</h2>
        <ul className="space-y-1">
          {strength.map((ex) => (
            <li key={ex} className="text-sm">💪 {ex}</li>
          ))}
        </ul>
      </section>

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
