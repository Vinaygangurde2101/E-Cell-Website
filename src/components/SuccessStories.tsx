import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ArrowUpRight, X, BarChart3, Globe2, ShieldCheck } from 'lucide-react';

const SuccessStories = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const stories = [
        {
            id: 1,
            name: 'TechFlow',
            founder: 'Amit Desai',
            desc: 'AI-driven workflow optimization for industrial manufacturing.',
            funding: '5 Cr',
            users: '10K+',
            growth: '+140%',
            color: 'blue'
        },
        {
            id: 2,
            name: 'EduTech Pro',
            founder: 'Neha Kapoor',
            desc: 'Personalized learning paths for rural India via low-bandwidth networks.',
            funding: '8 Cr',
            users: '50K+',
            growth: '+210%',
            color: 'purple'
        },
        {
            id: 3,
            name: 'HealthCare+',
            founder: 'Dr. Vikram',
            desc: 'Real-time telemedicine for remote areas using satellite tech.',
            funding: '12 Cr',
            users: '25K+',
            growth: '+85%',
            color: 'green'
        }
    ];

    return (
        <section className="py-24 bg-brand-dark relative overflow-hidden">
            {/* Background Beams */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
                >
                    <div>
                        <div className="text-xs font-mono text-brand-cyan mb-2 tracking-widest uppercase">
                            // PORTFOLIO_LOG: SUCCESS_RECORDS
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                            THE <span className="text-gradient">ALUMNI</span>
                        </h2>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stories.map((story, i) => (
                        <motion.div
                            key={story.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => setSelectedId(story.id)}
                            className="group relative h-[450px] cursor-pointer perspective-1000"
                        >
                            {/* Holographic Card Frame */}
                            <motion.div
                                whileHover={{ rotateX: 5, rotateY: -5, scale: 1.02 }}
                                className="absolute inset-0 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl p-8 overflow-hidden transition-all duration-500 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
                            >
                                {/* Chromatic Aberration Effect on Hover */}
                                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity blur-[2px]" />

                                {/* Content */}
                                <div className="flex flex-col h-full justify-between relative z-10">
                                    <div>
                                        <div className="flex justify-between items-start mb-8">
                                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:rotate-12 transition-transform">
                                                <Award size={24} className="text-cyan-400" />
                                            </div>
                                            <div className="text-[10px] font-mono text-slate-500 tracking-tighter text-right">
                                                REF_STORY_{story.id} <br />
                                                ST_SECURE
                                            </div>
                                        </div>
                                        <h3 className="text-4xl font-black text-white mb-3 group-hover:text-cyan-300 transition-colors uppercase tracking-tight">{story.name}</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">{story.desc}</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end border-b border-white/5 pb-4">
                                            <div>
                                                <div className="text-[10px] font-mono text-slate-500">VALUATION_EST</div>
                                                <div className="text-2xl font-black text-white tracking-tighter">₹{story.funding}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[10px] font-mono text-slate-500">GROWTH</div>
                                                <div className="text-emerald-400 font-bold font-mono">{story.growth}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-500 group-hover:translate-x-2 transition-transform">
                                            VIEW_VENTURE_RECORDS <ArrowUpRight size={12} />
                                        </div>
                                    </div>
                                </div>

                                {/* Background Glitch Text */}
                                <div className="absolute -bottom-10 -right-10 text-9xl font-black opacity-[0.03] select-none group-hover:opacity-[0.07] transition-opacity">
                                    0{story.id}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* EXPANDED "WAR ROOM" VIEW */}
            <AnimatePresence>
                {selectedId && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-4xl bg-[#020617] border border-cyan-500/30 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(6,182,212,0.1)]"
                        >
                            {/* Scanning Line */}
                            <motion.div
                                animate={{ top: ["0%", "100%", "0%"] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-[2px] bg-cyan-500/30 shadow-[0_0_10px_cyan] z-50 pointer-events-none"
                            />

                            <div className="grid md:grid-cols-[1fr_350px] h-[600px]">
                                <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10 overflow-y-auto">
                                    <div className="flex justify-between items-center mb-12">
                                        <h2 className="text-5xl font-black text-white italic">
                                            {stories.find(s => s.id === selectedId)?.name}
                                        </h2>
                                        <button
                                            onClick={() => setSelectedId(null)}
                                            className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors"
                                        >
                                            <X size={24} />
                                        </button>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                            <div className="flex items-center gap-3 text-cyan-400 mb-4 font-mono text-sm underline">
                                                <Globe2 size={16} /> VENTURE_OVERVIEW
                                            </div>
                                            <p className="text-slate-300 text-lg leading-relaxed italic">
                                                "{stories.find(s => s.id === selectedId)?.desc}"
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <div className="text-[10px] font-mono text-slate-500 uppercase">Founder_Profile</div>
                                                <div className="text-white font-bold text-xl">{stories.find(s => s.id === selectedId)?.founder}</div>
                                            </div>
                                            <div className="space-y-2 text-right">
                                                <div className="text-[10px] font-mono text-slate-500 uppercase">Impact_Radius</div>
                                                <div className="text-white font-bold text-xl">Global / Pan-India</div>
                                            </div>
                                        </div>

                                        <div className="p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <ShieldCheck className="text-emerald-400" />
                                                <div className="text-xs font-mono text-cyan-300 uppercase">Security_Verified_Ventures</div>
                                            </div>
                                            <button className="px-4 py-2 bg-cyan-500 text-black font-bold text-xs rounded hover:bg-cyan-400 transition-colors uppercase">
                                                Verify Records
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-black/40 p-12 flex flex-col justify-between relative">
                                    <div className="space-y-12">
                                        <div className="text-center">
                                            <BarChart3 className="mx-auto mb-4 text-slate-500" size={40} />
                                            <div className="text-[10px] font-mono text-slate-500 uppercase mb-2">Internal_Metrix</div>
                                            <div className="text-5xl font-black text-white tracking-widest">{stories.find(s => s.id === selectedId)?.growth}</div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center text-xs font-mono">
                                                <span className="text-slate-500 uppercase">Burn_Latency</span>
                                                <span className="text-emerald-400">Minimal</span>
                                            </div>
                                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} className="h-full bg-cyan-500" />
                                            </div>
                                            <div className="flex justify-between items-center text-xs font-mono">
                                                <span className="text-slate-500 uppercase">Scalability_Cap</span>
                                                <span className="text-blue-400">92%</span>
                                            </div>
                                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div initial={{ width: 0 }} animate={{ width: "92%" }} className="h-full bg-blue-500" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-[8px] font-mono text-slate-600 uppercase space-y-1 mt-auto">
                                        <p>{" >> "} ACCESS_CODE: {Math.random().toString(36).substring(7).toUpperCase()}</p>
                                        <p>{" >> "} ENCRYPTION: AES_256</p>
                                        <p>{" >> "} TRACE: STABLE</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default SuccessStories;
