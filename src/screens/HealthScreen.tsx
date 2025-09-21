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
          <div className="glass rounded-xl p-4 border border-border">
            <h2 className="text-sm font-semibold text-foreground mb-3">Your Appointments</h2>
            <div className="space-y-2">
              {appointments.slice(-3).reverse().map((apt) => (
                <div key={apt.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{apt.doctor}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(apt.date, 'MMM d, yyyy')} • {apt.time}
                    </p>
                  </div>
                  <CheckCircle className="w-4 h-4 text-neon-green" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Schedule Appointment Modal - Inside Mobile Frame */}
      {showScheduler && (
        <div className="absolute inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass rounded-2xl p-4 w-full max-w-sm border border-neon-cyan/30 neon-glow-cyan max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Schedule Appointment</h3>
              <button 
                onClick={() => setShowScheduler(false)}
                className="p-1 rounded-lg hover:bg-muted/20"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Doctor Selection */}
            <div className="mb-4">
              <label className="text-sm font-medium text-foreground mb-2 block">Select Doctor</label>
              <select 
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full p-3 rounded-lg bg-muted/20 border border-border text-foreground focus:border-neon-cyan focus:outline-none"
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
              <div className="rounded-lg bg-muted/20 border border-border p-2">
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
                        ? 'bg-gradient-health text-background'
                        : 'bg-muted/20 text-foreground hover:bg-muted/30'
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
              className="w-full py-3 rounded-lg bg-gradient-health text-background font-semibold disabled:opacity-50 disabled:cursor-not-allowed holographic-btn"
            >
              Confirm Appointment
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Popup - Inside Mobile Frame */}
      {showConfirmation && latestAppointment && (
        <div className="absolute inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass rounded-2xl p-6 w-full max-w-sm border border-neon-green/30 neon-glow-green">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-neon-green animate-pulse-glow" />
              <button 
                onClick={() => setShowConfirmation(false)}
                className="p-1 rounded-lg hover:bg-muted/20"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Appointment Confirmed!
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your appointment is scheduled with {latestAppointment.doctor} successfully
            </p>
            
            <div className="space-y-2 p-3 rounded-lg bg-muted/10 border border-border">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-neon-cyan" />
                <p className="text-sm">
                  <span className="text-muted-foreground">Doctor:</span>{' '}
                  <span className="text-foreground font-medium">{latestAppointment.doctor}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neon-cyan" />
                <p className="text-sm">
                  <span className="text-muted-foreground">Date:</span>{' '}
                  <span className="text-foreground font-medium">
                    {format(latestAppointment.date, 'MMMM d, yyyy')}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-neon-cyan" />
                <p className="text-sm">
                  <span className="text-muted-foreground">Time:</span>{' '}
                  <span className="text-foreground font-medium">{latestAppointment.time}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-neon-cyan" />
                <p className="text-sm">
                  <span className="text-muted-foreground">Type:</span>{' '}
                  <span className="text-neon-cyan font-medium">{latestAppointment.type}</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowConfirmation(false)}
              className="w-full mt-4 py-2 rounded-lg bg-gradient-health text-background font-semibold text-sm holographic-btn"
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