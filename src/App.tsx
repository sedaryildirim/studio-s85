import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const sections = [
    { id: "hero", component: <Hero /> },
    { id: "about", component: <About /> },
    { id: "projects", component: <Projects /> },
    { id: "contact", component: <Contact /> }
  ];

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 768) return;
      
      if (isScrolling.current) return;

      const delta = e.deltaY || e.deltaX;
      if (Math.abs(delta) < 30) return; // Ignore small scrolls

      const dir = delta > 0 ? 1 : -1;
      const nextIndex = Math.min(Math.max(activeIndex + dir, 0), sections.length - 1);

      if (nextIndex !== activeIndex) {
        isScrolling.current = true;
        setDirection(dir);
        setActiveIndex(nextIndex);
        
        setTimeout(() => {
          isScrolling.current = false;
        }, 1700); // Match animation duration (1.2s + 0.5s)
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
        const href = anchor.getAttribute('href')?.substring(1);
        
        // Desktop: Handle page turn effect
        if (window.innerWidth >= 768) {
          e.preventDefault();
          if (!href) {
            setDirection(activeIndex > 0 ? -1 : 0);
            setActiveIndex(0);
            return;
          }
          
          const targetIndex = sections.findIndex(s => s.id === href);
          if (targetIndex !== -1 && targetIndex !== activeIndex) {
            setDirection(targetIndex > activeIndex ? 1 : -1);
            setActiveIndex(targetIndex);
          }
        } else {
          // Mobile: Handle smooth scroll
          if (href) {
            const element = document.getElementById(href);
            if (element) {
              e.preventDefault();
              element.scrollIntoView({ behavior: 'smooth' });
              // Close mobile menu if open
              // Note: Navbar state is local to Navbar component, 
              // but handleLinkClick is in App.tsx. 
              // The Navbar links have their own onClick to close the menu.
            }
          } else {
            // Scroll to top for Home link
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      document.removeEventListener('click', handleLinkClick);
    };
  }, [activeIndex, sections]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.6,
      z: -500,
    }),
    center: {
      x: 0,
      rotateY: 0,
      opacity: 1,
      scale: 1,
      z: 0,
      zIndex: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      rotateY: direction > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.6,
      z: -500,
      zIndex: 0,
    }),
  };

  return (
    <div className="selection:bg-brand-800 selection:text-white overflow-hidden h-screen w-screen bg-brand-800 transition-colors duration-500">
      <Cursor />
      <div className="noise-overlay" />
      <Navbar />
      
      {/* Desktop View with Page Turn Effect */}
      <div className="hidden md:block h-full w-full">
        <main className="horizontal-container no-scrollbar">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 150, damping: 35 },
                rotateY: { duration: 1.3, ease: "easeInOut" },
                opacity: { duration: 0.9 },
                scale: { duration: 1.1 }
              }}
              className="horizontal-section"
              style={{ transformOrigin: direction > 0 ? "left center" : "right center" }}
            >
              {sections[activeIndex].component}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile View - Standard Vertical Scroll */}
      <div className="md:hidden overflow-y-auto h-full">
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
          <Footer />
        </main>
      </div>

      {/* Pagination Dots */}
      <div className="hidden md:flex fixed bottom-24 left-1/2 -translate-x-1/2 z-50 space-x-3 items-center">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (index !== activeIndex) {
                setDirection(index > activeIndex ? 1 : -1);
                setActiveIndex(index);
              }
            }}
            className={`dot-indicator ${activeIndex === index ? "dot-active" : "dot-inactive"}`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      <div className="hidden md:block fixed bottom-0 left-0 right-0 z-40">
        <Footer />
      </div>
    </div>
  );
}
