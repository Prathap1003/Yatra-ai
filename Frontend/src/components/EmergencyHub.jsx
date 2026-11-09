import React, { useState } from 'react';
import { 
  ShieldAlert, 
  PhoneCall, 
  MapPin, 
  Navigation, 
  AlertTriangle, 
  ExternalLink, 
  CheckCircle2,
  HeartPulse,
  Flame,
  UserCheck,
  X
} from 'lucide-react';

export default function EmergencyHub({ activeTrip }) {
  const [sosActive, setSosActive] = useState(false);
  const destination = activeTrip?.destination || 'Vijayawada';

  const nationalHelplines = [
    { name: 'National Emergency Helpline', number: '112', icon: '🚨', desc: 'All-in-one Police, Fire & Medical' },
    { name: 'Ambulance & Medical Emergency', number: '108', icon: '🚑', desc: '24x7 Free Ambulance Service' },
    { name: 'Women Safety Helpline', number: '1091', icon: '🛡️', desc: 'Immediate Police Assistance for Women' },
    { name: 'Tourist Assistance Helpline', number: '1363', icon: '🧭', desc: 'Multilingual Inbound Traveler Aid' }
  ];

  const destinationHospitals = [
    {
      name: `${destination} Apex Multi-Speciality Hospital`,
      address: 'Central Hospital Road, Emergency Wing',
      phone: '+91 866 257 5555',
      emergency: '24/7 Trauma Care Available'
    },
    {
      name: `Government General Civil Hospital (${destination})`,
      address: 'Main Collectorate Bypass Road',
      phone: '108',
      emergency: '24/7 Free Emergency Services'
    }
  ];

  const handleTriggerSOS = () => {
    setSosActive(true);
  };

  return (
    <div className="emergency-page-container">
      <div className="page-header-box">
        <div className="badge-pill bg-rose-500/20 text-rose-300 border-rose-500/30">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>SAFETY & EMERGENCY ASSISTANCE</span>
        </div>
        <h2 className="page-title">Emergency Response Center • {destination}</h2>
        <p className="page-subtext">Immediate access to certified hospitals, police hotlines, and instant emergency broadcasts.</p>
      </div>

      {/* SOS PANIC TRIGGER BANNER */}
      <div className="sos-panic-banner">
        <div className="sos-banner-left">
          <AlertTriangle className="w-8 h-8 text-rose-400 animate-bounce" />
          <div>
            <h3>One-Tap Emergency SOS Broadcast</h3>
            <p>Broadcasts simulated GPS location to local emergency response & trusted contacts.</p>
          </div>
        </div>
        <button className="btn-sos-trigger" onClick={handleTriggerSOS}>
          <span>🚨 TRIGGER SOS 112</span>
        </button>
      </div>

      {/* SOS MODAL */}
      {sosActive && (
        <div className="modal-backdrop">
          <div className="modal-dialog border-rose-500/50">
            <div className="modal-header bg-rose-950/40">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                <h3 className="text-rose-300">EMERGENCY SOS BROADCAST ACTIVE</h3>
              </div>
              <button onClick={() => setSosActive(false)} className="modal-close">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="modal-body text-center py-4">
              <div className="sos-ring-pulse mx-auto mb-3">
                <PhoneCall className="w-8 h-8 text-rose-400 animate-pulse" />
              </div>
              <h4 className="text-lg text-white font-bold mb-1">Emergency Signal Transmitted</h4>
              <p className="text-xs text-slate-300 mb-4">
                Location: <strong>{destination}, India</strong> (Simulated Coordinates)
              </p>
              <div className="sos-call-buttons-grid">
                <a href="tel:112" className="btn-call-emergency bg-rose-600">
                  <PhoneCall className="w-4 h-4" /> Call Police 112
                </a>
                <a href="tel:108" className="btn-call-emergency bg-red-700">
                  <HeartPulse className="w-4 h-4" /> Call Ambulance 108
                </a>
              </div>
              <button className="btn-secondary w-full mt-4" onClick={() => setSosActive(false)}>
                Cancel Alert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NATIONAL HELPLINES GRID */}
      <section className="emergency-section">
        <h3 className="section-mini-heading">VERIFIED NATIONAL HELPLINES</h3>
        <div className="helplines-grid">
          {nationalHelplines.map((line) => (
            <div key={line.number} className="helpline-card">
              <div className="helpline-top">
                <span className="helpline-icon">{line.icon}</span>
                <span className="helpline-num-pill">{line.number}</span>
              </div>
              <strong className="helpline-title">{line.name}</strong>
              <p className="helpline-desc">{line.desc}</p>
              <a href={`tel:${line.number}`} className="btn-dial-helpline">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call {line.number}</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 24/7 HOSPITALS IN ACTIVE CITY */}
      <section className="emergency-section">
        <h3 className="section-mini-heading">24/7 EMERGENCY HOSPITALS IN {destination.toUpperCase()}</h3>
        <div className="hospitals-list-grid">
          {destinationHospitals.map((hosp, idx) => (
            <div key={idx} className="hospital-card">
              <div className="hospital-info">
                <strong className="hospital-name">{hosp.name}</strong>
                <span className="hospital-addr">📍 {hosp.address}</span>
                <span className="hospital-badge">✓ {hosp.emergency}</span>
              </div>
              <div className="hospital-actions">
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hosp.name + ' ' + destination)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-hospital-maps"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a href={`tel:${hosp.phone}`} className="btn-hospital-call">
                  <PhoneCall className="w-4 h-4" />
                  <span>Call {hosp.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
