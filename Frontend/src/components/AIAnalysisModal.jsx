import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AIAnalysisModal({ onComplete, destinationName = 'Vijayawada' }) {
  const agentSteps = [
    { id: 1, name: 'Preference Agent', icon: '🤖', action: 'Analyzing interests, vibe & historical landmark affinities...' },
    { id: 2, name: 'Budget Agent', icon: '💰', action: 'Allocating hotel, dining & transit budgets with 8% safety buffer...' },
    { id: 3, name: 'Hotel & Hospitality Agent', icon: '🏨', action: 'Selecting top-rated accommodations and authentic regional dining...' },
    { id: 4, name: 'Route & Transit Agent', icon: '🗺️', action: 'Sequencing daily timetable to prevent backtracking and traffic delays...' },
    { id: 5, name: 'Safety Agent', icon: '🛡️', action: 'Verifying emergency hospitals, 24/7 helplines & tourist corridors...' },
    { id: 6, name: 'Sustainability Agent', icon: '🌱', action: 'Computing CO2 emissions offset and eco-friendly pedestrian paths...' },
    { id: 7, name: 'Adaptive Agent', icon: '🔄', action: 'Priming dynamic live replanning triggers for weather & road conditions...' }
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < agentSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 450);
      return () => clearTimeout(timer);
    } else {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      const finishTimer = setTimeout(() => {
        onComplete();
      }, 700);
      return () => clearTimeout(finishTimer);
    }
  }, [currentStep, agentSteps.length, onComplete]);

  const progressPercent = Math.min(100, Math.round((currentStep / agentSteps.length) * 100));

  return (
    <div className="analysis-overlay">
      <div className="analysis-modal-card">
        {/* Pulsing Orb */}
        <div className="analysis-orb-wrap">
          <div className="orb-radar-ring"></div>
          <div className="orb-center-icon">
            <Sparkles className="w-8 h-8 text-indigo-400 animate-spin-slow" />
          </div>
        </div>

        <span className="analysis-eyebrow">YATRA AI MULTI-AGENT COMPUTE MATRIX</span>
        <h2 className="analysis-title">Orchestrating Your Journey to {destinationName}</h2>
        <p className="analysis-subtext">
          7 autonomous intelligence nodes are collaborating to calculate your perfect itinerary.
        </p>

        {/* Progress Bar */}
        <div className="analysis-progress-box">
          <div className="progress-label-row">
            <span>Synthesis Progress</span>
            <strong>{progressPercent}%</strong>
          </div>
          <div className="analysis-track">
            <div className="analysis-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        {/* Agent Step Grid */}
        <div className="analysis-agents-list">
          {agentSteps.map((agent, index) => {
            const isDone = index < currentStep;
            const isCurrent = index === currentStep;
            return (
              <div 
                key={agent.id} 
                className={`analysis-agent-item ${isDone ? 'agent-done' : ''} ${isCurrent ? 'agent-active' : ''}`}
              >
                <span className="agent-item-icon">{agent.icon}</span>
                <div className="agent-item-text">
                  <div className="agent-item-title-row">
                    <strong>{agent.name}</strong>
                    {isDone ? (
                      <span className="agent-badge-done">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Done
                      </span>
                    ) : isCurrent ? (
                      <span className="agent-badge-working">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Processing
                      </span>
                    ) : (
                      <span className="agent-badge-queued">Queued</span>
                    )}
                  </div>
                  <p>{agent.action}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
