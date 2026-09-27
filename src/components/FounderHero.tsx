import { useEffect, useState, useMemo } from 'react';
import IndiaSVG from '../assets/india.svg?raw';

/* ──────────────────────────────────────────────────────────
   "The Founder's Map" — Full-screen Hero Section
   E-Cell RCPIT, Shirpur (Maharashtra)
   
   Uses the real india.svg (mapsvg) with state paths.
   The SVG native space is  0 0 611.86 695.70
   geoViewBox:  lon 68.184 → 97.418,  lat 37.084 → 6.754
   ────────────────────────────────────────────────────────── */

/* ── City dot positions (computed from geo → SVG native coords) ── */
const CITY_DOTS = [
  { name: 'Delhi',       cx: 189, cy: 194, delay: 0.0 },
  { name: 'Noida',       cx: 191, cy: 195, delay: 0.4 },
  { name: 'Gurugram',    cx: 185, cy: 198, delay: 1.2 },
  { name: 'Jaipur',      cx: 159, cy: 233, delay: 0.8 },
  { name: 'Ahmedabad',   cx: 92,  cy: 323, delay: 1.6 },
  { name: 'Indore',      cx: 161, cy: 329, delay: 0.3 },
  { name: 'Mumbai',      cx: 98,  cy: 413, delay: 1.0 },
  { name: 'Pune',        cx: 119, cy: 426, delay: 0.6 },
  { name: 'Hyderabad',   cx: 216, cy: 452, delay: 1.4 },
  { name: 'Bangalore',   cx: 197, cy: 553, delay: 0.2 },
  { name: 'Chennai',     cx: 253, cy: 551, delay: 1.8 },
  { name: 'Kochi',       cx: 169, cy: 623, delay: 0.9 },
  { name: 'Kolkata',     cx: 422, cy: 333, delay: 0.5 },
];

/* Shirpur, Dhule district, Maharashtra — adjusted to sit inside MH in this SVG */
const SHIRPUR = { cx: 148, cy: 388 };

/* ── Deterministic "random" particles (avoid re-render flicker) ── */
const PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  left: `${12 + ((i * 37 + 11) % 76)}%`,
  top: `${8 + ((i * 53 + 7) % 82)}%`,
  dur: `${9 + (i % 4)}s`,
  delay: `${(i * 1.3) % 6}s`,
}));

const FounderHero = () => {
  const [counts, setCounts] = useState({ startups: 0, funding: 0, ideas: 0 });

  useEffect(() => {
    const targets = { startups: 120, funding: 42, ideas: 300 };
    const duration = 2000;
    const fps = 60;
    const totalFrames = Math.round(duration / (1000 / fps));
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const t = Math.min(frame / totalFrames, 1);
      const ease = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setCounts({
        startups: Math.round(targets.startups * ease),
        funding: Math.round(targets.funding * ease),
        ideas: Math.round(targets.ideas * ease),
      });
      if (frame >= totalFrames) clearInterval(timer);
    }, 1000 / fps);

    return () => clearInterval(timer);
  }, []);

  /* Build the overlay SVG that sits on top of the india map */
  const mapOverlay = useMemo(() => (
    <svg
      viewBox="0 0 611.86 695.70"
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      style={{ pointerEvents: 'none' }}
    >
      {/* SVG filters for glow effects */}
      <defs>
        <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="pinGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* City startup dots */}
      {CITY_DOTS.map((c, i) => (
        <circle
          key={i}
          cx={c.cx}
          cy={c.cy}
          r="3.5"
          fill="white"
          filter="url(#dotGlow)"
          className="dot-pulse"
          style={{ animationDelay: `${c.delay}s`, transformOrigin: `${c.cx}px ${c.cy}px` }}
        >
          <title>{c.name}</title>
        </circle>
      ))}

      {/* ── Shirpur Hero Pin ── */}
      <g filter="url(#pinGlow)">
        {/* 3 concentric expanding rings */}
        {[0, 0.6, 1.2].map((d, i) => (
          <circle
            key={i}
            cx={SHIRPUR.cx}
            cy={SHIRPUR.cy}
            r="7"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="1.5"
            className="ring-anim"
            style={{
              animationDelay: `${d}s`,
              transformOrigin: `${SHIRPUR.cx}px ${SHIRPUR.cy}px`,
            }}
          />
        ))}

        {/* Solid core dot */}
        <circle cx={SHIRPUR.cx} cy={SHIRPUR.cy} r="6" fill="#F59E0B" />
        <circle cx={SHIRPUR.cx} cy={SHIRPUR.cy} r="2.5" fill="#020817" />
      </g>

      {/* Label */}
      <text
        x={SHIRPUR.cx + 16}
        y={SHIRPUR.cy - 4}
        fill="#F59E0B"
        fontSize="9"
        fontFamily="'Space Grotesk', sans-serif"
        fontWeight="700"
        letterSpacing=".06em"
      >
        SHIRPUR
      </text>
      <text
        x={SHIRPUR.cx + 16}
        y={SHIRPUR.cy + 8}
        fill="#94A3B8"
        fontSize="6.5"
        fontFamily="'DM Sans', sans-serif"
      >
        Your journey starts here
      </text>

      {/* Thin connection lines from Shirpur to nearby cities */}
      {[
        { cx: 98, cy: 413 },  // Mumbai
        { cx: 119, cy: 426 }, // Pune
        { cx: 161, cy: 329 }, // Indore
      ].map((target, i) => (
        <line
          key={`line-${i}`}
          x1={SHIRPUR.cx}
          y1={SHIRPUR.cy}
          x2={target.cx}
          y2={target.cy}
          stroke="#F59E0B"
          strokeWidth="0.5"
          opacity="0.15"
          strokeDasharray="3 3"
        />
      ))}
    </svg>
  ), []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#020817' }}
    >
      {/* ── Inline Styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap');

        .font-heading { font-family: 'Space Grotesk', sans-serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }

        /* noise overlay */
        .hero-noise::before {
          content: '';
          position: absolute; inset: 0; z-index: 1;
          opacity: 0.03; pointer-events: none;
          background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* fade-up entrance */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-up {
          opacity: 0;
          animation: fadeUp .7s ease-out forwards;
        }

        /* city dot pulse */
        @keyframes pulseDot {
          0%, 100% { transform: scale(1);   opacity: .7; }
          50%      { transform: scale(1.5); opacity: .25; }
        }
        .dot-pulse { animation: pulseDot 2s ease-in-out infinite; }

        /* hero-pin rings */
        @keyframes ringExpand {
          0%   { transform: scale(1); opacity: .6; }
          100% { transform: scale(3.5); opacity: 0; }
        }
        .ring-anim { animation: ringExpand 1.8s cubic-bezier(.22,1,.36,1) infinite; }

        /* floating particles */
        @keyframes floatUp {
          0%   { transform: translateY(0);      opacity: 0; }
          15%  { opacity: .4; }
          85%  { opacity: .4; }
          100% { transform: translateY(-120px); opacity: 0; }
        }
        .particle {
          position: absolute;
          width: 2px; height: 2px;
          background: white;
          border-radius: 50%;
          animation: floatUp var(--dur) linear infinite;
          animation-delay: var(--delay);
        }

        /* map glow */
        .map-container {
          filter: drop-shadow(0 0 20px rgba(6,182,212,.12))
                  drop-shadow(0 0 60px rgba(6,182,212,.06));
        }

        /* map state styling */
        .map-container path {
          fill: rgba(15,23,42,.5);
          stroke: #1E3A5F;
          stroke-width: 0.5;
          transition: fill .3s;
        }
        /* Maharashtra highlight */
        .map-container path#IN-MH {
          fill: rgba(245,158,11,.08);
          stroke: rgba(245,158,11,.25);
          stroke-width: 0.8;
        }

        /* scroll bounce */
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(6px); }
        }
        .scroll-chevron {
          animation: scrollBounce 1.6s ease-in-out infinite;
        }

        /* responsive map */
        @media (max-width: 767px) {
          .map-wrapper { max-height: 350px; }
          .particle { display: none; }
        }
      `}</style>

      {/* ── Background layers ── */}
      <div className="hero-noise absolute inset-0" />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 55% 45%, #0F172A 0%, #020817 70%)',
        }}
      />

      {/* Floating particles — hidden on mobile via CSS */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: p.left,
              top: p.top,
              '--dur': p.dur,
              '--delay': p.delay,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ── Main Content Grid ── */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10 py-24 md:py-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">

          {/* ─── LEFT: Text Content ─── */}
          <div className="flex flex-col gap-7 max-w-xl font-body">
            {/* Badge */}
            <div className="anim-up" style={{ animationDelay: '.2s' }}>
              <span
                className="inline-block rounded-full text-[13px] font-medium px-4 py-1.5"
                style={{
                  color: '#F59E0B',
                  background: 'rgba(245,158,11,.08)',
                  border: '1px solid rgba(245,158,11,.28)',
                }}
              >
                🚀&nbsp; E-Cell — RCPIT Shirpur
              </span>
            </div>

            {/* Heading */}
            <h1
              className="anim-up font-heading font-bold text-white"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                lineHeight: 1.08,
                letterSpacing: '-.02em',
                animationDelay: '.4s',
              }}
            >
              The Next Unicorn<br />
              <span style={{ color: '#F59E0B' }}>Starts Here.</span>
            </h1>

            {/* Subheading */}
            <p
              className="anim-up text-[1.1rem] leading-relaxed max-w-[480px]"
              style={{ color: '#94A3B8', animationDelay: '.6s' }}
            >
              From Shirpur to Silicon Valley. From ideas to IPOs.<br />
              We build the founders of tomorrow.
            </p>

            {/* CTA Button */}
            <div className="anim-up flex flex-wrap gap-4" style={{ animationDelay: '.8s' }}>
              <a
                href="#contact"
                className="rounded-lg text-base font-semibold transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-95 inline-block"
                style={{ background: '#F59E0B', color: '#000', padding: '14px 28px', textDecoration: 'none' }}
              >
                Join the Cell →
              </a>
            </div>

            {/* Animated Stats Row */}
            <div
              className="anim-up flex items-center gap-8 md:gap-10 pt-6"
              style={{ animationDelay: '1s' }}
            >
              {[
                { value: `${counts.startups}+`, label: 'Startups Mentored' },
                { value: `₹${(counts.funding / 10).toFixed(1)}Cr+`, label: 'Funding Raised' },
                { value: `${counts.ideas}+`, label: 'Ideas Launched' },
              ].map((stat, i, arr) => (
                <div key={i} className="flex items-center gap-8 md:gap-10">
                  <div>
                    <div className="font-heading text-[2rem] font-bold text-white leading-none">
                      {stat.value}
                    </div>
                    <div className="font-body text-[13px] mt-1" style={{ color: '#64748B' }}>
                      {stat.label}
                    </div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="h-10 w-px" style={{ background: '#1E293B' }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ─── RIGHT: India Map (real SVG) ─── */}
          <div className="relative flex justify-center items-center w-full lg:pl-8 map-wrapper">
            <div className="relative w-full max-w-[520px]">
              {/* Render the actual india.svg inline */}
              <div
                className="map-container w-full h-auto"
                dangerouslySetInnerHTML={{ __html: IndiaSVG }}
              />
              {/* Overlay dots, rings, labels on top */}
              {mapOverlay}
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20">
        <span className="font-body text-[11px] tracking-[.15em] uppercase" style={{ color: '#475569' }}>
          Scroll to explore
        </span>
        <svg width="18" height="24" viewBox="0 0 18 24" fill="none" className="scroll-chevron">
          <path d="M2 6l7 6 7-6" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
          <path d="M2 14l7 6 7-6" stroke="#475569" strokeWidth="2" strokeLinecap="round" opacity=".4" />
        </svg>
      </div>

      {/* ── Bottom Divider ── */}
      <div
        className="absolute bottom-0 left-0 w-full h-px z-10"
        style={{ background: 'linear-gradient(90deg, transparent, #1E3A5F, transparent)' }}
      />
    </section>
  );
};

export default FounderHero;
