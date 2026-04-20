import React from 'react';
import { ChevronRight, ArrowRight, Activity, Flame, HeartPulse, UserCircle } from 'lucide-react';

export default function HealthTab() {
  return (
    <div className="tab-content">
      
      <div className="dashboard-grid">
        
        {/* Row 1: Hero Metric (1 Card Full Width) */}
        <div className="grid-row-1">
          <div className="metric-card" style={{ padding: '2.5rem 2rem', backgroundColor: '#000', color: 'white', border: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>Biological Age</span>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.375rem 1rem', borderRadius: 'var(--radius-full)', fontSize: '0.875rem', fontWeight: 600, color: '#fff' }}>
                Improving
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ fontSize: '4rem', fontWeight: 700, lineHeight: 1 }}>28</span>
              <span style={{ fontSize: '1.5rem', opacity: 0.8 }}>years</span>
            </div>
            <p style={{ marginTop: '0.75rem', fontSize: '1rem', opacity: 0.9 }}>
              Chronological age: 32 • -4 years difference
            </p>
          </div>
        </div>

        <h3 className="section-title" style={{ marginTop: '24px' }}>AI Insights</h3>
        
        {/* Row 2: AI Insights (2 Cards Equal Width) */}
        <div className="grid-row-2">
          <div className="metric-card" style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'flex-start', padding: '1.5rem' }}>
            <div className="card-icon blue" style={{ width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0 }}>
              <Activity size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.375rem' }}>Recovery Score is Up</h4>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>You've hit your protein goal 4 days in a row; your recovery score is up 10%.</p>
            </div>
          </div>
          <div className="metric-card" style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'flex-start', padding: '1.5rem' }}>
            <div className="card-icon yellow" style={{ width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0 }}>
              <Flame size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.375rem' }}>Consistent Sleep Quality</h4>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Your deep sleep ratio has improved by 15% this week. Keep up the pre-bed routine!</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '24px' }}>
          <h3 className="section-title" style={{ margin: 0 }}>Latest Measurements</h3>
          <span style={{ color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            Show all <ChevronRight size={16} />
          </span>
        </div>

        {/* Row 3: Latest Measurements (3 Cards Equal Width) */}
        <div className="grid-row-3">
          <div className="metric-card">
            <div className="card-header">
              <div className="card-header-left">
                <div className="card-icon blue">
                  <UserCircle size={16} />
                </div>
                <span className="card-title">Weight</span>
              </div>
              <div className="card-header-right">
                <span>10:18 AM</span>
              </div>
            </div>
            <div className="card-body">
              <div className="card-value-group">
                <div className="card-value">70.0 <span className="card-unit">kg</span></div>
                <div className="card-trend">
                  <div className="trend-icon neutral" style={{width: 14, height: 14}}><ArrowRight size={10} color="white" /></div>
                  <span>Stable Weight</span>
                </div>
              </div>
              <div className="card-visual" style={{ alignSelf: 'center' }}>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  {[1,2,3,4,5,6].map((i) => (
                    <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--border-color)' }}></div>
                  ))}
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="card-header">
              <div className="card-header-left">
                <div className="card-icon blue">
                  <UserCircle size={16} />
                </div>
                <span className="card-title">Height</span>
              </div>
              <div className="card-header-right">
                <span>10:18 AM</span>
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
                <div className="card-icon red">
                  <HeartPulse size={16} fill="currentColor" />
                </div>
                <span className="card-title">Heart Rate</span>
              </div>
              <div className="card-header-right">
                <span>9:49 AM</span>
              </div>
            </div>
            <div className="card-body">
              <div className="card-value-group">
                <div className="card-value">101 <span className="card-unit" style={{fontWeight: 400}}>bpm</span></div>
                <div className="card-trend" style={{marginTop: '0.25rem'}}>
                  <span>High HR</span>
                </div>
              </div>
            </div>
          </div>
        </div>



      </div>
    </div>
  );
}
