import React from 'react';

const steps = [
  { id:1, title: 'Search for a Professional', desc: 'Find experts by category, price, location.' },
  { id:2, title: 'Compare Profiles & Ratings', desc: 'Check reviews, portfolio, experience.' },
  { id:3, title: 'Hire Instantly & Get Work Done', desc: 'Chat, book, and pay (optional).' }
];

export default function HowItWorks(){
  return (
    <section className="how-it-works" aria-labelledby="how-title">
      <div className="section-inner">
        <h3 id="how-title">How It Works</h3>
        <div className="steps-grid">
          {steps.map(s => (
            <div key={s.id} className="step-card">
              <div className="step-icon">{s.id}</div>
              <h4>{s.title}</h4>
              <p className="muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
