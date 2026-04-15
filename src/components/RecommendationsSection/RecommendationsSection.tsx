import { motion } from "framer-motion";
import { Award, ShieldAlert, Sparkles, Files, Briefcase, ChevronRight, FileDown } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "../lightswind/card";
import { BorderBeam } from "../lightswind/border-beam";

import { useNavigate } from "react-router-dom";

const iconMap = {
  "membership": Award,
  "samples": Files,
  "rights": Award,
  "defense": ShieldAlert,
};

export const RecommendationsSection = () => {
  const { content } = useLanguage();
    const navigate = useNavigate();
  return (
    <motion.section
      id="recommendations"
      className="max-w-7xl mx-auto px-6 py-16 relative overflow-hidden"
      initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <div className="text-center mb-20 space-y-4">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-union-accent/10 text-union-primary text-xs font-bold uppercase tracking-widest"
        >
          {content.recommendations.badge}
        </motion.div>
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-union-primary mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {content.recommendations.title}
        </motion.h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {content.recommendations.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {content.recommendations.items.map((item) => {
          const IconComp = iconMap[item.id as keyof typeof iconMap] || Briefcase;
          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative group h-full flex flex-col cursor-pointer"
              onClick={() => navigate(`/recommendations/${item.id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/recommendations/${item.id}`); } }}
              aria-label={item.title}
            >
              {/* Outer Glow */}
              <div className="absolute inset-x-4 -bottom-4 h-full bg-union-primary/5 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              
              <Card className="relative flex-1 bg-white/60 dark:bg-white/[0.1] border-union-accent/10 dark:border-white/10 shadow-2xl backdrop-blur-3xl group-hover:border-union-accent/40 transition-all duration-500 z-10 overflow-hidden flex flex-col">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <BorderBeam size={80} duration={4} colorFrom="var(--union-accent)" colorTo="var(--union-secondary)" />
                </div>
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-union-primary via-union-secondary to-union-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <CardHeader className="pt-10">
                  <div className="mb-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-union-primary to-union-secondary text-white dark:text-union-dark w-14 h-14 shadow-lg shadow-union-primary/20 group-hover:scale-110 group-hover:shadow-union-accent/40 transition-all duration-500">
                    <IconComp className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl font-bold text-union-primary transition-colors group-hover:text-union-accent">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col pt-0">
                  <p className="text-muted-foreground leading-relaxed text-sm mb-8">
                    {item.description}
                  </p>
                  
                  {/* Document List */}
                  <div className="mt-auto space-y-3">
                    <div className="h-px bg-union-accent/10 w-full mb-4"></div>
                    {item.docs && item.docs.slice(0, 2).map((doc, dIdx) => (
                      <motion.a
                        key={dIdx}
                        href={`/union-website/${doc.url}`}
                        download
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-union-primary/5 hover:bg-union-primary hover:text-white dark:hover:text-union-dark transition-all text-xs font-semibold text-union-primary group/doc"
                      >
                        <div className="flex items-center gap-2">
                           <FileDown size={14} className="group-hover/doc:text-white dark:group-hover/doc:text-union-dark" />
                           <span className="truncate max-w-[150px]">{doc.name}</span>
                        </div>
                        <ChevronRight size={14} className="opacity-0 group-hover/doc:opacity-100 transition-all -translate-x-2 group-hover/doc:translate-x-0" />
                      </motion.a>
                    ))}
                  </div>

                  <div className="mt-6 w-full py-3 px-4 rounded-xl bg-union-primary text-white dark:text-union-dark flex items-center justify-center gap-2 font-bold text-sm uppercase tracking-wider group-hover:bg-union-accent group-hover:shadow-lg transition-all duration-300">
                    <span>{content.recommendations.detailedButton}</span>
                    <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};
