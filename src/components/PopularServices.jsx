import React from 'react';

const services = [
  { id:1, name: 'Plumber', desc: 'Fix leaks, installations', color: '#06b6d4' },
  { id:2, name: 'Electrician', desc: 'Wiring & repairs', color: '#6366f1' },
  { id:3, name: 'Web Designer', desc: 'Design & build sites', color: '#06b6d4' },
  { id:4, name: 'Home Tutor', desc: 'Personal tutors', color: '#06b6d4' },
  { id:5, name: 'Photographer', desc: 'Event & product', color: '#6366f1' },
  { id:6, name: 'House Cleaning', desc: 'Deep & regular cleaning', color: '#06b6d4' }
];

export default function PopularServices(){
  return (
    <section className="popular-services" aria-labelledby="services-title">
      <div className="section-inner">
        <h3 id="services-title">Popular Services</h3>
        <p className="section-sub">Choose from the most requested services near you.</p>

        <div className="services-grid">
          {services.map(s => (
            <article key={s.id} className="service-card">
              <div className="service-icon" style={{background: s.color}} aria-hidden></div>
              <div>
                <h4>{s.name}</h4>
                <p className="muted">{s.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
