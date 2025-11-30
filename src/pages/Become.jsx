import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Become(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Plumber');
  const [rate, setRate] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn } = useAuth();
  const nav = useNavigate();

  function validate(){
    if(!name || name.trim().length < 2) return 'Please enter your full name.';
    if(!email || !/^\S+@\S+\.\S+$/.test(email)) return 'Please enter a valid email address.';
    if(!phone || phone.trim().length < 6) return 'Please enter a phone number.';
    return '';
  }

  function submit(e){
    e.preventDefault();
    setError('');
    const v = validate();
    if(v){ setError(v); return; }

    setLoading(true);
    // simulate async profile creation + auth
    setTimeout(()=>{
      // sign in the user as a professional
      signIn({ name: name || 'Professional', email, role: 'professional' });
      // optionally we could persist a provider profile to localStorage (mock)
      try{
        const providers = JSON.parse(localStorage.getItem('hirepro_providers') || '[]');
        providers.unshift({ id: Date.now(), name, email, phone, category, rate, bio, rating: 4.8, price: Number(rate) || 0, profession: category, skills: [] });
        localStorage.setItem('hirepro_providers', JSON.stringify(providers));
      }catch(e){ /* ignore */ }

      setLoading(false);
      nav('/professional');
    }, 800);
  }

  return (
    <div className="auth-page" style={{paddingTop:36}}>
      <div className="auth-card" aria-labelledby="become-title">
        <h2 id="become-title">Become a Professional</h2>
        <div style={{color:'var(--muted)', marginBottom:12}}>Create your professional profile and start getting clients.</div>

        {error && <div style={{background:'#fee2e2',color:'#7f1d1d',padding:10,borderRadius:8,marginBottom:12}} role="alert">{error}</div>}

        <form onSubmit={submit} style={{display:'grid',gap:10}}>
          <label style={{fontWeight:700,fontSize:13}}>Full name</label>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name" />

          <label style={{fontWeight:700,fontSize:13}}>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" />

          <label style={{fontWeight:700,fontSize:13}}>Phone</label>
          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone number" />

          <label style={{fontWeight:700,fontSize:13}}>Service Category</label>
          <select value={category} onChange={e=>setCategory(e.target.value)}>
            <option>Plumber</option>
            <option>Electrician</option>
            <option>Web Designer</option>
            <option>Home Tutor</option>
            <option>Photographer</option>
          </select>

          <label style={{fontWeight:700,fontSize:13}}>Hourly Rate (USD)</label>
          <input value={rate} onChange={e=>setRate(e.target.value)} placeholder="e.g. 25" />

          <label style={{fontWeight:700,fontSize:13}}>Short Bio / Skills</label>
          <textarea value={bio} onChange={e=>setBio(e.target.value)} placeholder="A short description about you" rows={3} />

          <div style={{display:'flex',gap:8}}>
            <button className="btn" type="submit">{loading ? 'Creating...' : 'Create Profile & Continue'}</button>
            <button type="button" className="btn-ghost" onClick={()=>{setName('');setEmail('');setPhone('');setRate('');setBio('');setCategory('Plumber')}}>Reset</button>
          </div>
        </form>
      </div>

      <div className="auth-right" aria-hidden>
        <div className="auth-brand">HirePro</div>
      </div>
    </div>
  );
}
