import { motion } from "framer-motion";
import { Quote, ShieldCheck, UserCircle2 } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";

export const TeamSection = () => {
  const { content } = useLanguage();
      const navigate = useNavigate();

    return (
        <section id="team" className="max-w-7xl mx-auto px-6 py-16 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-union-primary/[0.02] dark:bg-white/[0.01] rounded-full blur-3xl pointer-events-none"></div>

            <div className="text-center mb-24 space-y-4">
                <motion.div
                   initial={{ opacity: 0, scale: 0.9 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-union-accent/10 text-union-primary text-xs font-bold uppercase tracking-widest border border-union-accent/20"
                >
                  <ShieldCheck size={14} className="text-union-accent" aria-hidden="true" />
                  {content.team.badge}
                </motion.div>
                <motion.h2 
                    className="text-4xl md:text-5xl font-bold text-union-primary"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    {content.team.title}
                </motion.h2>
                <motion.p 
                    className="text-muted-foreground text-lg max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    {content.team.subtitle}
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {content.team.members.map((member, idx) => (
                    <motion.button
                        key={member.id}
                        className="group relative flex flex-col items-center cursor-pointer text-left"
                        onClick={() => navigate(`/team/${member.id}`)}
                        aria-label={`${content.team.viewProfile}: ${member.name}`}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.2 }}
                    >
                        {/* Member Image Wrapper */}
                        <div className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl transition-all duration-700 group-hover:scale-[1.02] ring-1 ring-black/5 dark:ring-union-accent/20 bg-union-primary/5 dark:bg-white/5">
                            {/* Inner Glow */}
                            <div className="absolute inset-0 bg-union-accent/0 group-hover:bg-union-accent/[0.05] transition-colors duration-700 pointer-events-none"></div>
                            
                            <img
                                src={member.image}
                                alt={`Фото команди: ${member.name}`}
                                width={2574}
                                height={3218}
                                loading="lazy"
                                className="w-full h-full object-cover grayscale dark:grayscale-0 group-hover:grayscale-0 transition-all duration-700 brightness-90 group-hover:brightness-100"
                            />
                            {/* Glass overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-union-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                               <div className="bg-white/20 backdrop-blur-xl border border-white/20 px-4 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                                  <UserCircle2 size={14} /> {content.team.viewProfile}
                               </div>
                            </div>

                            {member.quote && (
                            <div className="absolute bottom-6 left-6 right-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                <div className="flex flex-col gap-2 p-5 rounded-2xl bg-white/10 backdrop-blur-3xl border border-white/20">
                                    <Quote size={20} className="text-union-accent mb-2" aria-hidden="true" />
                                    <p className="text-white text-xs font-medium leading-relaxed italic line-clamp-2">
                                        «{member.quote}»
                                    </p>
                                </div>
                            </div>
                            )}
                        </div>

                        {/* Text info */}
                        <div className="text-center space-y-2">
                            <h3 className="text-2xl font-bold text-union-primary group-hover:text-union-accent transition-colors">
                                {member.name}
                            </h3>
                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-center gap-2">
                                <span className="w-4 h-0.5 bg-union-accent"></span>
                                {member.role}
                                <span className="w-4 h-0.5 bg-union-accent"></span>
                            </p>
                        </div>
                    </motion.button>
                ))}
            </div>
        </section>
    );
};
