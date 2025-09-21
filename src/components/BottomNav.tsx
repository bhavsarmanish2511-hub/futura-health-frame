import React from 'react';
import { Home, Activity, Pill, Smile, Video, Calendar, Bell } from 'lucide-react';

interface NavItem {
  icon: React.ElementType;
  label: string;
  screen: string;
  color: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Home', screen: 'home', color: 'text-neon-cyan' },
  { icon: Activity, label: 'Vitals', screen: 'vitals', color: 'text-neon-pink' },
  { icon: Pill, label: 'Meds', screen: 'meds', color: 'text-neon-green' },
  { icon: Smile, label: 'Mental', screen: 'mental', color: 'text-neon-purple' },
  { icon: Video, label: 'Monitor', screen: 'monitor', color: 'text-neon-blue' },
  { icon: Calendar, label: 'Health', screen: 'health', color: 'text-neon-cyan' },
  { icon: Bell, label: 'Alerts', screen: 'alerts', color: 'text-destructive' },
];

interface BottomNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, onNavigate }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4">
      <div className="glass rounded-2xl p-2 flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.screen;
          
          return (
            <button
              key={item.screen}
              onClick={() => onNavigate(item.screen)}
              className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
                isActive ? 'bg-white/10' : ''
              }`}
            >
              <Icon
                size={24}
                className={`transition-all duration-300 ${
                  isActive 
                    ? `${item.color} animate-pulse-glow text-glow` 
                    : 'text-muted-foreground'
                }`}
              />
              <span className={`text-[9px] mt-1 transition-colors duration-300 ${
                isActive ? item.color : 'text-muted-foreground'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;