import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function DaySelector() {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const renderOptions = () => {
    switch (selectedDay) {
      case 'sport':
        return (
          <div className="space-y-2">
            <Option label="Allenamento a corpo libero" link="/workout.html" />
            <Option label="Trekking" link="/workout.html" />
            <Option label="Sport" link="/workout.html" />
          </div>
        );
      case 'lavoro':
        return (
          <div className="space-y-2">
            <Option label="Mattina" link="/src/main.tsx" />
            <Option label="Sera" link="/src/main.tsx" />
            <Option label="Stretching finale" link="/workout.html" />
          </div>
        );
      case 'post':
        return (
          <div className="space-y-2">
            <Option label="Vai al timer" link="/" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col items-center justify-center p-4 space-y-6">
      <ThemeToggle />
      <h1 className="text-2xl font-bold text-center">Scegli il tipo di giornata</h1>

      {!selectedDay ? (
        <div className="space-y-4 w-full max-w-xs">
          <button onClick={() => setSelectedDay('sport')} className="w-full bg-blue-600 text-white py-2 rounded-lg shadow">Giornata di sport</button>
          <button onClick={() => setSelectedDay('lavoro')} className="w-full bg-green-600 text-white py-2 rounded-lg shadow">Giornata di lavoro esterno</button>
          <button onClick={() => setSelectedDay('post')} className="w-full bg-purple-600 text-white py-2 rounded-lg shadow">Giornata di post-produzione</button>
        </div>
      ) : (
        <div className="w-full max-w-xs space-y-4">
          <button onClick={() => setSelectedDay(null)} className="text-sm underline text-gray-500 dark:text-gray-400">← Torna indietro</button>
          {renderOptions()}
        </div>
      )}
    </div>
  );
}

function Option({ label, link }: { label: string; link: string }) {
  return (
    <a href={link} className="block w-full bg-gray-200 dark:bg-gray-700 text-center py-2 rounded-lg hover:bg-opacity-80 transition">
      {label}
    </a>
  );
}
