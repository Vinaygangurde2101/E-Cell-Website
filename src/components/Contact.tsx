import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, MapPin, Phone, Send, Linkedin, Twitter, Instagram, Facebook, Globe, ShieldCheck, Zap } from 'lucide-react';

/* ──────────────────────────────────────────────────────────
   Strategic Communication Hub — Enhanced Design
   Features: 3D Tilt Form, Magnetic Socials, Holographic Map
   ────────────────────────────────────────────────────────── */

const MagneticSocial = ({ children, link }: { children: React.ReactNode, link: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.4, y: y * 0.4 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:border-brand-cyan/50 hover:bg-brand-cyan/5 transition-colors group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10 transition-transform group-hover:scale-110">
        {children}
      </div>
    </motion.a>
  );
};

const Contact = () => {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleFormTilt = (e: React.MouseEvent) => {
    if (!formRef.current) return;
    const { left, top, width, height } = formRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setTilt({ x: (y - 0.5) * -10, y: (x - 0.5) * 10 });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'ecell@rcpit.edu', link: 'mailto:ecell@rcpit.edu' },
    { icon: Phone, label: 'Phone', value: '+91 98765 43210', link: 'tel:+919876543210' },
    { icon: MapPin, label: 'Location', value: 'Shirpur, Maharashtra', link: 'https://goo.gl/maps/shirpur-rcpit' },
  ];

  const socials = [
    { icon: Linkedin, link: 'https://linkedin.com/school/rcpit' },
    { icon: Twitter, link: 'https://twitter.com/ecell_rcpit' },
    { icon: Instagram, link: 'https://instagram.com/ecell_rcpit' },
    { icon: Facebook, link: 'https://facebook.com/ecellrcpit' },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-[#020817] overflow-hidden" ref={ref}>
      {/* ── Background Aesthetics ── */}
      <div className="absolute inset-0 z-0">
        {/* Neural mesh pulse */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-cyan/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-cyan/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* ── Header ── */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 border-b border-white/5 pb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-cyan/30 bg-brand-cyan/5 text-brand-cyan text-[11px] font-bold tracking-widest uppercase mb-6">
                <Zap size={12} className="animate-pulse" /> Strategic_Communication_Hub
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
                Ready to Scale Your <br />
                <span className="text-brand-cyan italic">Vision?</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed font-body">
                Our ecosystem is designed to amplify your potential. Reach out to our strategy
                team to begin your incubation journey.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="hidden md:flex flex-col items-end text-right font-mono text-[10px]"
            >
              <div className="text-slate-500 uppercase tracking-widest mb-1">Status: Operational</div>
              <div className="text-brand-cyan uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-ping" /> Link_Established
              </div>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* ── LEFT: Info & Links ── */}
            <div className="space-y-12">
              <div className="grid gap-4">
                {contactInfo.map((info, i) => (
                  <motion.a
                    key={i}
                    href={info.link}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-6 p-5 glass-terminal rounded-2xl group transition-all hover:translate-x-2"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-brand-cyan transition-transform group-hover:scale-110 group-hover:bg-brand-cyan/10">
                      <info.icon size={20} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{info.label}</div>
                      <div className="text-white font-medium text-lg">{info.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Globe size={14} /> Global_Network
                </h4>
                <div className="flex flex-wrap gap-4">
                  {socials.map((social, i) => (
                    <MagneticSocial key={i} link={social.link}>
                      <social.icon size={22} className="text-white group-hover:text-brand-cyan transition-colors" />
                    </MagneticSocial>
                  ))}
                </div>
              </div>

              {/* Holographic Tactical Map */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                className="relative rounded-3xl overflow-hidden border border-white/10 group cursor-crosshair h-[280px]"
              >
                <div className="absolute inset-0 z-10 pointer-events-none border-2 border-brand-cyan/20 rounded-3xl animate-pulse-border" />
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-brand-cyan/10 to-transparent z-10 pointer-events-none animate-scan" />

                {/* Tactical Overlays */}
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <div className="px-2 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10 text-[9px] font-mono text-brand-cyan">GEO: 21.35°N / 74.88°E</div>
                  <div className="px-2 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10 text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                    <ShieldCheck size={10} /> VERIFIED
                  </div>
                </div>

                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14872.2272847055!2d74.8777!3d21.350!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd8339!2sShirpur!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%" height="100%" style={{ border: 0 }}
                  allowFullScreen loading="lazy"
                  className="grayscale brightness-[0.7] contrast-125 saturate-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                />
              </motion.div>
            </div>

            {/* ── RIGHT: 3D Tilt Form ── */}
            <div className="relative" style={{ perspective: '1200px' }}>
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, rotateX: 20 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  className="glass-terminal rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[500px]"
                >
                  {/* Transmission Beam Effect */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-full bg-gradient-to-b from-brand-cyan/20 via-transparent to-transparent opacity-30 animate-pulse" />

                  <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: [0, -100], opacity: [1, 0] }}
                    transition={{ duration: 1, ease: "easeIn", repeat: Infinity, repeatDelay: 1 }}
                    className="w-20 h-20 bg-brand-cyan rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.5)] mb-8"
                  >
                    <Send className="text-white" size={32} />
                  </motion.div>

                  <h3 className="text-3xl font-bold text-white mb-4">Transmission Sent</h3>
                  <p className="text-slate-400 mb-8 font-body max-w-xs">
                    Your Responce successfully uplinked to the E-Cell RCPIT.
                  </p>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-bold hover:bg-brand-cyan/10 hover:border-brand-cyan/50 transition-all"
                  >
                    Send Another Responce
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  onMouseMove={handleFormTilt}
                  onMouseLeave={resetTilt}
                  animate={{ rotateX: tilt.x, rotateY: tilt.y }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="glass-terminal rounded-3xl p-8 md:p-10 relative overflow-hidden"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent" />

                  <div className="space-y-8 relative z-10" style={{ transform: 'translateZ(50px)' }}>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Primary_Identifier</label>
                      <input
                        type="text" name="name" required
                        placeholder="Your full name"
                        value={formData.name} onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-brand-cyan/50 focus:bg-brand-cyan/5 transition-all text-sm font-body"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Communication_Link</label>
                      <input
                        type="email" name="email" required
                        placeholder="your@email.com"
                        value={formData.email} onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-brand-cyan/50 focus:bg-brand-cyan/5 transition-all text-sm font-body"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Payload_Data</label>
                      <textarea
                        name="message" required rows={5}
                        placeholder="Project blueprint, idea summary, or collaboration request..."
                        value={formData.message} onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-brand-cyan/50 focus:bg-brand-cyan/5 transition-all text-sm font-body resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full bg-brand-cyan text-black font-black uppercase tracking-widest py-5 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-50' : ''}`}
                    >
                      {isSubmitting ? 'Uplinking...' : 'Establish Link →'}
                    </motion.button>
                  </div>

                  {/* Corner accents */}
                  <div className="absolute top-6 left-6 w-3 h-3 border-t-2 border-l-2 border-brand-cyan/40" />
                  <div className="absolute top-6 right-6 w-3 h-3 border-t-2 border-r-2 border-brand-cyan/40" />
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
