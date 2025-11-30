import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function SignIn(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [remember, setRemember] = useState(true);

  const { signIn } = useAuth();
  const nav = useNavigate();

  function validate() {
    if (!name || name.trim().length < 2) return 'Please enter your full name.';
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return 'Please enter a valid email.';
    return '';
  }

  function submit(e){
    e.preventDefault();
    setError('');
    const v = validate();
    if(v){ setError(v); return; }

    setLoading(true);
    // simulate async auth
    setTimeout(()=>{
      const user = signIn({ name: name || 'New User', email, role });
      // optionally persist remember flag
      if(!remember) localStorage.removeItem('hirepro_user');
      setLoading(false);
      // redirect based on role
      if(role === 'admin') nav('/admin');
      else if(role === 'professional') nav('/professional');
      else if(role === 'support') nav('/support');
      else nav('/dashboard');
    }, 600);
  }

  function socialSign(provider){
    setLoading(true);
    setTimeout(()=>{
      signIn({ name: provider + ' user', email: provider.toLowerCase() + '@example.com', role: 'user' });
      setLoading(false);
      nav('/dashboard');
    }, 700);
  }

  return (
    <div className="auth-page" role="main">
      <div className="auth-card" aria-labelledby="signin-title">
        <h2 id="signin-title" style={{marginBottom:6}}>Welcome back</h2>
        <div style={{color:'var(--muted)', marginBottom:14}}>Sign in to your account or create a new one</div>

        {error && <div style={{background:'#fee2e2',color:'#7f1d1d',padding:10,borderRadius:8,marginBottom:12}} role="alert">{error}</div>}

        <form onSubmit={submit} style={{display:'grid',gap:12}}>
          <label style={{fontWeight:700,fontSize:13}}>Full name</label>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name" aria-label="Full name" />

          <label style={{fontWeight:700,fontSize:13}}>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" aria-label="Email" />

          <label style={{fontWeight:700,fontSize:13}}>Password (optional)</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Create a password (optional)" aria-label="Password" />

          <label style={{fontWeight:700,fontSize:13}}>Role</label>
          <select value={role} onChange={e=>setRole(e.target.value)} aria-label="Role">
            <option value="user">User</option>
            <option value="professional">Professional</option>
            <option value="admin">Admin</option>
            <option value="support">Customer Support</option>
          </select>

          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
            <label style={{display:'flex',alignItems:'center',gap:8}}>
              <input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} /> <span style={{color:'var(--muted)'}}>Remember me</span>
            </label>

            <button type="button" className="btn-ghost" onClick={()=>{setName('');setEmail('');setPassword('');setRole('user')}}>Reset</button>
          </div>

          <div style={{display:'flex',gap:8}}>
            <button className="btn" type="submit" aria-busy={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
            <button type="button" className="btn-ghost" onClick={()=>nav('/')}>Back</button>
          </div>
        </form>

        <div style={{marginTop:14, textAlign:'center', color:'var(--muted)'}}>or continue with</div>
        <div style={{display:'flex',gap:8,marginTop:8}}>
          <button className="btn-ghost" onClick={()=>socialSign('Google')}>Google</button>
          <button className="btn-ghost" onClick={()=>socialSign('GitHub')}>GitHub</button>
        </div>
      </div>

      <div className="auth-right" aria-hidden="true">
        <div className="auth-brand">HirePro</div>
      </div>
    </div>
  );
}
