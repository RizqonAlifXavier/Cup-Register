import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';
import { Trophy, Users, MapPin, Calendar } from 'lucide-react';

export default function Home() {
  return (
    <div style={{ flex: 1 }}>
      {/* Hero Section */}
      <section style={{ 
        minHeight: '80vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(157, 78, 221, 0.2)', borderRadius: '20px', color: 'var(--accent)', marginBottom: '1rem', fontWeight: 600 }}>
              Platform Pendaftaran Liga #1 di Jabodetabek
            </div>
            <h1 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1 }}>
              Waktunya Tim Anda <br/> <span style={{ background: '-webkit-linear-gradient(45deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Menjadi Juara</span>
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
              Daftarkan tim sepakbola atau futsal Anda ke berbagai turnamen di Jakarta, Bogor, Depok, Tangerang, dan Bekasi.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link to="/register" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                <Trophy size={20} /> Daftar Liga Sekarang
              </Link>
              <Link to="/leagues" className="btn btn-outline" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                <Calendar size={20} /> Lihat Jadwal
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '5rem 0', background: 'rgba(0,0,0,0.3)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              { icon: MapPin, title: 'Cakup Jabodetabek', desc: 'Turnamen tersebar di seluruh wilayah Jabodetabek.' },
              { icon: Users, title: 'Terbuka Untuk Umum', desc: 'Sistem registrasi mudah untuk amatir dan semi-pro.' },
              { icon: Trophy, title: 'Hadiah Menarik', desc: 'Dapatkan total hadiah ratusan juta rupiah untuk pemenang.' }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                className="glass-panel"
                style={{ padding: '2rem', textAlign: 'center' }}
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(157, 78, 221, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                  <feature.icon color="var(--primary)" size={30} />
                </div>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.3rem' }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-muted)' }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
