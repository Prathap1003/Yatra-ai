import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Wallet, 
  Users, 
  Heart, 
  Utensils, 
  Hotel, 
  ShieldCheck, 
  Leaf, 
  Check, 
  ArrowRight,
  Info
} from 'lucide-react';
import { 
  POPULAR_DESTINATIONS, 
  TRAVEL_TYPES, 
  PREFERENCE_OPTIONS, 
  FOOD_OPTIONS, 
  ACCOMMODATION_OPTIONS, 
  SAFETY_OPTIONS 
} from '../data/destinations';

export default function TripPlanner({ onGenerate, isGenerating, initialDestination = '' }) {
  const [destination, setDestination] = useState(initialDestination || 'Vijayawada');
  const [days, setDays] = useState(2);
  const [budget, setBudget] = useState(5000);
  const [travelers, setTravelers] = useState(1);
  const [travelType, setTravelType] = useState('Solo');
  const [preferences, setPreferences] = useState(['Heritage', 'Photography', 'Food']);
  const [food, setFood] = useState('Vegetarian');
  const [accommodation, setAccommodation] = useState('Comfort');
  const [safety, setSafety] = useState('High');
  const [sustainability, setSustainability] = useState({
    walking: true,
    publicTransport: true,
    ecoHotels: false,
    localRestaurants: true
  });

  const togglePreference = (id) => {
    if (preferences.includes(id)) {
      if (preferences.length > 1) {
        setPreferences(preferences.filter(p => p !== id));
      }
    } else {
      setPreferences([...preferences, id]);
    }
  };

  const toggleSustainability = (key) => {
    setSustainability(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getEstimatedCostPreview = () => {
    const hotelCost = accommodation === 'Luxury' ? 5500 : accommodation === 'Comfort' ? 2200 : 950;
    const foodCost = food === 'Non-Vegetarian' ? 750 : 550;
    const transitCost = sustainability.publicTransport ? 300 : 600;
    const activitiesCost = 350;

    const totalHotel = hotelCost * Math.max(1, days - 1) * Math.ceil(travelers / 2);
    const totalDaily = (foodCost + transitCost + activitiesCost) * days * travelers;
    const buffer = Math.round((totalHotel + totalDaily) * 0.08);
    return totalHotel + totalDaily + buffer;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!destination.trim()) {
      alert('Please enter a destination.');
      return;
    }

    const payload = {
      destination: destination.trim(),
      days: Number(days),
      budget: Number(budget),
      travelers: Number(travelers),
      travelType,
      preferences,
      food,
      accommodation,
      safety,
      sustainability
    };

    onGenerate(payload);
  };

  const estimatedCost = getEstimatedCostPreview();
  const isBudgetAdequate = budget >= estimatedCost;

  return (
    <div className="planner-view-container">
      <div className="planner-header-box">
        <div className="badge-pill">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>AI MULTI-AGENT TRIP GENERATOR</span>
        </div>
        <h2 className="planner-main-heading">Configure Your Bespoke Journey</h2>
        <p className="planner-subheading">Provide your travel parameters and watch Yatra AI compute your complete itinerary.</p>
      </div>

      <form onSubmit={handleSubmit} className="planner-grid-layout">
        {/* LEFT COLUMN: FORM INPUTS */}
        <div className="planner-form-cards">
          {/* 1. Destination Card */}
          <div className="form-card">
            <div className="card-heading-row">
              <MapPin className="w-5 h-5 text-indigo-400" />
              <h3>1. Where do you want to travel?</h3>
            </div>

            <div className="input-field-wrap">
              <input 
                type="text" 
                placeholder="Enter destination (e.g. Vijayawada, Goa, Hyderabad, Manali)..." 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="input-primary"
                required
              />
            </div>

            <div className="quick-chips-group">
              <span className="chips-label">Popular Suggestions:</span>
              <div className="chips-flex">
                {POPULAR_DESTINATIONS.slice(0, 8).map(d => (
                  <button
                    key={d.name}
                    type="button"
                    onClick={() => setDestination(d.name)}
                    className={`chip-btn ${destination.toLowerCase() === d.name.toLowerCase() ? 'chip-selected' : ''}`}
                  >
                    {d.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Duration, Budget & Travelers */}
          <div className="form-card">
            <div className="card-heading-row">
              <Calendar className="w-5 h-5 text-indigo-400" />
              <h3>2. Trip Logistics</h3>
            </div>

            <div className="form-trio-grid">
              {/* Days */}
              <div className="form-group-item">
                <label>Duration (Days)</label>
                <div className="number-stepper">
                  <button 
                    type="button" 
                    onClick={() => setDays(Math.max(1, days - 1))}
                    className="stepper-btn"
                  >-</button>
                  <span className="stepper-val">{days} Days</span>
                  <button 
                    type="button" 
                    onClick={() => setDays(Math.min(14, days + 1))}
                    className="stepper-btn"
                  >+</button>
                </div>
              </div>

              {/* Budget */}
              <div className="form-group-item">
                <label>Total Budget (₹ INR)</label>
                <input 
                  type="number" 
                  min="1000" 
                  step="500" 
                  value={budget} 
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="input-primary"
                />
              </div>

              {/* Travelers */}
              <div className="form-group-item">
                <label>Number of Travelers</label>
                <div className="number-stepper">
                  <button 
                    type="button" 
                    onClick={() => setTravelers(Math.max(1, travelers - 1))}
                    className="stepper-btn"
                  >-</button>
                  <span className="stepper-val">{travelers} Traveler{travelers > 1 ? 's' : ''}</span>
                  <button 
                    type="button" 
                    onClick={() => setTravelers(Math.min(15, travelers + 1))}
                    className="stepper-btn"
                  >+</button>
                </div>
              </div>
            </div>

            {/* Travel Type Pills */}
            <div className="sub-form-group">
              <label>Travel Group Style</label>
              <div className="choice-pills-grid">
                {TRAVEL_TYPES.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTravelType(t.id)}
                    className={`choice-card-btn ${travelType === t.id ? 'choice-selected' : ''}`}
                  >
                    <span className="choice-icon">{t.icon}</span>
                    <span className="choice-title">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Interests & Vibe */}
          <div className="form-card">
            <div className="card-heading-row">
              <Heart className="w-5 h-5 text-indigo-400" />
              <h3>3. What do you enjoy? (Select Interests)</h3>
            </div>
            <div className="preferences-checkbox-grid">
              {PREFERENCE_OPTIONS.map(pref => {
                const isSelected = preferences.includes(pref.id);
                return (
                  <button
                    key={pref.id}
                    type="button"
                    onClick={() => togglePreference(pref.id)}
                    className={`pref-pill-btn ${isSelected ? 'pref-selected' : ''}`}
                  >
                    <span>{pref.icon}</span>
                    <span>{pref.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 ml-auto text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Food & Stay Preferences */}
          <div className="form-card">
            <div className="card-heading-row">
              <Utensils className="w-5 h-5 text-indigo-400" />
              <h3>4. Food & Stays Tier</h3>
            </div>

            <div className="form-split-grid">
              {/* Food */}
              <div className="form-group-item">
                <label>Dining Preference</label>
                <div className="vertical-choices-list">
                  {FOOD_OPTIONS.map(f => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFood(f.id)}
                      className={`option-row-btn ${food === f.id ? 'row-selected' : ''}`}
                    >
                      <span>{f.icon}</span>
                      <div className="option-row-text">
                        <strong>{f.label}</strong>
                        <small>{f.desc}</small>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stay Tier */}
              <div className="form-group-item">
                <label>Accommodation Tier</label>
                <div className="vertical-choices-list">
                  {ACCOMMODATION_OPTIONS.map(acc => (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => setAccommodation(acc.id)}
                      className={`option-row-btn ${accommodation === acc.id ? 'row-selected' : ''}`}
                    >
                      <span>{acc.icon}</span>
                      <div className="option-row-text">
                        <strong>{acc.label}</strong>
                        <small>{acc.price} • {acc.desc}</small>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 5. Safety & Sustainability */}
          <div className="form-card">
            <div className="card-heading-row">
              <Leaf className="w-5 h-5 text-indigo-400" />
              <h3>5. Safety & Sustainable Travel</h3>
            </div>

            <div className="safety-select-row">
              <label>Safety Priority Level</label>
              <div className="safety-pills">
                {SAFETY_OPTIONS.map(s => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSafety(s.id)}
                    className={`safety-pill ${safety === s.id ? 'safety-selected' : ''}`}
                  >
                    <strong>{s.label}</strong>
                  </button>
                ))}
              </div>
            </div>

            <div className="sustainability-toggles-grid">
              <label className="eco-toggle-item">
                <input 
                  type="checkbox" 
                  checked={sustainability.walking} 
                  onChange={() => toggleSustainability('walking')}
                />
                <div>
                  <strong>🚶 Prefer Scenic Walking Paths</strong>
                  <small>Zero emission & high pedestrian enjoyment</small>
                </div>
              </label>

              <label className="eco-toggle-item">
                <input 
                  type="checkbox" 
                  checked={sustainability.publicTransport} 
                  onChange={() => toggleSustainability('publicTransport')}
                />
                <div>
                  <strong>🚇 Low Emission Transit (Metro & Bus)</strong>
                  <small>Reduces local traffic & travel costs</small>
                </div>
              </label>

              <label className="eco-toggle-item">
                <input 
                  type="checkbox" 
                  checked={sustainability.ecoHotels} 
                  onChange={() => toggleSustainability('ecoHotels')}
                />
                <div>
                  <strong>🌿 Green Certified Eco-Stays</strong>
                  <small>Solar powered & plastic-free hotels</small>
                </div>
              </label>

              <label className="eco-toggle-item">
                <input 
                  type="checkbox" 
                  checked={sustainability.localRestaurants} 
                  onChange={() => toggleSustainability('localRestaurants')}
                />
                <div>
                  <strong>🍲 Farm-to-Table Local Cafes</strong>
                  <small>Supports local artisans & regional farms</small>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: STICKY TRIP SUMMARY PREVIEW */}
        <div className="planner-summary-sidebar">
          <div className="summary-sticky-card">
            <h3 className="summary-card-title">Journey Blueprint Summary</h3>

            <div className="summary-dest-display">
              <span className="text-xs text-slate-400">DESTINATION</span>
              <strong className="text-xl text-white block">{destination || 'Select Destination'}</strong>
              <span className="text-xs text-indigo-400 font-semibold">{days} Days • {travelers} Traveler(s) • {travelType}</span>
            </div>

            <div className="summary-cost-box">
              <div className="cost-row">
                <span>Estimated Trip Cost:</span>
                <strong>₹{estimatedCost.toLocaleString('en-IN')}</strong>
              </div>
              <div className="cost-row">
                <span>Target Budget:</span>
                <strong className={isBudgetAdequate ? 'text-emerald-400' : 'text-rose-400'}>
                  ₹{budget.toLocaleString('en-IN')}
                </strong>
              </div>
              <div className="cost-status-bar">
                <div 
                  className={`cost-fill ${isBudgetAdequate ? 'fill-good' : 'fill-warn'}`}
                  style={{ width: `${Math.min(100, Math.round((estimatedCost / budget) * 100))}%` }}
                ></div>
              </div>
              <small className="cost-note">
                {isBudgetAdequate 
                  ? '✓ Estimated cost fits cleanly inside your budget with safety buffer.' 
                  : '⚠️ Estimated cost is slightly above budget. Consider choosing Budget stays.'}
              </small>
            </div>

            <div className="summary-tags-list">
              <div className="sum-tag"><span>🍽️ Food:</span> <strong>{food}</strong></div>
              <div className="sum-tag"><span>🏨 Stay:</span> <strong>{accommodation}</strong></div>
              <div className="sum-tag"><span>🛡️ Safety:</span> <strong>{safety} Priority</strong></div>
              <div className="sum-tag"><span>🌱 Eco Mode:</span> <strong>{Object.values(sustainability).filter(Boolean).length}/4 Features Active</strong></div>
            </div>

            <button 
              type="submit" 
              className="btn-generate-journey"
              disabled={isGenerating}
            >
              <Sparkles className="w-5 h-5" />
              <span>{isGenerating ? 'Computing Plan with 7 AI Agents...' : '✨ Generate My Journey →'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
