import { motion, useScroll, useSpring } from "motion/react";
import { Github, Linkedin, Mail, Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass py-3 shadow-sm" : "bg-transparent py-5"}`}>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-brand-800 origin-left z-[60]"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <motion.a 
          href="#" 
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-xl md:text-2xl font-display font-bold tracking-tighter text-brand-800 dark:text-brand-50">
            STUDIO <span className="text-brand-400 italic">S85</span>
          </span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-xs font-semibold uppercase tracking-widest text-brand-800 dark:text-brand-50 hover:text-brand-500 transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          <div className="flex items-center space-x-4 ml-2 border-l border-brand-200 dark:border-brand-700 pl-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-brand-800 dark:text-brand-50 hover:text-brand-500 transition-colors">
              <Github size={18} />
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-brand-800 dark:text-brand-50" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-white dark:bg-brand-800 border-b border-brand-100 dark:border-brand-700 p-6 md:hidden flex flex-col space-y-4 shadow-xl"
        >
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-display font-bold text-brand-800 dark:text-brand-50"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center justify-between pt-4 border-t border-brand-100 dark:border-brand-700">
            <div className="flex space-x-6">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-brand-800 dark:text-brand-50"><Github size={24} /></a>
              <a href="mailto:hello@example.com" className="text-brand-800 dark:text-brand-50"><Mail size={24} /></a>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
