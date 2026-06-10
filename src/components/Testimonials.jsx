import TESTIMONIALS_DATA from '../data/testimonials.json';

const STAR_SVG = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.038-2.583a1 1 0 00-.364-1.118L2.05 9.717c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  </svg>
);

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative z-10 overflow-hidden border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16 text-center reveal">
        <h2 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-2">Feedback</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-gray-800">Client Testimonials</h3>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full marquee-mask py-4 group">
        {/* First track */}
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] items-stretch">
          {/* Group 1 */}
          <div className="flex shrink-0 gap-8 px-4 items-stretch">
            {TESTIMONIALS_DATA.map((card, i) => (
              <div
                key={`g1-${i}`}
                className="w-80 lg:w-[400px] h-[230px] p-6 rounded-[1.5rem] glass shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 shrink-0 transform hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:border-gray-200 transition-all duration-500 cursor-default flex flex-col justify-between"
              >
                <div>
                  <div className="flex text-yellow-400 mb-2 gap-1">
                    {STAR_SVG}
                    {STAR_SVG}
                    {STAR_SVG}
                    {STAR_SVG}
                    {STAR_SVG}
                  </div>
                  <div className="max-h-[80px] overflow-y-auto no-scrollbar">
                    <p className="text-gray-600 text-sm leading-relaxed">{card.text}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                    <img src={card.avatar} alt={card.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-800">{card.name}</h4>
                    <p className="text-xs text-gray-400">{card.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Group 2 (Duplicate for infinite marquee scroll) */}
          <div className="flex shrink-0 gap-8 px-4 items-stretch" aria-hidden="true">
            {TESTIMONIALS_DATA.map((card, i) => (
              <div
                key={`g2-${i}`}
                className="w-80 lg:w-[400px] h-[230px] p-6 rounded-[1.5rem] glass shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 shrink-0 transform hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:border-gray-200 transition-all duration-500 cursor-default flex flex-col justify-between"
              >
                <div>
                  <div className="flex text-yellow-400 mb-2 gap-1">
                    {STAR_SVG}
                    {STAR_SVG}
                    {STAR_SVG}
                    {STAR_SVG}
                    {STAR_SVG}
                  </div>
                  <div className="max-h-[80px] overflow-y-auto no-scrollbar">
                    <p className="text-gray-600 text-sm leading-relaxed">{card.text}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                    <img src={card.avatar} alt={card.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-800">{card.name}</h4>
                    <p className="text-xs text-gray-400">{card.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
