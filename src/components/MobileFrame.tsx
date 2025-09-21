import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
}

const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="mobile-frame">
        <div className="mobile-screen">
          {children}
        </div>
        {/* Phone notch */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full opacity-90" />
      </div>
    </div>
  );
};

export default MobileFrame;