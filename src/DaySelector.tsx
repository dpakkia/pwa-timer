import { useState } from 'react';

export default function DaySelector() {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [subCategory, setSubCategory] = useState<string | null>(null);

  const renderSubOptions = () => {
    switch (subCategory) {
      case 'trekking':
        return (
          <div className="space-y-2">
            <Option label="Preparazione" link="/preparazione.html" />
            <Option label="Defaticamento" link="/defaticamento.html" />
          </div>
        );
      case 'sport':
        return (
          <div className="space-y-2">
            <Option label="Riscaldamento" link="/riscaldamento.html" />
            <Option label="Fine Sport" link="/fine-sport.html" />
          </div>
        );
      default:
        return null;
    }
  };

  const renderOptions = () => {
    switch (selectedDay) {
      case 'sport': {
        const faded = subCategory !== null ? 'opacity-50' : '';
        return (
          <div className="space-y-2">
            <Option
              label="Allenamento a corpo libero"
              link="/corpo-libero.html"
              className={faded}
            />
            <button
              onClick={() => setSubCategory('trekking')}
              className={`block w-full bg-[#111] text-center py-2 rounded-lg hover:bg-opacity-80 transition ${faded}`}
            >
              Trekking
            </button>
            <button
              onClick={() => setSubCategory('sport')}
              className={`block w-full bg-[#111] text-center py-2 rounded-lg hover:bg-opacity-80 transition ${faded}`}
            >
              Sport
            </button>
            {renderSubOptions()}
          </div>
        );
      }
      case 'lavoro':
        return (
          <div className="space-y-2">
            <Option label="Mattina" link="/mattina.html" />
            <Option label="Sera" link="/sera.html" />
            <Option label="Stretching finale" link="/stretching-finale.html" />
          </div>
        );
      case 'post':
        return (
          <div className="space-y-2">
            <Option label="Vai al timer" link="/timer.html" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Scegli il tipo di giornata</h1>

      {!selectedDay ? (
        <div className="space-y-4 w-full max-w-xs">
          <button onClick={() => setSelectedDay('sport')} className="w-full bg-blue-600 text-white py-2 rounded-lg shadow">Giornata di sport</button>
          <button onClick={() => setSelectedDay('lavoro')} className="w-full bg-green-600 text-white py-2 rounded-lg shadow">Giornata sul set</button>
          <button onClick={() => setSelectedDay('post')} className="w-full bg-purple-600 text-white py-2 rounded-lg shadow">Giornata sedentaria</button>
        </div>
      ) : (
        <div className="w-full max-w-xs space-y-4">
          <button onClick={() => { setSelectedDay(null); setSubCategory(null); }} className="text-sm underline text-[#aaa]">← Torna indietro</button>
          {renderOptions()}
        </div>
      )}
    </div>
  );
}

function Option({ label, link, className = '' }: { label: string; link: string; className?: string }) {
  return (
    <a
      href={link}
      className={`block w-full bg-[#111] text-center py-2 rounded-lg hover:bg-opacity-80 transition ${className}`}
    >
      {label}
    </a>
  );
}
