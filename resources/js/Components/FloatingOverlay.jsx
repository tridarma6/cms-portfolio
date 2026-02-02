import React from 'react';

export default function FloatingOverlay() {
  const overlayElements = [
    { size: 'w-64 h-64', top: '10%', left: '5%', delay: '0s', duration: '8s' },
    { size: 'w-48 h-48', top: '25%', left: '12%', delay: '2s', duration: '10s' },
    { size: 'w-56 h-56', top: '15%', left: '25%', delay: '4s', duration: '9s' },
    { size: 'w-40 h-40', top: '40%', left: '3%', delay: '1s', duration: '11s' },
    { size: 'w-72 h-72', top: '60%', left: '8%', delay: '3s', duration: '12s' },
    { size: 'w-52 h-52', top: '75%', left: '15%', delay: '5s', duration: '8.5s' },

    { size: 'w-60 h-60', top: '5%', left: '70%', delay: '1.5s', duration: '9.5s' },
    { size: 'w-44 h-44', top: '20%', left: '80%', delay: '3.5s', duration: '10.5s' },
    { size: 'w-68 h-68', top: '35%', left: '75%', delay: '5.5s', duration: '11.5s' },
    { size: 'w-36 h-36', top: '50%', left: '85%', delay: '2.5s', duration: '7.5s' },
    { size: 'w-48 h-48', top: '65%', left: '78%', delay: '4.5s', duration: '9s' },
    { size: 'w-40 h-40', top: '80%', left: '88%', delay: '6.5s', duration: '11s' },

    { size: 'w-72 h-72', top: '8%', left: '40%', delay: '7s', duration: '13s' },
    { size: 'w-52 h-52', top: '55%', left: '45%', delay: '8s', duration: '14s' },
    { size: 'w-60 h-60', top: '85%', left: '50%', delay: '6s', duration: '12s' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {overlayElements.map((elem, idx) => (
        <div
          key={idx}
          className={`absolute ${elem.size} opacity-30`}
          style={{
            top: elem.top,
            left: elem.left,
            backgroundImage: "url('/assets/images/component-overlay.png')",
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            animation: `floatY ${elem.duration} ease-in-out infinite`,
            animationDelay: elem.delay,
          }}
        />
      ))}
    </div>
  );
}
