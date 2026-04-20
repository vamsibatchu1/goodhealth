import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Utensils, Camera } from 'lucide-react';

export default function LogMealModal({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.3)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '1rem',
      backdropFilter: 'blur(2px)'
    }}>
      <div className="animate-fade-in" style={{
        backgroundColor: 'var(--bg-secondary)',
        width: '100%',
        maxWidth: '480px',
        height: '100%',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Log a Meal</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Describe what you ate or snap a photo.</p>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)', padding: '0.5rem', borderRadius: '50%', background: 'var(--bg-primary)' }}>
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* AI Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Natural Language Input</label>
            <div style={{ position: 'relative' }}>
              <textarea 
                placeholder="E.g., 'Large kale salad with grilled chicken, half an avocado, and olive oil dressing...'"
                style={{ 
                  width: '100%', 
                  minHeight: '120px', 
                  padding: '1rem', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--border-color)', 
                  background: 'var(--bg-primary)', 
                  color: 'var(--text-primary)', 
                  resize: 'none',
                  fontSize: '0.9375rem',
                  lineHeight: '1.5'
                }}
              />
              <button style={{ position: 'absolute', bottom: '1rem', right: '1rem', padding: '0.5rem', background: 'var(--bg-secondary)', borderRadius: '50%', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                <Camera size={16} />
              </button>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Our AI will automatically calculate calories and macros.</p>
          </div>

          {/* Optional Manual Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <div style={{ height: '1px', flex: 1, background: 'var(--border-color)' }} />
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Or enter manually</span>
              <div style={{ height: '1px', flex: 1, background: 'var(--border-color)' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Meal Type</label>
              <div style={{ position: 'relative' }}>
                <select style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '0.9375rem', WebkitAppearance: 'none', appearance: 'none' }}>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                </select>
                <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)' }}>
                  ▼
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Calories (kcal)</label>
                <input type="number" placeholder="0" style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '0.9375rem' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Protein (g)</label>
                <input type="number" placeholder="0" style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '0.9375rem' }} />
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', background: 'var(--bg-primary)' }}>
          <button onClick={onClose} style={{ padding: '0.75rem 1.5rem', background: 'var(--text-primary)', color: 'white', borderRadius: 'var(--radius-md)', fontSize: '0.9375rem', fontWeight: 600 }}>
            Analyze & Log
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
