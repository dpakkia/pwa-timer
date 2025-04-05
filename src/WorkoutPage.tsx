const trainingPlan = [
  {
    title: 'Warm-up',
    exercises: [
      {
        name: 'Jumping Jacks',
        videoUrl: 'https://www.youtube.com/embed/c4DAnQ6DtF8',
      },
      {
        name: 'Arm Circles',
        videoUrl: 'https://www.youtube.com/embed/rPkwjGAib1g',
      },
    ],
  },
  {
    title: 'Strength',
    exercises: [
      {
        name: 'Push Ups',
        videoUrl: 'https://www.youtube.com/embed/IODxDxX7oi4',
      },
      {
        name: 'Bodyweight Squats',
        videoUrl: 'https://www.youtube.com/embed/aclHkVaku9U',
      },
    ],
  },
  {
    title: 'Cool Down',
    exercises: [
      {
        name: 'Stretching Routine',
        videoUrl: 'https://www.youtube.com/embed/_Zem0_qsDg0',
      },
    ],
  },
];

export default function WorkoutPage() {
  return (
    <div className="p-4 max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center text-blue-800">End of Day Workout</h1>

      {trainingPlan.map((section) => (
        <div key={section.title}>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">{section.title}</h2>
          <div className="space-y-4">
            {section.exercises.map((exercise) => (
              <div key={exercise.name} className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 mb-2">{exercise.name}</h3>
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
        </div>
      ))}

      <div className="text-center mt-8">
        <button
          onClick={() => (window.location.href = '/')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Torna all'inizio
        </button>
      </div>
    </div>
  );
}
