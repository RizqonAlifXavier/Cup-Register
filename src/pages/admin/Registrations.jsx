import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

export default function Registrations() {
  const [registrations, setRegistrations] = useState([]);
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    setRegistrations(JSON.parse(localStorage.getItem('jabodetabek_registrations') || '[]'));
    setLeagues(JSON.parse(localStorage.getItem('jabodetabek_leagues') || '[]'));
  }, []);

  const updateStatus = (id, newStatus) => {
    const updated = registrations.map(reg => {
      if(reg.id === id) return { ...reg, status: newStatus };
      return reg;
    });
    setRegistrations(updated);
    localStorage.setItem('jabodetabek_registrations', JSON.stringify(updated));
  };

  const getLeagueName = (id) => {
    const l = leagues.find(x => x.id.toString() === id.toString());
    return l ? l.name : 'Unknown League';
  };

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Pendaftar Tim</h1>

      <div className="glass-panel" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)' }}>
              <th style={{ padding: '1rem' }}>Tanggal</th>
              <th style={{ padding: '1rem' }}>Nama Tim</th>
              <th style={{ padding: '1rem' }}>Liga Tujuan</th>
              <th style={{ padding: '1rem' }}>Manajer</th>
              <th style={{ padding: '1rem' }}>Kontak</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {registrations.length === 0 ? (
              <tr><td colSpan="7" style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>Belum ada tim yang mendaftar.</td></tr>
            ) : null}
            {registrations.map(r => (
              <tr key={r.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <td style={{ padding: '1rem' }}>{r.date}</td>
                <td style={{ padding: '1rem', fontWeight: 600 }}>{r.teamName}</td>
                <td style={{ padding: '1rem', color: 'var(--accent)' }}>{getLeagueName(r.leagueId)}</td>
                <td style={{ padding: '1rem' }}>{r.managerName}</td>
                <td style={{ padding: '1rem' }}>{r.contact}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold',
                    background: r.status === 'Pending' ? 'var(--danger)' : r.status === 'Approved' ? 'var(--success)' : 'rgba(255,255,255,0.1)'
                  }}>
                    {r.status}
                  </span>
                </td>
                <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                  {r.status === 'Pending' && (
                    <>
                      <button className="btn btn-success" style={{ padding: '0.5rem' }} onClick={() => updateStatus(r.id, 'Approved')} title="Terima">
                        <CheckCircle size={16} />
                      </button>
                      <button className="btn btn-danger" style={{ padding: '0.5rem' }} onClick={() => updateStatus(r.id, 'Rejected')} title="Tolak">
                        <XCircle size={16} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
