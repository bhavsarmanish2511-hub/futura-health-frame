import React, { useState } from 'react';
import { Bell, AlertTriangle, Info, CheckCircle, Clock, ChevronRight, Brain } from 'lucide-react';

interface Alert {
  id: string;
  type: 'warning' | 'info' | 'success' | 'ai';
  title: string;
  description: string;
  time: string;
  actionable: boolean;
}

const AlertsScreen: React.FC = () => {
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);

  const alerts: Alert[] = [
    {
      id: '1',
      type: 'warning',
      title: 'Missed Medication',
      description: 'Atorvastatin dose missed at 20:00',
      time: '1 hour ago',
      actionable: true,
    },
    {
      id: '2',
      type: 'ai',
      title: 'AI Health Suggestion',
      description: 'Abnormal sleep pattern detected. Consider adjusting evening routine.',
      time: '3 hours ago',
      actionable: true,
    },
    {
      id: '3',
      type: 'info',
      title: 'Device Battery Low',
      description: 'Smart pill dispenser battery at 15%',
      time: '5 hours ago',
      actionable: false,
    },
    {
      id: '4',
      type: 'success',
      title: 'Health Goal Achieved',
      description: 'Weekly exercise target completed',
      time: '1 day ago',
      actionable: false,
    },
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case 'info': return <Info className="w-4 h-4 text-neon-cyan" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-neon-green" />;
      case 'ai': return <Brain className="w-4 h-4 text-neon-purple" />;
      default: return <Bell className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'border-destructive/30';
      case 'info': return 'border-neon-cyan/30';
      case 'success': return 'border-neon-green/30';
      case 'ai': return 'border-neon-purple/30';
      default: return 'border-border';
    }
  };

  return (
    <div className="h-full flex flex-col p-4 pb-24 overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-foreground mb-2">Alerts & AI Actions</h1>
        <p className="text-xs text-muted-foreground">Stay informed about your health</p>
      </div>

      {/* Alert Summary */}
      <div className="glass rounded-xl p-3 border border-border mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-neon-cyan animate-pulse-glow" />
            <span className="text-sm font-semibold text-foreground">Active Alerts</span>
          </div>
          <span className="px-2 py-1 rounded-full bg-destructive/20 text-destructive text-xs font-semibold">
            2 Urgent
          </span>
        </div>
      </div>

      {/* Alert List */}
      <div className="space-y-2">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`glass rounded-xl p-3 border transition-all ${getAlertColor(alert.type)} ${
              alert.type === 'warning' ? 'animate-pulse-glow' : ''
            }`}
            onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">{alert.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  <Clock className="w-3 h-3 inline mr-1" />
                  {alert.time}
                </p>
              </div>
              <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${
                expandedAlert === alert.id ? 'rotate-90' : ''
              }`} />
            </div>

            {expandedAlert === alert.id && (
              <div className="mt-3 pt-3 border-t border-border">
                {alert.actionable ? (
                  <div className="flex gap-2">
                    <button className="flex-1 py-1.5 rounded-lg bg-neon-green/20 text-neon-green text-xs font-semibold">
                      Take Action
                    </button>
                    <button className="flex-1 py-1.5 rounded-lg bg-muted/30 text-muted-foreground text-xs">
                      Dismiss
                    </button>
                  </div>
                ) : (
                  <button className="w-full py-1.5 rounded-lg bg-muted/30 text-muted-foreground text-xs">
                    Mark as Read
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Alert Timeline */}
      <div className="glass rounded-xl p-3 border border-neon-blue/20 mt-4 holographic">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-4 h-4 text-neon-blue animate-pulse-glow" />
          <span className="text-xs font-semibold text-neon-blue">AI Alert Predictions</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Based on patterns, you may need medication reminders around 20:00. 
          Risk of hypoglycemic event: <span className="text-neon-green">Low (8%)</span>
        </p>
      </div>
    </div>
  );
};

export default AlertsScreen;