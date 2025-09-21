import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Wifi, Battery, Brain, Calendar, User } from 'lucide-react';
import LiveVitals from '../components/LiveVitals';

const HomeScreen: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAppointment, setShowAppointment] = useState(false);

  return (
    <div className="h-full flex flex-col overflow-y-auto custom-scrollbar">
      {/* Header with adjusted spacing */}
      <div className="px-4 pt-6 pb-4 text-center">
        <h1 className="text-xl font-bold bg-gradient-neon bg-clip-text text-transparent animate-pulse-glow mb-1">
          HEALTH NEXUS 2035
        </h1>
        <p className="text-xs text-muted-foreground">AI-Powered Health Companion</p>
      </div>

      <div className="px-4 pb-24">
      {/* Patient Card */}
        <div className="glass rounded-2xl p-4 mb-4 border border-neon-cyan/30 neon-glow-cyan">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Sarah Connor</h2>
            <p className="text-sm text-muted-foreground">Age 45 • ID: SC-2035-789</p>
          </div>
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-health flex items-center justify-center animate-pulse-glow">
              <span className="text-2xl font-bold text-background">92</span>
            </div>
            <Brain className="absolute -bottom-1 -right-1 w-5 h-5 text-neon-green animate-float" />
          </div>
        </div>
        
        <div className="mb-3">
          <p className="text-xs text-muted-foreground mb-1">AI Health Score</p>
          <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
            <div className="h-full w-[92%] bg-gradient-health rounded-full animate-pulse-glow" />
          </div>
        </div>

        <div className="flex gap-3 text-xs">
          <div className="flex items-center gap-1">
            <Wifi className="w-3 h-3 text-neon-cyan" />
            <span className="text-muted-foreground">Synced 2 min ago</span>
          </div>
          <div className="flex items-center gap-1">
            <Battery className="w-3 h-3 text-neon-green" />
            <span className="text-muted-foreground">All devices OK</span>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-3 flex items-center justify-center gap-1 text-xs text-neon-cyan"
        >
          {isExpanded ? (
            <>Hide Details <ChevronUp className="w-3 h-3" /></>
          ) : (
            <>View Full Profile <ChevronDown className="w-3 h-3" /></>
          )}
        </button>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border space-y-3">
            <div>
              <p className="text-xs font-semibold text-neon-purple mb-1">Medical Conditions</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded-full bg-neon-purple/20 text-xs text-neon-purple">Hypertension</span>
                <span className="px-2 py-1 rounded-full bg-neon-purple/20 text-xs text-neon-purple">Type 2 Diabetes</span>
              </div>
            </div>
            
            <div>
              <p className="text-xs font-semibold text-neon-cyan mb-1">Connected Devices</p>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Neural Implant v3.2</span>
                  <span className="text-neon-green">Online</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Smart Pill Dispenser</span>
                  <span className="text-neon-green">Online</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Nano Health Monitor</span>
                  <span className="text-neon-green">Online</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

        {/* Live Vitals with Animated Graphs */}
        <LiveVitals />

        {/* AI Insights */}
        <div className="glass rounded-xl p-3 border border-neon-blue/20 holographic">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-neon-blue animate-pulse-glow" />
            <p className="text-xs font-semibold text-neon-blue">AI Health Insights</p>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your vitals show consistent improvement. Sleep quality increased by 15% this week. 
            Consider increasing water intake by 20% for optimal hydration levels.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;