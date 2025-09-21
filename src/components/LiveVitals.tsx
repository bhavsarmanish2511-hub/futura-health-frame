import React, { useState, useEffect } from 'react';
import { Activity, Heart, Droplet, Zap } from 'lucide-react';

interface VitalData {
  value: number;
  history: number[];
}

const LiveVitals: React.FC = () => {
  const [heartRate, setHeartRate] = useState<VitalData>({ value: 72, history: Array(20).fill(72) });
  const [bloodPressure, setBloodPressure] = useState({ sys: 120, dia: 80, history: Array(20).fill(120) });
  const [glucose, setGlucose] = useState<VitalData>({ value: 95, history: Array(20).fill(95) });
  const [o2Sat, setO2Sat] = useState<VitalData>({ value: 98, history: Array(20).fill(98) });

  // Realistic vital fluctuations with smooth transitions
  useEffect(() => {
    const interval = setInterval(() => {
      // Heart Rate (60-80 BPM normal range)
      setHeartRate(prev => {
        const variation = (Math.sin(Date.now() / 1000) + Math.random() - 0.5) * 2;
        const newValue = Math.min(80, Math.max(60, prev.value + variation));
        const newHistory = [...prev.history.slice(1), newValue];
        return { value: newValue, history: newHistory };
      });

      // Blood Pressure
      setBloodPressure(prev => {
        const sysVariation = (Math.cos(Date.now() / 1500) + Math.random() - 0.5) * 1.5;
        const diaVariation = (Math.sin(Date.now() / 1500) + Math.random() - 0.5) * 1;
        const newSys = Math.min(125, Math.max(115, prev.sys + sysVariation));
        const newDia = Math.min(85, Math.max(75, prev.dia + diaVariation));
        const newHistory = [...prev.history.slice(1), newSys];
        return { sys: newSys, dia: newDia, history: newHistory };
      });

      // Glucose (90-100 mg/dL normal fasting)
      setGlucose(prev => {
        const variation = (Math.sin(Date.now() / 2000) + Math.random() - 0.5) * 1;
        const newValue = Math.min(100, Math.max(90, prev.value + variation));
        const newHistory = [...prev.history.slice(1), newValue];
        return { value: newValue, history: newHistory };
      });

      // O2 Saturation (96-99% normal)
      setO2Sat(prev => {
        const variation = (Math.random() - 0.5) * 0.5;
        const newValue = Math.min(99, Math.max(96, prev.value + variation));
        const newHistory = [...prev.history.slice(1), newValue];
        return { value: newValue, history: newHistory };
      });
    }, 500); // Update every 500ms for smooth animation

    return () => clearInterval(interval);
  }, []);

  const renderMiniGraph = (history: number[], color: string) => {
    const max = Math.max(...history);
    const min = Math.min(...history);
    const range = max - min || 1;
    
    const points = history.map((value, index) => {
      const x = (index / (history.length - 1)) * 100;
      const y = 25 - ((value - min) / range) * 20;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg className="w-full h-6" viewBox="0 0 100 30">
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          className="animate-pulse"
        />
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity="0.3"
          style={{ filter: 'blur(2px)' }}
        />
      </svg>
    );
  };

  return (
    <div className="grid grid-cols-2 gap-3 mb-4">
      {/* Heart Rate */}
      <div className="glass rounded-xl p-3 border border-neon-pink/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/5 to-transparent animate-pulse" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <Heart className="w-3 h-3 text-neon-pink animate-pulse" />
            <p className="text-xs text-muted-foreground">Heart Rate</p>
          </div>
          <p className="text-xl font-bold text-neon-pink mb-1">
            {Math.round(heartRate.value)} BPM
          </p>
          {renderMiniGraph(heartRate.history, 'hsl(var(--neon-pink))')}
          <p className="text-xs text-neon-green mt-1 flex items-center gap-1">
            <Activity className="w-3 h-3" />
            Good Health
          </p>
        </div>
      </div>
      
      {/* Blood Pressure */}
      <div className="glass rounded-xl p-3 border border-neon-cyan/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent animate-pulse" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <Droplet className="w-3 h-3 text-neon-cyan animate-pulse" />
            <p className="text-xs text-muted-foreground">Blood Pressure</p>
          </div>
          <p className="text-xl font-bold text-neon-cyan mb-1">
            {Math.round(bloodPressure.sys)}/{Math.round(bloodPressure.dia)}
          </p>
          {renderMiniGraph(bloodPressure.history, 'hsl(var(--neon-cyan))')}
          <p className="text-xs text-neon-green mt-1 flex items-center gap-1">
            <Activity className="w-3 h-3" />
            Optimal
          </p>
        </div>
      </div>
      
      {/* Glucose */}
      <div className="glass rounded-xl p-3 border border-neon-purple/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-transparent animate-pulse" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-3 h-3 text-neon-purple animate-pulse" />
            <p className="text-xs text-muted-foreground">Glucose</p>
          </div>
          <p className="text-xl font-bold text-neon-purple mb-1">
            {Math.round(glucose.value)} mg/dL
          </p>
          {renderMiniGraph(glucose.history, 'hsl(var(--neon-purple))')}
          <p className="text-xs text-neon-green mt-1 flex items-center gap-1">
            <Activity className="w-3 h-3" />
            Normal
          </p>
        </div>
      </div>
      
      {/* O2 Saturation */}
      <div className="glass rounded-xl p-3 border border-neon-green/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 to-transparent animate-pulse" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-3 h-3 text-neon-green animate-pulse" />
            <p className="text-xs text-muted-foreground">O₂ Saturation</p>
          </div>
          <p className="text-xl font-bold text-neon-green mb-1">
            {Math.round(o2Sat.value)}%
          </p>
          {renderMiniGraph(o2Sat.history, 'hsl(var(--neon-green))')}
          <p className="text-xs text-neon-green mt-1 flex items-center gap-1">
            <Activity className="w-3 h-3" />
            Excellent
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveVitals;