import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

export default function Register() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialLeagueId = searchParams.get('leagueId') || '';
  
  const [leagues, setLeagues] = useState([]);
  const [formData, setFormData] = useState({
    leagueId: initialLeagueId,
    teamName: '',
    managerName: '',
    contact: '',
    city: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('jabodetabek_leagues');
    if (stored) {
      setLeagues(JSON.parse(stored));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save registration to mock db
    const existingReqs = JSON.parse(localStorage.getItem('jabodetabek_registrations') || '[]');
    const newReq = {
      id: Date.now(),
      ...formData,
      status: 'Pending',
      date: new Date().toLocaleDateString()
    };
    localStorage.setItem('jabodetabek_registrations', JSON.stringify([...existingReqs, newReq]));
    
    // Increment registered count in league mock db
    const updatedLeagues = leagues.map(l => {
      if (l.id.toString() === formData.leagueId) {
        return { ...l, registered: l.registered + 1 };
      }
      return l;
    });
    localStorage.setItem('jabodetabek_leagues', JSON.stringify(updatedLeagues));

    setIsSuccess(true);
    setTimeout(() => {
      navigate('/leagues');
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <motion.div 
          className="glass-panel" 
          style={{ padding: '3rem', textAlign: 'center', maxWidth: '500px' }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <CheckCircle2 size={80} color="var(--success)" style={{ margin: '0 auto 1.5rem auto' }} />
          </motion.div>
          <h2>Pendaftaran Berhasil!</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
            Tim Anda telah terdaftar. Tim admin kami akan segera menghubungi Anda melalui kontak yang diberikan.
          </p>
          <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--accent)' }}>Mengalihkan ke halaman jadwal...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>Form <span style={{ color: 'var(--primary)' }}>Pendaftaran</span></h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem' }}>Isi formulir di bawah ini dengan data yang valid.</p>

      <motion.div className="glass-panel" style={{ padding: '2rem' }} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Pilih Liga</label>
            <select 
              className="form-input" 
              name="leagueId" 
              value={formData.leagueId} 
              onChange={handleChange}
              required
              style={{ backgroundColor: 'var(--bg-dark)' }}
            >
              <option value="" disabled>-- Pilih Liga --</option>
              {leagues.map(l => (
                <option key={l.id} value={l.id} disabled={l.registered >= l.quota}>
                  {l.name} {l.registered >= l.quota ? '(Penuh)' : ''}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Nama Tim</label>
              <input type="text" className="form-input" name="teamName" value={formData.teamName} onChange={handleChange} required placeholder="Contoh: FC Jakarta Raya" />
            </div>
            
            <div className="form-group">
              <label className="form-label">Kota Asal</label>
              <input type="text" className="form-input" name="city" value={formData.city} onChange={handleChange} required placeholder="Contoh: Depok" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Nama Manajer/Kapten</label>
              <input type="text" className="form-input" name="managerName" value={formData.managerName} onChange={handleChange} required placeholder="Nama Lengkap" />
            </div>
            
            <div className="form-group">
              <label className="form-label">Nomor WhatsApp Aktif</label>
              <input type="tel" className="form-input" name="contact" value={formData.contact} onChange={handleChange} required placeholder="0812xxxx" />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}>
            Kirim Pendaftaran
          </button>
        </form>
      </motion.div>
    </div>
  );
}
