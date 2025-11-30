import React from 'react';

const items = [
  { id:1, name:'Asha', service:'Plumbing', quote:'Quick, professional and affordable. Highly recommended!', avatar:'https://randomuser.me/api/portraits/women/68.jpg' },
  { id:2, name:'Ravi', service:'Web Design', quote:'Delivered ahead of schedule and superb quality.', avatar:'https://randomuser.me/api/portraits/men/43.jpg' },
  { id:3, name:'Maya', service:'Home Tutor', quote:'My kids love the sessions — great patience and results.', avatar:'https://randomuser.me/api/portraits/women/44.jpg' }
];

export default function Testimonials(){
  return (
    <section className="testimonials" aria-labelledby="test-title">
      <div className="section-inner">
        <h3 id="test-title">⭐ Loved by Thousands</h3>
        <div className="test-grid">
          {items.map(i => (
            <div key={i.id} className="test-card">
              <img src={i.avatar} alt={i.name} />
              <div>
                <strong>{i.name}</strong>
                <div className="muted small">{i.service}</div>
                <p className="muted">"{i.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
