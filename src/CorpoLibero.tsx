import { useEffect, useState } from 'react';

const warmup = [
  { name: 'Jumping Jack', duration: '2 min', videoUrl: 'https://www.youtube.com/embed/gG2Z1siSvkk' },
  { name: 'Affondi in camminata', duration: '10 per gamba', videoUrl: 'https://www.youtube.com/embed/UpyDdQjBTa0' },
  { name: 'Rotazioni braccia e spalle', duration: '1 min', videoUrl: 'https://www.youtube.com/embed/D40wm6vbI_0' },
  { name: 'Squat leggeri', duration: '15 ripetizioni', videoUrl: 'https://www.youtube.com/embed/Zqc_lc93hak' },
];

const circuit = [
  { name: 'Burpees', url: 'https://www.youtube.com/embed/E-Oc0zjeqWo' },
  { name: 'Push-up', url: 'https://www.youtube.com/embed/v9LABVJzv8A' },
  { name: 'Squat Jump', url: 'https://www.youtube.com/embed/bv7as8mDXLQ' },
  { name: 'Plank', url: 'https://www.youtube.com/embed/pSHjTRCQxIw' },
  { name: 'Mountain Climbers', url: 'https://www.youtube.com/embed/w2iTOneGPdU' },
];

const strength = [
  { name: "Trazioni all'elastico x 3 serie", url: 'https://www.youtube.com/embed/8zv8Pray4-w' },
  { name: 'Dips su sedia x 3 serie da 8-10', url: 'https://www.youtube.com/embed/AWz_7B1cch0' },
  { name: 'Pike Push-up x 3 serie da 10', url: 'https://www.youtube.com/embed/XckEEwa1BPI' },
  { name: 'Hollow Hold x 3 serie da 30 sec', url: 'https://www.youtube.com/embed/4xRpGgttca8' },
];

const mobility = [
  { name: 'Stretching dinamico per spalle, anche, schiena', type: 'img', src: 'https://darebee.com/images/workouts/back-and-neck-pain-relief-workout.jpg' },
  { name: 'Posizione del piccione (yoga)', type: 'video', src: 'https://www.youtube.com/embed/hRO9m4iMvtE' },
  { name: 'Stretching Flessori dell\'anca e quadricipiti', type: 'img', src: 'https://darebee.com/images/workouts/hip-flexors-workout.jpg' },
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

  useEffect(() => {
    const handlePopState = () => setModalImage(null);
    if (modalImage) {
      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', handlePopState);
    }
    return () => window.removeEventListener('popstate', handlePopState);
  }, [modalImage]);

  return (
    <div className="p-4 max-w-md mx-auto space-y-6 pb-24 bg-black text-white min-h-screen relative">

      <h1 className="text-2xl font-bold text-center">Allenamento Corpo Libero</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Riscaldamento (15 min)</h2>
        <ul className="space-y-4">
          {warmup.map((item) => (
            <li key={item.name} className="text-sm">
              ✅ {item.name} – {item.duration}
              {item.videoUrl && (
                <div className="aspect-w-16 aspect-h-9 mt-2">
                  <iframe
                    className="w-full h-48"
                    src={item.videoUrl}
                    title={item.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mt-6 mb-2">Circuito Full Body (4 giri)</h2>
        <p className="text-sm text-[#aaa]">30 sec esercizio · 1 min riposo tra i giri</p>
        <ul className="space-y-4 mt-2">
          {circuit.map((item) => (
            <li key={item.name} className="text-sm">
              🔁 {item.name}
              {item.url && (
                <div className="aspect-w-16 aspect-h-9 mt-2">
                  <iframe
                    className="w-full h-48"
                    src={item.url}
                    title={item.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mt-6 mb-2">Allenamento di Forza Calisthenics</h2>
        <ul className="space-y-4">
          {strength.map((item) => (
            <li key={item.name} className="text-sm">
              💪 {item.name}
              {item.url && (
                <div className="aspect-w-16 aspect-h-9 mt-2">
                  <iframe
                    className="w-full h-48"
                    src={item.url}
                    title={item.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mt-6 mb-2">Stretching e Mobilità (15–20 min)</h2>
        <ul className="space-y-4">
          {mobility.map((item) => (
            <li key={item.name} className="text-sm">
              🧘 {item.name}
              {item.type === 'img' && (
                <div className="mt-2 rounded overflow-hidden cursor-pointer" onClick={() => setModalImage(item.src)}>
                  <img src={item.src} alt={item.name} className="w-full h-auto rounded shadow" />
                </div>
              )}
              {item.type === 'video' && (
                <div className="aspect-w-16 aspect-h-9 mt-2">
                  <iframe
                    className="w-full h-48"
                    src={item.src}
                    title={item.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </li>
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

      {modalImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onClick={() => setModalImage(null)}
        >
          <img
            src={modalImage}
            alt="Modal"
            className="max-w-full max-h-full rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-4 right-4 text-white text-2xl font-bold"
            onClick={() => setModalImage(null)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
