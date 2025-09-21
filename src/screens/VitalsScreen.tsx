import React, { useState } from 'react';
import { Activity, Heart, Droplet, Wind, TrendingUp, Calendar } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const VitalsScreen: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('day');
  const [selectedVital, setSelectedVital] = useState<string | null>(null);

  const heartRateData = [
    { time: '00:00', value: 65 },
    { time: '04:00', value: 62 },
    { time: '08:00', value: 75 },
    { time: '12:00', value: 82 },
    { time: '16:00', value: 78 },
    { time: '20:00', value: 70 },
    { time: '24:00', value: 68 },
  ];

  const bpData = [
    { time: '00:00', systolic: 118, diastolic: 78 },
    { time: '04:00', systolic: 115, diastolic: 75 },
    { time: '08:00', systolic: 125, diastolic: 82 },
    { time: '12:00', systolic: 130, diastolic: 85 },
    { time: '16:00', systolic: 128, diastolic: 83 },
    { time: '20:00', systolic: 122, diastolic: 80 },
    { time: '24:00', systolic: 120, diastolic: 78 },
  ];

  return (
    <div className="h-full flex flex-col p-4 pb-24 overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-foreground mb-2">Vital Signs Monitor</h1>
        
        {/* Time Range Selector */}
        <div className="flex gap-2">
          {(['day', 'week', 'month'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-lg text-xs transition-all ${
                timeRange === range
                  ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50'
                  : 'glass text-muted-foreground'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Heart Rate Chart */}
      <div className="glass rounded-xl p-3 mb-3 border border-neon-pink/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-neon-pink animate-pulse-glow" />
            <span className="text-sm font-semibold text-foreground">Heart Rate</span>
          </div>
          <span className="text-lg font-bold text-neon-pink">72 BPM</span>
        </div>
        
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={heartRateData}>
              <defs>
                <linearGradient id="heartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff0080" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ff0080" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" hide />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(15, 15, 25, 0.9)', 
                  border: '1px solid #ff0080',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#ff0080" 
                fillOpacity={1} 
                fill="url(#heartGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Blood Pressure Chart */}
      <div className="glass rounded-xl p-3 mb-3 border border-neon-cyan/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Droplet className="w-4 h-4 text-neon-cyan animate-pulse-glow" />
            <span className="text-sm font-semibold text-foreground">Blood Pressure</span>
          </div>
          <span className="text-lg font-bold text-neon-cyan">120/80</span>
        </div>
        
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={bpData}>
              <XAxis dataKey="time" hide />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(15, 15, 25, 0.9)', 
                  border: '1px solid #00ffff',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="systolic" 
                stroke="#00ffff" 
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="diastolic" 
                stroke="#00ffff" 
                strokeWidth={2}
                strokeOpacity={0.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="glass rounded-xl p-3 border border-neon-green/20">
          <div className="flex items-center gap-2 mb-1">
            <Wind className="w-3 h-3 text-neon-green" />
            <span className="text-xs text-muted-foreground">O₂ Saturation</span>
          </div>
          <p className="text-lg font-bold text-neon-green">98%</p>
          <p className="text-xs text-muted-foreground">Optimal</p>
        </div>
        
        <div className="glass rounded-xl p-3 border border-neon-purple/20">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-3 h-3 text-neon-purple" />
            <span className="text-xs text-muted-foreground">Glucose</span>
          </div>
          <p className="text-lg font-bold text-neon-purple">95 mg/dL</p>
          <p className="text-xs text-muted-foreground">Normal</p>
        </div>
      </div>

      {/* AI Prediction */}
      <div className="glass rounded-xl p-3 border border-neon-blue/20 holographic">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-neon-blue animate-pulse-glow" />
          <span className="text-xs font-semibold text-neon-blue">AI Health Prediction</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Based on current trends, your cardiovascular health is improving. 
          Risk of hypertensive episode: <span className="text-neon-green">Low (12%)</span>. 
          Recommended: Continue current exercise routine.
        </p>
      </div>
    </div>
  );
};

export default VitalsScreen;