import React, { useState } from 'react';
import { Video, Calendar, Phone, Clock, User, Star, ChevronRight, Sparkles, CheckCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const HealthScreen: React.FC = () => {
  const { toast } = useToast();
  const [showScheduler, setShowScheduler] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointments, setAppointments] = useState([
    {
      doctor: 'Dr. Emily Chen',
      specialty: 'Cardiologist',
      date: 'Dec 28, 2035',
      time: '14:30',
      type: 'Holographic',
      instructions: 'Bring recent ECG results'
    }
  ]);

  const doctors = [
    { name: 'Dr. Emily Chen', specialty: 'Cardiologist' },
    { name: 'Dr. Michael Ross', specialty: 'Neurologist' },
    { name: 'Dr. Sarah Johnson', specialty: 'General Practitioner' },
    { name: 'Dr. David Lee', specialty: 'Endocrinologist' },
    { name: 'Dr. Lisa Wang', specialty: 'Psychiatrist' }
  ];

  const upcomingAppointment = appointments[0];
  const totalAppointments = 127 + appointments.length;

  return (
    <div className="h-full flex flex-col p-4 pb-24 overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-foreground mb-2">Telehealth & Support</h1>
        <p className="text-xs text-muted-foreground">Connect with your care team instantly</p>
      </div>

      {/* Next Appointment */}
      {upcomingAppointment && (
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
          
          {upcomingAppointment.instructions && (
            <div className="mb-3 p-2 rounded-lg bg-muted/20">
              <p className="text-xs text-muted-foreground">Instructions:</p>
              <p className="text-xs text-foreground">{upcomingAppointment.instructions}</p>
            </div>
          )}
          
          <button className="w-full py-2 rounded-xl bg-gradient-neon text-background font-semibold text-sm animate-pulse-glow holographic">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Join Holographic Session
            </div>
          </button>
        </div>
      )}

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
              onClick={() => {
                setShowScheduler(false);
                setSelectedDate('');
                setSelectedTime('');
                setSelectedDoctor('');
              }}
              className="text-xs text-muted-foreground"
            >
              Cancel
            </button>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Select Doctor</label>
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-muted/30 border border-border text-xs text-foreground"
                required
              >
                <option value="">Choose doctor</option>
                {doctors.map((doc) => (
                  <option key={doc.name} value={doc.name}>
                    {doc.name} - {doc.specialty}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Select Date (Year 2035)</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min="2035-01-01"
                max="2035-12-31"
                className="w-full px-3 py-2 rounded-lg bg-muted/30 border border-border text-xs text-foreground"
                required
              />
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Select Time</label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-muted/30 border border-border text-xs text-foreground"
                required
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
                if (selectedDoctor && selectedDate && selectedTime) {
                  const doctorInfo = doctors.find(d => d.name === selectedDoctor);
                  const newAppointment = {
                    doctor: selectedDoctor,
                    specialty: doctorInfo?.specialty || '',
                    date: new Date(selectedDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    }),
                    time: selectedTime,
                    type: 'Holographic',
                    instructions: 'Please prepare any relevant medical history'
                  };
                  
                  setAppointments([newAppointment, ...appointments]);
                  setShowScheduler(false);
                  setSelectedDate('');
                  setSelectedTime('');
                  setSelectedDoctor('');
                  
                  toast({
                    title: "Appointment Scheduled",
                    description: (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-neon-green" />
                        <span>Your appointment is scheduled with {selectedDoctor}</span>
                      </div>
                    ),
                  });
                } else {
                  toast({
                    title: "Missing Information",
                    description: "Please select doctor, date, and time",
                    variant: "destructive"
                  });
                }
              }}
              className="w-full py-2 rounded-lg bg-neon-purple/20 text-neon-purple font-semibold text-xs hover:bg-neon-purple/30 transition-colors"
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