import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PostJob(){
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const nav = useNavigate();

  function submit(e){
    e.preventDefault();
    // mock submit
    window.alert('Job posted: ' + (title || 'Untitled'));
    nav('/dashboard');
  }

  return (
    <div style={{maxWidth:820, margin:'2rem auto', padding:20}}>
      <h2>Post a job</h2>
      <form onSubmit={submit} style={{display:'grid',gap:12}}>
        <label>Job title</label>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="e.g. Experienced React developer" />

        <label>Job details</label>
        <textarea value={desc} onChange={(e)=>setDesc(e.target.value)} rows={6} placeholder="Describe the job and requirements" />

        <div style={{display:'flex',gap:8}}>
          <button className="btn" type="submit">Post job</button>
          <button className="btn btn-ghost" type="button" onClick={()=>nav(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
