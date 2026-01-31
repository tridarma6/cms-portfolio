import React, { useState, useEffect, useCallback, useRef } from 'react';

export default function Carousel({ items = [], itemsPerSlide = { base: 1, sm: 2, lg: 3 } }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const containerRef = useRef(null);

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

  // Create duplicated items for infinite loop
  // Items: [original items...] -> [last N items][original items...][first N items]
  const getExtendedItems = useCallback(() => {
    if (items.length === 0) return [];
    
    const lastItems = items.slice(-slidesPerView);
    const firstItems = items.slice(0, slidesPerView);
    return [...lastItems, ...items, ...firstItems];
  }, [items, slidesPerView]);

  const extendedItems = getExtendedItems();
  const totalExtendedItems = extendedItems.length;

  // Handle seamless transition when reaching edges
  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false);
    setTransitionEnabled(true);
    
    // If we're at the cloned start section, jump to real start without animation
    if (currentIndex < 0) {
      setCurrentIndex(maxIndex);
    }
    // If we're at the cloned end section, jump to real end without animation
    if (currentIndex > maxIndex) {
      setCurrentIndex(0);
    }
  }, [currentIndex, maxIndex]);

  // Reset transition state when slidesPerView changes
  useEffect(() => {
    setTransitionEnabled(false);
    setCurrentIndex(maxIndex);
    setTimeout(() => setTransitionEnabled(true), 50);
  }, [slidesPerView, maxIndex]);

  const goToSlide = useCallback((index, enableTransition = true) => {
    setIsTransitioning(true);
    setTransitionEnabled(enableTransition);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, []);

  const goToNext = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const goToPrev = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, slidesPerView, goToNext]);

  if (!items.length) return null;

  // Calculate the display index for pagination (map extended index back to original)
  const getDisplayIndex = (index) => {
    if (index < slidesPerView) {
      return items.length - slidesPerView + index;
    } else if (index >= items.length + slidesPerView) {
      return index - items.length - slidesPerView;
    } else if (index >= items.length) {
      return index - items.length;
    }
    return index;
  };

  // Calculate total dots (based on original items)
  const totalDots = items.length > 0 ? Math.max(1, items.length - slidesPerView + 1) : 0;

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="overflow-hidden pt-8 pb-10">
        <div
          ref={containerRef}
          className="flex gap-6 transition-transform duration-500 ease-in-out"
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translateX(-${currentIndex * (100 / totalExtendedItems)}%)`,
            width: `${(totalExtendedItems * 100) / slidesPerView}%`,
            transition: transitionEnabled && isTransitioning ? 'transform 500ms ease-in-out' : 'none'
          }}
        >
          {extendedItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex-shrink-0"
              style={{ width: `${100 / totalExtendedItems}%` }}
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
        {Array.from({ length: totalDots }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setTransitionEnabled(true);
              setCurrentIndex(slidesPerView + index);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentIndex >= slidesPerView && currentIndex < slidesPerView + totalDots && 
              getDisplayIndex(currentIndex) === index
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

