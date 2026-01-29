import React from 'react';

export default function ProjectThumb({ index = 0, project }) {
  const variants = [
    { from: '#002b12', to: '#003a1f' },
    { from: '#001b2b', to: '#003042' },
    { from: '#04100a', to: '#003b2a' }
  ];
  const v = variants[index % variants.length];

  // Find primary image or first image
  const primaryImage = project?.images?.find(img => img.is_primary) || project?.images?.[0];

  if (primaryImage) {
    return (
      <div className="w-full h-56 bg-transparent flex items-center justify-center">
        <img
          src={`/storage/${primaryImage.filename}`}
          alt={primaryImage.caption || project.title}
          className="w-full h-full object-contain"
        />
      </div>

    );
  }

  // Fallback to placeholder
  return (
    <div className="w-full h-56 flex items-center justify-center bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(135deg, ${v.from} 0%, ${v.to} 100%)` }}>
      <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="120" height="80" rx="12" fill="url(#g)" />
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#00c77a" stopOpacity="0.14" />
            <stop offset="1" stopColor="#00f58a" stopOpacity="0.04" />
          </linearGradient>
        </defs>
        <g opacity="0.9">
          <circle cx="20" cy="24" r="8" fill="#062" opacity="0.6" />
          <rect x="40" y="16" width="60" height="12" rx="6" fill="#0a3" opacity="0.45" />
          <rect x="40" y="36" width="44" height="8" rx="4" fill="#0a3" opacity="0.35" />
        </g>
      </svg>
    </div>
  );
}
