import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Trophy, Calendar, Clock, Activity, Star, Shield, Zap, Users, Medal, Target, Flag, Flame } from 'lucide-react';

export default function AnimatedSportsBackground() {
  // Hanya menggunakan ikon remsi dari lucide-react agar bentuknya 100% sempurna dan rapi
  const animatedIcons = [
    Trophy, Shield, Star, Zap, Target,
    Medal, Activity, Users, Trophy, Flame,
    Flag, Calendar, Clock, Shield, Medal
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      pointerEvents: 'none',
      zIndex: -1,
      overflow: 'hidden'
    }}>
      
      {/* Kumpulan Ikon Melayang */}
      {animatedIcons.map((Icon, idx) => {
        // Membuat variasi posisi dan kecepatan
        const randomXStart = (idx * 31) % 110; 
        const randomXEnd = (idx * 47) % 90; 
        const randomDuration = 18 + (idx * 2.5); 
        const randomDelay = idx * 1.5; 
        const size = 60 + ((idx * 13) % 90); 
        const randomRotation = idx % 2 === 0 ? 360 : -360; 
        
        return (
          <motion.div
            key={idx}
            initial={{ y: '110vh', x: `${randomXStart}vw`, rotate: 0, opacity: 0.15 }}
            animate={{ y: '-20vh', x: `${randomXEnd}vw`, rotate: randomRotation, opacity: 0.15 }}
            transition={{ 
              duration: randomDuration, 
              repeat: Infinity, 
              ease: 'linear', 
              delay: randomDelay 
            }}
            style={{ position: 'absolute' }}
          >
            <Icon size={size} color="var(--primary)" strokeWidth={2} />
          </motion.div>
        );
      })}

       {/* Animasi Cahaya Stadion (Glowing Light Orbs) */}
       <motion.div
        initial={{ opacity: 0.25, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1.2 }}
        transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
        style={{
          position: 'absolute',
          top: '15%',
          left: '5%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(157, 78, 221, 0.25) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%',
        }}
      />
      <motion.div
        initial={{ opacity: 0.15, scale: 1 }}
        animate={{ opacity: 0.5, scale: 1.5 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse', delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(157, 78, 221, 0.2) 0%, rgba(0,0,0,0) 65%)',
          borderRadius: '50%',
        }}
      />
    </div>
  );
}
