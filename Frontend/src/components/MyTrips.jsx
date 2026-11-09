import React from 'react';
import { 
  BookmarkCheck, 
  MapPin, 
  Calendar, 
  Wallet, 
  Users, 
  ArrowRight, 
  Trash2, 
  Copy, 
  Sparkles,
  Plus
} from 'lucide-react';

export default function MyTrips({ 
  savedTrips = [], 
  activeTripId, 
  onSelectActiveTrip, 
  onDeleteTrip, 
  onDuplicateTrip,
  onNewTrip 
}) {
  return (
    <div className="my-trips-page-container">
      <div className="page-header-flex">
        <div>
          <div className="badge-pill">
            <BookmarkCheck className="w-4 h-4 text-indigo-400" />
            <span>SAVED TRAVEL BLUEPRINTS</span>
          </div>
          <h2 className="page-title">My Journeys Archive</h2>
          <p className="page-subtext">Manage, duplicate, or switch between all your AI-generated travel plans.</p>
        </div>

        <button className="btn-hero-primary" onClick={onNewTrip}>
          <Plus className="w-4 h-4" />
          <span>Plan a New Trip</span>
        </button>
      </div>

      {savedTrips.length === 0 ? (
        <div className="empty-trips-box">
          <div className="empty-icon-circle">
            <BookmarkCheck className="w-8 h-8 text-indigo-400" />
          </div>
          <h3>No Journeys Saved Yet</h3>
          <p>Plan your first trip with our 7-Agent AI Engine to see it archived here.</p>
          <button className="btn-hero-primary mt-4" onClick={onNewTrip}>
            <Sparkles className="w-4 h-4" />
            <span>Generate My First Journey</span>
          </button>
        </div>
      ) : (
        <div className="trips-archive-grid">
          {savedTrips.map((saved) => {
            const trip = saved.trip;
            const isActive = trip.id === activeTripId;
            return (
              <div 
                key={trip.id} 
                className={`trip-archive-card ${isActive ? 'card-is-active' : ''}`}
              >
                <div className="archive-image-wrap">
                  <img 
                    src={trip.heroImage || 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80'} 
                    alt={trip.destination} 
                    className="archive-img" 
                  />
                  <div className="archive-img-overlay"></div>
                  {isActive && (
                    <span className="badge-active-pill">
                      ✓ ACTIVE JOURNEY
                    </span>
                  )}
                </div>

                <div className="archive-content">
                  <div className="archive-dest-row">
                    <h3>{trip.destination}</h3>
                    <span className="archive-price">₹{Number(trip.budget).toLocaleString('en-IN')}</span>
                  </div>
                  <p className="archive-tagline">{trip.tagline || `Journey in ${trip.destination}`}</p>

                  <div className="archive-stats-row">
                    <span>📅 {trip.days} Days</span>
                    <span>👥 {trip.travelers} Traveler(s)</span>
                    <span>🍽️ {trip.food}</span>
                  </div>

                  <div className="archive-actions-row">
                    <button 
                      className="btn-open-trip"
                      onClick={() => onSelectActiveTrip(saved)}
                    >
                      <span>View Itinerary</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <div className="archive-icon-actions">
                      <button 
                        className="btn-archive-icon" 
                        onClick={() => onDuplicateTrip(saved)}
                        title="Duplicate Trip"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button 
                        className="btn-archive-icon text-rose-400 hover:text-rose-300" 
                        onClick={() => onDeleteTrip(trip.id)}
                        title="Delete Trip"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
