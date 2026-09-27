import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail, Code, Terminal, Cpu } from 'lucide-react';

interface TeamMember {
    name: string;
    role: string;
    image: string;
    id: string;
    expertise: string;
    social: {
        linkedin: string;
        twitter: string;
        email: string;
    };
}

const TeamCard = ({ member }: { member: TeamMember }) => (
    <div className="group relative w-[300px] flex-shrink-0 mx-4">
        {/* Card Container */}
        <div className="relative bg-[#0B0F1A] border border-gray-800 p-1 clip-path-polygon hover:border-blue-500/50 transition-colors duration-300">
            {/* Top Decor */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative bg-[#0a0e17] p-6 flex flex-col items-center">
                {/* ID Badge */}
                <div className="absolute top-4 right-4 text-[10px] font-mono text-gray-600 group-hover:text-blue-400 transition-colors">
                    {member.id}
                </div>

                {/* Image Container with Glitch Effect on Hover */}
                <div className="relative w-24 h-24 mb-6">
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-700 group-hover:border-blue-500 group-hover:animate-spin-slow transition-colors" />
                    <div className="absolute inset-2 rounded-full overflow-hidden bg-gray-800">
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="absolute bottom-0 right-0 bg-blue-600 p-1.5 rounded-full text-white">
                        <Cpu size={12} />
                    </div>
                </div>

                {/* Info */}
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{member.name}</h3>
                <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-4 bg-gray-900/50 px-2 py-1 rounded">
                    <Code size={12} /> {member.role}
                </div>

                {/* Stats / Expertise */}
                <div className="w-full h-[1px] bg-gray-800 mb-4" />
                <div className="flex justify-between w-full text-xs font-mono text-gray-500 mb-6">
                    <span>CLASS:</span>
                    <span className="text-gray-300">{member.expertise}</span>
                </div>

                {/* Social Drawer */}
                <div className="flex gap-4">
                    <a href={member.social.linkedin} className="text-gray-500 hover:text-white hover:scale-110 transition-all"><Linkedin size={18} /></a>
                    <a href={member.social.twitter} className="text-gray-500 hover:text-white hover:scale-110 transition-all"><Twitter size={18} /></a>
                    <a href={`mailto:${member.social.email}`} className="text-gray-500 hover:text-white hover:scale-110 transition-all"><Mail size={18} /></a>
                </div>
            </div>
        </div>
    </div>
);

const Team = () => {
    // Generate 30 Team Members
    const teamMembers: TeamMember[] = Array.from({ length: 30 }, (_, i) => {
        const roles = ['DEV_OPS', 'FRONTEND', 'BACKEND', 'DESIGN', 'MARKETING', 'CONTENT', 'STRATEGY', 'FINANCE', 'LEGAL', 'PR'];
        const expertises = ['React', 'Node', 'Figma', 'SEO', 'Writing', 'Planning', 'Budgeting', 'IP Rights', 'Public Relations', 'Cloud'];

        const images = [
            'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
            'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
            'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
            'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
            'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400',
            'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
        ];

        return {
            name: `Member ${i + 1}`,
            role: roles[i % roles.length],
            image: images[i % images.length],
            id: `OP-${String(i + 1).padStart(2, '0')}`,
            expertise: expertises[i % expertises.length],
            social: { linkedin: '#', twitter: '#', email: `member${i + 1}@rcpit.edu` },
        };
    });

    const row1 = teamMembers.slice(0, 15);
    const row2 = teamMembers.slice(15, 30);

    return (
        <section id="team" className="py-24 bg-[#050505] relative overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="container mx-auto px-4 relative z-10 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/20 border border-blue-500/30 text-blue-400 text-xs font-mono mb-4">
                        <Terminal size={12} /> SYSTEM_ADMINISTRATORS
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                        Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Operators</span>
                    </h2>
                </motion.div>
            </div>

            {/* Marquee Rows */}
            <div className="relative w-full overflow-hidden flex flex-col gap-12 group/marquee">

                {/* Row 1 - Scrolling Left */}
                <div className="relative flex overflow-hidden w-full mask-linear-fade">
                    <div className="flex animate-marquee pause-on-hover w-max">
                        {[...row1, ...row1].map((member, i) => (
                            <TeamCard key={`r1-${i}`} member={member} />
                        ))}
                    </div>
                </div>

                {/* Row 2 - Scrolling Right */}
                <div className="relative flex overflow-hidden w-full mask-linear-fade">
                    <div className="flex animate-marquee-reverse pause-on-hover w-max">
                        {[...row2, ...row2].map((member, i) => (
                            <TeamCard key={`r2-${i}`} member={member} />
                        ))}
                    </div>
                </div>

            </div>

            {/* Side Fade Gradients for cleaner look */}
            <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
            <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

        </section>
    );
};

export default Team;
