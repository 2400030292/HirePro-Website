import React from 'react';

export default function AdminDashboard(){
  return (
    <div style={{padding:24}}>
      <h2>Admin Dashboard</h2>
      <p>Manage platform settings, user roles, and service listings. This is a placeholder admin page for the mock demo.</p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:12}}>
        <div style={{padding:12,background:'#fff',borderRadius:8,boxShadow:'0 6px 20px rgba(16,24,40,0.04)'}}>Users & Roles</div>
        <div style={{padding:12,background:'#fff',borderRadius:8,boxShadow:'0 6px 20px rgba(16,24,40,0.04)'}}>Service Listings</div>
      </div>
    </div>
  );
}
