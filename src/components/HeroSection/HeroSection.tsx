import contentData from "../../data";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <motion.div
      id="hero"
      className="text-foreground bg-transparent flex flex-col md:flex-row 
      items-center justify-center max-w-7xl mx-auto w-full"
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
        className="flex-1 space-y-4 p-6 text-left md:text-left"
        initial={false} // so it inherits parent animation
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-union-primary dark:text-white"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.8, ease: "easeOut" },
          }}
        >
          {contentData.hero.title}
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

        <motion.div
          className="flex flex-wrap justify-center md:justify-start gap-4 mt-8"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.8, ease: "easeOut" },
          }}
        >
          <button className="px-6 py-3 bg-union-primary text-white rounded-full font-medium hover:bg-union-secondary transition-colors shadow-lg shadow-union-primary/30">
            {contentData.hero.primaryButton}
          </button>
          <button className="px-6 py-3 bg-white dark:bg-gray-800 text-union-primary dark:text-white border border-gray-200 dark:border-gray-700 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            {contentData.hero.secondaryButton}
          </button>
        </motion.div>
      </motion.div>

      {/* Right Section */}
      <motion.div
        className="flex-1 flex justify-center p-6"
        initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
        }}
        transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
      >
        <div className="w-80 h-80 relative rounded-full overflow-hidden shadow-2xl border-4 border-union-light">
          <img
            src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2670&auto=format&fit=crop"
            alt="Union Members"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-union-primary/10 mix-blend-multiply"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};
