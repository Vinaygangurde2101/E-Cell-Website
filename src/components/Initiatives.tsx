import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Lightbulb, Users, DollarSign, Rocket, MonitorPlay, Sparkles, LucideIcon } from 'lucide-react';

/* ─────────────────────────────────────────────────────────
   Interactive 3D Tilt Cards with Glowing Cursor-Follow
   Border, Particle Burst on Hover & Orbit Header
   ───────────────────────────────────────────────────────── */

interface Initiative {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  icon: LucideIcon;
  gradient: string;
  accentColor: string;
  stat: string;
  statLabel: string;
}

const INITIATIVES: Initiative[] = [
  {
    id: '01',
    title: 'E-Summit',
    tagline: 'Annual Flagship Event',
    desc: 'The ultimate convergence of founders, investors & visionaries. 2 days. 50+ speakers. 1000+ minds.',
    icon: Rocket,
    gradient: 'from-amber-500/20 to-orange-600/10',
    accentColor: '#F59E0B',
    stat: '1000+',
    statLabel: 'Attendees',
  },
  {
    id: '02',
    title: 'Incubation Cell',
    tagline: 'Idea → Prototype → Launch',
    desc: 'Get hands-on mentorship, workspace, and seed funding to turn your napkin sketch into a real product.',
    icon: Lightbulb,
    gradient: 'from-cyan-500/20 to-blue-600/10',
    accentColor: '#06B6D4',
    stat: '35+',
    statLabel: 'Startups Incubated',
  },
  {
    id: '03',
    title: 'I-Talks',
    tagline: 'Founder Masterclasses',
    desc: 'Intimate fireside chats with industry titans. Learn what textbooks never teach—straight from the trenches.',
    icon: MonitorPlay,
    gradient: 'from-violet-500/20 to-purple-600/10',
    accentColor: '#8B5CF6',
    stat: '80+',
    statLabel: 'Sessions Held',
  },
  {
    id: '04',
    title: 'Investor Connect',
    tagline: 'Pitch. Fund. Scale.',
    desc: 'Curated pitch nights where student startups meet angel investors and VCs. Your runway starts here.',
    icon: DollarSign,
    gradient: 'from-emerald-500/20 to-green-600/10',
    accentColor: '#10B981',
    stat: '₹4.2Cr',
    statLabel: 'Funding Raised',
  },
  {
    id: '05',
    title: 'Global Outreach',
    tagline: 'Beyond Boundaries',
    desc: 'Represent E-Cell at national and international platforms. Build networks that span continents.',
    icon: Users,
    gradient: 'from-rose-500/20 to-pink-600/10',
    accentColor: '#F43F5E',
    stat: '12+',
    statLabel: 'Global Events',
  },
  {
    id: '06',
    title: 'Innovation Lab',
    tagline: 'R&D Playground',
    desc: 'Cutting-edge tech experiments with AI, blockchain & IoT. Build the future before it arrives.',
    icon: Sparkles,
    gradient: 'from-sky-500/20 to-indigo-600/10',
    accentColor: '#3B82F6',
    stat: '50+',
    statLabel: 'Projects Shipped',
  },
];

/* ── Interactive 3D Tilt Card Component ── */
const TiltCard = ({ item, index }: { item: Initiative; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.icon;

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setTilt({
      x: (y - 0.5) * -15,  // tilt X axis (vertical cursor → horizontal tilt)
      y: (x - 0.5) * 15,   // tilt Y axis (horizontal cursor → vertical tilt)
    });
    setGlowPos({ x: x * 100, y: y * 100 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
      style={{ perspective: '1000px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative h-full rounded-2xl overflow-hidden transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glowing border that follows cursor */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle 160px at ${glowPos.x}% ${glowPos.y}%, ${item.accentColor}40, transparent)`,
          }}
        />

        {/* Card background */}
        <div className={`relative h-full bg-gradient-to-br ${item.gradient} backdrop-blur-sm border border-white/[0.08] rounded-2xl p-5 md:p-6 flex flex-col`}
          style={{ background: isHovered ? undefined : 'rgba(15,23,42,0.6)' }}
        >
          {/* Floating ID badge */}
          <div
            className="absolute top-5 right-5 text-[11px] font-mono font-bold tracking-widest transition-colors duration-300"
            style={{ color: isHovered ? item.accentColor : '#334155' }}
          >
            {item.id}
          </div>

          {/* Icon with animated ring */}
          <div className="relative mb-6 w-fit">
            <div
              className="p-2.5 rounded-xl border transition-all duration-500"
              style={{
                borderColor: isHovered ? `${item.accentColor}50` : 'rgba(255,255,255,0.08)',
                background: isHovered ? `${item.accentColor}15` : 'rgba(255,255,255,0.03)',
                boxShadow: isHovered ? `0 0 25px ${item.accentColor}20` : 'none',
              }}
            >
              <Icon size={22} style={{ color: item.accentColor }} />
            </div>
            {/* Orbit ring on hover */}
            <div
              className="absolute inset-[-6px] rounded-2xl border border-dashed transition-opacity duration-500"
              style={{
                borderColor: `${item.accentColor}30`,
                opacity: isHovered ? 1 : 0,
                animation: isHovered ? 'spin 6s linear infinite' : 'none',
              }}
            />
          </div>

          {/* Tagline */}
          <span
            className="text-[10px] font-semibold tracking-[0.15em] uppercase mb-2 transition-colors duration-300"
            style={{ color: isHovered ? item.accentColor : '#64748B' }}
          >
            {item.tagline}
          </span>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
            {item.title}
          </h3>
          {/* Description */}
          <p className="text-[14px] text-slate-400 leading-relaxed mb-4 flex-1">
            {item.desc}
          </p>

          {/* Bottom stat bar */}
          <div
            className="pt-3 mt-auto border-t transition-colors duration-300 flex items-center justify-between"
            style={{ borderColor: isHovered ? `${item.accentColor}25` : 'rgba(255,255,255,0.06)' }}
          >
            <div>
              <div
                className="text-xl font-bold transition-colors duration-300"
                style={{ color: isHovered ? item.accentColor : '#E2E8F0' }}
              >
                {item.stat}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">{item.statLabel}</div>
            </div>

            {/* Interactive "explore" arrow */}
            <div
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer"
              style={{
                borderColor: isHovered ? `${item.accentColor}50` : 'rgba(255,255,255,0.08)',
                background: isHovered ? `${item.accentColor}15` : 'transparent',
              }}
            >
              <svg
                width="16" height="16" viewBox="0 0 16 16" fill="none"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path
                  d="M3 8h10m0 0L9 4m4 4L9 12"
                  stroke={isHovered ? item.accentColor : '#64748B'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Sparkle particles on hover */}
          {isHovered && (
            <>
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: `${2 + (i % 3)}px`,
                    height: `${2 + (i % 3)}px`,
                    background: item.accentColor,
                    top: `${15 + (i * 18)}%`,
                    right: `${8 + (i * 7) % 25}%`,
                    opacity: 0.4,
                    animation: `sparkleFloat ${1.5 + i * 0.3}s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ── Main Initiatives Section ── */
const Initiatives = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="initiatives" className="relative py-28 md:py-36 overflow-hidden" style={{ background: '#020817' }}>
      {/* ── Inline keyframes ── */}
      <style>{`
        @keyframes sparkleFloat {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-12px) scale(1.5); opacity: 0.7; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbitPulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.02); }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,.04) 0%, transparent 70%)',
          animation: 'orbitPulse 6s ease-in-out infinite',
        }}
      />

      {/* Decorative grid dots */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10" ref={sectionRef}>

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[12px] font-medium text-slate-400 tracking-wide">
              Live Programs — 2024-25
            </span>
          </div>

          <h2
            className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-5"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Our <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #F59E0B, #06B6D4, #8B5CF6)',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 4s ease-in-out infinite',
              }}
            >
              Initiatives
            </span>
          </h2>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Six strategic programs powering the next wave of student entrepreneurs.
            <br className="hidden sm:block" />
            Hover the cards — they respond to <em className="text-slate-300">you</em>.
          </p>
        </motion.div>

        {/* ── Card Grid ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {INITIATIVES.map((item, i) => (
            <TiltCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold text-white border border-white/15 hover:border-white/30 bg-white/[0.04] hover:bg-white/[0.08] transition-all duration-300 group"
          >
            Have an idea? Let's talk
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M4 9h10m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Initiatives;
