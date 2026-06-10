export default function Hero() {
  return (
    <section id="home" class="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Subtle background decoration */}
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>

      <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div class="order-2 lg:order-1 text-center lg:text-left reveal">
            <div class="inline-block px-4 py-1.5 rounded-full border border-gray-200 bg-white/50 backdrop-blur-sm text-sm font-medium text-gray-600 mb-6 shadow-sm">
              Available for Freelance Projects
            </div>
            <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-4">
              Crafting <br />
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-400">Visual Stories.</span>
            </h1>
            <h2 class="text-2xl md:text-3xl font-light text-gray-600 mb-6">
              <span class="font-medium text-gray-800">Video Editor</span> & <span class="font-medium text-gray-800">Graphic Designer</span>
            </h2>
            <p class="text-gray-500 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              I blend motion and static design to create compelling narratives for brands, agencies, and creators. Elevating raw concepts into polished, premium experiences.
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#works" class="w-full sm:w-auto px-8 py-4 bg-accent text-white rounded-full font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center">
                View My Work
              </a>
              <a href="#contact" class="w-full sm:w-auto px-8 py-4 bg-white text-accent border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-all shadow-sm text-center">
                Connect
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end reveal reveal-delay-2 relative z-20">
            <div className="relative w-full max-w-[320px] md:max-w-[380px] flex justify-center mt-12 lg:mt-0">

              {/* Top Right Decorative Circle */}
              <div className="absolute -top-6 -right-2 md:-right-8 w-14 h-14 rounded-full border border-blue-500 flex items-center justify-center animate-pulse z-0">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              </div>

              {/* Bottom Left Decorative Dashed Circle */}
              <div className="absolute -bottom-6 -left-4 md:-left-12 w-24 h-24 rounded-full border-[1.5px] border-dashed border-orange-300 animate-[spin_20s_linear_infinite] z-0"></div>

              {/* Main Profile Image */}
              <div
                className="relative w-72 md:w-[340px] h-[400px] md:h-[480px] rounded-[2.5rem] overflow-hidden shadow-2xl z-10 bg-gray-100 border-[6px] border-white/50 backdrop-blur-sm animate-float"
                style={{ animationDuration: '8s' }}
              >
                <img src="/darious.jpg" alt="Darious - Professional Video Editor" className="w-full h-full object-cover" />
              </div>

              {/* Top Left Badge: Premiere Pro */}
              <div
                className="absolute top-16 -left-12 md:-left-24 z-20 animate-float"
                style={{ animationDelay: '1.5s', animationDuration: '6s' }}
              >
                <div className="bg-white/70 backdrop-blur-xl border border-white rounded-full p-1.5 flex items-center gap-2.5 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.15)] transform hover:-translate-y-1 transition-transform">
                  <div className="w-10 h-10 bg-[#00005c] rounded-full flex items-center justify-center text-lg font-bold text-[#9999ff] font-sans tracking-tighter">
                    Pr
                  </div>
                  <div className="pr-4">
                    <h4 className="text-gray-900 font-bold text-sm leading-none tracking-tight">Premiere Pro</h4>
                  </div>
                </div>
              </div>

              {/* Bottom Right Badge: After Effects */}
              <div
                className="absolute bottom-24 -right-8 md:-right-20 z-20 animate-float"
                style={{ animationDelay: '2.5s', animationDuration: '7s' }}
              >
                <div className="bg-white/70 backdrop-blur-xl border border-white rounded-full p-1.5 flex items-center gap-2.5 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.15)] transform hover:-translate-y-1 transition-transform">
                  <div className="w-10 h-10 bg-[#00002a] rounded-full flex items-center justify-center text-lg font-bold text-[#cf96ff] font-sans tracking-tighter">
                    Ae
                  </div>
                  <div className="pr-4">
                    <h4 className="text-gray-900 font-bold text-sm leading-none tracking-tight">After Effects</h4>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
