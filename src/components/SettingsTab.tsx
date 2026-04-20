import React from 'react';
import { User, Activity, Bell, Lock, ChevronRight } from 'lucide-react';

export default function SettingsTab() {
  return (
    <div className="tab-content">
      <div className="dashboard-grid">
        
        {/* Row 1: Profile Info (Full Width) */}
        <div className="grid-row-1">
          <div className="metric-card" style={{ display: 'flex', flexDirection: 'row', gap: '1.5rem', alignItems: 'center', padding: '2rem' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
              <User size={40} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>John Doe</h2>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>johndoe@example.com</p>
              <button style={{ marginTop: '0.75rem', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>Edit Profile</button>
            </div>
          </div>
        </div>

        <h3 className="section-title" style={{ marginTop: '24px' }}>Physical Profile</h3>
        
        {/* Row 2: Physical Stats (3 Cards) */}
        <div className="grid-row-3">
          <div className="metric-card">
            <div className="card-header">
              <div className="card-header-left">
                <div className="card-icon blue"><Activity size={16} /></div>
                <span className="card-title">Height</span>
              </div>
            </div>
            <div className="card-body">
              <div className="card-value-group">
                <div className="card-value">180 <span className="card-unit">cm</span></div>
              </div>
            </div>
          </div>
          <div className="metric-card">
            <div className="card-header">
              <div className="card-header-left">
                <div className="card-icon blue"><Activity size={16} /></div>
                <span className="card-title">Weight Target</span>
              </div>
            </div>
            <div className="card-body">
              <div className="card-value-group">
                <div className="card-value">70.0 <span className="card-unit">kg</span></div>
              </div>
            </div>
          </div>
          <div className="metric-card">
            <div className="card-header">
              <div className="card-header-left">
                <div className="card-icon red"><Activity size={16} /></div>
                <span className="card-title">Blood Type</span>
              </div>
            </div>
            <div className="card-body">
              <div className="card-value-group">
                <div className="card-value">O+</div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="section-title" style={{ marginTop: '24px' }}>Preferences</h3>
        
        {/* Row 3: Preferences List */}
        <div className="grid-row-1">
          <div className="metric-card" style={{ padding: 0, overflow: 'hidden' }}>
             <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div className="card-icon blue" style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)' }}>
                    <Bell size={20} />
                  </div>
                  <span style={{ fontSize: '1.0625rem', fontWeight: 500, color: 'var(--text-primary)' }}>Push Notifications</span>
                </div>
                <div style={{ width: '50px', height: '28px', borderRadius: '14px', background: 'var(--text-primary)', position: 'relative' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'white', position: 'absolute', right: '2px', top: '2px' }} />
                </div>
             </div>
             
             <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div className="card-icon blue" style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)' }}>
                    <Lock size={20} />
                  </div>
                  <span style={{ fontSize: '1.0625rem', fontWeight: 500, color: 'var(--text-primary)' }}>Privacy & Security</span>
                </div>
                <ChevronRight size={20} color="var(--text-muted)" />
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
