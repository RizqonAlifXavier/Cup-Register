import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { MapPin, Calendar, Users, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Leagues() {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    // Load from local storage or use defaults
    const stored = localStorage.getItem('jabodetabek_leagues');
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLeagues(JSON.parse(stored));
    } else {
      const defaultLeagues = [
        { id: 1, name: 'Jakarta Super Cup 2026', location: 'Tangerang', date: '20 May 2026', fee: 'Rp 500.000', quota: 16, registered: 12 },
        { id: 2, name: 'Bekasi Patriot League', location: 'Tangerang', date: '15 Jun 2026', fee: 'Rp 350.000', quota: 32, registered: 20 },
        { id: 3, name: 'Depok Student Cup', location: 'Tangerang', date: '01 Jul 2026', fee: 'Rp 200.000', quota: 16, registered: 16 },
      ];
      localStorage.setItem('jabodetabek_leagues', JSON.stringify(defaultLeagues));
      setLeagues(defaultLeagues);
    }
  }, []);

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>Jadwal Liga <span style={{ color: 'var(--primary)' }}>Terbaru</span></h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem' }}>Pilih liga yang sesuai dengan wilayah Anda dan daftarkan tim Anda segera!</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {leagues.map((league) => {
          const isFull = league.registered >= league.quota;
          return (
            <motion.div 
              key={league.id} 
              className="glass-panel" 
              style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}
              whileHover={{ scale: 1.02 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--accent)' }}>{league.name}</h3>
                <div style={{ background: isFull ? 'var(--danger)' : 'var(--success)', padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  {isFull ? 'Penuh' : 'Terbuka'}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                  <MapPin size={18} color="var(--primary)" /> {league.location}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                  <Calendar size={18} color="var(--primary)" /> {league.date}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                  <Users size={18} color="var(--primary)" /> {league.registered} / {league.quota} Tim
                </div>
                <div style={{ marginTop: '0.5rem', fontWeight: 600, fontSize: '1.1rem' }}>
                  Biaya: {league.fee}
                </div>
              </div>

              <Link 
                to={isFull ? "#" : `/register?leagueId=${league.id}`} 
                className={`btn btn-primary`}
                style={{ width: '100%', opacity: isFull ? 0.5 : 1, cursor: isFull ? 'not-allowed' : 'pointer' }}
                onClick={(e) => isFull && e.preventDefault()}
              >
                {isFull ? 'Kuota Penuh' : 'Daftar Sekarang'}
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
