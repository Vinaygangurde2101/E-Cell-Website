import { motion } from 'framer-motion';
import { Linkedin, Twitter, Instagram, Facebook, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    'Quick Links': [
      { name: 'About Us', href: '#about' },
      { name: 'Initiatives', href: '#initiatives' },
      { name: 'Events', href: '#events' },
      { name: 'Team', href: '#team' },
    ],
    'Resources': [
      { name: 'Blog', href: '#' },
      { name: 'Success Stories', href: '#' },
      { name: 'FAQs', href: '#' },
      { name: 'Support', href: '#' },
    ],
    'Legal': [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Disclaimer', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: '#', color: 'hover:bg-blue-500' },
    { icon: Twitter, href: '#', color: 'hover:bg-cyan-500' },
    { icon: Instagram, href: '#', color: 'hover:bg-pink-500' },
    { icon: Facebook, href: '#', color: 'hover:bg-blue-600' },
  ];

  return (
    <footer className="relative bg-[#0B0F1A] border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center space-x-2 mb-4"
              >
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-cyan-500/30 p-1 bg-white/5 backdrop-blur-sm">
                  <img src="/src/assets/e cell logo.png" alt="E-Cell RCPIT Logo" className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-2xl tracking-wide">RCPIT E-Cell</h3>
                  <p className="text-cyan-400 text-sm font-medium tracking-wider">Innovation Hub</p>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-gray-400 leading-relaxed mb-6 max-w-md"
              >
                Empowering students to become tomorrow's innovators and entrepreneurs.
                Join us in building the future of business and technology.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <Mail className="w-5 h-5 text-cyan-400" />
                <a href="mailto:ecell@rcpit.edu" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  ecell@rcpit.edu
                </a>
              </motion.div>
            </div>

            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (categoryIndex + 1) }}
                viewport={{ once: true }}
              >
                <h4 className="text-white font-semibold mb-4">{category}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="pt-8 border-t border-white/10"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-gray-400 text-sm text-center md:text-left">
                © {new Date().getFullYear()} RCPIT E-Cell. All rights reserved. Built with passion by innovators, for innovators.
              </p>

              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 bg-white/5 border border-white/10 rounded-lg ${social.color} transition-all duration-300 group`}
                  >
                    <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all z-40 group"
      >
        <ArrowUp className="w-6 h-6 text-white group-hover:animate-bounce" />
      </motion.button>
    </footer>
  );
};

export default Footer;
