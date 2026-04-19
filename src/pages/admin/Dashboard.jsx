import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Trophy, Users, CheckCircle, Clock } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalLeagues: 0,
    totalTeams: 0,
    pendingRegs: 0,
    approvedRegs: 0
  });

  useEffect(() => {
    const leagues = JSON.parse(localStorage.getItem('jabodetabek_leagues') || '[]');
    const registrations = JSON.parse(localStorage.getItem('jabodetabek_registrations') || '[]');
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStats({
      totalLeagues: leagues.length,
      totalTeams: registrations.length,
      pendingRegs: registrations.filter(r => r.status === 'Pending').length,
      approvedRegs: registrations.filter(r => r.status === 'Approved').length
    });
  }, []);

  const statCards = [
    { title: 'Total Liga', value: stats.totalLeagues, icon: Trophy, color: 'var(--primary)' },
    { title: 'Total Tim', value: stats.totalTeams, icon: Users, color: 'var(--accent)' },
    { title: 'Menunggu Persetujuan', value: stats.pendingRegs, icon: Clock, color: 'var(--danger)' },
    { title: 'Tim Disetujui', value: stats.approvedRegs, icon: CheckCircle, color: 'var(--success)' }
  ];

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Dashboard Overview</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {statCards.map((stat, i) => (
          <motion.div 
            key={i}
            className="glass-panel"
            style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
              <stat.icon color={stat.color} size={32} />
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>{stat.title}</p>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 700 }}>{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div style={{ marginTop: '3rem' }} className="glass-panel">
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--glass-border)' }}>
          <h2 style={{ fontSize: '1.2rem' }}>Aktivitas Terbaru</h2>
        </div>
        <div style={{ padding: '1.5rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          {stats.totalTeams === 0 ? "Belum ada aktivitas pendaftaran." : "Beralih ke tab Pendaftar untuk melihat detail pendaftaran."}
        </div>
      </div>
    </div>
  );
}
