import React, { useState } from 'react';
import { 
  User, 
  Sparkles, 
  MapPin, 
  Leaf, 
  Calendar, 
  Award, 
  Heart, 
  ShieldCheck, 
  Save, 
  Check 
} from 'lucide-react';

export default function TravelProfile({ savedTrips = [], onSelectDestination }) {
  const [profileName, setProfileName] = useState('Pratham S.');
  const [homeCity, setHomeCity] = useState('Hyderabad, India');
  const [preferredPace, setPreferredPace] = useState('Balanced Explorer');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const wishlist = [
    { name: 'Goa', state: 'Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80' },
    { name: 'Manali', state: 'Himachal Pradesh', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=400&q=80' },
    { name: 'Udaipur', state: 'Rajasthan', image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=400&q=80' }
  ];

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="profile-page-container">
      <div className="page-header-box">
        <div className="badge-pill">
          <User className="w-4 h-4 text-indigo-400" />
          <span>TRAVEL PERSONA & REPUTATION</span>
        </div>
        <h2 className="page-title">Traveler Profile & Stats</h2>
        <p className="page-subtext">Your AI preferences, travel badges, and destination wishlist.</p>
      </div>

      {/* PROFILE HEADER CARD */}
      <div className="profile-hero-card">
        <div className="profile-avatar-large">
          <span>{profileName.substring(0, 2).toUpperCase()}</span>
        </div>
        <div className="profile-info-block">
          <h3 className="profile-name-text">{profileName}</h3>
          <span className="profile-tagline">📍 Based in {homeCity} • {preferredPace}</span>
          <div className="profile-badges-row">
            <span className="p-badge">🎖️ Level 4 Explorer</span>
            <span className="p-badge bg-emerald-500/20 text-emerald-300">🌱 Eco-Travel Pioneer</span>
            <span className="p-badge bg-indigo-500/20 text-indigo-300">🤖 AI Power User</span>
          </div>
        </div>
      </div>

      {/* STATS TILES */}
      <div className="profile-stats-grid">
        <div className="p-stat-tile">
          <span className="pst-label">JOURNEYS PLANNED</span>
          <strong className="pst-val text-white">{savedTrips.length || 3}</strong>
          <span className="pst-sub">Archived Blueprints</span>
        </div>

        <div className="p-stat-tile">
          <span className="pst-label">TOTAL DAYS ON ROAD</span>
          <strong className="pst-val text-indigo-400">8 Days</strong>
          <span className="pst-sub">Planned with Yatra</span>
        </div>

        <div className="p-stat-tile">
          <span className="pst-label">CO2 EMISSIONS OFFSET</span>
          <strong className="pst-val text-emerald-400">32.4 kg</strong>
          <span className="pst-sub">Low Carbon Transit</span>
        </div>

        <div className="p-stat-tile">
          <span className="pst-label">BUDGET EFFICIENCY</span>
          <strong className="pst-val text-amber-400">96.8%</strong>
          <span className="pst-sub">Average Savings</span>
        </div>
      </div>

      {/* PROFILE SETTINGS FORM */}
      <div className="profile-edit-section">
        <h3 className="section-mini-heading">TRAVELER PREFERENCES</h3>
        <form onSubmit={handleSave} className="profile-form-grid">
          <div className="form-group-item">
            <label>Full Name</label>
            <input 
              type="text" 
              value={profileName} 
              onChange={(e) => setProfileName(e.target.value)} 
              className="input-primary"
            />
          </div>

          <div className="form-group-item">
            <label>Home Base City</label>
            <input 
              type="text" 
              value={homeCity} 
              onChange={(e) => setHomeCity(e.target.value)} 
              className="input-primary"
            />
          </div>

          <div className="form-group-item">
            <label>Travel Pace Archetype</label>
            <select 
              value={preferredPace} 
              onChange={(e) => setPreferredPace(e.target.value)}
              className="input-primary"
            >
              <option value="Balanced Explorer">Balanced Explorer (Recommended)</option>
              <option value="Relaxed & Leisure">Relaxed & Leisure</option>
              <option value="Fast-Paced Action">Fast-Paced Action</option>
              <option value="Deep Cultural Immersion">Deep Cultural Immersion</option>
            </select>
          </div>

          <div className="col-span-full mt-2">
            <button type="submit" className="btn-hero-primary">
              <Save className="w-4 h-4" />
              <span>{savedSuccess ? '✓ Preferences Saved!' : 'Save Preferences'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* WISHLIST */}
      <div className="profile-wishlist-section mt-6">
        <h3 className="section-mini-heading">DESTINATIONS WISHLIST</h3>
        <div className="wishlist-grid">
          {wishlist.map(w => (
            <div key={w.name} className="wishlist-card">
              <img src={w.image} alt={w.name} className="wishlist-img" />
              <div className="wishlist-details">
                <h4>{w.name}</h4>
                <span className="text-xs text-slate-400">{w.state}</span>
                <button 
                  className="btn-wishlist-plan"
                  onClick={() => onSelectDestination(w.name)}
                >
                  Plan Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
