import React from 'react';
import { Activity, FileText, UploadCloud, ChevronRight } from 'lucide-react';

export default function MedicalVaultTab() {
  return (
    <div className="tab-content">
      <div className="dashboard-grid">
        
        {/* Row 1: Summary Cards (2 Equal Width) */}
        <div className="grid-row-2">
          
          {/* Card 1: Medical Translator Summary */}
          <div className="metric-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem', color: 'var(--accent-purple)' }}>
              <Activity size={18} />
              <span style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Latest Summary</span>
            </div>
            <h4 style={{ fontSize: '1.0625rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Annual Bloodwork 2026</h4>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Your <strong>Hemoglobin A1c</strong> is at 5.2%, which is excellent and in the normal range. Your <strong>LDL Cholesterol</strong> dropped to 95 mg/dL, putting you back in the optimal zone compared to last year.
            </p>
          </div>
          
          {/* Card 2: Vault Stats */}
          <div className="metric-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
               <div className="card-icon blue" style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-md)' }}>
                  <FileText size={28} />
               </div>
               <div>
                 <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Documents Stored</span>
                 <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1, marginTop: '0.25rem' }}>14</div>
               </div>
            </div>
          </div>

        </div>

        <h3 className="section-title" style={{ marginTop: '24px' }}>Vault Contents</h3>
        
        {/* Row 2: List and Upload (Unequal Width) */}
        <div className="grid-row-2-unequal">
          
          {/* Card 1: List of Reports */}
          <div className="metric-card" style={{ padding: 0, overflow: 'hidden' }}>
             {/* List Item 1 */}
             <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'background-color 0.2s' }} className="hover-bg-tertiary">
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div className="card-icon blue" style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)' }}>
                    <Activity size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.125rem' }}>Annual Bloodwork 2026</h4>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Feb 14, 2026 • PDF • 1.2MB</span>
                  </div>
                </div>
                <ChevronRight size={20} color="var(--text-muted)" />
             </div>
             
             {/* List Item 2 */}
             <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'background-color 0.2s' }} className="hover-bg-tertiary">
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div className="card-icon blue" style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)' }}>
                    <Activity size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.125rem' }}>Dermatology Consult</h4>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Nov 22, 2025 • PDF • 2.4MB</span>
                  </div>
                </div>
                <ChevronRight size={20} color="var(--text-muted)" />
             </div>
             
             {/* View All Button */}
             <div style={{ padding: '1rem', textAlign: 'center', cursor: 'pointer', color: 'var(--accent-primary)', fontSize: '0.9375rem', fontWeight: 600 }}>
               View all documents
             </div>
          </div>

          {/* Card 2: Drag and Drop Upload */}
          <div className="metric-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem', border: '2px dashed var(--border-color)', background: 'transparent', boxShadow: 'none' }}>
            <div style={{ color: 'var(--text-muted)', marginBottom: '1rem', background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '50%', boxShadow: 'var(--shadow-sm)' }}>
              <UploadCloud size={28} />
            </div>
            <span style={{ fontSize: '1.0625rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem', textAlign: 'center' }}>Upload new report</span>
            <span style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>PDF, PNG, JPG</span>
          </div>

        </div>

      </div>
    </div>
  );
}
