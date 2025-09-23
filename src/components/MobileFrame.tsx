import React from 'react';
import StatusBar from './StatusBar';

interface MobileFrameProps {
  children: React.ReactNode;
}

const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="mobile-frame">
        <div className="mobile-screen">
          {/* Status bar */}
          <StatusBar />
          {/* Main content with padding for status bar */}
          <div className="pt-6 h-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFrame;