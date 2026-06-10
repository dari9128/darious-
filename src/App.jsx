import { useState, useEffect } from 'react';
import BackgroundWaves from './components/BackgroundWaves';
import SparkleCanvas from './components/SparkleCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Works from './components/Works';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Modal from './components/Modal';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Global scroll reveal effect
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    reveals.forEach((el) => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, []);

  // Custom slow smooth scroll on anchor clicks
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const targetLink = e.target.closest('a');
      if (!targetLink) return;

      const href = targetLink.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          e.preventDefault();
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
          const startPosition = window.scrollY;
          const distance = targetPosition - startPosition;
          const duration = 1200; // Duration in milliseconds
          let startTime = null;

          const animateScroll = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            // Cubic Ease In-Out formula
            const ease = progress < 0.5
              ? 4 * progress * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            window.scrollTo(0, startPosition + distance * ease);

            if (timeElapsed < duration) {
              window.requestAnimationFrame(animateScroll);
            } else {
              // update URL hash without scrolling again
              window.history.pushState(null, null, href);
            }
          };

          window.requestAnimationFrame(animateScroll);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="antialiased selection:bg-accent selection:text-white min-h-screen relative z-0">
      <BackgroundWaves />
      <SparkleCanvas />
      <Navbar />
      <Hero />
      <Works onItemClick={handleOpenModal} />
      <Skills />
      <Testimonials />
      <Contact />
      <Footer />
      
      <Modal
        isOpen={modalOpen}
        item={selectedItem}
        onClose={handleCloseModal}
      />
    </div>
  );
}
