import React from 'react';

export default function ProviderCard({ provider, onView }) {
  return (
    <article className="professional-card" tabIndex={0} aria-labelledby={`name-${provider.id}`}>
      <img src={provider.image} alt={`${provider.name} profile`} />
      <div className="card-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
          <div>
            <h3 id={`name-${provider.id}`}>{provider.name}</h3>
            <div className="profession">{provider.profession}</div>
            <div className="experience">{provider.experience}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="stars">★ {provider.rating}</div>
            <div className="price">${provider.price}/hr</div>
          </div>
        </div>

        <p style={{ color: '#374151', marginBottom: '0.5rem' }}>{provider.bio}</p>

        <div className="chip-list">
          {provider.skills.slice(0,5).map((s)=> <span key={s} className="chip">{s}</span>)}
        </div>

        <div className="card-actions">
          <div className="card-cta">
            <button className="btn-hire" onClick={onView} aria-label={`View ${provider.name}`}>View Profile</button>
          </div>
        </div>
      </div>
    </article>
  );
}
