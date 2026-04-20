import React from 'react';
import { ChevronRight, ArrowRight, Utensils, Apple, Droplets } from 'lucide-react';

export default function NutritionTab() {
  return (
    <div className="tab-content">
      <div className="dashboard-grid">
        
        {/* Row 1: Natural Language Input (Full Width) */}
        <div className="grid-row-1">
          <div className="metric-card" style={{ padding: '1.75rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', color: 'var(--text-primary)' }}>
              <div className="card-icon blue" style={{ background: 'rgba(45, 91, 246, 0.1)', width: '36px', height: '36px' }}>
                <Utensils size={20} />
              </div>
              <span style={{ fontSize: '1.0625rem', fontWeight: 600 }}>Log a Meal</span>
            </div>
            <textarea 
              placeholder="E.g., 'Large kale salad with grilled chicken and olive oil...'"
              style={{ 
                width: '100%', 
                minHeight: '100px', 
                padding: '1.25rem', 
                borderRadius: 'var(--radius-md)', 
                border: '1px solid var(--border-color)', 
                background: 'var(--bg-primary)', 
                color: 'var(--text-primary)', 
                resize: 'none',
                fontSize: '1rem' 
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn-primary" style={{ padding: '0.625rem 1.5rem', fontSize: '0.9375rem', borderRadius: 'var(--radius-full)' }}>
                Analyze & Log
              </button>
            </div>
          </div>
        </div>

        <h3 className="section-title" style={{ marginTop: '24px' }}>Today's Nutrition</h3>
        
        {/* Row 2: Nutrition (2 Cards Equal Width) */}
        <div className="grid-row-2">
          
          {/* Calories Card */}
          <div className="metric-card">
            <div className="card-header">
              <div className="card-header-left">
                <div className="card-icon green">
                  <Utensils size={16} />
                </div>
                <span className="card-title">Calories</span>
              </div>
              <div className="card-header-right">
                <span>Today</span>
              </div>
            </div>
            <div className="card-body">
              <div className="card-value-group">
                <div className="card-value">1,450 <span className="card-unit">kcal</span></div>
                <div className="card-trend" style={{marginTop: '0.25rem'}}>
                  <div className="trend-icon neutral" style={{width: 14, height: 14}}><ArrowRight size={10} color="white" /></div>
                  <span>Goal: 2,200 kcal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Protein Card */}
          <div className="metric-card">
            <div className="card-header">
              <div className="card-header-left">
                <div className="card-icon blue">
                  <Apple size={16} />
                </div>
                <span className="card-title">Protein</span>
              </div>
              <div className="card-header-right">
                <span>Today</span>
              </div>
            </div>
            <div className="card-body">
              <div className="card-value-group">
                <div className="card-value">85 <span className="card-unit">g</span></div>
              </div>
            </div>
          </div>
          
        </div>

        <h3 className="section-title" style={{ marginTop: '24px' }}>Micronutrient Checklist</h3>
        
        {/* Row 3: Micronutrient Checklist (Full Width) */}
        <div className="grid-row-1">
          <div className="metric-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '1.75rem 2rem' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--accent-tertiary)' }} />
                <span style={{ fontSize: '1.0625rem', fontWeight: 500, color: 'var(--text-primary)' }}>Fiber</span>
              </div>
              <span style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>28g / 25g</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--accent-tertiary)' }} />
                <span style={{ fontSize: '1.0625rem', fontWeight: 500, color: 'var(--text-primary)' }}>Vitamin C</span>
              </div>
              <span style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>110% Daily Value</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff9500' }} />
                <span style={{ fontSize: '1.0625rem', fontWeight: 500, color: 'var(--text-primary)' }}>Iron</span>
              </div>
              <span style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>12mg / 18mg</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--accent-secondary)' }} />
                <span style={{ fontSize: '1.0625rem', fontWeight: 500, color: 'var(--text-primary)' }}>Calcium</span>
              </div>
              <span style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>400mg / 1000mg</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
