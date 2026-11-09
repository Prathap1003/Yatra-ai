import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Wallet, 
  ShieldCheck, 
  Leaf, 
  Radio, 
  Users, 
  CloudSun, 
  Navigation, 
  RefreshCw, 
  Share2, 
  Download, 
  Plus, 
  ExternalLink,
  ChevronDown,
  CheckCircle2,
  Clock,
  Car,
  Utensils,
  AlertTriangle,
  X
} from 'lucide-react';
import { replanTrip } from '../services/api';

export default function TripDashboard({ 
  tripData, 
  onUpdateTrip, 
  onNavigateToTab, 
  onShareTrip 
}) {
  const [selectedDay, setSelectedDay] = useState(1);
  const [showReplanModal, setShowReplanModal] = useState(false);
  const [isReplanning, setIsReplanning] = useState(false);
  const [replanNotification, setReplanNotification] = useState(null);
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [customActivity, setCustomActivity] = useState({
    time: '04:00 PM',
    place: '',
    type: 'Sightseeing',
    duration: '1.5h',
    entryFee: 0,
    description: ''
  });

  if (!tripData || !tripData.trip) {
    return (
      <div className="dashboard-empty-state">
        <Sparkles className="w-12 h-12 text-indigo-400 mx-auto mb-4 animate-bounce" />
        <h2>No Active Journey Loaded</h2>
        <p>Create your customized travel plan with our multi-agent AI engine.</p>
        <button className="btn-primary mt-4" onClick={() => onNavigateToTab('planner')}>
          Plan a Journey Now →
        </button>
      </div>
    );
  }

  const { trip, intelligence, itinerary = [] } = tripData;
  const currentDayPlan = itinerary.find(d => d.day === selectedDay) || itinerary[0] || { activities: [] };

  const handleTriggerReplan = async (scenario) => {
    setIsReplanning(true);
    try {
      const res = await replanTrip(tripData, scenario, selectedDay);
      if (res.success && res.updatedItinerary) {
        onUpdateTrip({
          ...tripData,
          itinerary: res.updatedItinerary
        });
        setReplanNotification({
          scenario,
          message: res.actionTaken || 'Itinerary dynamically optimized.',
          agentNote: res.adaptiveAgent?.message || 'Updated by Adaptive Agent.'
        });
        setShowReplanModal(false);
      }
    } catch (err) {
      alert('Unable to replan trip.');
    } finally {
      setIsReplanning(false);
    }
  };

  const handleAddCustomActivity = (e) => {
    e.preventDefault();
    if (!customActivity.place.trim()) return;

    const newActivity = {
      id: `custom-${Date.now()}`,
      time: customActivity.time,
      place: customActivity.place,
      type: customActivity.type,
      duration: customActivity.duration || '1.5h',
      entryFee: Number(customActivity.entryFee) || 0,
      description: customActivity.description || `Custom planned activity in ${trip.destination}.`,
      icon: '✨',
      isCustom: true
    };

    const updatedItinerary = itinerary.map(d => {
      if (d.day === selectedDay) {
        return {
          ...d,
          activities: [...d.activities, newActivity]
        };
      }
      return d;
    });

    onUpdateTrip({ ...tripData, itinerary: updatedItinerary });
    setShowAddActivityModal(false);
    setCustomActivity({ time: '04:00 PM', place: '', type: 'Sightseeing', duration: '1.5h', entryFee: 0, description: '' });
  };

  const handleDeleteActivity = (dayIndex, actId) => {
    const updatedItinerary = itinerary.map(d => {
      if (d.day === dayIndex) {
        return {
          ...d,
          activities: d.activities.filter(a => a.id !== actId)
        };
      }
      return d;
    });
    onUpdateTrip({ ...tripData, itinerary: updatedItinerary });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="dashboard-container">
      {/* Dynamic Replan Alert Banner */}
      {replanNotification && (
        <div className="replan-toast-banner">
          <div className="toast-left">
            <Radio className="w-5 h-5 text-amber-400 animate-pulse" />
            <div>
              <strong>Adaptive Agent Re-planned Day {selectedDay}</strong>
              <p>{replanNotification.message}</p>
            </div>
          </div>
          <button className="toast-close-btn" onClick={() => setReplanNotification(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* HERO TRIP BANNER */}
      <section className="dashboard-hero-banner">
        <div className="hero-banner-image-wrap">
          <img 
            src={trip.heroImage || 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80'} 
            alt={trip.destination} 
            className="hero-banner-img" 
          />
          <div className="hero-banner-overlay"></div>
        </div>

        <div className="hero-banner-content">
          <div className="banner-top-tags">
            <span className="badge-pill bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
              ✨ AI MULTI-AGENT BLUEPRINT
            </span>
            <span className="badge-pill bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
              ✓ Ready for Exploration
            </span>
          </div>

          <h1 className="hero-dest-heading">{trip.destination}</h1>
          <p className="hero-dest-tagline">{trip.tagline || `A personalized travel journey through ${trip.destination}.`}</p>

          <div className="hero-dest-meta-strip">
            <div className="meta-pill">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span>{trip.days} Days Itinerary</span>
            </div>
            <div className="meta-pill">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>{trip.travelers} Traveler • {trip.travelType}</span>
            </div>
            <div className="meta-pill">
              <Wallet className="w-4 h-4 text-emerald-400" />
              <span>₹{Number(trip.budget).toLocaleString('en-IN')} Budget</span>
            </div>
            <div className="meta-pill">
              <CloudSun className="w-4 h-4 text-amber-400" />
              <span>{intelligence?.weather?.temp || '28°C'} • {intelligence?.weather?.condition || 'Pleasant'}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hero-action-bar">
            <button 
              className="btn-action-primary" 
              onClick={() => setShowReplanModal(true)}
            >
              <RefreshCw className="w-4 h-4" />
              <span>Adaptive Live Re-plan</span>
            </button>
            <button 
              className="btn-action-secondary" 
              onClick={onShareTrip}
            >
              <Share2 className="w-4 h-4" />
              <span>Share Trip</span>
            </button>
            <button 
              className="btn-action-secondary" 
              onClick={handlePrint}
            >
              <Download className="w-4 h-4" />
              <span>Export PDF / Print</span>
            </button>
          </div>
        </div>
      </section>

      {/* 6 AI INTELLIGENCE SIGNALS */}
      <section className="intelligence-grid-section">
        <h3 className="section-mini-heading">7 MULTI-AGENT INTELLIGENCE SIGNALS</h3>
        <div className="intelligence-cards-grid">
          {/* 1. Budget Agent */}
          <div className="intel-card" onClick={() => onNavigateToTab('wallet')}>
            <div className="intel-card-top">
              <span className="intel-icon">💰</span>
              <span className="intel-name">Budget Agent</span>
            </div>
            <div className="intel-val-row">
              <strong>₹{Number(intelligence?.budget?.estimatedCost || trip.budget * 0.88).toLocaleString('en-IN')}</strong>
              <small className="text-emerald-400">Est. Total</small>
            </div>
            <p className="intel-subtext">
              Reserve buffer of ₹{Number(intelligence?.budget?.remainingBudget || trip.budget * 0.12).toLocaleString('en-IN')} saved.
            </p>
          </div>

          {/* 2. Safety Agent */}
          <div className="intel-card" onClick={() => onNavigateToTab('emergency')}>
            <div className="intel-card-top">
              <span className="intel-icon">🛡️</span>
              <span className="intel-name">Safety Agent</span>
            </div>
            <div className="intel-val-row">
              <strong>{intelligence?.safety?.score || 94} / 100</strong>
              <small className="text-indigo-400">Verified</small>
            </div>
            <p className="intel-subtext">
              24x7 hospital proximity & emergency protocols active.
            </p>
          </div>

          {/* 3. Eco / Sustainability Agent */}
          <div className="intel-card">
            <div className="intel-card-top">
              <span className="intel-icon">🌱</span>
              <span className="intel-name">Sustainability Agent</span>
            </div>
            <div className="intel-val-row">
              <strong>{intelligence?.sustainability?.score || 82} / 100</strong>
              <small className="text-teal-400">Eco-Score</small>
            </div>
            <p className="intel-subtext">
              {intelligence?.sustainability?.co2SavedKg || '14.2 kg CO2 saved'} via low-emission transit.
            </p>
          </div>

          {/* 4. Route & Transit Agent */}
          <div className="intel-card">
            <div className="intel-card-top">
              <span className="intel-icon">🗺️</span>
              <span className="intel-name">Route Agent</span>
            </div>
            <div className="intel-val-row">
              <strong>{intelligence?.route?.totalDistance || '36 km'}</strong>
              <small className="text-sky-400">Optimized</small>
            </div>
            <p className="intel-subtext">
              {intelligence?.route?.transitMode || 'Metro & Scenic Walkways'}
            </p>
          </div>

          {/* 5. Crowd Intelligence */}
          <div className="intel-card">
            <div className="intel-card-top">
              <span className="intel-icon">👥</span>
              <span className="intel-name">Crowd Radar</span>
            </div>
            <div className="intel-val-row">
              <strong>{intelligence?.crowd?.level || 'Moderate'}</strong>
              <small className="text-amber-400">Current</small>
            </div>
            <p className="intel-subtext">
              Peak traffic: {intelligence?.crowd?.peakDays || 'Weekends & Evenings'}
            </p>
          </div>

          {/* 6. Adaptive Agent Live Status */}
          <div className="intel-card bg-indigo-950/40 border-indigo-500/30" onClick={() => setShowReplanModal(true)}>
            <div className="intel-card-top">
              <span className="intel-icon">🔄</span>
              <span className="intel-name">Adaptive Agent</span>
            </div>
            <div className="intel-val-row">
              <strong className="text-amber-400">Standby</strong>
              <small className="text-indigo-400">Click to Re-plan</small>
            </div>
            <p className="intel-subtext">
              Simulate weather rain, traffic delays or budget cuts.
            </p>
          </div>
        </div>
      </section>

      {/* ITINERARY TIMELINE */}
      <section className="itinerary-timeline-section">
        <div className="itinerary-header-bar">
          <div>
            <span className="section-eyebrow">YOUR DAY-BY-DAY JOURNEY</span>
            <h2 className="itinerary-title">Personalized Itinerary for {trip.destination}</h2>
          </div>
          <button 
            className="btn-add-activity"
            onClick={() => setShowAddActivityModal(true)}
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Activity</span>
          </button>
        </div>

        {/* Day Selector Tabs */}
        <div className="day-tabs-slider">
          {itinerary.map((dayPlan) => (
            <button
              key={dayPlan.day}
              onClick={() => setSelectedDay(dayPlan.day)}
              className={`day-tab-btn ${selectedDay === dayPlan.day ? 'day-tab-active' : ''}`}
            >
              <span className="day-tab-num">Day {dayPlan.day}</span>
              <span className="day-tab-theme">{dayPlan.theme || 'Exploration'}</span>
            </button>
          ))}
        </div>

        {/* Selected Day Header */}
        <div className="selected-day-banner">
          <div className="day-badge-circle">{selectedDay}</div>
          <div>
            <h3>{currentDayPlan.title || `Day ${selectedDay} in ${trip.destination}`}</h3>
            <p className="text-slate-400 text-xs">{currentDayPlan.theme}</p>
          </div>
        </div>

        {/* Activities List */}
        <div className="timeline-activities-list">
          {currentDayPlan.activities && currentDayPlan.activities.length > 0 ? (
            currentDayPlan.activities.map((activity, idx) => (
              <div key={activity.id || idx} className={`timeline-activity-card ${activity.isFood ? 'card-food' : ''}`}>
                <div className="activity-time-col">
                  <span className="activity-time-badge">{activity.time}</span>
                  <span className="activity-duration">{activity.duration || '1.5h'}</span>
                </div>

                <div className="activity-icon-bubble">
                  <span>{activity.icon || '📍'}</span>
                </div>

                <div className="activity-details-col">
                  <div className="activity-title-row">
                    <h4 className="activity-place-name">{activity.place}</h4>
                    <div className="activity-badges-row">
                      <span className="badge-tag">{activity.type}</span>
                      {activity.entryFee > 0 ? (
                        <span className="badge-fee">₹{activity.entryFee} Entry</span>
                      ) : (
                        <span className="badge-free">Free Entry</span>
                      )}
                    </div>
                  </div>

                  <p className="activity-desc">{activity.description}</p>

                  <div className="activity-footer-row">
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.place + ' ' + trip.destination)}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="link-maps-directions"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Directions (Google Maps)</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    {activity.isCustom && (
                      <button 
                        className="btn-delete-act" 
                        onClick={() => handleDeleteActivity(selectedDay, activity.id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-activities-placeholder">
              <p>No activities planned for this day yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ADAPTIVE REPLAN MODAL */}
      {showReplanModal && (
        <div className="modal-backdrop">
          <div className="modal-dialog">
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-indigo-400" />
                <h3>Adaptive Agent Live Simulator</h3>
              </div>
              <button onClick={() => setShowReplanModal(false)} className="modal-close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="modal-body">
              <p className="text-slate-300 text-sm mb-4">
                Simulate real-world conditions to test how the Adaptive Agent automatically recalculates your itinerary in real-time.
              </p>

              <div className="replan-triggers-grid">
                <button 
                  className="trigger-option-card"
                  onClick={() => handleTriggerReplan('weather_rain')}
                  disabled={isReplanning}
                >
                  <span className="trigger-emoji">🌧️</span>
                  <div className="trigger-text">
                    <strong>Heavy Rain Alert</strong>
                    <small>Swaps outdoor spots for indoor museums & cafes</small>
                  </div>
                </button>

                <button 
                  className="trigger-option-card"
                  onClick={() => handleTriggerReplan('traffic_congestion')}
                  disabled={isReplanning}
                >
                  <span className="trigger-emoji">🚗</span>
                  <div className="trigger-text">
                    <strong>Severe Traffic Gridlock</strong>
                    <small>Reroutes via rapid metro lines</small>
                  </div>
                </button>

                <button 
                  className="trigger-option-card"
                  onClick={() => handleTriggerReplan('budget_crunch')}
                  disabled={isReplanning}
                >
                  <span className="trigger-emoji">💰</span>
                  <div className="trigger-text">
                    <strong>Budget Reduction Alert</strong>
                    <small>Swaps paid monuments for scenic free lookouts</small>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD CUSTOM ACTIVITY MODAL */}
      {showAddActivityModal && (
        <div className="modal-backdrop">
          <div className="modal-dialog">
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-400" />
                <h3>Add Custom Activity to Day {selectedDay}</h3>
              </div>
              <button onClick={() => setShowAddActivityModal(false)} className="modal-close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCustomActivity} className="modal-body">
              <div className="modal-form-group">
                <label>Activity Name / Place</label>
                <input 
                  type="text" 
                  placeholder="e.g. Local Coffee Workshop or Sunset Point..." 
                  value={customActivity.place} 
                  onChange={(e) => setCustomActivity({ ...customActivity, place: e.target.value })}
                  className="input-primary"
                  required
                />
              </div>

              <div className="modal-form-grid">
                <div className="modal-form-group">
                  <label>Scheduled Time</label>
                  <input 
                    type="text" 
                    value={customActivity.time} 
                    onChange={(e) => setCustomActivity({ ...customActivity, time: e.target.value })}
                    className="input-primary"
                  />
                </div>
                <div className="modal-form-group">
                  <label>Category</label>
                  <select 
                    value={customActivity.type} 
                    onChange={(e) => setCustomActivity({ ...customActivity, type: e.target.value })}
                    className="input-primary"
                  >
                    <option value="Sightseeing">Sightseeing</option>
                    <option value="Food & Dining">Food & Dining</option>
                    <option value="Photography">Photography</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Relaxation">Relaxation</option>
                  </select>
                </div>
              </div>

              <div className="modal-form-group">
                <label>Description / Notes</label>
                <textarea 
                  rows="3" 
                  placeholder="Add any specific details or notes..." 
                  value={customActivity.description} 
                  onChange={(e) => setCustomActivity({ ...customActivity, description: e.target.value })}
                  className="input-primary"
                ></textarea>
              </div>

              <button type="submit" className="btn-primary w-full mt-2">
                Add to Day {selectedDay} Itinerary
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
