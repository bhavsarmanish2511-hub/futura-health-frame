import React, { useState, useEffect } from 'react';
import { Wifi, Signal, Battery } from 'lucide-react';

const StatusBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="absolute top-0 left-0 right-0 h-6 bg-black/90 flex items-center justify-between px-6 text-white text-xs font-medium z-50">
      {/* Left side - Time */}
      <div className="flex items-center">
        <span>{formatTime(currentTime)}</span>
      </div>

      {/* Center - Notch area (empty for visual balance) */}
      <div className="flex-1" />

      {/* Right side - Status icons */}
      <div className="flex items-center gap-1">
        <Signal className="w-3 h-3" />
        <Wifi className="w-3 h-3" />
        <Battery className="w-3 h-3" />
        <span className="ml-1">100%</span>
      </div>
    </div>
  );
};

export default StatusBar;