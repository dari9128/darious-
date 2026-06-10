import { useState, useEffect, useRef } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import portfolioData from '../data/portfolio.json';

const { portfolioItems: PORTFOLIO_ITEMS, shortsData: SHORTS_DATA, filterButtons: FILTER_BUTTONS } = portfolioData;

const imagesGlob = import.meta.glob('/src/assets/images/**/*', { eager: true });
const getAssetUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('//') || path.startsWith('data:')) {
    return path;
  }
  return imagesGlob[path]?.default || path;
};


export default function Works({ onItemClick }) {
  const [filter, setFilter] = useState('all');
  const [stack, setStack] = useState([0, 1, 2]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [parent] = useAutoAnimate();
  const motionRef = useRef(null);
  const [isMotionInView, setIsMotionInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsMotionInView(entry.isIntersecting);
      },
      { threshold: 0.4 }
    );
    if (motionRef.current) observer.observe(motionRef.current);
    return () => observer.disconnect();
  }, []);



  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setStack((prev) => {
          const next = [...prev];
          const first = next.shift();
          next.push(first);
          return next;
        });
        setIsTransitioning(false);
      }, 800);
    }, 2000); // Increased interval slightly to accommodate the longer, smoother transition
    return () => clearInterval(timer);
  }, []);

  const handleDotClick = (targetIdx) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setStack((prev) => {
        const pos = prev.indexOf(targetIdx);
        if (pos === 0) return prev;
        return [...prev.slice(pos), ...prev.slice(0, pos)];
      });
      setIsTransitioning(false);
    }, 800);
  };

  const motionItems = PORTFOLIO_ITEMS.filter(item => item.category === 'motion');

  return (
    <section id="works" className="py-24 relative z-10 border-t border-gray-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header: My Work */}
        <div className="text-center mb-24 reveal pt-4">
          <p className="font-cursive text-orange-500 text-2xl mb-2 tracking-wide">Portfolio</p>
          <div className="flex items-center justify-center gap-4">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
              My <span className="text-outline">Work</span>
            </h2>
            <div className="w-10 h-10 rounded-full border-[3px] border-orange-400 flex items-center justify-center">
              <div className="w-3.5 h-3.5 bg-orange-400 rounded-full shadow-[0_0_8px_rgba(246,173,85,0.8)]"></div>
            </div>
          </div>
        </div>

        {/* MOTION GRAPHIC CATEGORY HERO */}
        <div className="category-hero relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 reveal pt-8 transition-all duration-500">
          <div className="absolute top-0 left-4 text-gray-300 text-2xl font-light hidden md:block">+</div>
          <div className="absolute top-0 right-4 text-gray-300 text-2xl font-light hidden md:block">+</div>

          <div className="pl-0 lg:pl-12 text-center lg:text-left z-10">
            <h2 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter mb-6 leading-[0.9]">Motion<br />Graphic.</h2>
            <p className="text-gray-500 max-w-sm mx-auto lg:mx-0 text-sm leading-relaxed font-medium">
              Create engaging motion visuals for modern brands, commercial, social media, typography, shapes and mixed media. Delivers clear messages that maintain visual impact.
            </p>
          </div>

          {/* Animated Staggered Portrait Collage (Fan Out) */}
          <div ref={motionRef} className="relative h-[300px] md:h-[450px] flex items-center justify-center lg:justify-start lg:pl-16 mt-8 lg:mt-0 perspective-1000">
            {/* Left Video */}
            <div className={`absolute w-28 md:w-40 aspect-[9/16] bg-transparent shadow-[0_20px_50px_rgba(0,0,0,0.1)] transform z-10 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden ${
              isMotionInView ? '-translate-x-32 md:-translate-x-48 -translate-y-4 -rotate-12 scale-105' : '-translate-x-16 md:-translate-x-24 translate-y-8'
            }`}>
              {motionItems[0] && (
                <iframe
                  src={`https://www.youtube.com/embed/${motionItems[0].youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${motionItems[0].youtubeId}&playsinline=1&enablejsapi=1`}
                  className="w-full h-full object-cover pointer-events-none scale-[1.02]"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                ></iframe>
              )}
              <div className="absolute inset-0 bg-transparent z-20"></div>
            </div>
            {/* Center Video (Front) */}
            <div className={`absolute w-32 md:w-48 aspect-[9/16] bg-transparent shadow-[0_20px_50px_rgba(0,0,0,0.15)] transform z-30 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden ${
              isMotionInView ? '-translate-y-16 scale-110' : '-translate-y-8'
            }`}>
              {motionItems[1] && (
                <iframe
                  src={`https://www.youtube.com/embed/${motionItems[1].youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${motionItems[1].youtubeId}&playsinline=1&enablejsapi=1`}
                  className="w-full h-full object-cover pointer-events-none scale-[1.02]"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                ></iframe>
              )}
              <div className="absolute inset-0 bg-transparent z-20"></div>
            </div>
            {/* Right Video */}
            <div className={`absolute w-28 md:w-40 aspect-[9/16] bg-transparent shadow-[0_20px_50px_rgba(0,0,0,0.1)] transform z-20 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden ${
              isMotionInView ? 'translate-x-32 md:translate-x-48 -translate-y-8 rotate-12 scale-105' : 'translate-x-16 md:translate-x-24 translate-y-0'
            }`}>
              {motionItems[2] && (
                <iframe
                  src={`https://www.youtube.com/embed/${motionItems[2].youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${motionItems[2].youtubeId}&playsinline=1&enablejsapi=1`}
                  className="w-full h-full object-cover pointer-events-none scale-[1.02]"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                ></iframe>
              )}
              <div className="absolute inset-0 bg-transparent z-20"></div>
            </div>
          </div>
        </div>

        {/* SHORT CONTENT CATEGORY HERO */}
        <div id="short-content-hero" className="category-hero relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 reveal pt-8 transition-all duration-500">
          <div className="absolute top-0 left-4 text-gray-300 text-2xl font-light hidden md:block">+</div>
          <div className="absolute top-0 right-4 text-gray-300 text-2xl font-light hidden md:block">+</div>

          {/* Animated Stack Layout */}
          <div className="order-2 lg:order-1 relative flex justify-center w-full mt-12 lg:mt-0 pt-16 md:pt-20 bg-transparent">
            <div className="relative w-64 md:w-80 aspect-[9/16] bg-transparent">
              
              {/* Overflow masking container */}
              <div className="absolute inset-0 overflow-hidden bg-transparent" style={{ margin: '-20px', padding: '20px' }}>
                <div className="relative w-full h-full bg-transparent">
                  {SHORTS_DATA.map((short, index) => {
                    const stackPosition = stack.indexOf(index);
                    
                    let transformStyle = '';
                    let zIndexStyle = 10;
                    let opacityStyle = 1;
                    let transitionStyle = 'all 800ms ease-in-out';
                    
                    if (stackPosition === 0) {
                      if (isTransitioning) {
                        transformStyle = 'translateY(100%) scale(1)';
                        opacityStyle = 1;
                        zIndexStyle = 30;
                      } else {
                        transformStyle = 'translateY(0px) scale(1)';
                        opacityStyle = 1;
                        zIndexStyle = 30;
                      }
                    } else if (stackPosition === 1) {
                      if (isTransitioning) {
                        transformStyle = 'translateY(0px) scale(1)';
                        opacityStyle = 1;
                        zIndexStyle = 20;
                      } else {
                        transformStyle = 'translateY(-20px) scale(0.95)';
                        opacityStyle = 1;
                        zIndexStyle = 20;
                      }
                    } else if (stackPosition === 2) {
                      if (isTransitioning) {
                        transformStyle = 'translateY(-20px) scale(0.95)';
                        opacityStyle = 1;
                        zIndexStyle = 10;
                      } else {
                        transformStyle = 'translateY(-40px) scale(0.90)';
                        opacityStyle = 0;
                        zIndexStyle = 10;
                        transitionStyle = 'none';
                      }
                    }

                    return (
                      <div
                        key={short.id}
                        className="w-full h-full absolute inset-0 rounded-none overflow-hidden bg-transparent"
                        style={{
                          transform: transformStyle,
                          opacity: opacityStyle,
                          zIndex: zIndexStyle,
                          transition: transitionStyle
                        }}
                      >
                        <iframe
                          src={`https://www.youtube.com/embed/${short.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${short.youtubeId}&playsinline=1&enablejsapi=1`}
                          className="w-full h-full object-cover pointer-events-none scale-[1.02]"
                          frameBorder="0"
                          allow="autoplay; encrypted-media"
                        ></iframe>
                        <div className="absolute inset-0 bg-transparent z-20"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black via-black/50 to-transparent text-white z-10 text-left pointer-events-none">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-white/20 overflow-hidden border border-white/20">
                              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Avatar" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-xs font-bold tracking-wide">@darious_edits</span>
                          </div>
                          <h4 className="font-bold text-sm mb-1">{short.title}</h4>
                          <p className="text-[11px] text-gray-300 font-medium">{short.tags}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Stack Navigation Indicators */}
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-40">
                {SHORTS_DATA.map((_, index) => {
                  const frontIdx = stack[0];
                  return (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        frontIdx === index ? 'bg-orange-400 h-4 scale-110' : 'bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Go to short ${index + 1}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 text-center lg:text-left z-10 pr-0 lg:pr-12">
            <h2 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter mb-6 leading-[0.9]">Short<br />Content.</h2>
            <p className="text-gray-500 max-w-sm mx-auto lg:mx-0 text-sm leading-relaxed font-medium">
              Focus on short-form editing content for Reels and TikToks. Fast-paced, attention-grabbing edits that maximize viewer retention through dynamic visual effects and crisp audio enhancement.
            </p>
          </div>
        </div>

        {/* Filters Placed Above Grid */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 reveal px-4">
          {FILTER_BUTTONS.map(btn => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`px-6 py-2 rounded-full border text-xs font-bold uppercase tracking-widest transition-all ${
                filter === btn.id
                  ? 'bg-accent text-white border-transparent'
                  : 'border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-900 bg-transparent'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Single Consolidated Grid Layout */}
        <div ref={parent} className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-1.5 grid-flow-dense pb-16" id="portfolio-grid">
          {PORTFOLIO_ITEMS.filter(item => {
            if (filter === 'all') {
              // Only show the top 6 items (4 shorts, 2 videos) for the "All" view
              return [1, 2, 3, 4, 5, 6].includes(item.id);
            }
            return item.category === filter;
          }).map(item => (
            <div
              key={item.id}
              onClick={() => onItemClick(item)}
              className={`portfolio-item ${item.colSpan} ${item.aspect} relative overflow-hidden group cursor-pointer bg-transparent transition-all duration-300`}
            >
              {item.youtubeId ? (
                <>
                  {/* YouTube Embed Player */}
                  <div className="w-full h-full relative pointer-events-none">
                    <iframe
                      src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${item.youtubeId}&playsinline=1&enablejsapi=1`}
                      className="w-full h-full object-cover scale-[1.02]"
                      title={item.title}
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                    ></iframe>
                  </div>
                  {/* Transparent Click Overlay */}
                  <div className="absolute inset-0 bg-transparent z-20"></div>
                </>
              ) : (
                /* Static Creative Design Image */
                <img 
                  src={getAssetUrl(item.image)} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6 z-30">
                <span className="text-[10px] font-bold tracking-widest text-gray-300 uppercase mb-1">{item.category}</span>
                <h4 className="text-sm md:text-lg font-bold text-white leading-tight">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
