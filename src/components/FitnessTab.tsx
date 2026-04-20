import React from 'react';
import { ChevronRight, Activity, Flame, Footprints } from 'lucide-react';

export default function FitnessTab() {
  return (
    <div className="tab-content">
      
      <div className="dashboard-grid">
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '24px' }}>
          <div>
            <h3 className="section-title" style={{ margin: 0 }}>Trends</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              Last week • 4 Feb - 10 Feb
            </p>
          </div>
        </div>

        {/* Row 1: Trends (2 Cards Equal Width) */}
        <div className="grid-row-2">
          
          {/* Workouts Card */}
          <div className="metric-card">
            <div className="card-header">
              <div className="card-header-left">
                <div className="card-icon yellow">
                  <Activity size={16} />
                </div>
                <span className="card-title">Workouts</span>
              </div>
              <div className="card-header-right">
                <span>Last week</span>
              </div>
            </div>
            <div className="card-body">
              <div className="card-value-group">
                <div className="card-value">1 / 7 <span className="card-unit" style={{fontSize: '1.25rem'}}>Day</span></div>
                <div className="card-trend" style={{marginTop: '0.25rem'}}>
                  <span>27min total</span>
                </div>
              </div>
              <div className="card-visual">
                 <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {['M','T','W','T','F','S','S'].map((day, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: i === 3 ? 'var(--accent-tertiary)' : 'var(--border-color)' }}></div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>{day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Daily Steps Card */}
          <div className="metric-card">
            <div className="card-header">
              <div className="card-header-left">
                <div className="card-icon yellow">
                  <Footprints size={16} />
                </div>
                <span className="card-title">Daily Steps (Avg.)</span>
              </div>
              <div className="card-header-right">
                <span>Last week</span>
              </div>
            </div>
            <div className="card-body">
              <div className="card-value-group">
                <div className="card-value">1,224</div>
                <div className="card-trend" style={{marginTop: '0.25rem'}}>
                  <span>0/7 Goal</span>
                </div>
              </div>
              <div className="card-visual">
                 <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {['M','T','W','T','F','S','S'].map((day, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: i === 3 ? 'var(--accent-primary)' : 'var(--border-color)' }}></div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>{day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        <h3 className="section-title" style={{ marginTop: '24px' }}>Vitals Dashboard</h3>
        
        {/* Row 2: Vitals Dashboard (3 Cards Equal Width) */}
        <div className="grid-row-3">
          
          {/* VO2 Max Card */}
          <div className="metric-card">
            <div className="card-header">
              <div className="card-header-left">
                <div className="card-icon red">
                  <Activity size={16} />
                </div>
                <span className="card-title">VO2 Max Trend</span>
              </div>
              <div className="card-header-right">
                <span>This month</span>
              </div>
            </div>
            <div className="card-body">
              <div className="card-value-group">
                <div className="card-value">46.5 <span className="card-unit">mL/kg/min</span></div>
                <div className="card-trend" style={{marginTop: '0.25rem'}}>
                  <div className="trend-icon positive" style={{width: 14, height: 14}} />
                  <span>Excellent range</span>
                </div>
              </div>
              <div className="card-visual">
                 <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end', height: '36px' }}>
                  {[1, 2, 3, 5, 4, 6, 7].map((val, i) => (
                    <div key={i} style={{ width: '6px', height: `${val * 5}px`, backgroundColor: i === 6 ? 'var(--accent-primary)' : 'var(--border-color)', borderRadius: '3px' }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Resting Heart Rate Card */}
          <div className="metric-card">
            <div className="card-header">
              <div className="card-header-left">
                <div className="card-icon red">
                  <Activity size={16} />
                </div>
                <span className="card-title">Resting Heart Rate</span>
              </div>
              <div className="card-header-right">
                <span>Today</span>
              </div>
            </div>
            <div className="card-body">
              <div className="card-value-group">
                <div className="card-value">58 <span className="card-unit">bpm</span></div>
              </div>
            </div>
          </div>

          {/* Sleep Stages Card */}
          <div className="metric-card">
            <div className="card-header">
              <div className="card-header-left">
                <div className="card-icon blue">
                  <Activity size={16} />
                </div>
                <span className="card-title">Sleep Stages</span>
              </div>
              <div className="card-header-right">
                <span>Last night</span>
              </div>
            </div>
            <div className="card-body" style={{ display: 'block' }}>
              <div className="card-value-group" style={{ marginBottom: '1.25rem' }}>
                <div className="card-value">7h 12m <span className="card-unit" style={{fontSize: '1.125rem', fontWeight: 500}}>total</span></div>
              </div>
              {/* Stacked bar visualization */}
              <div style={{ width: '100%', height: '24px', display: 'flex', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                <div style={{ flex: 2, background: '#2d5bf6' }}></div> {/* Deep */}
                <div style={{ flex: 3, background: '#5856d6' }}></div> {/* REM */}
                <div style={{ flex: 5, background: '#aabdfb' }}></div> {/* Light */}
                <div style={{ flex: 1, background: '#ff9500' }}></div> {/* Awake */}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem', fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: 10, height: 10, borderRadius: '50%', background: '#2d5bf6' }} />Deep</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: 10, height: 10, borderRadius: '50%', background: '#5856d6' }} />REM</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: 10, height: 10, borderRadius: '50%', background: '#aabdfb' }} />Light</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
