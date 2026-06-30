'use client';

import { useRef, useState, useEffect } from 'react';
import { type BlogPostMetaData } from '../../_types/blog';
import SecondaryGridPostItem from './SecondaryGridPostItem';

interface INormalPostCarouselProp {
  posts: BlogPostMetaData[];
  limit?: number;          // Maximum total number of posts to display in the carousel
  desktopLimit?: number;   // Number of posts visible at once on desktop viewport (>= 1024px)
  tabletLimit?: number;    // Number of posts visible at once on tablet viewport (>= 768px and < 1024px)
  mobileLimit?: number;    // Number of posts visible at once on mobile viewport (< 768px)
}

export default function NormalPostCarousel({
  posts,
  limit,
  desktopLimit = 3,
  tabletLimit = 2,
  mobileLimit = 1,
}: INormalPostCarouselProp) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  
  // Drag to scroll refs
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // Slice posts if a total limit is specified
  const displayedPosts = limit ? posts.slice(0, limit) : posts;

  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(true);

  // Calculate total pages based on displayed posts and current visible count
  const totalPages = Math.max(1, displayedPosts.length - visibleCount + 1);

  const handleScroll = () => {
    if (scrollerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);

      setIsAtStart(scrollLeft < 5);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);

      const cardWidth = scrollerRef.current.firstElementChild?.getBoundingClientRect().width || 1;
      
      // Calculate visibleCount based on actual dimensions
      const count = Math.round(clientWidth / cardWidth) || 1;
      setVisibleCount(count);

      // Calculate index and cap it at totalPages - 1
      const localPages = Math.max(1, displayedPosts.length - count + 1);
      const index = Math.min(Math.round(scrollLeft / cardWidth), localPages - 1);
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    handleScroll();
    
    // Set up resize observer to dynamically update visibility and page calculations
    const observer = new ResizeObserver(() => {
      handleScroll();
    });
    
    if (scrollerRef.current) {
      observer.observe(scrollerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [displayedPosts.length]);

  const scrollPrev = () => {
    if (scrollerRef.current) {
      const cardWidth = scrollerRef.current.firstElementChild?.getBoundingClientRect().width || 0;
      scrollerRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (scrollerRef.current) {
      const cardWidth = scrollerRef.current.firstElementChild?.getBoundingClientRect().width || 0;
      scrollerRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollerRef.current) return;
    
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    
    // Track start position
    startXRef.current = e.pageX - scrollerRef.current.offsetLeft;
    scrollLeftRef.current = scrollerRef.current.scrollLeft;

    // Change cursor styling, suspend smooth scroll and native scroll snapping during drag
    scrollerRef.current.style.cursor = 'grabbing';
    scrollerRef.current.style.scrollBehavior = 'auto';
    scrollerRef.current.style.scrollSnapType = 'none';
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !scrollerRef.current) return;

    const x = e.pageX - scrollerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5; // Sensitivity multiplier

    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }

    scrollerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (!isDraggingRef.current || !scrollerRef.current) return;

    isDraggingRef.current = false;
    
    const scroller = scrollerRef.current;
    scroller.style.cursor = 'grab';
    scroller.style.scrollBehavior = 'smooth';
    scroller.style.scrollSnapType = 'x mandatory'; // Restore native snap

    const cardWidth = scroller.firstElementChild?.getBoundingClientRect().width || 0;
    if (cardWidth > 0 && hasDraggedRef.current) {
      const diff = scroller.scrollLeft - scrollLeftRef.current;
      let targetScrollLeft = scrollLeftRef.current;

      // Snap forward or backward if dragged half past the card width
      if (diff > cardWidth / 2) {
        targetScrollLeft = scrollLeftRef.current + cardWidth;
      } else if (diff < -cardWidth / 2) {
        targetScrollLeft = scrollLeftRef.current - cardWidth;
      }

      // Clamp scroll target to container bounds
      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      targetScrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScroll));

      scroller.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
    }

    // Clear dragging state after click event cycle executes
    if (hasDraggedRef.current) {
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 50);
    }
  };

  const handleCaptureClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If the mouse dragged, intercept and prevent navigation clicks
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    // Prevent default browser dragging for images/text
    e.preventDefault();
  };

  if (!displayedPosts || displayedPosts.length === 0) return null;

  const showControls = totalPages > 1;

  // Set grid columns dynamically using CSS Custom Properties for responsive layouts
  const dynamicColumnsStyle = {
    '--cols-desktop': desktopLimit,
    '--cols-tablet': tabletLimit,
    '--cols-mobile': mobileLimit,
  } as React.CSSProperties;

  return (
    <div 
      style={dynamicColumnsStyle}
      className="border-x-4 border-b-4 border-on-surface flex flex-col bg-surface select-none"
    >
      {/* Carousel Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center bg-surface-container-high border-b-4 border-on-surface">
        {/* Header Label */}
        <div className="px-6 py-4 flex items-center gap-4">
          <span className="label-caps text-xs md:text-sm font-bold bg-tertiary-fixed text-on-tertiary-fixed border-2 border-on-surface px-3 py-1.5 font-mono uppercase">
            READ MORE
          </span>
        </div>

        {/* Controls */}
        {showControls && (
          <div className="flex border-t-4 sm:border-t-0 sm:border-l-4 border-on-surface divide-x-4 divide-on-surface h-full">
            {/* Page Counter */}
            <div className="px-6 flex items-center justify-center font-mono text-xs md:text-sm font-bold uppercase min-w-[100px] bg-surface">
              {String(currentIndex + 1).padStart(2, '0')} // {String(totalPages).padStart(2, '0')}
            </div>
            
            <button
              onClick={scrollPrev}
              disabled={isAtStart}
              aria-label="Previous posts"
              className="px-6 py-4 bg-surface text-on-surface hover:bg-primary hover:text-white disabled:opacity-50 disabled:hover:bg-surface disabled:hover:text-on-surface transition-colors cursor-pointer text-xs md:text-sm font-bold font-anton uppercase tracking-wider"
            >
              ← PREV
            </button>
            
            <button
              onClick={scrollNext}
              disabled={isAtEnd}
              aria-label="Next posts"
              className="px-6 py-4 bg-surface text-on-surface hover:bg-primary hover:text-white disabled:opacity-50 disabled:hover:bg-surface disabled:hover:text-on-surface transition-colors cursor-pointer text-xs md:text-sm font-bold font-anton uppercase tracking-wider"
            >
              NEXT →
            </button>
          </div>
        )}
      </div>

      {/* Brutalist Progress Bar */}
      {showControls && (
        <div className="h-3 w-full bg-surface-container-low border-b-4 border-on-surface relative overflow-hidden">
          {/* Fill */}
          <div 
            className="h-full bg-primary transition-all duration-100 ease-out border-r-4 border-on-surface"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}

      {/* Carousel Body */}
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onClickCapture={handleCaptureClick}
        onDragStart={handleDragStart}
        className="flex overflow-x-auto scroll-snap-type-x-mandatory scroll-smooth no-scrollbar divide-x-4 divide-on-surface cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {displayedPosts.map((post, idx) => (
          <div
            key={idx}
            className="w-[calc(100%/var(--cols-mobile))] md:w-[calc(100%/var(--cols-tablet))] lg:w-[calc(100%/var(--cols-desktop))] flex-shrink-0 scroll-snap-align-start flex flex-col carousel-slide-animate"
          >
            <SecondaryGridPostItem
              post={post}
              shadowEffect={idx % 2 === 0}
              dotPatternBackground={idx === displayedPosts.length - 1}
              className="flex-1"
              hasBottomBorder={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
