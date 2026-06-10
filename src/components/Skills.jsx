import { useEffect, useState, useRef } from 'react';
import SKILLS_DATA from '../data/skills.json';
import davinciLogo from '../assets/DaVinci-Resolve-Logo.png';

export default function Skills() {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-24 relative z-10 border-y border-gray-200"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <p className="font-cursive text-orange-500 text-2xl mb-2 tracking-wide">My Arsenal</p>
          <div className="flex items-center justify-center gap-4">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
              Software <span class="text-outline">Skills</span>
            </h2>
            <div className="w-10 h-10 rounded-full border-[3px] border-blue-400 flex items-center justify-center">
              <div className="w-3.5 h-3.5 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILLS_DATA.map((skill, index) => (
            <div
              key={index}
              className={`group bg-white/90 backdrop-blur-md p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 hover:border-gray-200 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 ease-out cursor-default reveal ${
                index % 2 === 1 ? 'reveal-delay-1' : ''
              }`}
            >
              <div className="flex items-center gap-5">
                {skill.isCustomLogo ? (
                  <div className="w-14 h-14 rounded-2xl bg-transparent flex items-center justify-center overflow-hidden relative group-hover:scale-105 transition-all duration-500 ease-out">
                    <img src={davinciLogo} alt="DaVinci Resolve" className="w-full h-full object-contain" />
                  </div>
                ) : skill.isBlenderLogo ? (
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[#ea7600] font-bold text-4xl group-hover:scale-105 transition-all duration-500 ease-out drop-shadow-sm group-hover:drop-shadow-md">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M374.4 75.3L202.9 146.1c-62.1 25.8-95.2 62.1-105.2 92.5-8.2 24.8-2.6 44 11 53 10.9 7.2 27.6 8.5 49.3 2.5 45.4-12.4 100-47.5 145.4-89 27.3-25 50.1-53.7 65.5-82 17.5-32.3 22-62 5.5-47.8zm-204.6 244.5c-20 6.6-43.1 8-63.5-3.3-25.5-14.2-36.4-46.7-31.5-83.3 5.4-40.4 25.3-84 57.6-121.2-1.9 11.2-2.1 23.3-.3 35.8 4 28.5 15.9 59.8 33.5 91 19.3 34 45.8 63.8 76.5 87.2-23.7 1-49.1-1.3-72.3-6.2zM281.3 430c45.9-4 81.3-15.1 106.8-30.8 32-19.7 45.2-46.7 41.5-74-4.2-30.7-27.1-56.6-60.8-72.1-18.7 15.9-40.5 31.5-65 46.1-41.5 24.9-92.4 44.5-146.4 56.5 23 18.5 50.5 36.3 80.2 52 14.1 7.5 29 14.5 43.7 22.3zm158-142c16.3-43.3 5-96-33.6-146.1-5.7-7.4-11.8-14.7-18.2-21.8 15.9 28.4 22.3 59.4 19 90.7-3.7 34.6-18.2 68.3-39.2 97.4 26-3.7 51.5-10.4 72-20.2z"></path>
                    </svg>
                  </div>
                ) : (
                  <div className={`w-14 h-14 rounded-2xl ${skill.bgClass} flex items-center justify-center font-bold text-xl shadow-inner group-hover:scale-105 transition-all duration-500 ease-out group-hover:shadow-[0_0_15px_rgba(0,0,0,0.15)]`}>
                    {skill.shortcut}
                  </div>
                )}
                <span className="font-bold text-gray-800 text-lg transition-colors duration-300">{skill.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
