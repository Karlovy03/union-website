import { motion } from "framer-motion";
import { Shield, WalletCards, HeartHandshake } from "lucide-react";
import contentData from "../../data";
import { CountUp } from "../lightswind/count-up";

// Map string icon names to actual Lucide components
const IconMap = {
  shield: Shield,
  wallet: WalletCards,
  heart: HeartHandshake,
};

export const AboutSection = () => {
  return (
    <section id="about" className="max-w-7xl mx-auto w-full px-6 py-16 space-y-24">
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
          {contentData.about.stats.map((stat, index) => {
            const numericValue = parseInt(stat.value.replace(/[^0-9]/g, ""));
            const suffix = stat.value.replace(/[0-9]/g, "");
            const isNumeric = !isNaN(numericValue);

            return (
              <div key={index} className="flex flex-col items-center relative group">
                {isNumeric ? (
                  <CountUp 
                    value={numericValue} 
                    suffix={suffix} 
                    duration={3} 
                    className="text-5xl font-bold bg-gradient-to-tr from-union-primary via-union-secondary to-union-accent bg-clip-text text-transparent"
                    numberClassName="text-transparent"
                  />
                ) : (
                  <span className="text-5xl font-bold bg-gradient-to-tr from-union-primary via-union-secondary to-union-accent bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                )}
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-2 text-center">
                  {stat.label}
                </span>
                <div className="absolute -bottom-2 left-0 w-0 h-1 bg-union-accent group-hover:w-full transition-all duration-500"></div>
              </div>
            );
          })}
        </div>
      </motion.div>


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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contentData.benefits.items.map((benefit, idx) => {
            const IconComponent = IconMap[benefit.icon as keyof typeof IconMap] || Shield;
            const number = String(idx + 1).padStart(2, "0");
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="group/card relative"
              >
                <div className="h-full relative overflow-hidden rounded-3xl bg-white/60 dark:bg-white/[0.08] border border-union-primary/10 dark:border-white/10 backdrop-blur-2xl p-8 md:p-10 transition-all duration-500 hover:shadow-[0_25px_60px_-12px_rgba(34,49,72,0.15)] dark:hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.6)] hover:border-union-accent/30">
                  
                  {/* Декоративний номер */}
                  <span className="absolute top-6 right-6 text-7xl font-black text-union-primary/[0.04] dark:text-white/[0.04] select-none leading-none group-hover/card:text-union-accent/10 transition-colors duration-500">
                    {number}
                  </span>

                  {/* Фонове свічення при hover */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-union-accent/0 group-hover/card:bg-union-accent/10 blur-3xl transition-all duration-700 pointer-events-none"></div>

                  {/* Іконка у градієнтному контейнері */}
                  <div className="relative z-10 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-union-primary to-union-secondary flex items-center justify-center shadow-lg shadow-union-primary/20 group-hover/card:shadow-union-accent/30 group-hover/card:scale-110 transition-all duration-500">
                      <IconComponent className="h-8 w-8 text-white" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Контент */}
                  <div className="relative z-10 space-y-4">
                    <h3 className="text-xl font-black text-union-primary tracking-tight leading-tight">
                      {benefit.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>

                  {/* Градієнтна нижня лінія */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-union-primary via-union-accent to-union-secondary opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

    </section>
  );
};
