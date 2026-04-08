import { motion } from "framer-motion";
import { Award, ShieldAlert, Sparkles, Files, Briefcase } from "lucide-react";
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
      className="max-w-7xl mx-auto px-6 py-16"
      initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <div className="text-center mb-12">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-union-primary dark:text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {contentData.recommendations.title}
        </motion.h2>
        <p className="text-muted-foreground text-lg">
          {contentData.recommendations.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentData.recommendations.items.map((item, idx) => {
          const IconComp = iconMap[item.title as keyof typeof iconMap] || Briefcase;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative group h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-union-primary/30 to-union-accent/30 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <Card className="relative h-full bg-white dark:bg-[#070b14] border-union-secondary/30 shadow-lg shadow-union-primary/5 group-hover:border-union-accent/50 transition-colors duration-300 z-10 overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-union-accent/10 rounded-full blur-2xl group-hover:bg-union-accent/20 transition-colors"></div>
                
                <CardHeader className="pt-8">
                  <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-union-primary text-white w-14 h-14 shadow-lg shadow-union-primary/30">
                    <IconComp className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl font-bold text-union-primary dark:text-white">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-8">
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {item.description}
                  </p>
                  
                  <div className="mt-8 flex items-center text-union-accent font-medium text-sm gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 cursor-pointer">
                    <span>{contentData.recommendations.detailedButton}</span>
                    <Sparkles className="w-4 h-4" />
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
