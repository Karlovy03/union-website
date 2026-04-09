import { Card, CardHeader, CardTitle, CardContent } from "../lightswind/card";
import { motion } from "framer-motion";
import contentData from "../../data";

export const NewsSection = () => {
  return (
    <section id="news" className="max-w-7xl mx-auto px-6 py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-union-primary/5 rounded-full blur-3xl -z-10 animate-pulse"></div>

      <div className="text-center mb-20 space-y-4">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-union-secondary/10 text-union-primary text-xs font-bold uppercase tracking_widest"
        >
          Актуально
        </motion.div>
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-union-primary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {contentData.news.title}
        </motion.h2>
        <motion.p 
          className="text-muted-foreground text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {contentData.news.subtitle}
        </motion.p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {contentData.news.items.map((news, idx) => (
          <Card key={idx} className="bg-white/40 dark:bg-white/5 border-white/20 dark:border-white/10 shadow-xl backdrop_blur_3xl hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-300 rounded-3xl overflow-hidden">
            <CardHeader className="pt-8">
              <CardTitle className="text-2xl font-bold text-union-primary">{news.title}</CardTitle>
              <p className="text-sm font-bold text-union-secondary uppercase tracking_wider">
                {news.subtitle}
              </p>
            </CardHeader>
            <CardContent className="text-base text-muted-foreground space-y-4 pb-8">
              <p className="leading-relaxed">{news.content}</p>
              {news.points && (
                <ul className="space-y-2 mt-4">
                  {news.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-union-accent shrink-0" aria-hidden="true" />
                      <span className="text-sm font-medium">{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </section>
  );
};
