import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function ManageLeagues() {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('jabodetabek_leagues') || '[]');
    setLeagues(stored);
  }, []);

  const [formData, setFormData] = useState({});
  const [isAdding, setIsAdding] = useState(false);

  const handleDelete = (id) => {
    if(window.confirm('Yakin hapus liga ini?')) {
      const updated = leagues.filter(l => l.id !== id);
      setLeagues(updated);
      localStorage.setItem('jabodetabek_leagues', JSON.stringify(updated));
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newLeague = {
      id: Date.now(),
      name: formData.name,
      location: formData.location,
      date: formData.date,
      fee: formData.fee,
      quota: parseInt(formData.quota),
      registered: 0
    };
    const updated = [...leagues, newLeague];
    setLeagues(updated);
    localStorage.setItem('jabodetabek_leagues', JSON.stringify(updated));
    setIsAdding(false);
    setFormData({});
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Kelola Liga</h1>
        <button className="btn btn-primary" onClick={() => setIsAdding(!isAdding)}>
          <Plus size={18} /> {isAdding ? 'Batal' : 'Tambah Liga'}
        </button>
      </div>

      {isAdding && (
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
          <h3>Tambah Liga Baru</h3>
          <form style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }} onSubmit={handleAdd}>
            <input className="form-input" placeholder="Nama Liga" required onChange={e => setFormData({...formData, name: e.target.value})} />
            <input className="form-input" placeholder="Lokasi (Contoh: Bogor)" required onChange={e => setFormData({...formData, location: e.target.value})} />
            <input className="form-input" placeholder="Tanggal (Contoh: 12 Aug 2026)" required onChange={e => setFormData({...formData, date: e.target.value})} />
            <input className="form-input" placeholder="Biaya (Contoh: Rp 300.000)" required onChange={e => setFormData({...formData, fee: e.target.value})} />
            <input type="number" className="form-input" placeholder="Kuota Tim" required onChange={e => setFormData({...formData, quota: e.target.value})} />
            <button type="submit" className="btn btn-success">Simpan</button>
          </form>
        </div>
      )}

      <div className="glass-panel" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)' }}>
              <th style={{ padding: '1rem' }}>Nama Liga</th>
              <th style={{ padding: '1rem' }}>Lokasi</th>
              <th style={{ padding: '1rem' }}>Tanggal</th>
              <th style={{ padding: '1rem' }}>Kuota/Terdaftar</th>
              <th style={{ padding: '1rem' }}>Biaya</th>
              <th style={{ padding: '1rem' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {leagues.length === 0 ? (
              <tr><td colSpan="6" style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>Belum ada data liga.</td></tr>
            ) : null}
            {leagues.map(l => (
              <tr key={l.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <td style={{ padding: '1rem' }}>{l.name}</td>
                <td style={{ padding: '1rem' }}>{l.location}</td>
                <td style={{ padding: '1rem' }}>{l.date}</td>
                <td style={{ padding: '1rem' }}>{l.registered} / {l.quota}</td>
                <td style={{ padding: '1rem' }}>{l.fee}</td>
                <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-danger" style={{ padding: '0.5rem' }} onClick={() => handleDelete(l.id)}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
