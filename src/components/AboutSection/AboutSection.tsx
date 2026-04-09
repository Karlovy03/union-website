import { Separator } from "../lightswind/separator";
import { Card, CardHeader, CardTitle, CardContent } from "../lightswind/card";
import { motion } from "framer-motion";
import { Shield, WalletCards, HeartHandshake } from "lucide-react";
import contentData from "../../data";

// Map string icon names to actual Lucide components
const IconMap = {
  shield: Shield,
  wallet: WalletCards,
  heart: HeartHandshake,
};

export const AboutSection = () => {
  return (
    <section id="about" className="max-w-7xl mx-auto w-full px-6 py-24 space-y-24">
      <motion.div
        className="text-foreground space-y-6 text-center"
        initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-union-primary">{contentData.about.title}</h2>
        <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed mx-auto">
          {contentData.about.description}
        </p>
        <div className="flex flex-wrap justify-center gap-12 mt-12">
          {contentData.about.stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center relative group">
              <span className="text-5xl font-bold bg-gradient-to-tr from-union-primary via-union-secondary to-union-accent bg-clip-text text-transparent">
                {stat.value}
              </span>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-2">
                {stat.label}
              </span>
              <div className="absolute -bottom-2 left-0 w-0 h-1 bg-union-accent group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </motion.div>

      <Separator className="opacity-20" />

      <motion.div
        className="space-y-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-union-primary">
            {contentData.benefits.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {contentData.benefits.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contentData.benefits.items.map((benefit, idx) => {
            const IconComponent = IconMap[benefit.icon as keyof typeof IconMap] || Shield;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full bg-white/40 dark:bg-white/5 border-white/20 dark:border-white/10 shadow-xl backdrop-blur-xl hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-300 group/card">
                  <CardHeader className="pb-4">
                    <div className="w-14 h-14 rounded-2xl bg-union-primary/10 dark:bg-union-accent/10 flex items-center justify-center mb-6 group-hover/card:scale-110 transition-transform duration-500 shadow-inner">
                      <IconComponent className="h-7 w-7 text-union-primary dark:text-union-accent" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-xl font-bold text-union-primary leading-tight">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <Separator />
    </section>
  );
};
