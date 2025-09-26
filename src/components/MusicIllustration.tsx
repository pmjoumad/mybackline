const MusicIllustration = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Musical Notes */}
      <div className="absolute top-20 left-10 text-primary/20 float-animation">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
          <path d="M12 20c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm6-6c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm6 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z"/>
          <path d="M30 8v16c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4c.7 0 1.4.2 2 .5V8h2z"/>
        </svg>
      </div>
      
      <div className="absolute top-32 right-20 text-secondary/30 float-animation" style={{ animationDelay: '2s' }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
          <circle cx="8" cy="20" r="3"/>
          <circle cx="24" cy="12" r="3"/>
          <path d="M11 20V8h2v11.17c-.32-.11-.66-.17-1-.17z"/>
          <path d="M27 12V6h2v5.17c-.32-.11-.66-.17-1-.17z"/>
        </svg>
      </div>
      
      <div className="absolute bottom-32 left-20 text-accent-bright/25 pulse-soft">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="currentColor">
          <path d="M18 2L22 14h12l-10 8 4 12-10-8-10 8 4-12-10-8h12z"/>
        </svg>
      </div>
      
      {/* Sound Waves */}
      <div className="absolute top-1/2 right-10 text-primary/15 pulse-soft" style={{ animationDelay: '1s' }}>
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 20c0-5.5 4.5-10 10-10s10 4.5 10 10v20c0 5.5-4.5 10-10 10s-10-4.5-10-10V20z"/>
          <path d="M40 25c2.5-2.5 2.5-7.5 0-10"/>
          <path d="M45 20c5-5 5-15 0-20"/>
          <path d="M5 25c-2.5-2.5-2.5-7.5 0-10"/>
          <path d="M0 20c-5-5-5-15 0-20"/>
        </svg>
      </div>
      
      {/* Geometric Musical Elements */}
      <div className="absolute bottom-20 right-32 text-secondary/20 float-animation" style={{ animationDelay: '3s' }}>
        <div className="w-12 h-12 border-2 border-current rounded-full opacity-60"></div>
      </div>
      
      <div className="absolute top-1/4 left-1/4 text-accent/20 pulse-soft" style={{ animationDelay: '2.5s' }}>
        <div className="w-8 h-8 bg-current transform rotate-45 opacity-70"></div>
      </div>
    </div>
  );
};

export default MusicIllustration;