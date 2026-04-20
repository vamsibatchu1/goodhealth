import React, { useState } from 'react';
import { ChevronRight, ArrowRight, Utensils, Apple, Activity } from 'lucide-react';
import LogMealModal from './LogMealModal';

export default function NutritionTab() {
  const [isLogMealOpen, setIsLogMealOpen] = useState(false);

  return (
    <div className="tab-content">
      <div className="dashboard-grid">
        
        {/* Row 1: Today's Nutrition (3 Cards) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '24px' }}>
          <div>
            <h3 className="section-title" style={{ margin: 0 }}>Today's Nutrition</h3>
          </div>
        </div>
        
        <div className="grid-row-3">
          
          {/* Calories Card */}
          <div className="metric-card">
            <div className="card-header">
              <div className="card-header-left">
                <div className="card-icon green">
                  <Utensils size={16} />
                </div>
                <span className="card-title has-tooltip" data-tooltip="Total energy consumed today vs your daily goal.">Calories</span>
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
                <span className="card-title has-tooltip" data-tooltip="Total protein intake needed for muscle synthesis.">Protein</span>
              </div>
              <div className="card-header-right">
                <span>Today</span>
              </div>
            </div>
            <div className="card-body">
              <div className="card-value-group">
                <div className="card-value">85 <span className="card-unit">g</span></div>
                <div className="card-trend" style={{marginTop: '0.25rem'}}>
                  <span>Goal: 150 g</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Micronutrients Card */}
          <div className="metric-card">
             <div className="card-header">
              <div className="card-header-left">
                <div className="card-icon yellow">
                  <Activity size={16} />
                </div>
                <span className="card-title has-tooltip" data-tooltip="Daily goals for essential vitamins and minerals.">Micronutrients</span>
              </div>
              <div className="card-header-right">
                <span>Today</span>
              </div>
            </div>
            <div className="card-body">
              <div className="card-value-group">
                <div className="card-value">3 / 5 <span className="card-unit">Goals</span></div>
                <div className="card-trend" style={{marginTop: '0.25rem'}}>
                  <span>Iron, Fiber, Vit C</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        <h3 className="section-title" style={{ marginTop: '24px' }}>Meals & Daily Checklist</h3>
        
        {/* Row 2: Checklist (30%) and Meals List (70%) */}
        <div className="grid-row-2-unequal-reverse">
          
          {/* Column 1: Diet Checklist (30%) */}
          <div className="metric-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              <div className="card-icon green"><Activity size={16} /></div>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Diet Checklist</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1 }}>
              {/* Item 1: Done */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--accent-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>✓</span>
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'line-through', opacity: 0.7 }}>Drink 2L Water</h4>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Done</p>
                </div>
              </div>
              
              {/* Item 2: Pending */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid var(--border-color)', background: 'transparent', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>Eat 1 Serving Greens</h4>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--accent-secondary)', fontWeight: 500 }}>Pending</p>
                </div>
              </div>

              {/* Item 3: Pending */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid var(--border-color)', background: 'transparent', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>Avoid Refined Sugar</h4>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Ongoing</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Log Meal Button + Meals List (70%) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Log Meal Trigger */}
            <div className="metric-card" onClick={() => setIsLogMealOpen(true)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', border: '2px dashed var(--border-color)', background: 'transparent', boxShadow: 'none', cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ color: 'var(--text-primary)', marginBottom: '0.75rem', background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: '50%', boxShadow: 'var(--shadow-sm)' }}>
                <Utensils size={20} />
              </div>
              <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Log a meal</span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Use Natural Language or Photo</span>
            </div>

            {/* Meals List */}
            <div className="metric-card" style={{ padding: 0, overflow: 'hidden' }}>
               {/* Meal 1 */}
               <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'background-color 0.2s' }} className="hover-bg-tertiary">
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div className="card-icon blue" style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)' }}>
                      <Utensils size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.125rem' }}>Breakfast</h4>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Oatmeal, 2 Eggs • 450 kcal</span>
                    </div>
                  </div>
                  <ChevronRight size={20} color="var(--text-muted)" />
               </div>
               
               {/* Meal 2 */}
               <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'background-color 0.2s' }} className="hover-bg-tertiary">
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div className="card-icon green" style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)' }}>
                      <Apple size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.125rem' }}>Lunch</h4>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Grilled Chicken Salad • 600 kcal</span>
                    </div>
                  </div>
                  <ChevronRight size={20} color="var(--text-muted)" />
               </div>
               
               {/* View All Button */}
               <div style={{ padding: '1rem', textAlign: 'center', cursor: 'pointer', color: 'var(--text-primary)', fontSize: '0.9375rem', fontWeight: 600 }}>
                 View all meals
               </div>
            </div>

          </div>

        </div>

      </div>
      
      {isLogMealOpen && <LogMealModal onClose={() => setIsLogMealOpen(false)} />}
    </div>
  );
}
