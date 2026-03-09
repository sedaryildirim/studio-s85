import { motion, useScroll, useTransform } from "motion/react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState, FormEvent, useRef } from "react";

export default function Contact() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" ref={ref} className="horizontal-section section-padding bg-brand-50 dark:bg-brand-800 transition-colors duration-500 text-brand-800 dark:text-brand-50 overflow-hidden">
      <motion.div 
        style={{ y, x: "-50%", top: "50%", left: "50%", rotate: 45 }}
        className="bg-watermark absolute -translate-x-1/2 -translate-y-1/2"
      >
        TALK
      </motion.div>
      <div className="max-w-6xl mx-auto h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 text-brand-800 dark:text-brand-50">Let's build something <br /> amazing together.</h2>
            <p className="text-brand-600 dark:text-brand-100 text-sm mb-6 max-w-md">
              Have a project in mind or just want to say hi? Feel free to reach out. 
              I'm always open to new opportunities and collaborations.
            </p>

            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.2
                  }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {[
                { icon: <Mail size={16} />, title: "Email", value: "hello@designer.com" },
                { icon: <Phone size={16} />, title: "Phone", value: "+1 (555) 000-0000" },
                { icon: <MapPin size={16} />, title: "Location", value: "San Francisco, CA" }
              ].map((item) => (
                <motion.div 
                  key={item.title}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { duration: 0.6, ease: "easeOut" }
                    }
                  }}
                  className="flex items-start gap-2.5"
                >
                  <div className="w-8 h-8 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold mb-0 text-xs text-brand-800 dark:text-brand-50">{item.title}</h4>
                    <p className="text-brand-600 dark:text-brand-200 text-xs">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-brand-800 text-brand-800 dark:text-brand-50 p-6 md:p-8 rounded-[2rem] shadow-2xl border border-brand-100 dark:border-brand-700"
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-6">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-4">
                  <Send size={20} />
                </div>
                <h3 className="text-lg font-display font-bold mb-2">Message Sent!</h3>
                <p className="text-xs text-brand-500 dark:text-brand-300 mb-4">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-[10px] font-bold uppercase tracking-widest underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-brand-400 dark:text-brand-300">Name</label>
                    <input 
                      required
                      type="text" 
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                      className="w-full px-4 py-2 bg-brand-50 dark:bg-brand-700 border border-brand-100 dark:border-brand-600 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-800 dark:focus:ring-brand-50 text-brand-800 dark:text-brand-50 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-brand-400 dark:text-brand-300">Email</label>
                    <input 
                      required
                      type="email" 
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      className="w-full px-4 py-2 bg-brand-50 dark:bg-brand-700 border border-brand-100 dark:border-brand-600 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-800 dark:focus:ring-brand-50 text-brand-800 dark:text-brand-50 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-brand-400 dark:text-brand-300">Message</label>
                  <textarea 
                    required
                    rows={3}
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    className="w-full px-4 py-2 bg-brand-50 dark:bg-brand-700 border border-brand-100 dark:border-brand-600 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-800 dark:focus:ring-brand-50 text-brand-800 dark:text-brand-50 transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full py-3 bg-brand-800 dark:bg-brand-50 text-white dark:text-brand-800 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <Send size={14} />}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
