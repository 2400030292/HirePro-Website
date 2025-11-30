import React from 'react';

export default function CTASection(){
  return (
    <section className="cta-section" aria-labelledby="cta-title">
      <div className="cta-inner">
        <h2 id="cta-title">Ready to Hire the Best Professionals?</h2>
        <div className="cta-actions">
          <a className="btn btn-primary" href="/browse">Find Professionals</a>
          <a className="btn btn-become" href="/become">Become a Professional</a>
        </div>
      </div>
    </section>
  );
}
