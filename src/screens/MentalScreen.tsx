import React, { useState } from 'react';
import { Smile, Frown, Meh, Heart, Brain, Calendar, TrendingUp, Sparkles } from 'lucide-react';

const MentalScreen: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const moods = [
    { emoji: '😊', label: 'Great', color: 'text-neon-green', value: 5 },
    { emoji: '🙂', label: 'Good', color: 'text-neon-cyan', value: 4 },
    { emoji: '😐', label: 'Okay', color: 'text-neon-purple', value: 3 },
    { emoji: '😔', label: 'Low', color: 'text-accent', value: 2 },
    { emoji: '😢', label: 'Bad', color: 'text-destructive', value: 1 },
  ];

  const weekHistory = [
    { day: 'Mon', mood: 4 },
    { day: 'Tue', mood: 3 },
    { day: 'Wed', mood: 4 },
    { day: 'Thu', mood: 5 },
    { day: 'Fri', mood: 4 },
    { day: 'Sat', mood: 5 },
    { day: 'Sun', mood: null },
  ];

  return (
    <div className="h-full flex flex-col p-4 pb-24 overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-foreground mb-2">Mental Wellness</h1>
        <p className="text-xs text-muted-foreground">Track your emotional health journey</p>
      </div>

      {/* Mood Tracker */}
      <div className="glass rounded-xl p-4 border border-neon-purple/20 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Heart className="w-4 h-4 text-neon-purple animate-pulse-glow" />
          <span className="text-sm font-semibold text-foreground">How are you feeling today?</span>
        </div>
        
        <div className="grid grid-cols-5 gap-2">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.label)}
              className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                selectedMood === mood.label 
                  ? 'bg-white/10 scale-110' 
                  : 'hover:bg-white/5'
              }`}
            >
              <span className={`text-2xl ${selectedMood === mood.label ? 'animate-pulse-glow' : ''}`}>
                {mood.emoji}
              </span>
              <span className={`text-[10px] mt-1 ${mood.color}`}>
                {mood.label}
              </span>
            </button>
          ))}
        </div>

        {selectedMood && (
          <div className="mt-3 p-2 bg-neon-purple/10 rounded-lg animate-fade-in">
            <p className="text-xs text-neon-purple">
              ✨ Mood logged! {selectedMood === 'Great' || selectedMood === 'Good' 
                ? "Keep up the positive energy!" 
                : "Remember, it's okay to have difficult days."}
            </p>
          </div>
        )}
      </div>

      {/* Weekly Overview */}
      <div className="glass rounded-xl p-3 border border-neon-cyan/20 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm font-semibold text-foreground">This Week</span>
          </div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-xs text-neon-cyan"
          >
            {showHistory ? 'Hide' : 'Show'} History
          </button>
        </div>
        
        {showHistory && (
          <div className="grid grid-cols-7 gap-1">
            {weekHistory.map((day) => (
              <div key={day.day} className="text-center">
                <p className="text-[10px] text-muted-foreground mb-1">{day.day}</p>
                <div className={`h-8 rounded-lg flex items-center justify-center ${
                  day.mood ? 'bg-gradient-mental' : 'bg-muted/20'
                }`}>
                  {day.mood ? (
                    <span className="text-sm">
                      {moods.find(m => m.value === day.mood)?.emoji}
                    </span>
                  ) : (
                    <span className="text-[10px] text-muted-foreground">-</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">Average Mood</span>
            <span className="text-neon-cyan font-semibold">4.2/5.0</span>
          </div>
          <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
            <div className="h-full w-[84%] bg-gradient-mental rounded-full animate-pulse-glow" />
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="glass rounded-xl p-3 border border-neon-blue/20 mb-3">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-4 h-4 text-neon-blue animate-pulse-glow" />
          <span className="text-sm font-semibold text-neon-blue">AI Emotional Insights</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mb-2">
          Your mood patterns show improvement this week. Stress levels decreased by 23% compared to last week.
        </p>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-3 h-3 text-neon-green" />
          <span className="text-xs text-neon-green">Positive trend detected</span>
        </div>
      </div>

      {/* Mindfulness Reminders */}
      <div className="space-y-2">
        <div className="glass rounded-xl p-3 border border-neon-purple/20 holographic">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-neon-purple animate-pulse-glow" />
            <div className="flex-1">
              <p className="text-xs font-semibold text-neon-purple">Mindfulness Reminder</p>
              <p className="text-xs text-muted-foreground">
                Time for your 5-minute breathing exercise
              </p>
            </div>
            <button className="px-3 py-1 rounded-lg bg-neon-purple/20 text-neon-purple text-xs font-semibold">
              Start
            </button>
          </div>
        </div>
        
        <div className="glass rounded-xl p-3 border border-neon-green/20">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-neon-green" />
            <div className="flex-1">
              <p className="text-xs font-semibold text-neon-green">Daily Affirmation</p>
              <p className="text-xs text-muted-foreground italic">
                "I am capable of handling whatever comes my way today."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalScreen;