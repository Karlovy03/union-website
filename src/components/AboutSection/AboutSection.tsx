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
    <div id="about" className="max-w-7xl mx-auto w-full px-6 py-12 space-y-16">
      <motion.div
        className="text-foreground space-y-4"
        initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-union-primary dark:text-white">{contentData.about.title}</h2>
        <p className="text-muted-foreground text-sm max-w-3xl leading-relaxed">
          {contentData.about.description}
        </p>
        <div className="flex gap-8 mt-6">
          {contentData.about.stats.map((stat, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-2xl font-bold text-union-accent">{stat.value}</span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <Separator />

      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-union-primary dark:text-white">
            {contentData.benefits.title}
          </h2>
          <p className="text-muted-foreground">
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
                <Card className="h-full bg-union-light/50 dark:bg-union-dark/50 border-union-secondary/20 shadow-sm backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <div className="w-12 h-12 rounded-xl bg-union-primary/10 flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-union-primary dark:text-union-accent" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <Separator />
    </div>
  );
};
