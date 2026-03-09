import { motion, useScroll, useTransform } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { useRef } from "react";

const projects = [
  {
    title: "CDC Hospitality Group",
    image: `https://api.microlink.io/?url=${encodeURIComponent("https://cdc-group-landing-page.pages.dev/")}&screenshot=true&meta=false&embed=screenshot.url`,
    link: "https://cdc-group-landing-page.pages.dev/",
    github: "#",
    tags: ["Branding", "Strategy"]
  },
  {
    title: "Mojos Grill",
    image: `https://api.microlink.io/?url=${encodeURIComponent("https://mojos-bbq-website.pages.dev/")}&screenshot=true&meta=false&embed=screenshot.url`,
    link: "https://mojos-bbq-website.pages.dev/",
    github: "#",
    tags: ["UI Design", "Web"]
  },
  {
    title: "Kaif",
    image: `https://api.microlink.io/?url=${encodeURIComponent("https://kaif-koh-phangan.pages.dev/")}&screenshot=true&meta=false&embed=screenshot.url`,
    link: "https://kaif-koh-phangan.pages.dev/",
    github: "#",
    tags: ["E-commerce", "UX"]
  },
  {
    title: "Ember Charcoal Chicken",
    image: `https://api.microlink.io/?url=${encodeURIComponent("https://ember-charcoal-chicken.pages.dev/")}&screenshot=true&meta=false&embed=screenshot.url`,
    link: "https://ember-charcoal-chicken.pages.dev/",
    github: "#",
    tags: ["Web App", "Design"]
  }
];

export default function Projects() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section id="projects" ref={ref} className="horizontal-section section-padding bg-brand-50 dark:bg-brand-800 transition-colors duration-500 overflow-hidden">
      <motion.div 
        style={{ y, x: "-50%", top: "50%", left: "50%", rotate: -12 }}
        className="bg-watermark absolute -translate-x-1/2 -translate-y-1/2"
      >
        WORKS
      </motion.div>
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-xl md:text-2xl font-display font-bold text-brand-800 dark:text-brand-50">Featured Projects</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              transition={{ 
                y: { duration: 0.3, ease: "easeOut" },
                initial: { delay: index * 0.1, duration: 0.6 }
              }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-2 bg-brand-50 dark:bg-brand-700 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-900/80 dark:bg-neutral-950/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <h3 className="text-white font-display font-bold text-lg leading-tight">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[9px] uppercase tracking-widest text-brand-200 border border-brand-200/30 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <motion.a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-900 shadow-lg"
                      >
                        <ExternalLink size={18} />
                      </motion.a>
                      {project.github !== "#" && (
                        <motion.a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-900 shadow-lg"
                        >
                          <Github size={18} />
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
              
              <h3 className="text-sm font-display font-bold mb-0.5 text-brand-800 dark:text-brand-50 group-hover:opacity-0 transition-opacity duration-300">
                {project.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
