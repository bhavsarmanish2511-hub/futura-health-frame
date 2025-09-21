import React, { useState } from 'react';
import { Video, Phone, Calendar, Clock, User, AlertCircle, CheckCircle, X } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { Calendar as CalendarComponent } from '../components/ui/calendar';
import { cn } from '../lib/utils';

interface Appointment {
  doctor: string;
  date: Date;
  time: string;
  type: string;
  id: string;
}

const HealthScreen: React.FC = () => {
  const [showScheduler, setShowScheduler] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [latestAppointment, setLatestAppointment] = useState<Appointment | null>(null);

  const doctors = [
    { id: '1', name: 'Dr. Emily Chen', specialty: 'Cardiologist' },
    { id: '2', name: 'Dr. Marcus Johnson', specialty: 'Neurologist' },
    { id: '3', name: 'Dr. Sarah Williams', specialty: 'General Practitioner' },
    { id: '4', name: 'Dr. Alex Kumar', specialty: 'Psychiatrist' },
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const handleScheduleAppointment = () => {
    if (selectedDoctor && selectedDate && selectedTime) {
      const newAppointment: Appointment = {
        doctor: selectedDoctor,
        date: selectedDate,
        time: selectedTime,
        type: 'Holographic Consultation',
        id: Date.now().toString()
      };
      
      setAppointments([...appointments, newAppointment]);
      setLatestAppointment(newAppointment);
      setShowScheduler(false);
      setShowConfirmation(true);
      
      // Reset form
      setSelectedDoctor('');
      setSelectedDate(undefined);
      setSelectedTime('');
    }
  };

  const nextAppointment = appointments.length > 0 ? appointments[appointments.length - 1] : null;

  return (
    <div className="h-full flex flex-col overflow-y-auto custom-scrollbar relative">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-foreground mb-2">Telehealth Hub</h1>
        <p className="text-sm text-muted-foreground">Connect with healthcare providers instantly</p>
      </div>

      <div className="px-4 pb-24">
        {/* Next Appointment Card */}
        {nextAppointment ? (
          <div className="glass rounded-xl p-4 mb-4 border border-neon-green/30 neon-glow-green">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Next Appointment</p>
                <p className="text-lg font-semibold text-foreground">{nextAppointment.doctor}</p>
                <p className="text-sm text-neon-cyan">
                  {format(nextAppointment.date, 'MMMM d, yyyy')} at {nextAppointment.time}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-health flex items-center justify-center animate-pulse-glow">
                <Video className="w-6 h-6 text-background" />
              </div>
            </div>
            <button className="w-full py-2 rounded-lg bg-gradient-health text-background font-semibold text-sm holographic-btn">
              Join Holographic Session
            </button>
          </div>
        ) : (
          <div className="glass rounded-xl p-4 mb-4 border border-border">
            <p className="text-sm text-muted-foreground text-center">No upcoming appointments</p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button 
            onClick={() => setShowScheduler(true)}
            className="glass rounded-xl p-4 border border-neon-purple/20 text-left hover:border-neon-purple/40 transition-colors"
          >
            <Calendar className="w-5 h-5 text-neon-purple mb-2" />
            <p className="text-sm font-semibold text-foreground">Schedule</p>
            <p className="text-xs text-muted-foreground">Book appointment</p>
          </button>

          <button className="glass rounded-xl p-4 border border-neon-pink/20 text-left hover:border-neon-pink/40 transition-colors">
            <Phone className="w-5 h-5 text-neon-pink mb-2" />
            <p className="text-sm font-semibold text-foreground">Emergency</p>
            <p className="text-xs text-muted-foreground">24/7 Support</p>
          </button>
        </div>

        {/* Recent Appointments */}
        {appointments.length > 0 && (
          <div className="glass rounded-xl p-4 border border-border backdrop-blur-sm">
            <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-neon-cyan" />
              Your Booked Appointments
            </h2>
            <div className="space-y-3">
              {appointments.slice(-5).reverse().map((apt) => (
                <div key={apt.id} className="p-3 rounded-lg bg-background/30 backdrop-blur border border-neon-cyan/20 hover:border-neon-cyan/40 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-neon-purple" />
                      <p className="text-sm font-semibold text-foreground">{apt.doctor}</p>
                    </div>
                    <CheckCircle className="w-4 h-4 text-neon-green" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-neon-cyan" />
                      <span className="text-muted-foreground">
                        {format(apt.date, 'MMM d, yyyy')}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neon-cyan" />
                      <span className="text-muted-foreground">{apt.time}</span>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-border/50">
                    <p className="text-xs text-muted-foreground">
                      <span className="text-neon-purple">Instructions:</span> Join 5 min early for {apt.type}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Schedule Appointment Modal - Inside Mobile Frame */}
      {showScheduler && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="glass rounded-2xl p-4 w-full max-w-sm border border-neon-cyan/30 neon-glow-cyan max-h-[80vh] overflow-y-auto backdrop-blur-xl animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Schedule Appointment</h3>
              <button 
                onClick={() => setShowScheduler(false)}
                className="p-2 rounded-xl bg-neon-red/20 hover:bg-neon-red/30 transition-colors border border-neon-red/30"
              >
                <X className="w-6 h-6 text-neon-red" />
              </button>
            </div>

            {/* Doctor Selection */}
            <div className="mb-4">
              <label className="text-sm font-medium text-foreground mb-2 block">Select Doctor</label>
              <select 
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full p-3 rounded-lg bg-background/50 backdrop-blur border border-border text-foreground focus:border-neon-cyan focus:outline-none transition-colors"
              >
                <option value="">Choose a doctor</option>
                {doctors.map(doc => (
                  <option key={doc.id} value={doc.name}>
                    {doc.name} - {doc.specialty}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Selection */}
            <div className="mb-4">
              <label className="text-sm font-medium text-foreground mb-2 block">Select Date</label>
              <div className="rounded-lg bg-background/50 backdrop-blur border border-border p-2">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today || date.getFullYear() !== 2035;
                  }}
                  defaultMonth={new Date(2035, 11, 1)}
                  className={cn("w-full pointer-events-auto")}
                />
              </div>
            </div>

            {/* Time Selection */}
            <div className="mb-4">
              <label className="text-sm font-medium text-foreground mb-2 block">Select Time</label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      selectedTime === time
                        ? 'bg-gradient-health text-background neon-glow-green'
                        : 'bg-background/50 backdrop-blur text-foreground hover:bg-muted/30 border border-border'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleScheduleAppointment}
              disabled={!selectedDoctor || !selectedDate || !selectedTime}
              className="w-full py-3 rounded-lg bg-gradient-health text-background font-semibold disabled:opacity-50 disabled:cursor-not-allowed holographic-btn transition-all"
            >
              Confirm Appointment
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Popup - Inside Mobile Frame */}
      {showConfirmation && latestAppointment && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="glass rounded-2xl p-6 w-full max-w-sm border border-neon-green/30 neon-glow-green backdrop-blur-xl animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-10 h-10 text-neon-green animate-pulse-glow" />
              <button 
                onClick={() => setShowConfirmation(false)}
                className="p-3 rounded-xl bg-neon-red/20 hover:bg-neon-red/30 transition-colors border border-neon-red/30 hover-scale"
              >
                <X className="w-7 h-7 text-neon-red" />
              </button>
            </div>
            
            <h3 className="text-xl font-bold text-foreground mb-2">
              Appointment Confirmed!
            </h3>
            <p className="text-sm text-neon-green mb-4 font-medium">
              Your appointment is scheduled with {latestAppointment.doctor} successfully
            </p>
            
            <div className="space-y-3 p-4 rounded-xl bg-background/30 backdrop-blur border border-border">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-neon-cyan" />
                <div>
                  <p className="text-xs text-muted-foreground">Doctor</p>
                  <p className="text-sm text-foreground font-semibold">{latestAppointment.doctor}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-neon-cyan" />
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="text-sm text-foreground font-semibold">
                    {format(latestAppointment.date, 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-neon-cyan" />
                <div>
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="text-sm text-foreground font-semibold">{latestAppointment.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Video className="w-5 h-5 text-neon-cyan" />
                <div>
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="text-sm text-neon-cyan font-semibold">{latestAppointment.type}</p>
                </div>
              </div>
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground mb-1">Instructions</p>
                <p className="text-xs text-foreground">
                  Please join 5 minutes early. Ensure stable internet connection for holographic consultation.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowConfirmation(false)}
              className="w-full mt-4 py-3 rounded-xl bg-gradient-health text-background font-bold text-sm holographic-btn hover-scale transition-all"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthScreen;