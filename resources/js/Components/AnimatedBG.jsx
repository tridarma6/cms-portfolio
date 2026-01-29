import React from 'react';

export default function AnimatedBG(){
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-60" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" aria-hidden>
      <defs>
        <radialGradient id="g1" cx="30%" cy="30%">
          <stop offset="0%" stopColor="#00f58a" stopOpacity="0.18" />
          <stop offset="60%" stopColor="#00c77a" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="g2" cx="70%" cy="70%">
          <stop offset="0%" stopColor="#00c77a" stopOpacity="0.12" />
          <stop offset="60%" stopColor="#003" stopOpacity="0.00" />
        </radialGradient>
        <filter id="f1" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="40" result="b" />
          <feComposite in="SourceGraphic" in2="b" operator="over" />
        </filter>
      </defs>

      <g filter="url(#f1)">
        <circle cx="220" cy="220" r="260" fill="url(#g1)">
          <animate attributeName="cx" dur="18s" values="120;300;220" repeatCount="indefinite" />
          <animate attributeName="cy" dur="22s" values="200;120;260" repeatCount="indefinite" />
        </circle>

        <circle cx="1400" cy="700" r="300" fill="url(#g2)">
          <animate attributeName="cx" dur="20s" values="1500;1200;1400" repeatCount="indefinite" />
          <animate attributeName="cy" dur="26s" values="600;760;700" repeatCount="indefinite" />
        </circle>

        <g transform="translate(800,180)" opacity="0.08">
          <rect x="-280" y="-80" width="560" height="160" rx="80" fill="#00c77a" />
          <animateTransform attributeName="transform" type="rotate" values="0 0 0; 12 0 0; 0 0 0" dur="24s" repeatCount="indefinite" />
        </g>
      </g>
    </svg>
  );
}
