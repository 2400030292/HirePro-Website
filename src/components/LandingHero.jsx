import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingHero(){
  const nav = useNavigate();

  function onSearch(e){
    e.preventDefault();
    const form = e.target;
    const category = form.category.value;
    const q = form.q.value;
    // push to browse with query params
    const url = `/browse` + (q || category ? `?q=${encodeURIComponent(q)}&cat=${encodeURIComponent(category)}` : '');
    nav(url);
  }

  return (
    <section className="hero-section">
      <div className="hero-inner">
        <div className="hero-left">
          <div className="eyebrow">HirePro • Trusted professionals</div>
          <h1 className="hero-title">Find Trusted Professionals Instantly</h1>
          <p className="hero-sub">Hire experts for home, tech, repair, learning and 50+ other services.</p>

          <form className="hero-search" onSubmit={onSearch} role="search" aria-label="Search for professionals">
            <select name="category" aria-label="Category" className="search-category">
              <option value="">All categories</option>
              <option>Plumber</option>
              <option>Electrician</option>
              <option>Tutor</option>t
              <option>Designer</option>
              <option>Photographer</option>
            </select>
            <input name="q" className="search-input" placeholder="Search for a service..." aria-label="Search" />
            <button className="btn btn-search" type="submit">Search</button>
          </form>

          <div className="hero-quick">
            <span>Popular:</span>
            <ul>
              <li onClick={()=>nav('/browse?cat=Plumber')}>Plumber</li>
              <li onClick={()=>nav('/browse?cat=Electrician')}>Electrician</li>
              <li onClick={()=>nav('/browse?cat=Web Designer')}>Web Designer</li>
            </ul>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-visuals">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=60&auto=format&fit=crop" alt="Professionals collaborating" className="hero-illustration"/>
            <div className="avatar-stack">
              <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="pro"/>
              <img src="https://randomuser.me/api/portraits/men/43.jpg" alt="pro"/>
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="pro"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
