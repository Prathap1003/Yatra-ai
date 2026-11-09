import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Shield, 
  ChevronDown, 
  Compass, 
  Plus, 
  Sparkles,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { POPULAR_DESTINATIONS } from '../data/destinations';

export default function Topbar({ 
  activeTab, 
  activeTrip, 
  onSelectDestination, 
  onSelectTab, 
  onOpenSOS, 
  onNewTrip,
  currency,
  onChangeCurrency
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDrop, setShowSearchDrop] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const filteredDestinations = POPULAR_DESTINATIONS.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const notifications = [
    { id: 1, title: 'Adaptive Agent Active', desc: 'Real-time weather & crowd monitoring engaged.', time: 'Just now', icon: '🤖' },
    { id: 2, title: 'Budget Agent Alert', desc: 'Hotel rates optimized for current itinerary.', time: '10m ago', icon: '💰' },
    { id: 3, title: 'Safety Score Verified', desc: 'Emergency protocols loaded for active city.', time: '1h ago', icon: '🛡️' }
  ];

  const handleSelectDest = (destName) => {
    setSearchQuery('');
    setShowSearchDrop(false);
    onSelectDestination(destName);
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'landing': return 'Welcome to Yatra AI';
      case 'planner': return 'Create AI Travel Plan';
      case 'dashboard': return activeTrip ? `${activeTrip.destination} • Journey Hub` : 'Trip Dashboard';
      case 'myTrips': return 'My Saved Journeys';
      case 'bookings': return 'Stays, Dining & Experiences';
      case 'liveTrip': return 'Live Journey Radar';
      case 'wallet': return 'Travel Expense Wallet';
      case 'emergency': return 'Emergency & Safety Center';
      case 'profile': return 'Traveler Profile & Stats';
      case 'settings': return 'App Settings & AI Configuration';
      default: return 'Yatra AI Intelligence';
    }
  };

  return (
    <header className="topbar-container">
      <div className="topbar-left">
        <h1 className="topbar-page-title">{getPageTitle()}</h1>
      </div>

      {/* Global Quick Search */}
      <div className="topbar-search-wrap">
        <Search className="w-4 h-4 search-icon" />
        <input 
          type="text" 
          placeholder="Search destinations (e.g. Goa, Hyderabad, Vijayawada)..." 
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSearchDrop(true);
          }}
          onFocus={() => setShowSearchDrop(true)}
          className="topbar-search-input"
        />
        {showSearchDrop && searchQuery && (
          <div className="search-dropdown-menu">
            <div className="dropdown-header">POPULAR DESTINATIONS</div>
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map(d => (
                <div 
                  key={d.name} 
                  className="search-drop-item"
                  onClick={() => handleSelectDest(d.name)}
                >
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  <div>
                    <strong>{d.name}</strong>
                    <span className="text-xs text-slate-400 block">{d.state}, {d.country}</span>
                  </div>
                </div>
              ))
            ) : (
              <div 
                className="search-drop-item"
                onClick={() => handleSelectDest(searchQuery)}
              >
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <div>
                  <strong>Custom Destination: "{searchQuery}"</strong>
                  <span className="text-xs text-slate-400 block">AI will generate custom itinerary</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Actions & Alerts */}
      <div className="topbar-right">
        {/* Currency Switcher */}
        <select 
          className="topbar-currency-select"
          value={currency} 
          onChange={(e) => onChangeCurrency(e.target.value)}
        >
          <option value="INR">₹ INR</option>
          <option value="USD">$ USD</option>
          <option value="EUR">€ EUR</option>
        </select>

        {/* SOS Emergency Quick Button */}
        <button className="topbar-sos-btn" onClick={onOpenSOS} title="Emergency SOS Assistance">
          <Shield className="w-4 h-4" />
          <span>SOS 112</span>
        </button>

        {/* Notifications Popover */}
        <div className="notification-wrap">
          <button 
            className="topbar-icon-btn relative" 
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="w-4 h-4" />
            <span className="notif-dot"></span>
          </button>
          {showNotifications && (
            <div className="notif-dropdown">
              <div className="notif-header">
                <strong>Agent Notifications</strong>
                <span className="text-xs text-indigo-400">Live</span>
              </div>
              <div className="notif-list">
                {notifications.map(n => (
                  <div key={n.id} className="notif-item">
                    <span className="notif-icon">{n.icon}</span>
                    <div className="notif-text">
                      <strong>{n.title}</strong>
                      <p>{n.desc}</p>
                      <span className="notif-time">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Pill */}
        <div className="topbar-profile" onClick={() => onSelectTab('profile')}>
          <div className="avatar-ring">
            <span className="avatar-text">YA</span>
          </div>
          <span className="profile-name">Explorer</span>
        </div>
      </div>
    </header>
  );
}
