import React, { useState } from 'react';
import { 
  Settings, 
  Sparkles, 
  Cpu, 
  Bell, 
  Database, 
  RefreshCw, 
  Check, 
  Sliders,
  DollarSign
} from 'lucide-react';

export default function SettingsPage({ 
  currency, 
  onChangeCurrency, 
  onResetData, 
  onLoadDemoTrip 
}) {
  const [aiFocus, setAiFocus] = useState('Balanced');
  const [adaptiveAutoTrigger, setAdaptiveAutoTrigger] = useState(true);
  const [weatherAlerts, setWeatherAlerts] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="settings-page-container">
      <div className="page-header-box">
        <div className="badge-pill">
          <Settings className="w-4 h-4 text-indigo-400" />
          <span>SYSTEM PREFERENCES & AI TUNING</span>
        </div>
        <h2 className="page-title">Settings & AI Configuration</h2>
        <p className="page-subtext">Fine-tune the 7-Agent intelligence matrix, regional units, and storage data.</p>
      </div>

      <div className="settings-cards-stack">
        {/* 1. AI ENGINE TUNING */}
        <div className="settings-card-item">
          <div className="card-heading-row">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <h3>AI Multi-Agent Optimization Strategy</h3>
          </div>
          <p className="text-xs text-slate-400 mb-3">
            Choose how Yatra AI balances budget constraints against luxury experiences and travel speed.
          </p>

          <div className="ai-focus-options-grid">
            {[
              { id: 'Balanced', label: 'Balanced (Standard)', desc: 'Best compromise between cost, comfort & landmark coverage' },
              { id: 'BudgetFirst', label: 'Budget-First Priority', desc: 'Minimizes ticket costs, selects public transit and affordable stays' },
              { id: 'ExperienceFirst', label: 'Comfort & Luxury First', desc: 'Prioritizes 5-star stays, private transit and premium experiences' },
              { id: 'EcoFirst', label: 'Sustainability & Low Carbon', desc: 'Prioritizes walking routes and certified green partners' }
            ].map(opt => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setAiFocus(opt.id)}
                className={`focus-choice-card ${aiFocus === opt.id ? 'focus-selected' : ''}`}
              >
                <strong>{opt.label}</strong>
                <small>{opt.desc}</small>
              </button>
            ))}
          </div>

          <div className="settings-toggle-row mt-4">
            <div>
              <strong>🔄 Real-Time Dynamic Replanning</strong>
              <p className="text-xs text-slate-400">Allow Adaptive Agent to automatically propose weather & traffic alternatives.</p>
            </div>
            <input 
              type="checkbox" 
              checked={adaptiveAutoTrigger} 
              onChange={() => setAdaptiveAutoTrigger(!adaptiveAutoTrigger)}
              className="toggle-checkbox"
            />
          </div>
        </div>

        {/* 2. REGIONAL & CURRENCY SETTINGS */}
        <div className="settings-card-item">
          <div className="card-heading-row">
            <DollarSign className="w-5 h-5 text-indigo-400" />
            <h3>Currency & Unit Formatting</h3>
          </div>

          <div className="form-trio-grid">
            <div className="form-group-item">
              <label>Default Currency</label>
              <select 
                value={currency} 
                onChange={(e) => onChangeCurrency(e.target.value)}
                className="input-primary"
              >
                <option value="INR">₹ INR (Indian Rupee)</option>
                <option value="USD">$ USD (US Dollar)</option>
                <option value="EUR">€ EUR (Euro)</option>
              </select>
            </div>

            <div className="form-group-item">
              <label>Distance Units</label>
              <select defaultValue="km" className="input-primary">
                <option value="km">Kilometers (km)</option>
                <option value="mi">Miles (mi)</option>
              </select>
            </div>

            <div className="form-group-item">
              <label>Temperature Units</label>
              <select defaultValue="C" className="input-primary">
                <option value="C">Celsius (°C)</option>
                <option value="F">Fahrenheit (°F)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. DATA & DEMO MANAGEMENT */}
        <div className="settings-card-item">
          <div className="card-heading-row">
            <Database className="w-5 h-5 text-indigo-400" />
            <h3>Data Management & Demo Utilities</h3>
          </div>

          <div className="demo-actions-grid">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={onLoadDemoTrip}
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Load Full Prototype Demo Trip (Goa 3 Days)</span>
            </button>

            <button 
              type="button" 
              className="btn-secondary text-rose-400 hover:text-rose-300"
              onClick={onResetData}
            >
              <RefreshCw className="w-4 h-4" />
              <span>Clear Stored Trips Cache & Reset</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
