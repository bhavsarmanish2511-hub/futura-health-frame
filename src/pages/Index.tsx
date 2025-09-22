import React, { useState } from 'react';
import MobileFrame from '@/components/MobileFrame';
import BottomNav from '@/components/BottomNav';
import HomeScreen from '@/screens/HomeScreen';
import VitalsScreen from '@/screens/VitalsScreen';
import MedsScreen from '@/screens/MedsScreen';
import MentalScreen from '@/screens/MentalScreen';
import MonitorScreen from '@/screens/MonitorScreen';
import HealthScreen from '@/screens/HealthScreen';
import AlertsScreen from '@/screens/AlertsScreen';
import darkBg from '@/assets/dark-tech-bg.jpg';

const Index = () => {
  const [activeScreen, setActiveScreen] = useState('home');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home': return <HomeScreen />;
      case 'vitals': return <VitalsScreen />;
      case 'meds': return <MedsScreen />;
      case 'mental': return <MentalScreen />;
      case 'monitor': return <MonitorScreen />;
      case 'health': return <HealthScreen />;
      case 'alerts': return <AlertsScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <MobileFrame>
      <div 
        className="relative h-full bg-background flex flex-col"
        style={{
          backgroundImage: `url(${darkBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="flex-1 overflow-y-auto overflow-x-hidden pb-20 bg-background/80 backdrop-blur-sm">
          {renderScreen()}
        </div>
        <BottomNav activeScreen={activeScreen} onNavigate={setActiveScreen} />
      </div>
    </MobileFrame>
  );
};

export default Index;