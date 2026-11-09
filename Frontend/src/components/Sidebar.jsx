import React from 'react';
import { 
  Compass, 
  MapPin, 
  BookmarkCheck, 
  Hotel, 
  Radio, 
  Wallet, 
  ShieldAlert, 
  User, 
  Settings, 
  Sparkles,
  ChevronRight,
  LogOut
} from 'lucide-react';

export default function Sidebar({ activeTab, onSelectTab, activeTrip, savedTripsCount, onNewTrip }) {
  const navigation = [
    { id: 'landing', label: 'Overview & Home', icon: Compass, badge: null },
    { id: 'planner', label: 'Plan New Trip', icon: Sparkles, badge: 'AI' },
    { id: 'dashboard', label: 'Trip Dashboard', icon: MapPin, badge: activeTrip ? 'Active' : null },
    { id: 'myTrips', label: 'My Saved Trips', icon: BookmarkCheck, badge: savedTripsCount > 0 ? savedTripsCount : null },
    { id: 'bookings', label: 'Stays & Dining', icon: Hotel, badge: null },
    { id: 'liveTrip', label: 'Live Trip Tracker', icon: Radio, badge: 'Live', isPulse: true },
    { id: 'wallet', label: 'Travel Wallet', icon: Wallet, badge: null },
    { id: 'emergency', label: 'Emergency SOS', icon: ShieldAlert, badge: '24x7', isDanger: true },
    { id: 'profile', label: 'Traveler Profile', icon: User, badge: null },
    { id: 'settings', label: 'Settings & AI', icon: Settings, badge: null },
  ];

  return (
    <aside className="sidebar-container">
      {/* Brand Logo */}
      <div className="sidebar-brand" onClick={() => onSelectTab('landing')}>
        <div className="brand-icon-box">
          <Sparkles className="w-5 h-5 text-indigo-400 animate-spin-slow" />
        </div>
        <div className="brand-text">
          <span className="brand-title">YATRA <span className="text-gradient">AI</span></span>
          <span className="brand-tagline">Travel Operating System</span>
        </div>
      </div>

      {/* Quick Action: Plan Trip */}
      <div className="sidebar-cta-wrap">
        <button className="btn-sidebar-plan" onClick={onNewTrip}>
          <Sparkles className="w-4 h-4" />
          <span>Plan a Journey</span>
        </button>
      </div>

      {/* Navigation Menu */}
      <div className="sidebar-menu">
        <span className="menu-group-label">NAVIGATION</span>
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`sidebar-item ${isActive ? 'active' : ''} ${item.isDanger ? 'item-danger' : ''}`}
            >
              <div className="sidebar-item-left">
                <Icon className="w-4 h-4 item-icon" />
                <span className="item-label">{item.label}</span>
              </div>
              {item.badge && (
                <span className={`item-badge ${item.isPulse ? 'badge-pulse' : ''} ${item.isDanger ? 'badge-danger' : ''}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Trip Mini Widget */}
      {activeTrip && (
        <div className="sidebar-trip-card" onClick={() => onSelectTab('dashboard')}>
          <div className="trip-card-glow"></div>
          <div className="trip-card-content">
            <span className="trip-card-sub">CURRENT JOURNEY</span>
            <strong className="trip-card-dest">{activeTrip.destination || 'Selected City'}</strong>
            <span className="trip-card-meta">
              {activeTrip.days} Days • ₹{Number(activeTrip.budget).toLocaleString('en-IN')}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
      )}

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <div className="ai-agent-indicator">
          <div className="status-dot"></div>
          <span>7 Multi-Agents Online</span>
        </div>
      </div>
    </aside>
  );
}
