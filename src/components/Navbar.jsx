import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 py-4" id="navbar">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          id="navbar-inner"
          className={`glass rounded-full px-6 py-3 flex justify-between items-center transition-all duration-300 ${scrolled ? 'shadow-md border-gray-200/80' : 'shadow-sm'
            }`}
        >
          <a href="#home" className="text-xl font-bold tracking-tight">
            DARIOUS <span className="text-gray-400"></span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <a href="#home" className="hover:text-gray-500 transition-colors">Home</a>
            <a href="#works" className="hover:text-gray-500 transition-colors">Works</a>
            <a href="#skills" className="hover:text-gray-500 transition-colors">Skills</a>
            <a href="#testimonials" className="hover:text-gray-500 transition-colors">Testimonials</a>
          </div>

          <div className="hidden md:block">
            <a
              href="#contact"
              className="bg-accent text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-800 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-20 left-6 right-6 glass rounded-2xl p-6 flex-col space-y-4 shadow-xl transition-all duration-300 ${mobileMenuOpen ? 'flex' : 'hidden'
          }`}
        id="mobile-menu"
      >
        <a href="#home" onClick={closeMobileMenu} className="block font-medium mobile-link">Home</a>
        <a href="#works" onClick={closeMobileMenu} className="block font-medium mobile-link">Works</a>
        <a href="#skills" onClick={closeMobileMenu} className="block font-medium mobile-link">Skills</a>
        <a href="#testimonials" onClick={closeMobileMenu} className="block font-medium mobile-link">Testimonials</a>
        <a href="#contact" onClick={closeMobileMenu} className="block font-medium mobile-link text-accent">Let's Talk</a>
      </div>
    </nav>
  );
}
