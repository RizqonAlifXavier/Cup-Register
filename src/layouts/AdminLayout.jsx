import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Trophy, Users, LogOut } from 'lucide-react';

export default function AdminLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-darker)' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '260px', 
        backgroundColor: 'var(--bg-dark)', 
        borderRight: '1px solid var(--glass-border)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid var(--glass-border)' }}>
          <h2 style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem' }}>
            <span>Admin</span><span style={{ color: 'var(--primary)' }}>Panel</span>
          </h2>
        </div>
        
        <nav style={{ flex: 1, padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
            { to: '/admin/leagues', icon: Trophy, label: 'Kelola Liga' },
            { to: '/admin/registrations', icon: Users, label: 'Pendaftar' },
          ].map((item) => (
            <NavLink 
              key={item.to}
              to={item.to}
              end={item.exact}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '1rem', borderRadius: '8px',
                color: isActive ? 'white' : 'var(--text-muted)',
                backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                fontWeight: isActive ? 600 : 400,
                transition: 'all 0.2s'
              })}
            >
              <item.icon size={20} /> {item.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: '1.5rem 1rem', borderTop: '1px solid var(--glass-border)' }}>
          <NavLink to="/" style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '1rem', borderRadius: '8px', color: 'var(--danger)',
            transition: 'all 0.2s'
          }}>
            <LogOut size={20} /> Kembali ke Web
          </NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
}
