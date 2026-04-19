import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

// Pages
import Home from './pages/Home';
import Leagues from './pages/Leagues';
import Register from './pages/Register';
import About from './pages/About';

// Components
import AnimatedSportsBackground from './components/AnimatedSportsBackground';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ManageLeagues from './pages/admin/ManageLeagues';
import Registrations from './pages/admin/Registrations';

import { Trophy } from 'lucide-react';

function Navbar() {
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) return null;

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(15, 10, 26, 0.8)', backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--glass-border)'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>
          <Trophy color="var(--primary)" size={28} />
          GMT<span style={{ color: 'var(--primary)' }}>Cup</span>
        </Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="nav-links">
          <Link to="/">Beranda</Link>
          <Link to="/about">Tentang</Link>
          <Link to="/leagues">Jadwal Liga</Link>
          <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Daftar Tim</Link>
        </div>
      </div>
    </nav>
  );
}

function PageWrapper({ children }) {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return children;
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const location = useLocation();

  return (
    <>
      <AnimatedSportsBackground />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/leagues" element={<PageWrapper><Leagues /></PageWrapper>} />
          <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
          
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="leagues" element={<ManageLeagues />} />
            <Route path="registrations" element={<Registrations />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
