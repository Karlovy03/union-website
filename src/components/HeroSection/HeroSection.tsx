import { motion } from "framer-motion";
import { ShieldCheck, ChevronDown } from "lucide-react";
import contentData from "../../data";

export const HeroSection = () => {
  return (
    <motion.section
      id="hero"
      className="relative text-foreground bg-transparent flex flex-col md:flex-row 
      items-center justify-center max-w-7xl mx-auto w-full pt-20 md:pt-32 pb-20 px-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          // acts like staggerChildren / delayChildren
          delayChildren: 0.3,
          staggerChildren: 0.2,
        },
      }}
    >
      {/* Left Section */}
      <motion.div
        className="flex-[1.2] space-y-6 text-left md:text-left z-10"
        initial={false}
      >
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.2 }}
           className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-union-accent/10 border border-union-accent/20 text-union-primary text-xs font-bold uppercase tracking-widest mb-4"
        >
          <ShieldCheck size={16} className="text-union-accent" />
          {contentData.hero.badge}
        </motion.div>
        <motion.h1
          className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-union-primary"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.8, ease: "easeOut" },
          }}
        >
          {contentData.hero.title}
          <span className="text-union-accent inline-flex ml-2">.</span>
        </motion.h1>

        <motion.h2
          className="text-xl md:text-2xl text-muted-foreground mt-4 leading-relaxed"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.8, ease: "easeOut" },
          }}
        >
          {contentData.hero.subtitle}
        </motion.h2>


      </motion.div>

      <motion.div
        className="flex-1 flex justify-center p-6 relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-union-accent/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
        
        <div className="w-80 h-80 md:w-[450px] md:h-[550px] relative rounded-[40px] overflow-hidden shadow-2xl border border-white/20 dark:border-white/10 group">
          <img
            src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2670&auto=format&fit=crop"
            alt={contentData.hero.imageAlt}
            width={2670}
            height={1780}
            loading="eager"
            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-union-primary/80 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700"></div>
          
          <div className="absolute bottom-8 left-8 right-8 p-6 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
             <p className="text-white font-bold text-lg mb-1">{contentData.hero.imageOverlayTitle}</p>
             <p className="text-white/70 text-sm">{contentData.hero.imageOverlaySubtitle}</p>
          </div>
        </div>
      </motion.div>

      {/* Scroll Hint */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-union-primary/40 font-bold">{contentData.hero.scrollHint}</span>
        <ChevronDown size={20} className="text-union-accent" />
      </motion.div>
    </motion.section>
  );
};
