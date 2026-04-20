import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, UploadCloud } from 'lucide-react';

export default function UploadReport({ onClose }: { onClose: () => void }) {
  const [dragActive, setDragActive] = useState(false);
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
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Upload Document</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Please provide the document and its metadata below.</p>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)', padding: '0.5rem', borderRadius: '50%', background: 'var(--bg-primary)' }}>
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Dropzone */}
          <div 
            style={{ 
              border: `2px dashed ${dragActive ? 'var(--text-primary)' : 'var(--border-color)'}`,
              backgroundColor: dragActive ? 'var(--bg-tertiary)' : 'var(--bg-primary)',
              borderRadius: 'var(--radius-md)',
              padding: '3rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
          >
            <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '50%', boxShadow: 'var(--shadow-sm)', marginBottom: '1rem' }}>
              <UploadCloud size={24} color="var(--text-primary)" />
            </div>
            <p style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Click and select a file to upload</p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>PDF, PNG, JPG up to 10MB</p>
          </div>

          {/* Form Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Document Name</label>
              <input type="text" placeholder="e.g. Annual Bloodwork 2026" style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '0.9375rem' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Date</label>
              <input type="date" style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '0.9375rem' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Report Type</label>
              <div style={{ position: 'relative' }}>
                <select style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '0.9375rem', WebkitAppearance: 'none', appearance: 'none' }}>
                  <option value="">Select a type...</option>
                  <option value="medical">Medical Health Report</option>
                  <option value="fitness">Fitness / Activity Report</option>
                  <option value="doctor">Doctor Visit Summary</option>
                  <option value="nutrition">Nutrition / Diet Log</option>
                  <option value="other">Other</option>
                </select>
                <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)' }}>
                  ▼
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', background: 'var(--bg-primary)' }}>
          <button onClick={onClose} style={{ padding: '0.75rem 1.5rem', background: 'var(--text-primary)', color: 'white', borderRadius: 'var(--radius-md)', fontSize: '0.9375rem', fontWeight: 600 }}>
            Submit
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
