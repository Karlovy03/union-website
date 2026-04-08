import { motion } from "framer-motion";
import { Award, ShieldAlert, Sparkles, Files, Briefcase, ChevronRight, FileDown } from "lucide-react";
import contentData from "../../data";
import { Card, CardContent, CardHeader, CardTitle } from "../lightswind/card";

const iconMap = {
  "Ваші права та соціальні пільги": Award,
  "Зразки рапортів та заяв": Files,
  "Захист у службових розслідуваннях": ShieldAlert,
};

export const RecommendationsSection = () => {
  return (
    <motion.section
      id="recommendations"
      className="max-w-7xl mx-auto px-6 py-24 relative overflow-hidden"
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
          Експертний ресурс
        </motion.div>
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-union-primary mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {contentData.recommendations.title}
        </motion.h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {contentData.recommendations.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contentData.recommendations.items.map((item, idx) => {
          const IconComp = iconMap[item.title as keyof typeof iconMap] || Briefcase;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative group h-full flex flex-col"
            >
              {/* Outer Glow */}
              <div className="absolute inset-x-4 -bottom-4 h-full bg-union-primary/5 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              
              <Card className="relative flex-1 bg-white/60 dark:bg-white/5 border-union-accent/10 dark:border-white/10 shadow-2xl backdrop-blur-3xl group-hover:border-union-accent/40 transition-all duration-500 z-10 overflow-hidden flex flex-col">
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-union-primary via-union-secondary to-union-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <CardHeader className="pt-10">
                  <div className="mb-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-union-primary to-union-secondary text-white w-14 h-14 shadow-lg shadow-union-primary/20 group-hover:scale-110 transition-transform duration-500">
                    <IconComp className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl font-bold text-union-primary transition-colors">
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
                    {item.docs && item.docs.map((doc, dIdx) => (
                      <motion.a
                        key={dIdx}
                        href={doc.url}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-union-primary/5 hover:bg-union-primary hover:text-white transition-all text-xs font-semibold text-union-primary group/doc"
                      >
                        <div className="flex items-center gap-2">
                           <FileDown size={14} className="group-hover/doc:text-white" />
                           <span>{doc.name}</span>
                        </div>
                        <ChevronRight size={14} className="opacity-0 group-hover/doc:opacity-100 transition-all -translate-x-2 group-hover/doc:translate-x-0" />
                      </motion.a>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center text-union-accent font-bold text-xs gap-2 group/btn cursor-pointer">
                    <span className="group-hover/btn:mr-1 transition-all uppercase tracking-wider">{contentData.recommendations.detailedButton}</span>
                    <Sparkles className="w-4 h-4 animate-pulse" />
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
