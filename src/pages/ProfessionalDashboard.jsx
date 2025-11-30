import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';

export default function ProfessionalDashboard(){
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function loadBookings(){
    try{
      const raw = localStorage.getItem('hirepro_bookings');
      const all = raw ? JSON.parse(raw) : [];
      // show bookings for this professional (match by providerEmail or providerId owner)
      const my = all.filter(b => {
        if(!user) return false;
        if(b.providerEmail && user.email && b.providerEmail === user.email) return true;
        // if providerId stored in providers list belongs to this user, not implemented; fallback to email
        return false;
      });
      setBookings(my);
    }catch(e){ setBookings([]); }
  }

  function updateBookingStatus(id, status){
    try{
      const raw = localStorage.getItem('hirepro_bookings');
      const all = raw ? JSON.parse(raw) : [];
      const updated = all.map(b => b.id === id ? { ...b, status } : b);
      localStorage.setItem('hirepro_bookings', JSON.stringify(updated));
      loadBookings();
    }catch(e){ console.error(e); }
  }

  return (
    <div style={{padding:24}}>
      <h2>Professional Dashboard</h2>
      <p>Manage your profile, services, availability, and client conversations.</p>

      <section style={{marginTop:16}}>
        <h3>Incoming Requests</h3>
        {bookings.length === 0 ? (
          <div style={{padding:12,background:'#fff',borderRadius:8,boxShadow:'0 6px 20px rgba(16,24,40,0.04)'}}>No booking requests yet.</div>
        ) : (
          <div style={{display:'grid',gap:12,marginTop:12}}>
            {bookings.map(b => (
              <div key={b.id} style={{padding:12,background:'#fff',borderRadius:8,boxShadow:'0 6px 20px rgba(16,24,40,0.04)'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                    <strong>{b.requesterName}</strong>
                    <div className="muted">{b.requesterEmail}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontWeight:700}}>{b.status}</div>
                    <div className="muted small">{new Date(b.createdAt).toLocaleString()}</div>
                  </div>
                </div>

                <div style={{marginTop:8,color:'#374151'}}>{b.message}</div>

                <div style={{display:'flex',gap:8,marginTop:10}}>
                  {b.status === 'requested' && (
                    <>
                      <button className="btn" onClick={()=>updateBookingStatus(b.id,'accepted')}>Accept</button>
                      <button className="btn-ghost" onClick={()=>updateBookingStatus(b.id,'declined')}>Decline</button>
                    </>
                  )}
                  {b.status === 'accepted' && (
                    <button className="btn-ghost" onClick={()=>updateBookingStatus(b.id,'completed')}>Mark completed</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
