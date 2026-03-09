import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section className="horizontal-section min-h-screen flex flex-col justify-center items-center text-center section-padding bg-brand-50 dark:bg-brand-800 transition-colors duration-500 overflow-hidden">
      <motion.div 
        style={{ y, x: "-50%", top: "50%", left: "50%", rotate: 12 }}
        className="bg-watermark absolute -translate-x-1/2 -translate-y-1/2"
      >
        HELLO
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-3 py-1 mb-8 text-[10px] font-bold tracking-widest uppercase bg-brand-800 text-white rounded-full">
          Available for projects
        </span>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-10 leading-[1.1] text-brand-800 dark:text-brand-50"
        >
          Crafting digital <br />
          <span className="text-brand-400 italic">experiences</span> that matter.
        </motion.h1>
        <p className="max-w-xl mx-auto text-base md:text-lg text-brand-600 dark:text-brand-300 mb-12 leading-relaxed">
          I'm a passionate web designer and developer focused on building clean, 
          functional, and aesthetically pleasing websites for forward-thinking brands.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-brand-800 dark:bg-brand-50 text-white dark:text-brand-800 rounded-full text-sm font-medium flex items-center gap-2 group"
          >
            View Projects
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-white dark:bg-brand-700 border border-brand-200 dark:border-brand-600 rounded-full text-sm font-medium hover:bg-brand-50 dark:hover:bg-brand-600 text-brand-800 dark:text-brand-50 transition-colors"
          >
            Get in touch
          </motion.a>
        </div>

        {/* Logo Marquee */}
        <div className="mt-24 w-full max-w-2xl mx-auto overflow-hidden">
          <div className="marquee-container opacity-30">
            <div className="marquee-content gap-12 md:gap-20 items-center">
              {[
                "/images/KAIF-LOGO.png",
                "/images/Mojos-LogoPaper.png",
                "/images/ember-logo-2.png",
                "/images/KAIF-LOGO.png",
                "/images/Mojos-LogoPaper.png",
                "/images/ember-logo-2.png",
                "/images/KAIF-LOGO.png",
                "/images/Mojos-LogoPaper.png",
                "/images/ember-logo-2.png",
                "/images/KAIF-LOGO.png",
                "/images/Mojos-LogoPaper.png",
                "/images/ember-logo-2.png",
              ].map((logo, i) => (
                <img 
                  key={i} 
                  src={logo} 
                  alt="Partner Logo" 
                  className="h-8 md:h-10 w-24 md:w-32 object-contain logo-black"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Scroll/Swipe Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="flex items-center gap-3 text-brand-400 dark:text-brand-300">
          <motion.div
            animate={{ x: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:block"
          >
            <ArrowRight size={14} className="rotate-180 opacity-50" />
          </motion.div>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Swipe or Scroll</span>
          <motion.div
            animate={{ x: [5, -5, 5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:block"
          >
            <ArrowRight size={14} className="opacity-50" />
          </motion.div>
        </div>
        
        <div className="relative w-6 h-10 border-2 border-brand-200 dark:border-brand-600 rounded-full flex justify-center p-1">
          <motion.div 
            animate={{ 
              y: [0, 12, 0],
              opacity: [1, 0.5, 1]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-1 h-2 bg-brand-800 dark:bg-brand-50 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
