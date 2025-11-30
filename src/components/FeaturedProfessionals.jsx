import React from 'react';
import ProviderCard from './ProviderCard';
import providersData from '../data/providers';

export default function FeaturedProfessionals(){
  const featured = providersData.slice(0,8);
  return (
    <section className="featured-pros" aria-labelledby="featured-title">
      <div className="section-inner">
        <h3 id="featured-title">Top Rated Professionals</h3>
        <div className="featured-row">
          {featured.map(p => (
            <div key={p.id} className="featured-card-wrap">
              <ProviderCard provider={p} onView={()=>null} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
