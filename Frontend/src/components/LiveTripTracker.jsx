import React, { useState } from 'react';
import { 
  Radio, 
  MapPin, 
  Navigation, 
  CloudSun, 
  Users, 
  ShieldAlert, 
  RefreshCw, 
  Clock, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function LiveTripTracker({ activeTrip, onOpenSOS, onReplan }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(1);
  const destination = activeTrip?.destination || 'Vijayawada';
  const itinerary = activeTrip?.itinerary || [];
  const dayPlan = itinerary[0] || { activities: [] };
  const activities = dayPlan.activities || [];

  const currentActivity = activities[currentStepIndex] || activities[0] || {
    time: '10:30 AM',
    place: `${destination} Historic Landmark`,
    type: 'Sightseeing',
    description: 'Active landmark visit in progress.'
  };

  const nextActivity = activities[currentStepIndex + 1] || null;

  return (
    <div className="live-tracker-page-container">
      <div className="page-header-box">
        <div className="badge-pill bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
          <span className="live-dot"></span>
          <span>ON-THE-GROUND RADAR ACTIVE</span>
        </div>
        <h2 className="page-title">Live Trip Navigator • {destination}</h2>
        <p className="page-subtext">Real-time situational monitoring, live step navigation, and active crowd detection.</p>
      </div>

      <div className="live-tracker-grid">
        {/* LEFT COLUMN: ACTIVE STEP & RADAR */}
        <div className="live-active-column">
          {/* Current Active Step Box */}
          <div className="current-step-card">
            <div className="step-card-header">
              <div className="flex items-center gap-2">
                <div className="radar-pulse-dot"></div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">CURRENT STEP IN PROGRESS</span>
              </div>
              <span className="step-time-badge">{currentActivity.time}</span>
            </div>

            <h3 className="current-place-name">{currentActivity.place}</h3>
            <p className="current-place-desc">{currentActivity.description}</p>

            <div className="current-actions-row">
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentActivity.place + ' ' + destination)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-live-navigate"
              >
                <Navigation className="w-4 h-4" />
                <span>Navigate on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {currentStepIndex < activities.length - 1 && (
                <button 
                  className="btn-mark-step-done"
                  onClick={() => setCurrentStepIndex(prev => prev + 1)}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark as Completed & Next</span>
                </button>
              )}
            </div>
          </div>

          {/* Next Up Preview */}
          {nextActivity && (
            <div className="next-up-card">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">NEXT UP ON ITINERARY</span>
              <div className="next-up-row">
                <div>
                  <strong className="text-white text-base block">{nextActivity.place}</strong>
                  <span className="text-xs text-indigo-400">{nextActivity.time} • {nextActivity.type}</span>
                </div>
                <span className="text-xs text-slate-400">{nextActivity.duration || '1.5h'}</span>
              </div>
            </div>
          )}

          {/* Quick Live Controls */}
          <div className="live-controls-trio">
            <button className="live-ctrl-btn" onClick={onReplan}>
              <RefreshCw className="w-4 h-4 text-indigo-400" />
              <div>
                <strong>Simulate Delay / Re-plan</strong>
                <small>Adaptive Agent will reroute</small>
              </div>
            </button>

            <button className="live-ctrl-btn border-rose-500/30 hover:border-rose-500" onClick={onOpenSOS}>
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <div>
                <strong className="text-rose-400">Emergency SOS 112</strong>
                <small>Instant hospital & police alert</small>
              </div>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: RADAR METRICS & TODAY TIMELINE */}
        <div className="live-sidebar-column">
          {/* Weather & Crowd Signals */}
          <div className="live-signals-box">
            <h4 className="signals-title">Live Environmental Radar</h4>
            <div className="signals-mini-grid">
              <div className="signal-item">
                <CloudSun className="w-5 h-5 text-amber-400" />
                <div>
                  <span className="text-xs text-slate-400">Weather</span>
                  <strong className="text-sm text-white block">28°C • Clear</strong>
                </div>
              </div>

              <div className="signal-item">
                <Users className="w-5 h-5 text-emerald-400" />
                <div>
                  <span className="text-xs text-slate-400">Crowd Level</span>
                  <strong className="text-sm text-emerald-400 block">Low Traffic</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Today Step List */}
          <div className="live-today-agenda-box">
            <h4 className="signals-title">Today's Sequence ({activities.length} Steps)</h4>
            <div className="agenda-steps-list">
              {activities.map((act, idx) => {
                const isPast = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                return (
                  <div 
                    key={act.id || idx} 
                    className={`agenda-step-row ${isCurrent ? 'step-current' : ''} ${isPast ? 'step-past' : ''}`}
                    onClick={() => setCurrentStepIndex(idx)}
                  >
                    <span className="agenda-step-num">{idx + 1}</span>
                    <div className="agenda-step-info">
                      <strong className="agenda-act-name">{act.place}</strong>
                      <span className="agenda-act-time">{act.time} • {act.type}</span>
                    </div>
                    {isPast && <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-auto" />}
                    {isCurrent && <span className="current-pill-tag">ACTIVE</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
