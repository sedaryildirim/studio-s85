import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section id="about" ref={ref} className="horizontal-section section-padding bg-brand-50 dark:bg-brand-800 transition-colors duration-500 overflow-hidden">
      <motion.div 
        style={{ y, x: "-50%", top: "50%", left: "50%", rotate: -6 }}
        className="bg-watermark absolute -translate-x-1/2 -translate-y-1/2"
      >
        STORY
      </motion.div>
      <div className="max-w-6xl mx-auto h-full flex items-center">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-display font-bold mb-6 text-brand-800 dark:text-brand-50">About Me</h2>
            <div className="space-y-5 text-base text-brand-600 dark:text-brand-200 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: 0.2, 
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
              >
                I am a creative web designer with over 5 years of experience in turning complex problems 
                into elegant digital solutions. My approach combines technical proficiency with a 
                deep understanding of user psychology and aesthetic principles.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: 0.3, 
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
              >
                Whether it's a minimal landing page or a complex web application, I strive to 
                deliver high-quality work that exceeds expectations and provides real value to users.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: 0.4, 
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                className="pt-4 grid grid-cols-2 gap-4"
              >
                <div>
                  <h4 className="font-bold text-brand-800 dark:text-brand-50 mb-1.5 text-sm">Design</h4>
                  <ul className="text-xs space-y-1 dark:text-neutral-400">
                    <li>UI/UX Design</li>
                    <li>Brand Identity</li>
                    <li>Typography</li>
                    <li>Prototyping</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-brand-800 dark:text-brand-50 mb-1.5 text-sm">Development</h4>
                  <ul className="text-xs space-y-1 dark:text-neutral-400">
                    <li>React / Next.js</li>
                    <li>Tailwind CSS</li>
                    <li>TypeScript</li>
                    <li>Motion / Framer</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-sm mx-auto"
        >
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-brand-50 dark:bg-brand-800">
            <img 
              src="/images/profile.jpeg" 
              alt="Profile" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
}
