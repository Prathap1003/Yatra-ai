import React, { useState, useEffect } from 'react';
import './index.css';
import './App.css';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import LandingPage from './components/LandingPage';
import TripPlanner from './components/TripPlanner';
import AIAnalysisModal from './components/AIAnalysisModal';
import TripDashboard from './components/TripDashboard';
import MyTrips from './components/MyTrips';
import HospitalityHub from './components/HospitalityHub';
import LiveTripTracker from './components/LiveTripTracker';
import TravelWallet from './components/TravelWallet';
import EmergencyHub from './components/EmergencyHub';
import TravelProfile from './components/TravelProfile';
import SettingsPage from './components/SettingsPage';

import { generateTrip } from './services/api';
import { POPULAR_DESTINATIONS } from './data/destinations';
import { Sparkles, Share2, Check, X, ShieldAlert, PhoneCall } from 'lucide-react';

const STORAGE_KEY = 'yatra_ai_saved_trips_v3';
const ACTIVE_TRIP_KEY = 'yatra_ai_active_trip_v3';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [savedTrips, setSavedTrips] = useState([]);
  const [activeTrip, setActiveTrip] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [pendingTripData, setPendingTripData] = useState(null);
  const [plannerPrefillDest, setPlannerPrefillDest] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [toast, setToast] = useState(null);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const storedTrips = localStorage.getItem(STORAGE_KEY);
      if (storedTrips) {
        const parsed = JSON.parse(storedTrips);
        setSavedTrips(parsed);
        const storedActive = localStorage.getItem(ACTIVE_TRIP_KEY);
        if (storedActive) {
          setActiveTrip(JSON.parse(storedActive));
        } else if (parsed.length > 0) {
          setActiveTrip(parsed[0]);
        }
      } else {
        // Initialize with default demo trip (Vijayawada)
        loadSampleDemoTrip('Vijayawada');
      }
    } catch (e) {
      console.warn('Storage parsing error', e);
    }
  }, []);

  // Save to LocalStorage whenever savedTrips or activeTrip changes
  const saveTripsState = (trips, currentActive) => {
    setSavedTrips(trips);
    setActiveTrip(currentActive);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
    if (currentActive) {
      localStorage.setItem(ACTIVE_TRIP_KEY, JSON.stringify(currentActive));
    }
  };

  const showToastNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleStartPlanning = (prefillDest = '') => {
    setPlannerPrefillDest(prefillDest);
    setActiveTab('planner');
  };

  const handleTriggerGenerate = async (formData) => {
    setIsAnalyzing(true);
    try {
      const result = await generateTrip(formData);
      setPendingTripData(result);
    } catch (err) {
      console.error('Trip generation error:', err);
      setIsAnalyzing(false);
      alert('Unable to generate trip. Please try again.');
    }
  };

  const handleAnalysisComplete = () => {
    if (pendingTripData) {
      const newSaved = [pendingTripData, ...savedTrips.filter(t => t.trip?.id !== pendingTripData.trip?.id)];
      saveTripsState(newSaved, pendingTripData);
      setPendingTripData(null);
      setIsAnalyzing(false);
      setActiveTab('dashboard');
      showToastNotification('✨ 7 AI Agents built your journey successfully!');
    } else {
      setIsAnalyzing(false);
      setActiveTab('dashboard');
    }
  };

  const handleSelectActiveTrip = (tripObj) => {
    setActiveTrip(tripObj);
    localStorage.setItem(ACTIVE_TRIP_KEY, JSON.stringify(tripObj));
    setActiveTab('dashboard');
    showToastNotification(`Switched active trip to ${tripObj.trip?.destination}`);
  };

  const handleDeleteTrip = (tripId) => {
    const remaining = savedTrips.filter(t => t.trip?.id !== tripId);
    let newActive = activeTrip?.trip?.id === tripId ? remaining[0] || null : activeTrip;
    saveTripsState(remaining, newActive);
    showToastNotification('Trip removed from archive.');
  };

  const handleDuplicateTrip = (tripObj) => {
    const dup = {
      ...tripObj,
      trip: {
        ...tripObj.trip,
        id: `trip-${Date.now()}`,
        destination: `${tripObj.trip?.destination} (Copy)`
      }
    };
    const updated = [dup, ...savedTrips];
    saveTripsState(updated, activeTrip);
    showToastNotification('Trip duplicated successfully.');
  };

  const handleUpdateActiveTrip = (updatedTripObj) => {
    setActiveTrip(updatedTripObj);
    const updatedList = savedTrips.map(t => t.trip?.id === updatedTripObj.trip?.id ? updatedTripObj : t);
    saveTripsState(updatedList, updatedTripObj);
  };

  const loadSampleDemoTrip = (destName = 'Goa') => {
    const demoData = {
      success: true,
      trip: {
        id: `trip-${Date.now()}`,
        destination: destName,
        state: destName === 'Goa' ? 'Goa' : 'Andhra Pradesh',
        country: 'India',
        tagline: destName === 'Goa' ? 'Sun, Sand & Portuguese Heritage' : 'Riverside Heritage & Sacred Temples',
        heroImage: destName === 'Goa' 
          ? 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80'
          : 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
        bestSeason: 'October to March',
        days: 3,
        budget: 8500,
        travelers: 1,
        travelType: 'Solo',
        preferences: ['Heritage', 'Photography', 'Beach', 'Relaxation'],
        food: 'Vegetarian',
        accommodation: 'Comfort',
        safety: 'High',
        sustainability: { walking: true, publicTransport: true, ecoHotels: false, localRestaurants: true },
        createdAt: new Date().toISOString()
      },
      intelligence: {
        budget: {
          name: 'Budget Agent',
          status: 'completed',
          totalBudget: 8500,
          estimatedCost: 7450,
          remainingBudget: 1050,
          isFit: true,
          message: 'Budget allocated with ₹1,050 emergency reserve.'
        },
        safety: {
          name: 'Safety Agent',
          status: 'completed',
          score: 96,
          priority: 'High',
          message: 'Safe tourist corridors verified with 24/7 medical proximity.'
        },
        route: {
          name: 'Route Agent',
          status: 'completed',
          totalDistance: '42 km',
          transitMode: 'Metro & Scenic Coast Walk'
        },
        sustainability: {
          name: 'Sustainability Agent',
          status: 'completed',
          score: 86,
          co2SavedKg: '18.4 kg CO2 saved'
        },
        crowd: { level: 'Moderate', peakDays: 'Weekends' },
        weather: { temp: '28°C', condition: 'Sunny & Breezy' }
      },
      itinerary: [
        {
          day: 1,
          title: `Day 1: Iconic Landmarks & Sunset Coast`,
          theme: 'Heritage & Coastline',
          activities: [
            { id: 'd1-1', time: '08:30 AM', place: `${destName} Historic Heritage Citadel`, type: 'Heritage', duration: '2h', entryFee: 50, description: 'Explore ancient fort walls with ocean views.', icon: '🏰' },
            { id: 'd1-2', time: '10:30 AM', place: 'Breakfast: Regional Specialties & Tea', type: 'Food & Beverage', duration: '1h', entryFee: 120, description: 'Traditional local morning cuisine.', icon: '🍳' },
            { id: 'd1-3', time: '01:00 PM', place: 'Regional Midday Feast', type: 'Lunch', duration: '1.5h', entryFee: 260, description: 'Authentic local thali lunch.', icon: '🍽️' },
            { id: 'd1-4', time: '03:30 PM', place: 'Ancient Cathedral & Art Gallery', type: 'Culture', duration: '2h', entryFee: 25, description: 'UNESCO World Heritage baroque architecture.', icon: '🏛️' },
            { id: 'd1-5', time: '05:45 PM', place: 'Golden Hour Beach Sunset', type: 'Photography', duration: '1.5h', entryFee: 0, description: 'Stroll along the calm sands with sea breeze.', icon: '🌅' },
            { id: 'd1-6', time: '08:00 PM', place: 'Evening Dining by the Promenade', type: 'Dinner', duration: '1.5h', entryFee: 350, description: 'Relaxing evening meal with live music.', icon: '🌙' }
          ]
        },
        {
          day: 2,
          title: `Day 2: Nature Waterfalls & Backwater Leisure`,
          theme: 'Nature & Adventure',
          activities: [
            { id: 'd2-1', time: '08:30 AM', place: 'Cascading Waterfalls & Forest Trail', type: 'Nature', duration: '3h', entryFee: 100, description: 'Scenic trek inside wildlife sanctuary.', icon: '🌿' },
            { id: 'd2-2', time: '10:30 AM', place: 'Forest Cafe Herbal Refreshments', type: 'Food & Beverage', duration: '1h', entryFee: 100, description: 'Fresh farm fruits & mountain tea.', icon: '☕' },
            { id: 'd2-3', time: '01:00 PM', place: 'Spice Plantation Traditional Lunch', type: 'Lunch', duration: '1.5h', entryFee: 300, description: 'Farm fresh spices and regional dishes.', icon: '🍲' },
            { id: 'd2-4', time: '03:30 PM', place: 'Latin Heritage Quarter Art Walk', type: 'Culture', duration: '2h', entryFee: 0, description: 'Pastel historic villas and indie art studios.', icon: '🎨' },
            { id: 'd2-5', time: '05:45 PM', place: 'Sunset River Boat Cruise', type: 'Relaxation', duration: '1.5h', entryFee: 400, description: 'Cruising along tranquil backwaters.', icon: '⛵' },
            { id: 'd2-6', time: '08:00 PM', place: 'Local Night Market & Street Food', type: 'Dinner', duration: '2h', entryFee: 200, description: 'Vibrant night bazaar with souvenirs.', icon: '🛍️' }
          ]
        },
        {
          day: 3,
          title: `Day 3: Wellness, Yoga & Panoramic Lookout`,
          theme: 'Relaxation & Scenic',
          activities: [
            { id: 'd3-1', time: '08:30 AM', place: 'Morning Cliff Yoga & Meditation', type: 'Relaxation', duration: '1.5h', entryFee: 0, description: 'Rejuvenating morning ocean breeze session.', icon: '🧘' },
            { id: 'd3-2', time: '10:30 AM', place: 'Artisan Smoothie & Healthy Breakfast', type: 'Food & Beverage', duration: '1h', entryFee: 150, description: 'Organic bowls & freshly baked goods.', icon: '🥑' },
            { id: 'd3-3', time: '01:00 PM', place: 'Farewell Culinary Feast', type: 'Lunch', duration: '1.5h', entryFee: 350, description: 'Chef special banquet celebrating your trip.', icon: '🍽️' },
            { id: 'd3-4', time: '03:30 PM', place: 'Local Craft & Souvenir Emporium', type: 'Shopping', duration: '2h', entryFee: 0, description: 'Handcrafted woodwork and textiles.', icon: '🎁' }
          ]
        }
      ]
    };

    saveTripsState([demoData], demoData);
    showToastNotification(`Loaded ${destName} Demo Journey!`);
  };

  const handleResetAllData = () => {
    if (window.confirm('Reset all saved trips and clear local cache?')) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(ACTIVE_TRIP_KEY);
      setSavedTrips([]);
      setActiveTrip(null);
      showToastNotification('Cache cleared.');
    }
  };

  return (
    <div className="app-root-layout">
      {/* Toast Notification */}
      {toast && (
        <div className="global-toast-pill">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* AI Compute Analysis Modal */}
      {isAnalyzing && (
        <AIAnalysisModal 
          onComplete={handleAnalysisComplete}
          destinationName={pendingTripData?.trip?.destination || 'Destination'}
        />
      )}

      {/* SOS Global Emergency Modal */}
      {showSOSModal && (
        <div className="modal-backdrop">
          <div className="modal-dialog border-rose-500/50">
            <div className="modal-header bg-rose-950/40">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                <h3 className="text-rose-300">EMERGENCY SOS 112</h3>
              </div>
              <button onClick={() => setShowSOSModal(false)} className="modal-close">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="modal-body text-center py-4">
              <div className="sos-ring-pulse mx-auto mb-3">
                <PhoneCall className="w-8 h-8 text-rose-400 animate-pulse" />
              </div>
              <h4 className="text-lg text-white font-bold mb-1">Instant Emergency Quick-Dial</h4>
              <p className="text-xs text-slate-300 mb-4">
                Location: <strong>{activeTrip?.trip?.destination || 'India'}</strong>
              </p>
              <div className="sos-call-buttons-grid">
                <a href="tel:112" className="btn-call-emergency bg-rose-600">
                  <PhoneCall className="w-4 h-4" /> Police 112
                </a>
                <a href="tel:108" className="btn-call-emergency bg-red-700">
                  <PhoneCall className="w-4 h-4" /> Ambulance 108
                </a>
              </div>
              <button className="btn-secondary w-full mt-4" onClick={() => setShowSOSModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Trip Modal */}
      {showShareModal && (
        <div className="modal-backdrop">
          <div className="modal-dialog">
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-indigo-400" />
                <h3>Share Your Journey</h3>
              </div>
              <button onClick={() => setShowShareModal(false)} className="modal-close">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="modal-body py-3">
              <p className="text-xs text-slate-300 mb-3">
                Share this AI-generated travel blueprint with friends or co-travelers:
              </p>
              <div className="share-link-input-box">
                <input 
                  type="text" 
                  readOnly 
                  value={`https://yatra.ai/trip/${activeTrip?.trip?.id || 'demo-123'}`} 
                  className="input-primary font-mono text-xs"
                />
                <button 
                  className="btn-hero-primary"
                  onClick={() => {
                    navigator.clipboard.writeText(`https://yatra.ai/trip/${activeTrip?.trip?.id || 'demo-123'}`);
                    showToastNotification('✓ Share link copied to clipboard!');
                    setShowShareModal(false);
                  }}
                >
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Left Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        onSelectTab={(tabId) => setActiveTab(tabId)}
        activeTrip={activeTrip?.trip}
        savedTripsCount={savedTrips.length}
        onNewTrip={() => handleStartPlanning('')}
      />

      {/* Main Content Viewport */}
      <div className="main-content-layout">
        <Topbar 
          activeTab={activeTab}
          activeTrip={activeTrip?.trip}
          onSelectDestination={(destName) => handleStartPlanning(destName)}
          onSelectTab={(tabId) => setActiveTab(tabId)}
          onOpenSOS={() => setShowSOSModal(true)}
          onNewTrip={() => handleStartPlanning('')}
          currency={currency}
          onChangeCurrency={(cur) => setCurrency(cur)}
        />

        <main className="content-view-body">
          {activeTab === 'landing' && (
            <LandingPage 
              onStartPlanning={() => handleStartPlanning('')}
              onSelectDestination={(dest) => handleStartPlanning(dest)}
              onQuickDemo={() => loadSampleDemoTrip('Goa')}
            />
          )}

          {activeTab === 'planner' && (
            <TripPlanner 
              onGenerate={handleTriggerGenerate}
              isGenerating={isAnalyzing}
              initialDestination={plannerPrefillDest}
            />
          )}

          {activeTab === 'dashboard' && (
            <TripDashboard 
              tripData={activeTrip}
              onUpdateTrip={handleUpdateActiveTrip}
              onNavigateToTab={(tabId) => setActiveTab(tabId)}
              onShareTrip={() => setShowShareModal(true)}
            />
          )}

          {activeTab === 'myTrips' && (
            <MyTrips 
              savedTrips={savedTrips}
              activeTripId={activeTrip?.trip?.id}
              onSelectActiveTrip={handleSelectActiveTrip}
              onDeleteTrip={handleDeleteTrip}
              onDuplicateTrip={handleDuplicateTrip}
              onNewTrip={() => handleStartPlanning('')}
            />
          )}

          {activeTab === 'bookings' && (
            <HospitalityHub 
              activeTrip={activeTrip?.trip}
            />
          )}

          {activeTab === 'liveTrip' && (
            <LiveTripTracker 
              activeTrip={activeTrip}
              onOpenSOS={() => setShowSOSModal(true)}
              onReplan={() => setActiveTab('dashboard')}
            />
          )}

          {activeTab === 'wallet' && (
            <TravelWallet 
              activeTrip={activeTrip?.trip}
            />
          )}

          {activeTab === 'emergency' && (
            <EmergencyHub 
              activeTrip={activeTrip?.trip}
            />
          )}

          {activeTab === 'profile' && (
            <TravelProfile 
              savedTrips={savedTrips}
              onSelectDestination={(dest) => handleStartPlanning(dest)}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsPage 
              currency={currency}
              onChangeCurrency={(cur) => setCurrency(cur)}
              onResetData={handleResetAllData}
              onLoadDemoTrip={() => loadSampleDemoTrip('Goa')}
            />
          )}
        </main>
      </div>
    </div>
  );
}
