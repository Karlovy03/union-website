import { motion } from "framer-motion";
import { FileDown, UserPlus, Mail, ChevronRight, Sparkles } from "lucide-react";
import contentData from "../../data";

const iconMap = {
  "file-down": FileDown,
  "user-plus": UserPlus,
  "mail": Mail,
};

export const JoinSection = () => {
  const { join } = contentData;

  return (
    <section id="join" className="max-w-7xl mx-auto px-6 py-16 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-union-accent/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-union-primary/5 rounded-full blur-3xl -z-10"></div>

      <div className="text-center mb-20 space-y-4">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-union-primary/10 text-union-primary text-xs font-bold uppercase tracking-widest"
        >
          <Sparkles size={14} aria-hidden="true" />
          Приєднуйтесь до нас
        </motion.div>
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-union-primary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {join.title}
        </motion.h2>
        <motion.p 
          className="text-muted-foreground text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {join.subtitle}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        {/* Connection line for desktop */}
        <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-union-accent/20 -translate-y-1/2 -z-10"></div>

        {join.steps.map((step, idx) => {
          const Icon = iconMap[step.icon as keyof typeof iconMap] || Mail;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative flex flex-col items-center text-center space-y-6 group"
            >
              <div className="relative">
                <div className="w-20 h-20 rounded-[2.5rem] bg-white/80 dark:bg-white/5 border border-union-accent/20 backdrop-blur-xl shadow-2xl flex items-center justify-center text-union-primary group-hover:scale-110 group-hover:bg-union-primary group-hover:text-white transition-all duration-500 z-10">
                  <Icon size={32} />
                </div>
                <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-union-accent text-white flex items-center justify-center font-bold text-sm shadow-lg border-4 border-white dark:border-union-dark">
                  {step.number}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-union-primary uppercase tracking-tight">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[250px]">
                  {step.description}
                </p>
              </div>

              {step.button && (
                <button 
                  className="mt-4 px-6 py-2.5 rounded-full bg-union-primary/5 text-union-primary border border-union-primary/10 hover:bg-union-primary hover:text-white transition-all font-bold text-sm shadow-md group/btn flex items-center gap-2 uppercase tracking-wide"
                  aria-label={step.button}
                >
                  {step.button}
                  <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.div 
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         viewport={{ once: true }}
         className="mt-24 text-center"
      >
        <p className="text-2xl font-bold italic bg-gradient-to-r from-union-primary to-union-accent bg-clip-text text-transparent">
          «{join.cta}»
        </p>
      </motion.div>
    </section>
  );
};
