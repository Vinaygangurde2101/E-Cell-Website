import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Lightbulb, Users, Box, Zap } from 'lucide-react';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      // Stage 0: Ideation (0-1s)
      await new Promise(r => setTimeout(r, 1000));
      setStage(1);
      // Stage 1: Team/Network (1-2s)
      await new Promise(r => setTimeout(r, 1000));
      setStage(2);
      // Stage 2: Product/Build (2-3s)
      await new Promise(r => setTimeout(r, 1000));
      setStage(3);
      // Stage 3: Launch/Scale (3-4s)
      await new Promise(r => setTimeout(r, 1000));
      setIsLoading(false);
    };

    sequence();
  }, []);

  const stages = [
    { icon: Lightbulb, label: "IDEATION", sub: "Sparking the Next Big Thing" },
    { icon: Users, label: "TEAM BUILDING", sub: "Connecting Visionaries" },
    { icon: Box, label: "PROTOTYPING", sub: "Building the MVP" },
    { icon: Zap, label: "SCALING", sub: "Transforming the Future" },
  ];

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden font-sans"
        >
          {/* Background Neural Network Effect */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#4b5563" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Central Icon Container */}
            <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
              {/* Expanding Rings */}
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"
              />

              <div className="relative w-24 h-24 bg-[#0B0F1A] border border-gray-800 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden">
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={stage}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {(() => {
                      const Icon = stages[stage].icon;
                      return <Icon size={40} className="text-white" />;
                    })()}
                  </motion.div>
                </AnimatePresence>

                {/* Scanning Line inside box */}
                <motion.div
                  animate={{ top: ['0%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="h-20 text-center">
              <AnimatePresence mode='wait'>
                <motion.div
                  key={stage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center"
                >
                  <h2 className="text-2xl font-bold text-white tracking-widest mb-1">
                    {stages[stage].label}
                  </h2>
                  <p className="text-sm text-gray-500 font-mono">
                    {stages[stage].sub}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress Line */}
            <div className="w-64 h-1 bg-gray-900 rounded-full mt-8 overflow-hidden">
              <motion.div
                animate={{ width: `${((stage + 1) / 4) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
              />
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
