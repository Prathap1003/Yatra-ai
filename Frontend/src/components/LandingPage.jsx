import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Map, 
  Leaf, 
  TrendingUp, 
  Clock, 
  Heart,
  ChevronRight,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { POPULAR_DESTINATIONS } from '../data/destinations';

export default function LandingPage({ onStartPlanning, onSelectDestination, onQuickDemo }) {
  const agents = [
    { name: 'Preference Agent', role: 'Vibe & Interests Matching', icon: '🤖', desc: 'Analyzes your passions—whether heritage, photography, or street food—and aligns every landmark.' },
    { name: 'Budget Agent', role: 'Financial Optimization', icon: '💰', desc: 'Calculates hotel rates, meals, transit, and reserves an emergency buffer with zero hidden costs.' },
    { name: 'Hotel & Hospitality Agent', role: 'Vetted Stays & Dining', icon: '🏨', desc: 'Curates verified hotels and authentic regional restaurants matched to your dietary needs.' },
    { name: 'Route & Transit Agent', role: 'Travel Sequencing', icon: '🗺️', desc: 'Eliminates backtracking by organizing attractions into optimal, traffic-free sequences.' },
    { name: 'Safety Agent', role: 'Risk & Emergency Readiness', icon: '🛡️', desc: 'Scores safe zones, solo-traveler corridors, and connects verified 24/7 emergency medical contacts.' },
    { name: 'Sustainability Agent', role: 'Eco-Footprint Optimization', icon: '🌱', desc: 'Calculates carbon savings, promotes walking routes, and supports local farm-to-table dining.' },
    { name: 'Adaptive Agent', role: 'Live Dynamic Replanning', icon: '🔄', desc: 'Monitors real-time weather and traffic. If sudden rain hits, it swaps outdoor hikes for indoor galleries.' },
  ];

  return (
    <div className="landing-page-wrapper">
      {/* HERO SECTION */}
      <section className="landing-hero-section">
        <div className="hero-badge-pill">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Next-Gen Autonomous Travel Intelligence</span>
        </div>

        <h1 className="hero-main-title">
          Your trip doesn't follow a plan.<br />
          <span className="text-gradient">Your plan follows your trip.</span>
        </h1>

        <p className="hero-subtitle">
          Yatra AI deploys 7 specialized multi-agent AI systems to build your bespoke journey,
          optimize budgets, verify local safety, and dynamically adapt in real-time when conditions change.
        </p>

        <div className="hero-cta-group">
          <button className="btn-hero-primary" onClick={onStartPlanning}>
            <Sparkles className="w-5 h-5" />
            <span>Plan My Journey with AI</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="btn-hero-secondary" onClick={() => onSelectDestination('Goa')}>
            <span>Explore Demo Trip (Goa)</span>
          </button>
        </div>

        {/* Live Interactive Hero Showcase Card */}
        <div className="hero-card-preview">
          <div className="preview-header">
            <div className="preview-badge">
              <span className="live-dot"></span>
              <span>LIVE AI TRIP BLUEPRINT</span>
            </div>
            <span className="preview-dest-tag">📍 Vijayawada • 2 Days</span>
          </div>

          <div className="preview-metrics-grid">
            <div className="p-metric">
              <span className="pm-label">BUDGET OPTIMIZATION</span>
              <strong className="pm-val text-emerald-400">₹4,400 <small className="text-slate-400">/ ₹5,000</small></strong>
            </div>
            <div className="p-metric">
              <span className="pm-label">SAFETY RATING</span>
              <strong className="pm-val text-indigo-400">96 / 100 <small className="text-slate-400">High</small></strong>
            </div>
            <div className="p-metric">
              <span className="pm-label">ECO SCORE</span>
              <strong className="pm-val text-teal-400">84 / 100 <small className="text-slate-400">Low CO2</small></strong>
            </div>
            <div className="p-metric">
              <span className="pm-label">ADAPTIVE AGENT</span>
              <strong className="pm-val text-amber-400">Active <small className="text-slate-400">Live</small></strong>
            </div>
          </div>
        </div>
      </section>

      {/* MULTI-AGENT ARCHITECTURE SHOWCASE */}
      <section className="landing-section">
        <div className="section-header-center">
          <span className="section-eyebrow">MULTI-AGENT INTELLIGENCE</span>
          <h2 className="section-heading">How 7 AI Agents Orchestrate Your Journey</h2>
          <p className="section-subtext">Every itinerary is computed across specialized autonomous nodes working collaboratively.</p>
        </div>

        <div className="agent-showcase-grid">
          {agents.map((ag) => (
            <div key={ag.name} className="agent-feature-card">
              <div className="agent-card-top">
                <span className="agent-icon-emoji">{ag.icon}</span>
                <span className="agent-status-badge">Online</span>
              </div>
              <h3 className="agent-card-name">{ag.name}</h3>
              <span className="agent-card-role">{ag.role}</span>
              <p className="agent-card-desc">{ag.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* POPULAR DESTINATIONS EXPLORER */}
      <section className="landing-section">
        <div className="section-header-between">
          <div>
            <span className="section-eyebrow">CURATED DESTINATIONS</span>
            <h2 className="section-heading">Explore Popular Hubs in India</h2>
          </div>
          <button className="btn-link-action" onClick={onStartPlanning}>
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="destinations-showcase-grid">
          {POPULAR_DESTINATIONS.slice(0, 6).map((dest) => (
            <div 
              key={dest.name} 
              className="destination-card"
              onClick={() => onSelectDestination(dest.name)}
            >
              <div className="dest-image-wrap">
                <img src={dest.image} alt={dest.name} className="dest-image" loading="lazy" />
                <div className="dest-overlay-gradient"></div>
                <span className="dest-days-badge">{dest.recommendedDays} Days</span>
              </div>
              <div className="dest-content">
                <div className="dest-title-row">
                  <h3 className="dest-name">{dest.name}</h3>
                  <span className="dest-state">{dest.state}</span>
                </div>
                <p className="dest-tagline">{dest.tagline}</p>
                <div className="dest-footer-row">
                  <div className="dest-tags">
                    {dest.tags.slice(0, 2).map(t => (
                      <span key={t} className="d-tag">{t}</span>
                    ))}
                  </div>
                  <span className="dest-price">From ₹{dest.avgBudget.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="landing-cta-banner">
        <div className="cta-banner-content">
          <h2>Ready to experience the future of travel?</h2>
          <p>Generate a customized, budget-optimized, and adaptive itinerary in seconds.</p>
          <button className="btn-hero-primary" onClick={onStartPlanning}>
            <Sparkles className="w-5 h-5" />
            <span>Create My First Journey</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
