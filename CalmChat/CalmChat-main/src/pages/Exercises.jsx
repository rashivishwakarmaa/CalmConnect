const EXERCISES_BY_ISSUE = [
  {
    id: 'anxiety',
    title: 'Anxiety',
    icon: '😌',
    exercises: [
      { name: '4-7-8 Breathing', steps: ['Breathe in for 4 seconds', 'Hold for 7 seconds', 'Breathe out slowly for 8 seconds', 'Repeat 3–4 times'], benefit: 'Calms the nervous system and reduces acute anxiety.' },
      { name: '5-4-3-2-1 Grounding', steps: ['Name 5 things you can see', '4 things you can touch', '3 things you can hear', '2 things you can smell', '1 thing you can taste'], benefit: 'Brings focus to the present and interrupts anxious thoughts.' },
      { name: 'Progressive Muscle Relaxation', steps: ['Tighten and hold each muscle group for 5 seconds', 'Start from feet, move up to calves, thighs, abdomen, arms, face', 'Release and notice the relaxation'], benefit: 'Reduces physical tension linked to anxiety.' },
      { name: 'Box Breathing', steps: ['Inhale for 4 counts', 'Hold for 4 counts', 'Exhale for 4 counts', 'Hold for 4 counts', 'Repeat 4–5 cycles'], benefit: 'Helps regulate breath and calm racing thoughts.' },
    ],
  },
  {
    id: 'depression',
    title: 'Depression',
    icon: '🌱',
    exercises: [
      { name: 'Behavioral Activation Walk', steps: ['Step outside for a 10–15 minute walk', 'Notice sights, sounds, and air', 'No need to rush or achieve anything'], benefit: 'Gentle movement and sunlight can improve mood.' },
      { name: 'Gratitude Journaling', steps: ['Write down 3 things you are grateful for', 'Can be small (warm tea, a smile)', 'Do this daily, ideally in the morning'], benefit: 'Shifts focus toward positive experiences.' },
      { name: 'Opposite Action', steps: ['Identify an urge to withdraw or avoid', 'Do the opposite: reach out, move, or engage', 'Start with a small, manageable action'], benefit: 'Breaks the cycle of withdrawal and low motivation.' },
      { name: 'Small Wins List', steps: ['List 2–3 tiny tasks for the day', 'Check them off as you complete them', 'Celebrate each completion'], benefit: 'Builds a sense of accomplishment.' },
    ],
  },
  {
    id: 'stress',
    title: 'Stress',
    icon: '🧘',
    exercises: [
      { name: 'Body Scan Meditation', steps: ['Sit or lie down comfortably', 'Close eyes and slowly scan from head to toes', 'Notice sensations without judging them'], benefit: 'Releases stored tension and promotes relaxation.' },
      { name: 'Mindful Breathing', steps: ['Focus only on your breath', 'When thoughts drift, gently return to the breath', 'Continue for 5–10 minutes'], benefit: 'Centers the mind and lowers stress hormones.' },
      { name: 'Quick Stretch Break', steps: ['Stand and stretch arms overhead', 'Gently roll shoulders back', 'Stretch neck side to side'], benefit: 'Relieves physical tension from prolonged sitting.' },
      { name: 'Worry Time', steps: ['Set a 15-minute “worry window” each day', 'Postpone worries until that time', 'Use the time to problem-solve or let go'], benefit: 'Contains rumination and frees mental space.' },
    ],
  },
  {
    id: 'sleep',
    title: 'Sleep & Insomnia',
    icon: '🌙',
    exercises: [
      { name: 'Wind-Down Routine', steps: ['Dim lights 1 hour before bed', 'Avoid screens', 'Do calming activities (reading, gentle music)'], benefit: 'Signals to the body that it is time to sleep.' },
      { name: '4-7-8 Breathing in Bed', steps: ['Lie down and close eyes', 'Use 4-7-8 breathing (inhale 4, hold 7, exhale 8)', 'Repeat until you feel drowsy'], benefit: 'Promotes relaxation and sleep onset.' },
      { name: 'Sleep Restriction', steps: ['Only go to bed when actually sleepy', 'Get up at the same time daily', 'Avoid napping late in the day'], benefit: 'Strengthens the sleep–bed connection.' },
    ],
  },
  {
    id: 'general',
    title: 'General Wellbeing',
    icon: '💪',
    exercises: [
      { name: 'Daily 5-Minute Meditation', steps: ['Sit quietly and focus on breath', 'Use an app or timer', 'Build consistency over time'], benefit: 'Supports overall mental clarity and resilience.' },
      { name: 'Self-Compassion Pause', steps: ['Place hand on heart', 'Say: “May I be kind to myself”', 'Acknowledge difficulty without judgment'], benefit: 'Reduces self-criticism and increases self-worth.' },
      { name: 'Social Connection', steps: ['Reach out to one person (call, message)', 'Share how you feel', 'Ask for support if needed'], benefit: 'Reduces loneliness and builds support.' },
    ],
  },
];

export default function Exercises() {
  return (
    <section className="exercises-page py-4 py-md-5">
      <div className="mb-5">
        <h1 className="mb-3">Mental Health Exercises</h1>
        <p className="lead text-muted">
          Evidence-based exercises you can practice at home for common mental health challenges. Always consult a professional for personalized guidance.
        </p>
      </div>

      {EXERCISES_BY_ISSUE.map((group) => (
        <div key={group.id} className="mb-5">
          <h2 className="h3 mb-4 d-flex align-items-center gap-2">
            <span>{group.icon}</span>
            {group.title}
          </h2>
          <div className="row g-4">
            {group.exercises.map((ex) => (
              <div key={ex.name} className="col-md-6 col-lg-4">
                <div className="card h-100 contact-card">
                  <div className="card-body p-4">
                    <h5 className="card-title text-primary">{ex.name}</h5>
                    <p className="small text-muted mb-3">{ex.benefit}</p>
                    <ol className="mb-0 ps-3 small">
                      {ex.steps.map((step, i) => (
                        <li key={i} className="mb-1">{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="alert alert-info mt-4">
        <strong>Note:</strong> These exercises are meant to support—not replace—professional treatment. If you are struggling, please reach out to a mental health provider or use the Contact page to find a specialist.
      </div>
    </section>
  );
}
