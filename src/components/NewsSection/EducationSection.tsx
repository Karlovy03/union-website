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
            <Card key={idx} className="bg-union-light/30 dark:bg-union-dark/30 border-union-secondary/20">
              <CardHeader>
                <CardTitle>{news.title}</CardTitle>
                <p className="text-sm text-union-accent">
                  {news.subtitle}
                </p>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>{news.content}</p>
                {news.points && (
                  <ul className="list-disc list-inside space-y-1 mt-2 text-xs">
                    {news.points.map((point, pIdx) => (
                      <li key={pIdx}>{point}</li>
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
