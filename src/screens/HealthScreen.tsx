import React, { useState } from 'react';
import { Video, Calendar, Phone, Clock, User, Star, ChevronRight, Sparkles } from 'lucide-react';

const HealthScreen: React.FC = () => {
  const [showScheduler, setShowScheduler] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const upcomingAppointment = {
    doctor: 'Dr. Emily Chen',
    specialty: 'Cardiologist',
    date: 'Dec 28, 2035',
    time: '14:30',
    type: 'Holographic',
  };

  const totalAppointments = 127;

  return (
    <div className="h-full flex flex-col p-4 pb-24 overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-foreground mb-2">Telehealth & Support</h1>
        <p className="text-xs text-muted-foreground">Connect with your care team instantly</p>
      </div>

      {/* Next Appointment */}
      <div className="glass rounded-xl p-4 border border-neon-cyan/30 mb-4 neon-glow-cyan">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-neon-cyan animate-pulse-glow" />
          <span className="text-sm font-semibold text-foreground">Next Appointment</span>
        </div>
        
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-gradient-neon flex items-center justify-center">
            <User className="w-6 h-6 text-background" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">{upcomingAppointment.doctor}</p>
            <p className="text-xs text-muted-foreground">{upcomingAppointment.specialty}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-neon-cyan">{upcomingAppointment.date}</p>
            <p className="text-xs text-muted-foreground">{upcomingAppointment.time}</p>
          </div>
        </div>
        
        <button className="w-full py-2 rounded-xl bg-gradient-neon text-background font-semibold text-sm animate-pulse-glow holographic">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Join Holographic Session
          </div>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          onClick={() => setShowScheduler(true)}
          className="glass rounded-xl p-3 border border-neon-purple/20 text-left"
        >
          <Calendar className="w-5 h-5 text-neon-purple mb-2" />
          <p className="text-xs font-semibold text-foreground">Schedule</p>
          <p className="text-xs text-muted-foreground">Book appointment</p>
        </button>
        
        <button className="glass rounded-xl p-3 border border-neon-green/20 text-left">
          <Phone className="w-5 h-5 text-neon-green mb-2" />
          <p className="text-xs font-semibold text-foreground">Emergency</p>
          <p className="text-xs text-neon-green">Available 24/7</p>
        </button>
      </div>

      {/* Appointment Scheduler Modal */}
      {showScheduler && (
        <div className="glass rounded-xl p-4 border border-neon-purple/30 mb-4 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-neon-purple">Schedule Appointment</span>
            <button 
              onClick={() => setShowScheduler(false)}
              className="text-xs text-muted-foreground"
            >
              Cancel
            </button>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-muted/30 border border-border text-xs text-foreground"
              />
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Select Time</label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-muted/30 border border-border text-xs text-foreground"
              >
                <option value="">Choose time</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="16:00">04:00 PM</option>
              </select>
            </div>
            
            <button 
              onClick={() => {
                setShowScheduler(false);
                // Show confirmation
              }}
              className="w-full py-2 rounded-lg bg-neon-purple/20 text-neon-purple font-semibold text-xs"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}

      {/* Care Team */}
      <div className="glass rounded-xl p-3 border border-border mb-3">
        <div className="flex items-center gap-2 mb-2">
          <User className="w-4 h-4 text-neon-blue" />
          <span className="text-sm font-semibold text-foreground">Your Care Team</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-health flex items-center justify-center">
                <User className="w-4 h-4 text-background" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">Dr. Emily Chen</p>
                <p className="text-xs text-muted-foreground">Cardiologist</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
          
          <div className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-mental flex items-center justify-center">
                <User className="w-4 h-4 text-background" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">Nurse Sarah</p>
                <p className="text-xs text-muted-foreground">Primary Care</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="glass rounded-xl p-3 border border-neon-green/20">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Total Appointments</p>
            <p className="text-lg font-bold text-neon-green">{totalAppointments}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Satisfaction</p>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3 h-3 ${
                    star <= 5 ? 'text-neon-purple fill-neon-purple' : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthScreen;