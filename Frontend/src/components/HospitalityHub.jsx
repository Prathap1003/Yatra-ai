import React, { useState } from 'react';
import { 
  Hotel, 
  Utensils, 
  Ticket, 
  Star, 
  Check, 
  ExternalLink, 
  Sparkles,
  Calendar,
  CreditCard,
  Download,
  X
} from 'lucide-react';

export default function HospitalityHub({ activeTrip }) {
  const [activeTab, setActiveTab] = useState('stays');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingReference, setBookingReference] = useState('');

  const destination = activeTrip?.destination || 'Vijayawada';

  const defaultHotels = [
    {
      id: 'h1',
      name: `${destination} Heritage Palace Hotel`,
      tier: 'Luxury',
      rating: 4.9,
      reviews: 420,
      pricePerNight: 5800,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
      amenities: ['Infinity Pool', 'Ayurvedic Spa', 'Free High-Speed Wi-Fi', 'Complimentary Breakfast', 'River Views']
    },
    {
      id: 'h2',
      name: `${destination} Comfort Central Suites`,
      tier: 'Comfort',
      rating: 4.6,
      reviews: 280,
      pricePerNight: 2400,
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
      amenities: ['AC & Heating', 'Rooftop Restaurant', 'Free Wi-Fi', 'Airport Cab Transfer']
    },
    {
      id: 'h3',
      name: `${destination} Backpacker & Nomad Stay`,
      tier: 'Budget',
      rating: 4.3,
      reviews: 195,
      pricePerNight: 950,
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80',
      amenities: ['Clean Bunks', 'Common Lounge & Coworking', 'High-Speed Wi-Fi', 'City Center']
    }
  ];

  const defaultRestaurants = [
    {
      id: 'r1',
      name: `Grand ${destination} Traditional Mess`,
      type: 'Authentic Regional Thali',
      diet: 'Vegetarian',
      rating: 4.9,
      avgCost: 220,
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
      mustTry: 'Unlimited Banana Leaf Thali with Ghee Podi'
    },
    {
      id: 'r2',
      name: `The Royal Spice Kitchen & Tandoor`,
      type: 'Regional Biryani & Seafood',
      diet: 'Non-Vegetarian',
      rating: 4.8,
      avgCost: 400,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
      mustTry: 'Special Claypot Biryani & Prawn Fry'
    },
    {
      id: 'r3',
      name: `Artisan Coffee & Organic Cafe`,
      type: 'Specialty Brews & Bakery',
      diet: 'Vegan / Continental',
      rating: 4.7,
      avgCost: 180,
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
      mustTry: 'Single Origin Filter Coffee & Warm Croissant'
    }
  ];

  const defaultExperiences = [
    {
      id: 'e1',
      name: `${destination} Sunrise Boating & Island Tour`,
      duration: '3 Hours',
      rating: 4.9,
      price: 450,
      image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80',
      desc: 'Scenic morning cruise with private guide, bird watching, and refreshments.'
    },
    {
      id: 'e2',
      name: `Heritage & Temple Architectural Walk`,
      duration: '2.5 Hours',
      rating: 4.8,
      price: 300,
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
      desc: 'Expert-led walking journey exploring 4th-century rock caves and royal history.'
    }
  ];

  const handleOpenBooking = (item, category) => {
    setSelectedBooking({ ...item, category });
    setBookingConfirmed(false);
  };

  const handleConfirmBooking = () => {
    const code = 'YATRA-' + Math.random().toString(36).substring(2, 7).toUpperCase();
    setBookingReference(code);
    setBookingConfirmed(true);
  };

  return (
    <div className="hospitality-page-container">
      <div className="page-header-box">
        <div className="badge-pill">
          <Hotel className="w-4 h-4 text-indigo-400" />
          <span>HOSPITALITY & EXPERIENCES HUB</span>
        </div>
        <h2 className="page-title">Curated Stays & Dining in {destination}</h2>
        <p className="page-subtext">Verified accommodations, authentic regional culinary gems, and curated activity passes.</p>
      </div>

      {/* Category Tabs */}
      <div className="hospitality-nav-tabs">
        <button 
          className={`tab-pill-btn ${activeTab === 'stays' ? 'tab-pill-active' : ''}`}
          onClick={() => setActiveTab('stays')}
        >
          <Hotel className="w-4 h-4" />
          <span>Vetted Hotels & Stays ({defaultHotels.length})</span>
        </button>

        <button 
          className={`tab-pill-btn ${activeTab === 'dining' ? 'tab-pill-active' : ''}`}
          onClick={() => setActiveTab('dining')}
        >
          <Utensils className="w-4 h-4" />
          <span>Dining & Restaurants ({defaultRestaurants.length})</span>
        </button>

        <button 
          className={`tab-pill-btn ${activeTab === 'experiences' ? 'tab-pill-active' : ''}`}
          onClick={() => setActiveTab('experiences')}
        >
          <Ticket className="w-4 h-4" />
          <span>Experiences & Passes ({defaultExperiences.length})</span>
        </button>
      </div>

      {/* STAYS TAB */}
      {activeTab === 'stays' && (
        <div className="hospitality-grid">
          {defaultHotels.map(h => (
            <div key={h.id} className="stay-card">
              <div className="stay-image-box">
                <img src={h.image} alt={h.name} className="stay-img" />
                <span className="stay-tier-pill">{h.tier}</span>
              </div>
              <div className="stay-details">
                <div className="stay-header-row">
                  <h3 className="stay-name">{h.name}</h3>
                  <div className="stay-rating-box">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>{h.rating}</span>
                  </div>
                </div>

                <div className="stay-amenities-tags">
                  {h.amenities.map(a => (
                    <span key={a} className="amenity-chip">✓ {a}</span>
                  ))}
                </div>

                <div className="stay-price-row">
                  <div>
                    <span className="text-xs text-slate-400">Rate per night</span>
                    <strong className="text-lg text-emerald-400 block">₹{h.pricePerNight.toLocaleString('en-IN')}</strong>
                  </div>
                  <button 
                    className="btn-book-now"
                    onClick={() => handleOpenBooking(h, 'Hotel Stay')}
                  >
                    Book Stay →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DINING TAB */}
      {activeTab === 'dining' && (
        <div className="hospitality-grid">
          {defaultRestaurants.map(r => (
            <div key={r.id} className="dining-card">
              <div className="stay-image-box">
                <img src={r.image} alt={r.name} className="stay-img" />
                <span className="stay-tier-pill bg-indigo-600/80">{r.diet}</span>
              </div>
              <div className="stay-details">
                <div className="stay-header-row">
                  <h3 className="stay-name">{r.name}</h3>
                  <div className="stay-rating-box">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>{r.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 font-medium mb-2">{r.type}</p>
                <div className="must-try-box">
                  <span className="text-xs text-amber-300 font-semibold">🌟 Must-Try:</span>
                  <p className="text-xs text-slate-300">{r.mustTry}</p>
                </div>
                <div className="stay-price-row mt-3">
                  <div>
                    <span className="text-xs text-slate-400">Average Meal Cost</span>
                    <strong className="text-base text-white block">~₹{r.avgCost} / person</strong>
                  </div>
                  <button 
                    className="btn-book-now bg-amber-600 hover:bg-amber-500"
                    onClick={() => handleOpenBooking(r, 'Table Reservation')}
                  >
                    Reserve Table →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EXPERIENCES TAB */}
      {activeTab === 'experiences' && (
        <div className="hospitality-grid">
          {defaultExperiences.map(e => (
            <div key={e.id} className="experience-card">
              <div className="stay-image-box">
                <img src={e.image} alt={e.name} className="stay-img" />
                <span className="stay-tier-pill bg-emerald-600/80">{e.duration}</span>
              </div>
              <div className="stay-details">
                <div className="stay-header-row">
                  <h3 className="stay-name">{e.name}</h3>
                  <div className="stay-rating-box">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>{e.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 mb-3">{e.desc}</p>
                <div className="stay-price-row">
                  <div>
                    <span className="text-xs text-slate-400">Pass Price</span>
                    <strong className="text-lg text-emerald-400 block">₹{e.price} / person</strong>
                  </div>
                  <button 
                    className="btn-book-now bg-indigo-600 hover:bg-indigo-500"
                    onClick={() => handleOpenBooking(e, 'Experience Pass')}
                  >
                    Book Pass →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* BOOKING MODAL */}
      {selectedBooking && (
        <div className="modal-backdrop">
          <div className="modal-dialog">
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-indigo-400" />
                <h3>{bookingConfirmed ? 'Booking Confirmed!' : `Confirm ${selectedBooking.category}`}</h3>
              </div>
              <button onClick={() => setSelectedBooking(null)} className="modal-close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="modal-body">
              {!bookingConfirmed ? (
                <div>
                  <div className="booking-summary-box mb-4">
                    <strong className="text-lg text-white block">{selectedBooking.name}</strong>
                    <span className="text-xs text-indigo-400">{destination} • Verified Yatra Partner</span>
                    <div className="mt-3 pt-3 border-t border-slate-700/50 flex justify-between">
                      <span className="text-sm text-slate-400">Estimated Rate:</span>
                      <strong className="text-sm text-emerald-400">
                        ₹{(selectedBooking.pricePerNight || selectedBooking.price || selectedBooking.avgCost).toLocaleString('en-IN')}
                      </strong>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mb-4">
                    Instant confirmation with free cancellation up to 24 hours before your trip.
                  </p>

                  <button className="btn-hero-primary w-full" onClick={handleConfirmBooking}>
                    <span>Complete Instant Reservation (Demo)</span>
                  </button>
                </div>
              ) : (
                <div className="booking-success-box text-center py-4">
                  <div className="success-icon-circle mx-auto mb-3">
                    <Check className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h4 className="text-xl text-white font-bold mb-1">Reservation Confirmed!</h4>
                  <p className="text-xs text-slate-400 mb-4">Your voucher code has been saved to your digital wallet.</p>
                  
                  <div className="voucher-card-box">
                    <span className="text-xs text-slate-400">CONFIRMATION VOUCHER CODE</span>
                    <strong className="text-2xl text-indigo-400 font-mono tracking-wider block my-1">
                      {bookingReference}
                    </strong>
                    <small className="text-xs text-slate-500">Show this voucher at check-in</small>
                  </div>

                  <button className="btn-secondary w-full mt-4" onClick={() => setSelectedBooking(null)}>
                    Done & Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
