import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { MapPin, Trophy, Mail, Phone } from 'lucide-react';

export default function About() {
  return (
    <div className="container" style={{ padding: '4rem 1rem' }}>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-panel"
        style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <div style={{ padding: '1.5rem', background: 'rgba(157, 78, 221, 0.2)', borderRadius: '50%' }}>
            <Trophy size={64} color="var(--primary)" />
          </div>
        </div>
        
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', background: '-webkit-linear-gradient(45deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Tentang GMT Cup
        </h1>
        
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '3rem' }}>
          GMT Cup adalah platform pendaftaran dan pengelolaan turnamen sepakbola serta futsal terdepan. 
          Kami berdedikasi untuk mewadahi minat dan bakat para pemain baik dari kalangan amatir maupun semi-profesional. 
          Dengan sistem turnamen yang dikelola secara profesional, kami berkomitmen untuk menciptakan ekosistem kompetisi yang sportif, adil, dan menjunjung tinggi nilai persaudaraan.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', textAlign: 'left' }}>
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(157, 78, 221, 0.1)', borderRadius: '12px' }}>
                <MapPin color="var(--primary)" size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Lokasi Kami</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>
              Karawaci, Jl. Raya Legok - Karawaci,<br/>
              Bojong Nangka, Kecamatan Kelapa Dua,<br/>
              Kabupaten Tangerang, Banten 15820
            </p>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Jl.+Raya+Legok+-+Karawaci,+Bojong+Nangka,+Kecamatan+Kelapa+Dua,+Kabupaten+Tangerang,+Banten+15820" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
            >
              <MapPin size={16} /> Buka di Google Maps
            </a>
          </div>
          
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(157, 78, 221, 0.1)', borderRadius: '12px' }}>
                <Phone color="var(--primary)" size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Hubungi Kami</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              <strong>Telepon / WA:</strong><br/>
              +62 812 3456 7890<br/>
              <strong style={{ display: 'inline-block', marginTop: '0.5rem' }}>Email:</strong><br/>
              info@gmtcup.com
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
