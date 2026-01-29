import React, { useState, useEffect, useCallback } from 'react';

export default function Carousel({ items = [], itemsPerSlide = { base: 1, sm: 2, lg: 3 } }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Determine slides per view based on screen size
  useEffect(() => {
    const updateSlidesPerView = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setSlidesPerView(itemsPerSlide.lg || 3);
      } else if (width >= 640) {
        setSlidesPerView(itemsPerSlide.sm || 2);
      } else {
        setSlidesPerView(itemsPerSlide.base || 1);
      }
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, [itemsPerSlide]);

  const maxIndex = Math.max(0, items.length - slidesPerView);

  const goToSlide = useCallback((index) => {
    if (index < 0) index = maxIndex;
    if (index > maxIndex) index = 0;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [maxIndex]);

  const goToNext = () => goToSlide(currentIndex + 1);
  const goToPrev = () => goToSlide(currentIndex - 1);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, slidesPerView, goToNext]);

  if (!items.length) return null;

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="overflow-hidden pt-8 pb-10">
        <div
          className="flex gap-6 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
            width: `${(items.length * 100) / slidesPerView}%`
          }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className="flex-shrink-0"
              style={{ width: `${100 / items.length}%` }}
            >
              <div className="px-2">
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 backdrop-blur-lg border border-emerald/30 text-emerald flex items-center justify-center hover:bg-emerald/20 hover:border-emerald/50 transition-all duration-300 shadow-lg"
        aria-label="Previous slide"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 backdrop-blur-lg border border-emerald/30 text-emerald flex items-center justify-center hover:bg-emerald/20 hover:border-emerald/50 transition-all duration-300 shadow-lg"
        aria-label="Next slide"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setCurrentIndex(index);
              setTimeout(() => setIsTransitioning(false), 500);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? 'bg-emerald w-6'
                : 'bg-emerald/30 hover:bg-emerald/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

