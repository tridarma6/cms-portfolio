import React from 'react';

export default function FloatingOverlay() {
  // Generate random overlay elements with different positions and animation delays
  const overlayElements = [
    { size: 'w-64 h-64', top: '10%', left: '5%', delay: 'delay-0', duration: 'duration-8000' },
    { size: 'w-48 h-48', top: '25%', left: '12%', delay: 'delay-2000', duration: 'duration-10000' },
    { size: 'w-56 h-56', top: '15%', left: '25%', delay: 'delay-4000', duration: 'duration-9000' },
    { size: 'w-40 h-40', top: '40%', left: '3%', delay: 'delay-1000', duration: 'duration-11000' },
    { size: 'w-72 h-72', top: '60%', left: '8%', delay: 'delay-3000', duration: 'duration-12000' },
    { size: 'w-52 h-52', top: '75%', left: '15%', delay: 'delay-5000', duration: 'duration-8500' },
    
    { size: 'w-60 h-60', top: '5%', left: '70%', delay: 'delay-1500', duration: 'duration-9500' },
    { size: 'w-44 h-44', top: '20%', left: '80%', delay: 'delay-3500', duration: 'duration-10500' },
    { size: 'w-68 h-68', top: '35%', left: '75%', delay: 'delay-5500', duration: 'duration-11500' },
    { size: 'w-36 h-36', top: '50%', left: '85%', delay: 'delay-2500', duration: 'duration-7500' },
    { size: 'w-48 h-48', top: '65%', left: '78%', delay: 'delay-4500', duration: 'duration-9000' },
    { size: 'w-40 h-40', top: '80%', left: '88%', delay: 'delay-6500', duration: 'duration-11000' },
    
    { size: 'w-72 h-72', top: '8%', left: '40%', delay: 'delay-7000', duration: 'duration-13000' },
    { size: 'w-52 h-52', top: '55%', left: '45%', delay: 'delay-8000', duration: 'duration-14000' },
    { size: 'w-60 h-60', top: '85%', left: '50%', delay: 'delay-6000', duration: 'duration-12000' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {overlayElements.map((elem, idx) => (
        <div
          key={idx}
          className={`absolute ${elem.size} ${elem.top} ${elem.left} opacity-30`}
          style={{
            backgroundImage: `url('/assets/images/component-overlay.png')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            animation: `floatY ${elem.duration} ease-in-out infinite alternate ${elem.delay}`,
          }}
        />
      ))}
    </div>
  );
}

