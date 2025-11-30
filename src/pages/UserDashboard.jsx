import React from 'react';

export default function UserDashboard(){
  return (
    <div style={{padding:24}}>
      <h2>User Dashboard</h2>
      <p>Your bookings, messages and saved professionals will appear here.</p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:12}}>
        <div style={{padding:12,background:'#fff',borderRadius:8,boxShadow:'0 6px 20px rgba(16,24,40,0.04)'}}>Bookings</div>
        <div style={{padding:12,background:'#fff',borderRadius:8,boxShadow:'0 6px 20px rgba(16,24,40,0.04)'}}>Saved</div>
      </div>
    </div>
  );
}
