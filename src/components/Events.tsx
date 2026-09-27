import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

const Events = () => {
  const events = [
    {
      id: 1,
      title: "E-Summit '24",
      date: "March 15-16, 2024",
      time: "10:00 AM - 6:00 PM",
      location: "Main Auditorium",
      type: "Upcoming",
      description: "The biggest entrepreneurship conclave of North Maharashtra. 2 Days. 10+ Speakers. 500+ Delegates."
    },
    {
      id: 2,
      title: "Startup Expo",
      date: "April 20, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Campus Grounds",
      type: "Registration Open",
      description: "Showcase your startup to investors and early adopters. Secure your booth now."
    },
    {
      id: 3,
      title: "Hack-a-thon v3.0",
      date: "May 10-11, 2024",
      time: "24 Hours",
      location: "Innovation Hub",
      type: "Upcoming",
      description: "Code. Build. Pitch. A 24-hour non-stop development marathon."
    }
  ];

  return (
    <section id="events" className="py-24 bg-[#0B0F1A] relative min-h-screen flex flex-col justify-center">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-1 mb-4 border border-cyan-500/30 rounded-full bg-cyan-900/10 text-cyan-400 font-mono text-sm tracking-widest">
            TIMELINE_SYNC
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Program <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Schedule</span>
          </h2>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Central Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-800 md:-translate-x-1/2">
            <div className="absolute top-0 bottom-0 w-full bg-gradient-to-b from-cyan-500 via-purple-500 to-blue-500 opacity-50" />
          </div>

          <div className="space-y-12">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Empty space for opposite side */}
                <div className="flex-1 hidden md:block" />

                {/* Timeline Node */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-[#0B0F1A] border-2 border-cyan-500 rounded-full -translate-x-1/2 mt-6 z-10 shadow-[0_0_10px_cyan]">
                  <div className="absolute inset-0 bg-cyan-500 rounded-full animate-ping opacity-20" />
                </div>

                {/* Content Card */}
                <div className="flex-1 pl-12 md:pl-0">
                  <div className={`relative p-6 bg-[#131b2c] border border-gray-700/50 rounded-xl overflow-hidden group hover:border-cyan-500/50 transition-colors duration-300 md:mx-8`}>
                    {/* Holographic Shine */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />

                    <div className="flex justify-between items-start mb-4">
                      <div className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${event.type === 'Registration Open' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                        {event.type}
                      </div>
                      <div className="text-gray-400 text-sm font-mono">{event.date}</div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-400 font-mono mb-6">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-cyan-500" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-purple-500" />
                        {event.location}
                      </div>
                    </div>

                    <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-lg text-white text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 group/btn">
                      View Details
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
