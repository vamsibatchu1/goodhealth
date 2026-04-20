"use client";

import React, { useState } from 'react';
import { Activity, Heart, Apple, Settings, MessageSquare, LayoutDashboard, Plus, FileText } from 'lucide-react';
import './dashboard.css';

// Subcomponents for the tabs
import HealthTab from '@/components/HealthTab';
import MedicalVaultTab from '@/components/MedicalVaultTab';
import FitnessTab from '@/components/FitnessTab';
import NutritionTab from '@/components/NutritionTab';
import ChatOverlay from '@/components/ChatOverlay';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('health');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'health': return <HealthTab />;
      case 'medical': return <MedicalVaultTab />;
      case 'fitness': return <FitnessTab />;
      case 'nutrition': return <NutritionTab />;
      default: return <HealthTab />;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <nav className="sidebar">
        <div className="brand">
          <img src="/goodhealth.svg" alt="GoodHealth Logo" style={{ width: '24px', height: '24px' }} />
          <h1>GoodHealth</h1>
        </div>

        <div className="nav-group">
          <p className="nav-label">OVERVIEW</p>
          <button 
            className={`nav-item ${activeTab === 'health' ? 'active' : ''}`}
            onClick={() => setActiveTab('health')}
          >
            <Activity size={20} />
            <span>Health & Medical</span>
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'medical' ? 'active' : ''}`}
            onClick={() => setActiveTab('medical')}
          >
            <FileText size={20} />
            <span>Medical Vault</span>
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'fitness' ? 'active' : ''}`}
            onClick={() => setActiveTab('fitness')}
          >
            <LayoutDashboard size={20} />
            <span>Fitness & Sleep</span>
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'nutrition' ? 'active' : ''}`}
            onClick={() => setActiveTab('nutrition')}
          >
            <Apple size={20} />
            <span>Nutrition & Diet</span>
          </button>
          <button className="nav-item">
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </div>

        <div className="nav-group mt-auto">
          <button 
            className="nav-item action-btn"
            onClick={() => setIsChatOpen(true)}
          >
            <MessageSquare size={20} />
            <span>AI Health Assistant</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        <div className="content-scroll animate-fade-in" style={{ paddingTop: '2rem' }}>
          {renderTabContent()}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-nav">
        <button className={`mobile-nav-item ${activeTab === 'health' ? 'active' : ''}`} onClick={() => setActiveTab('health')}>
          <Activity size={24} />
          <span>Health</span>
        </button>
        <button className={`mobile-nav-item ${activeTab === 'medical' ? 'active' : ''}`} onClick={() => setActiveTab('medical')}>
          <FileText size={24} />
          <span>Vault</span>
        </button>
        <button className={`mobile-nav-item ${activeTab === 'fitness' ? 'active' : ''}`} onClick={() => setActiveTab('fitness')}>
          <LayoutDashboard size={24} />
          <span>Fitness</span>
        </button>
        <button className={`mobile-nav-item ${activeTab === 'nutrition' ? 'active' : ''}`} onClick={() => setActiveTab('nutrition')}>
          <Apple size={24} />
          <span>Nutrients</span>
        </button>
        <button className="mobile-nav-item">
          <Settings size={24} />
          <span>Settings</span>
        </button>
      </nav>

      {/* Chat Overlay */}
      {isChatOpen && <ChatOverlay onClose={() => setIsChatOpen(false)} />}
    </div>
  );
}
