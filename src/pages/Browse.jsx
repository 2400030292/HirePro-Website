import React, { useMemo } from 'react';
import ProviderCard from '../components/ProviderCard';

export default function Browse({ providers = [], onView, query, onQueryChange, category, onCategoryChange, sort, setSort }){
  const total = providers.length;

  const categories = useMemo(() => {
    const set = new Set(providers.map(p => p.profession));
    return ['all', ...Array.from(set)];
  }, [providers]);

  return (
    <div className="browse-page" style={{ maxWidth: 1200, margin: '1.5rem auto', padding: '0 1rem' }}>
      <section className="browse-hero" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h2 style={{ margin: 0 }}>Find trusted professionals</h2>
          <p style={{ margin: '0.35rem 0 0', color: 'var(--muted)' }}>{total} professionals • Verified profiles • Secure messaging</p>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <input
            aria-label="Search professionals"
            placeholder="Search by name, skills or city"
            value={query}
            onChange={(e) => onQueryChange && onQueryChange(e.target.value)}
            style={{ padding: '0.6rem 0.75rem', borderRadius: 8, border: '1px solid var(--muted)', minWidth: 260 }}
          />

          <select value={sort} onChange={(e) => setSort && setSort(e.target.value)} aria-label="Sort results" style={{ padding: '0.5rem', borderRadius: 8 }}>
            <option value="relevance">Relevance</option>
            <option value="rating">Top rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </section>

      <div className="browse-grid" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 20 }}>
        <aside className="filters-panel" style={{ padding: 16, borderRadius: 8, border: '1px solid var(--muted)' }}>
          <h4 style={{ marginTop: 0 }}>Filters</h4>

          <label style={{ display: 'block', marginBottom: 8 }}>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6 }}>Category</div>
            <select value={category} onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)} style={{ width: '100%', padding: '0.45rem', borderRadius: 6 }}>
              {categories.map(c => <option key={c} value={c}>{c === 'all' ? 'All professions' : c}</option>)}
            </select>
          </label>

          <label style={{ display: 'block', marginBottom: 8 }}>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6 }}>Location</div>
            <input placeholder="City or state" style={{ width: '100%', padding: '0.45rem', borderRadius: 6 }} />
          </label>

          <label style={{ display: 'block', marginBottom: 8 }}>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6 }}>Hourly rate</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input placeholder="Min" style={{ padding: '0.4rem', borderRadius: 6, width: '50%' }} />
              <input placeholder="Max" style={{ padding: '0.4rem', borderRadius: 6, width: '50%' }} />
            </div>
          </label>

          <div style={{ marginTop: 12 }}>
            <button className="btn" style={{ width: '100%' }}>Apply</button>
          </div>
        </aside>

        <section className="results-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ color: 'var(--muted)' }}>{total} results</div>
            <div style={{ color: 'var(--muted)', fontSize: 13 }}>Last updated • Today</div>
          </div>

          <div className="results-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {providers.map(p => (
              <ProviderCard key={p.id} provider={p} onView={() => onView ? onView(p) : null} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
