const CONDITIONS = [
  { id: 'depression', title: 'Depression', icon: 'https://img.icons8.com/ios-filled/48/depression.png', summary: 'Feeling sad or hopeless for extended periods.', detail: 'Depression is a common mental health condition characterized by persistent feelings of sadness, hopelessness, and a loss of interest in activities.' },
  { id: 'anxiety', title: 'Anxiety', icon: 'https://img.icons8.com/ios-filled/48/anxiety.png', summary: 'Excessive worry and fear, often leading to physical symptoms.', detail: 'Anxiety is characterized by excessive worry and fear, often leading to rapid heartbeat, sweating, difficulty breathing, restlessness, and difficulty concentrating.' },
  { id: 'bipolar', title: 'Bipolar Disorder', icon: 'https://img.icons8.com/ios-glyphs/48/bipolar-disease.png', summary: 'Extreme mood swings, from high (mania) to low (depression).', detail: 'Bipolar disorder involves extreme mood swings including manic (highs) and depressive (lows) episodes.' },
  { id: 'schizophrenia', title: 'Schizophrenia', icon: 'https://img.icons8.com/ios-filled/48/schizophrenia.png', summary: 'Hallucinations, delusions, and disordered thinking.', detail: 'Schizophrenia involves hallucinations, delusions, and difficulty thinking clearly and organizing thoughts.' },
  { id: 'adhd', title: 'ADHD', icon: 'https://img.icons8.com/ios-filled/48/adhd.png', summary: 'Difficulty paying attention, hyperactivity, and impulsivity.', detail: 'ADHD is characterized by inattention, hyperactivity, and impulsivity.' },
  { id: 'ocd', title: 'OCD', icon: 'https://img.icons8.com/external-inipagistudio-mixed-inipagistudio/48/external-ocd-mental-health-inipagistudio-mixed-inipagistudio.png', summary: 'Persistent unwanted thoughts and repetitive behaviors.', detail: 'OCD involves intrusive thoughts (obsessions) and repetitive behaviors (compulsions) like handwashing, checking, or counting.' },
];

export default function Home() {
  return (
    <>
      <div className="hero-section">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold mb-3 text-shadow-2">Your Mental Health, Our Priority.</h1>
              <p className="lead opacity-90">Find peace, support, and guidance.</p>
              <a href="#features" className="btn btn-light btn-lg px-4 mt-2">Start Your Journey</a>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-5" id="features">
        <h2>Understanding Mental Health</h2>
        <p className="text-muted">Mental health affects how we think, feel, and act. It helps determine how we handle stress, relate to others, and make choices.</p>
        <hr className="mb-5" />
        <h3 className="mb-4">Common Mental Health Conditions</h3>
        <div className="row g-4">
          {CONDITIONS.map((c) => (
            <div key={c.id} className="col-md-6 col-lg-4">
              <div className="card h-100 card-d">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between mb-2">
                    <h5 className="card-title">{c.title}</h5>
                    <img src={c.icon} alt={c.title} width="48" height="48" />
                  </div>
                  <p className="card-text">{c.summary}</p>
                  <p className="card-text small text-muted">{c.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container px-4 py-5">
        <h2>Why Mental Health Matters</h2>
        <hr className="mb-4" />
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h5 className="fw-bold">Improved Quality of Life</h5>
            <p className="text-muted">Good mental health can lead to a happier and more fulfilling life.</p>
            <h5 className="fw-bold">Stronger Relationships</h5>
            <p className="text-muted">Mental health affects how we interact with others.</p>
            <h5 className="fw-bold">Better Physical Health</h5>
            <p className="text-muted">Mental health can impact physical health conditions.</p>
            <h5 className="fw-bold">Increased Productivity</h5>
            <p className="text-muted">A healthy mind leads to increased productivity.</p>
          </div>
          <div className="col-lg-6 text-center">
            <img src="/assets/mental-health.svg" alt="Mental health" className="img-fluid" style={{ maxWidth: 320 }} />
          </div>
        </div>
        <p className="mt-4 fw-semibold">Remember, you&apos;re not alone. Seek help and support.</p>
      </div>

      <div className="container px-4 py-5 text-center" style={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <img src="/logo.svg" alt="CalmConnect" className="d-block mx-auto mb-4" width={200} height={42} />
        <h1 className="display-6 fw-bold mb-3">How CalmConnect Can Help</h1>
        <p className="lead text-muted mb-4 mx-auto" style={{ maxWidth: 600 }}>
          CalmConnect is designed to support your mental health journey with educational resources, mindfulness techniques, expert advice, and a supportive community.
        </p>
      </div>
    </>
  );
}
