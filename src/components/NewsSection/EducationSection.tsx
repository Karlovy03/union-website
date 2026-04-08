import { Card, CardHeader, CardTitle, CardContent } from "../lightswind/card";
import { motion } from "framer-motion";
import contentData from "../../data";

export const EducationSection = () => {
  return (
    <motion.section
      id="education"
      className="space-y-10 py-10 px-6"
      initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* News Data */}
      <div>
        <motion.h3
          className="text-3xl font-bold mb-6 text-union-primary dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {contentData.news.title}
        </motion.h3>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {contentData.news.items.map((news, idx) => (
            <Card key={idx} className="bg-white/40 dark:bg-white/5 border-white/20 dark:border-white/10 shadow-xl backdrop-blur-xl hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-union-primary">{news.title}</CardTitle>
                <p className="text-sm font-semibold text-union-secondary">
                  {news.subtitle}
                </p>
              </CardHeader>
              <CardContent className="text-base text-muted-foreground space-y-3">
                <p className="leading-relaxed">{news.content}</p>
                {news.points && (
                  <ul className="space-y-2 mt-4">
                    {news.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-union-accent shrink-0" />
                        <span className="text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
