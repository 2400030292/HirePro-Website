import React from 'react';

const items = [
  'Verified & Trusted Professionals',
  'Secure Hiring Process',
  'Real-Time Chat & Support',
  'Transparent Pricing',
  'Fast & Reliable Service'
];

export default function WhyChooseUs(){
  return (
    <section className="why-choose" aria-labelledby="why-title">
      <div className="section-inner">
        <h3 id="why-title">Why Choose Us</h3>
        <div className="why-grid">
          {items.map((t,i)=> (
            <div key={i} className="why-card">
              <div className="why-icon">✔</div>
              <div>
                <strong>{t}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
