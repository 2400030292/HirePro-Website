import React, { useState } from 'react';
import { useAuth } from '../AuthContext';

export default function ProfileModal({ provider, onClose, role }) {
  const { user } = useAuth();
  const [contact, setContact] = useState({ name: user?.name || '', email: user?.email || '', message: '' });
  const [sent, setSent] = useState(false);

  function submit(e) {
    e.preventDefault();
    setSent(true);
    // create booking and persist to localStorage
    try {
      const raw = localStorage.getItem('hirepro_bookings');
      const bookings = raw ? JSON.parse(raw) : [];
      const booking = {
        id: Date.now(),
        providerId: provider.id,
        providerName: provider.name,
        providerEmail: provider.email || provider.contact || '',
        requesterName: contact.name,
        requesterEmail: contact.email,
        message: contact.message,
        status: 'requested',
        createdAt: new Date().toISOString()
      };
      bookings.unshift(booking);
      localStorage.setItem('hirepro_bookings', JSON.stringify(bookings));
    } catch (err) {
      console.error('Failed to save booking', err);
    }

    // simulate send
    setTimeout(() => {
      setSent(false);
      // success feedback
      window.alert('Request sent to ' + provider.name + '. They will contact you shortly.');
      onClose();
    }, 600);
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card">
        <button className="modal-close" onClick={onClose} aria-label="Close profile">✕</button>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <img src={provider.image} alt={`${provider.name}`} style={{ width: 140, height: 140, objectFit: 'cover', borderRadius: 12 }} />
            <div>
              <h2 style={{ margin: 0 }}>{provider.name}</h2>
              <div className="profession">{provider.profession}</div>
              <div className="experience">{provider.experience}</div>
              <div style={{ marginTop: 8, color: '#374151', maxWidth: 520 }}>{provider.bio}</div>
              <div style={{ marginTop: 8 }} className="chip-list">{provider.skills.slice(0,6).map(s => <span className="chip" key={s}>{s}</span>)}</div>
            </div>
          </div>
        </div>

        <hr style={{ margin: '1rem 0' }} />

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <form onSubmit={submit} style={{ flex: 1, minWidth: 260 }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Your name</label>
            <input required value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} />

            <label style={{ display: 'block', marginTop: '0.75rem', marginBottom: '0.5rem' }}>Email</label>
            <input required type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />

            <label style={{ display: 'block', marginTop: '0.75rem', marginBottom: '0.5rem' }}>Message</label>
            <textarea required rows={4} value={contact.message} onChange={(e) => setContact({ ...contact, message: e.target.value })} />

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button className="btn-hire" type="submit" disabled={sent}>
                {sent ? 'Sending...' : `Hire ${provider.name}`}
              </button>
              <button type="button" onClick={onClose} style={{ padding: '0.75rem 1rem', borderRadius: 8 }}>
                Cancel
              </button>
            </div>
          </form>

          <aside style={{ width: 300, background: '#fbfbff', borderRadius: 12, padding: '1rem' }}>
            <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Quick Info</div>
            <div style={{ marginBottom: 6 }}>Rating: <strong>★ {provider.rating}</strong></div>
            <div style={{ marginBottom: 6 }}>Rate: <strong>${provider.price}/hr</strong></div>
            <div style={{ marginBottom: 6, color: '#6b7280' }}>Availability: Typically responds within 24 hours</div>

            <div style={{ marginTop: 10 }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Recent Reviews</div>
              <div style={{ fontSize: '0.95rem', color: '#374151', marginBottom: 6 }}>
                "Great work — delivered on time and exceeded expectations." — Client A
              </div>
              <div style={{ fontSize: '0.95rem', color: '#374151' }}>
                "Highly recommended for complex front-end builds." — Client B
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
