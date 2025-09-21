import React, { useState } from 'react';
import { Pill, Check, X, Clock, Battery, Wifi, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
  bottleSync: string;
  batteryLevel: number;
}

const MedsScreen: React.FC = () => {
  const [expandedMed, setExpandedMed] = useState<string | null>(null);
  
  const medications: Medication[] = [
    { id: '1', name: 'Metformin', dosage: '500mg', time: '08:00', taken: true, bottleSync: '2 min ago', batteryLevel: 95 },
    { id: '2', name: 'Lisinopril', dosage: '10mg', time: '08:00', taken: true, bottleSync: '2 min ago', batteryLevel: 88 },
    { id: '3', name: 'Atorvastatin', dosage: '20mg', time: '20:00', taken: false, bottleSync: '5 min ago', batteryLevel: 76 },
    { id: '4', name: 'Aspirin', dosage: '81mg', time: '20:00', taken: false, bottleSync: '3 min ago', batteryLevel: 92 },
  ];

  const adherenceRate = 94;

  return (
    <div className="h-full flex flex-col p-4 pb-24 overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-foreground mb-2">Medication Tracker</h1>
        
        {/* Adherence Score */}
        <div className="glass rounded-xl p-3 border border-neon-green/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Monthly Adherence</span>
            <span className="text-lg font-bold text-neon-green">{adherenceRate}%</span>
          </div>
          <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-health rounded-full animate-pulse-glow" 
              style={{ width: `${adherenceRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Today's Medications */}
      <div className="mb-3">
        <h2 className="text-sm font-semibold text-neon-cyan mb-2">Today's Schedule</h2>
        
        <div className="space-y-2">
          {medications.map((med) => (
            <div 
              key={med.id}
              className={`glass rounded-xl p-3 border transition-all ${
                med.taken 
                  ? 'border-neon-green/30' 
                  : 'border-neon-pink/30 animate-pulse-glow'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    med.taken 
                      ? 'bg-neon-green/20' 
                      : 'bg-neon-pink/20'
                  }`}>
                    {med.taken ? (
                      <Check className="w-5 h-5 text-neon-green" />
                    ) : (
                      <Pill className="w-5 h-5 text-neon-pink animate-pulse-glow" />
                    )}
                  </div>
                  
                  <div>
                    <p className="text-sm font-semibold text-foreground">{med.name}</p>
                    <p className="text-xs text-muted-foreground">{med.dosage} • {med.time}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setExpandedMed(expandedMed === med.id ? null : med.id)}
                  className="p-1"
                >
                  {expandedMed === med.id ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>
              
              {expandedMed === med.id && (
                <div className="mt-3 pt-3 border-t border-border space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <Wifi className="w-3 h-3 text-neon-cyan" />
                      <span className="text-muted-foreground">Smart Bottle Sync</span>
                    </div>
                    <span className="text-neon-cyan">{med.bottleSync}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <Battery className="w-3 h-3 text-neon-green" />
                      <span className="text-muted-foreground">Battery Level</span>
                    </div>
                    <span className={med.batteryLevel > 50 ? 'text-neon-green' : 'text-neon-pink'}>
                      {med.batteryLevel}%
                    </span>
                  </div>
                  
                  <div className="mt-2 p-2 bg-muted/20 rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      <span className="text-neon-purple font-semibold">AI Tip:</span> Take with food to minimize stomach upset. 
                      Optimal absorption occurs 30 minutes before meals.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Doses */}
      <div className="glass rounded-xl p-3 border border-neon-purple/20 mb-3">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-neon-purple animate-pulse-glow" />
          <span className="text-sm font-semibold text-neon-purple">Next Dose</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Atorvastatin 20mg in <span className="text-neon-purple font-semibold">2 hours 15 minutes</span>
        </p>
      </div>

      {/* Refill Alert */}
      <div className="glass rounded-xl p-3 border border-destructive/20 holographic">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-destructive animate-pulse-glow" />
          <div className="flex-1">
            <p className="text-xs font-semibold text-destructive">Refill Needed</p>
            <p className="text-xs text-muted-foreground">
              Metformin supply: 5 days remaining
            </p>
          </div>
          <button className="px-3 py-1 rounded-lg bg-destructive/20 text-destructive text-xs font-semibold">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedsScreen;