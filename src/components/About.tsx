import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Grid, Cpu, Settings, Activity } from 'lucide-react';

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const tags = ["Innovation", "Mentorship", "Startups", "Leadership"];

  return (
    <section 
      id="about" 
      className="relative py-32 bg-brand-dark overflow-hidden text-slate-300 font-sans"
    >

      {/* Schematic Background Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>

        {/* Header - Blueprint Spec */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="border-b border-white/10 pb-8 mb-16 flex flex-col md:flex-row justify-between items-end gap-6"
        >
          <div>
            <div className="text-xs font-mono text-cyan-500 mb-2 flex items-center gap-2">
              <Grid size={14} /> SCHEMATIC: ABT-CELL-2024
            </div>
            <h2 className="text-5xl font-bold text-white tracking-tight">
              WHO <span className="font-light text-slate-500">WE</span> <br />
              ARE
            </h2>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-xs font-mono text-slate-500 uppercase">SYS_INIT_SEQUENCE: SUCCESS</div>
            <div className="text-xs font-mono text-cyan-500">CORE_MODULE: ACTIVE</div>
          </div>
        </motion.div>

        {/* Main Content - Double Layer Schematic Card */}
        <div className="relative group overflow-hidden rounded-sm border border-white/10">

          {/* LAYER 1: Standard Visuals */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-white/5 p-8 md:p-12 transition-colors duration-500"
          >
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="text-xs font-mono text-blue-400 mb-6 tracking-widest uppercase flex items-center gap-2">
                  <Cpu size={14} /> MISSION_V1.0 //
                </div>
                <h3 className="text-3xl font-bold text-white mb-6">
                  Igniting the <span className="text-cyan-400">Spirit</span> of Venture.
                </h3>
                <p className="text-lg leading-relaxed mb-6">
                  The <strong className="text-white font-black">E-Cell</strong> at R. C. Patel Institute of Technology isn't just a club—it's an incubator for the bold.
                </p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-slate-400 text-[10px] font-mono rounded tracking-tighter">
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { title: "Ideation", icon: Grid, color: "text-blue-400" },
                  { title: "Incubation", icon: Settings, color: "text-cyan-400" },
                  { title: "Impact", icon: Activity, color: "text-emerald-400" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 group/item cursor-default">
                    <div className={`p-3 rounded bg-white/5 border border-white/10 ${item.color}`}>
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{item.title}</h4>
                      <p className="text-xs text-slate-500 font-mono italic">Sequence_0{idx + 1} initialized</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>



          {/* Card Frame Brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500/50 group-hover:w-8 group-hover:h-8 transition-all" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500/50 group-hover:w-8 group-hover:h-8 transition-all" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500/50 group-hover:w-8 group-hover:h-8 transition-all" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500/50 group-hover:w-8 group-hover:h-8 transition-all" />

        </div>

        {/* Measurement Lines Footer */}
        <div className="hidden lg:flex w-full justify-between mt-4 text-[10px] font-mono text-slate-600 px-1 opacity-50">
          <span>MEASUREMENT_SPEC: 45.2pt</span>
          <span>// ALPHA_MODULE_REVEALED</span>
        </div>

      </div>
    </section>
  );
};

export default About;
