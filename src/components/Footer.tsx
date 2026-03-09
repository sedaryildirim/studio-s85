import { Github, Linkedin, Twitter, Instagram, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-12 border-t border-neutral-100/10 bg-transparent"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex space-x-6">
          <a href="#" className="text-brand-500 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-50 transition-colors"><Github size={18} /></a>
        </div>
        
        <div className="flex items-center space-x-4 text-xs text-brand-400 dark:text-brand-300 font-medium tracking-wider uppercase">
          <span>© {currentYear} Studio S85</span>
          <span className="w-1 h-1 bg-brand-300 dark:bg-brand-600 rounded-full" />
          <button 
            onClick={() => setIsPrivacyOpen(true)}
            className="hover:text-brand-800 dark:hover:text-brand-50 transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {isPrivacyOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPrivacyOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-brand-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] border border-brand-100 dark:border-brand-700"
            >
              <div className="p-6 border-b border-brand-100 dark:border-brand-700 flex justify-between items-center">
                <h3 className="text-xl font-display font-bold text-brand-800 dark:text-brand-50">Privacy Policy</h3>
                <button 
                  onClick={() => setIsPrivacyOpen(false)}
                  className="p-2 hover:bg-brand-100 dark:hover:bg-brand-700 rounded-full transition-colors text-brand-800 dark:text-brand-50"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-8 overflow-y-auto text-sm text-brand-600 dark:text-brand-200 leading-relaxed space-y-4">
                <p className="font-semibold text-brand-800 dark:text-brand-50">Last Updated: March 2024</p>
                <p>
                  At Studio S85, we take your privacy seriously. This policy outlines how we handle any information collected through our portfolio website.
                </p>
                <h4 className="font-bold text-brand-800 dark:text-brand-50 uppercase tracking-wider text-xs pt-2">1. Information Collection</h4>
                <p>
                  We only collect information that you voluntarily provide to us through our contact form, such as your name and email address. This information is used solely to respond to your inquiries.
                </p>
                <h4 className="font-bold text-brand-800 dark:text-brand-50 uppercase tracking-wider text-xs pt-2">2. Cookies</h4>
                <p>
                  Our website may use essential cookies to ensure basic functionality and provide a better user experience. We do not use tracking or advertising cookies.
                </p>
                <h4 className="font-bold text-brand-800 dark:text-brand-50 uppercase tracking-wider text-xs pt-2">3. Data Security</h4>
                <p>
                  We implement standard security measures to protect your information. However, no method of transmission over the internet is 100% secure.
                </p>
                <h4 className="font-bold text-brand-800 dark:text-brand-50 uppercase tracking-wider text-xs pt-2">4. Third-Party Links</h4>
                <p>
                  Our site contains links to external platforms like GitHub and LinkedIn. We are not responsible for the privacy practices of these third-party sites.
                </p>
                <p className="pt-4 border-t border-brand-100 dark:border-brand-700 italic">
                  If you have any questions about our privacy practices, please contact us through the contact form on this website.
                </p>
              </div>
              <div className="p-6 border-t border-brand-100 dark:border-brand-700 flex justify-end">
                <button 
                  onClick={() => setIsPrivacyOpen(false)}
                  className="px-6 py-2 bg-brand-800 dark:bg-brand-50 text-white dark:text-brand-800 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-brand-700 dark:hover:bg-brand-100 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.footer>
  );
}
