import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Header({ query, onQueryChange }) {
  const { user, signOut } = useAuth();
  const nav = useNavigate();

  function onSignClick(){
    if(user) signOut();
    else nav('/signin');
  }

  return (
    <header className="site-navbar" role="banner">
      <div className="nav-left">
        <Link to="/" className="brand"><span className="logo">HirePro</span></Link>
        <nav className="nav-links" aria-label="Primary">
          <Link to="/">Home</Link>
          <Link to="/browse">Services</Link>
          <Link to="/browse">Professionals</Link>
          <Link to="/support">Support</Link>
        </nav>
      </div>

      <div className="nav-right">
        <div className="nav-actions">
          <input aria-label="Quick search" placeholder="Search services, skills or city" value={query} onChange={(e)=>onQueryChange && onQueryChange(e.target.value)} />
        </div>

        <div className="nav-cta">
          <Link to="/become" className="btn-become">Become a Professional</Link>
          {user ? (
            <>
              <Link to={user.role === 'admin' ? '/admin' : user.role === 'professional' ? '/professional' : '/dashboard'} className="btn small">Dashboard</Link>
              <button className="btn small btn-logout" onClick={onSignClick}>{user.name.split(' ')[0]} • Sign out</button>
            </>
          ) : (
            <>
              <Link to="/signin" className="btn small btn-outline">Login / Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
