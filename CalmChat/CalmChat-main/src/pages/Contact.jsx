const SPECIALISTS = [
  { name: 'Dr. Sanjeet Diwan', role: 'DE Addiction Specialist in Bhopal', experience: '18+ years in de-addiction and substance abuse treatment', phone: '9098356914', address: 'Tilak Nagar, Bawadia Kalan, near Jaanki Hospital, Bhopal (462026)' },
  { name: 'Dr. Vaibhav Dubey', role: 'Psychiatrist', experience: '12+ years in general psychiatry and mood disorders', phone: '8269688901', address: '30 Civil Lines, between Kilol Park petrol pump and Polytechnic Square, near Angithi Restaurant, Bhopal (462001)' },
  { name: 'Dr. Hritu Singh', role: 'Clinical Psychologist', experience: '10+ years in psychotherapy and behavioral therapy', phone: '7987430979', address: 'First floor, C7, Narmadapuram Road, beside Pizza Hut, above Canning Desk pet shop, Vidya Nagar, Bhopal (462026)' },
  { name: 'Dr. Mitali Soni Loya', role: 'Psychiatrist', experience: '14+ years in child and adolescent psychiatry', phone: '8817475079', address: 'Ramanand Nagar Nayapura, Near Lalghati Square (462032)' },
  { name: 'Dr. Manish Borasi', role: 'Psychiatrist', experience: '15+ years in neuropsychiatry and neurological disorders', phone: '7509033394', address: '16, 17, 18 Saraswati Nagar, in front of Hanuman Mandir, Jawahar Chowk, Bhopal (462003)' },
  { name: 'Dr. Rashmi Moghe Hirve', role: 'Psychiatrist', experience: '20+ years in women’s mental health and anxiety disorders', phone: '8120309843', address: '1 Akriti Eco City, in front of Royal Marriage Garden, near Gulmohar Colony, Bawadiya Kalan, Bhopal (462026)' },
  { name: 'Dr. Sumera Khan Hashmi', role: 'Psychiatrist', experience: '16+ years in clinical psychiatry and depression management', phone: '9329578685', address: 'TiHashmi Clinic, in front of Arjun Bhawan, Badabagh, Shahjahanabad, Bhopal (462001)' },
  { name: 'Dr. JP Agrawal', role: 'Psychiatrist', experience: '22+ years in adult psychiatry and stress management', phone: '8103557058', address: '14, Bhadbada Rd, MLA Quarters, New Market, TT Nagar, Bhopal' },
  { name: 'Samarth Neuro-Psychiatry Clinic', role: 'Neuropsychiatry Centre', experience: '25+ years combined expertise in neuropsychiatry and brain health', phone: '7999748538', address: 'E3/212, E-3 Area Colony, Bhopal (462016)' },
  { name: 'Prayas Nasha Mukti Evam Manochikitsa Kendra', role: 'De-addiction & Counselling Centre', experience: 'Over 15 years in de-addiction rehabilitation and counselling', phone: '7772886600', address: 'DHV 2/208 Danish Hills View, Banjari Bazar, Dashara Maidan, Kolar Rd, Bhopal (462042)' },
  { name: 'Dr. Pritesh Goutam - Nirvana Clinic', role: 'Psychiatrist', experience: '13+ years in anxiety, depression and holistic mental health', phone: '9893853317', address: 'UG 6-7, Kartar Arcade, Raisen Rd, New Subhash Nagar, Ashoka Garden, Bhopal (462023)' },
  { name: 'Dr. R.N. Sahu', role: 'Senior Psychiatrist', experience: '30+ years in psychiatry, teaching and clinical practice', phone: '07554231326', address: 'A-4, opposite Old Secretariat, BDA Colony, Bhopal (462001)' },
  { name: 'Dr. Chirag Patel', role: 'Psychiatrist', experience: '11+ years in adult and geriatric mental health', phone: '9713889966', address: '41, Motia Talab Rd, Near GPO Marg, Royal Market, Peer Gate Area, Bhopal (462001)' },
  { name: 'Dr. SK Tondon', role: 'Consultant Psychiatrist', experience: '28+ years in clinical psychiatry and community mental health', phone: '07552427374', address: '645, E-7, Arera Colony, Bhopal (462016)' },
];

const AMBULANCE_SERVICES = [
  { name: 'Life Care Cardiac Ambulance Service', phone: '9826017240' },
  { name: 'Medilift Air Ambulance Services', phone: '7367020595' },
];

export default function Contact() {
  return (
    <section className="py-5">
      <div className="container">
        <h1 className="mb-5">Our Trusted Specialists</h1>
        <hr className="mb-5" />
        <div className="row g-4">
          {SPECIALISTS.map((s) => (
            <div key={s.name} className="col-md-6 col-xl-4">
              <div className="card h-100 contact-card">
                <div className="card-body p-4">
                  <h3 className="mb-3 h5">{s.name}</h3>
                  {s.role && <p className="text-muted small mb-1">{s.role}</p>}
                  {s.experience && <p className="text-primary small mb-2 fw-medium">{s.experience}</p>}
                  {s.phone && <p className="mb-1"><a href={`tel:${s.phone}`} className="text-decoration-none">{s.phone}</a></p>}
                  {s.address && <p className="text-muted small mb-0">{s.address}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-5 mb-4">Ambulance Services</h2>
        <hr className="mb-4" />
        <div className="row g-4">
          {AMBULANCE_SERVICES.map((s) => (
            <div key={s.name} className="col-md-6">
              <div className="card contact-card">
                <div className="card-body p-4">
                  <h3 className="mb-3 h5">{s.name}</h3>
                  <p className="mb-0"><a href={`tel:${s.phone}`} className="text-decoration-none">{s.phone}</a></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
