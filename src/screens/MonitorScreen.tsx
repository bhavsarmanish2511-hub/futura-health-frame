import React, { useState } from 'react';
import { Video, Camera, Shield, Activity, AlertTriangle, Clock, Eye, Grid2X2 } from 'lucide-react';

interface CameraFeed {
  id: string;
  name: string;
  status: string;
  activity: string;
  alert: boolean;
}

const MonitorScreen: React.FC = () => {
  const [viewMode, setViewMode] = useState<'summary' | 'grid'>('summary');
  
  const cameraFeeds: CameraFeed[] = [
    { id: '1', name: 'Living Room', status: 'Active', activity: 'No movement', alert: false },
    { id: '2', name: 'Bedroom', status: 'Active', activity: 'Sleeping', alert: false },
    { id: '3', name: 'Kitchen', status: 'Active', activity: 'No activity', alert: false },
    { id: '4', name: 'Bathroom', status: 'Privacy', activity: 'Blocked', alert: false },
  ];

  const recentEvents = [
    { time: '14:32', event: 'Normal walking detected', location: 'Living Room' },
    { time: '13:15', event: 'Medication taken', location: 'Kitchen' },
    { time: '11:47', event: 'Visitor detected', location: 'Front Door' },
    { time: '09:30', event: 'Morning routine started', location: 'Bedroom' },
  ];

  return (
    <div className="h-full flex flex-col p-4 pb-24 overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-foreground mb-2">AI Video Monitoring</h1>
        
        {/* View Mode Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('summary')}
            className={`px-3 py-1 rounded-lg text-xs transition-all flex items-center gap-1 ${
              viewMode === 'summary'
                ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                : 'glass text-muted-foreground'
            }`}
          >
            <Eye className="w-3 h-3" />
            Summary
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1 rounded-lg text-xs transition-all flex items-center gap-1 ${
              viewMode === 'grid'
                ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                : 'glass text-muted-foreground'
            }`}
          >
            <Grid2X2 className="w-3 h-3" />
            Grid View
          </button>
        </div>
      </div>

      {viewMode === 'summary' ? (
        <>
          {/* AI Status Summary */}
          <div className="glass rounded-xl p-3 border border-neon-green/20 mb-3">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-neon-green animate-pulse-glow" />
              <span className="text-sm font-semibold text-neon-green">All Systems Normal</span>
            </div>
            <p className="text-xs text-muted-foreground">
              No unusual activity detected. Patient safety score: <span className="text-neon-green font-semibold">98%</span>
            </p>
          </div>

          {/* Camera Status */}
          <div className="space-y-2 mb-3">
            {cameraFeeds.map((feed) => (
              <div key={feed.id} className="glass rounded-xl p-3 border border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      feed.status === 'Privacy' 
                        ? 'bg-muted/30' 
                        : 'bg-neon-blue/20'
                    }`}>
                      <Camera className={`w-4 h-4 ${
                        feed.status === 'Privacy' 
                          ? 'text-muted-foreground' 
                          : 'text-neon-blue'
                      }`} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{feed.name}</p>
                      <p className="text-xs text-muted-foreground">{feed.activity}</p>
                    </div>
                  </div>
                  
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    feed.status === 'Active' 
                      ? 'bg-neon-green/20 text-neon-green' 
                      : 'bg-muted/30 text-muted-foreground'
                  }`}>
                    {feed.status}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Events */}
          <div className="glass rounded-xl p-3 border border-neon-purple/20">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-neon-purple animate-pulse-glow" />
              <span className="text-sm font-semibold text-neon-purple">Recent Activity</span>
            </div>
            
            <div className="space-y-2">
              {recentEvents.map((event, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-xs text-neon-cyan">{event.time}</span>
                  <div className="flex-1">
                    <p className="text-xs text-foreground">{event.event}</p>
                    <p className="text-xs text-muted-foreground">{event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-2 gap-2">
          {cameraFeeds.map((feed) => (
            <div key={feed.id} className="glass rounded-xl p-2 border border-neon-blue/20">
              <div className="aspect-video bg-muted/20 rounded-lg mb-2 flex items-center justify-center relative">
                {feed.status === 'Privacy' ? (
                  <div className="text-center">
                    <Shield className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                    <p className="text-[10px] text-muted-foreground">Privacy Mode</p>
                  </div>
                ) : (
                  <>
                    <Video className="w-8 h-8 text-neon-blue/30" />
                    <div className="absolute top-1 right-1 w-2 h-2 bg-neon-green rounded-full animate-pulse-glow" />
                  </>
                )}
              </div>
              <p className="text-[10px] font-semibold text-foreground">{feed.name}</p>
              <p className="text-[9px] text-muted-foreground">{feed.activity}</p>
            </div>
          ))}
        </div>
      )}

      {/* AI Alert */}
      <div className="glass rounded-xl p-3 border border-destructive/20 mt-3 holographic">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-destructive animate-pulse-glow" />
          <div className="flex-1">
            <p className="text-xs font-semibold text-destructive">Fall Risk Alert</p>
            <p className="text-xs text-muted-foreground">
              AI detected unsteady gait pattern at 13:45
            </p>
          </div>
          <button className="px-3 py-1 rounded-lg bg-destructive/20 text-destructive text-xs font-semibold">
            Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonitorScreen;