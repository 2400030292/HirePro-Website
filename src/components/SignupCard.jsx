import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function SignupCard(){
  const [phone, setPhone] = useState('+91 98765 43210');
  const nav = useNavigate();
  const { signIn } = useAuth();

  function onContinue(){
    // mock signup using phone as name
    const name = phone || 'New User';
    signIn({ name, email: `${name.replace(/\s+/g,'').toLowerCase()}@example.com`, role: 'user' });
    nav('/dashboard');
  }

  return (
    <aside className="signup-card" aria-label="Sign up card">
      <div className="signup-inner">
        <div className="signup-top">
          <h3 className="signup-title">Get started — it's free</h3>
          <p className="signup-sub">Create an account and post your first job in minutes</p>
        </div>

        <div className="signup-form">
          <label htmlFor="phone" className="label">Phone number</label>
          <input
            id="phone"
            className="phone-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
            aria-label="Phone number"
          />

          <button type="button" className="btn" onClick={onContinue}>Continue</button>

          <p className="privacy">By continuing, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.</p>
        </div>

        <div className="signup-stats" aria-hidden="false">
          <div className="stat-item">
            <div className="stat-number">100K+</div>
            <div className="stat-label">Active professionals</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24x7</div>
            <div className="stat-label">Support</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
