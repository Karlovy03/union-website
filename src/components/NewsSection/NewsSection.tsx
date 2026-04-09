import { Card, CardHeader, CardTitle, CardContent } from "../lightswind/card";
import { motion } from "framer-motion";
import contentData from "../../data";
import { BorderBeam } from "../lightswind/border-beam";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export const NewsSection = () => {
  const navigate = useNavigate();

  return (
    <section id="news" className="max-w-7xl mx-auto px-6 py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-union-primary/5 rounded-full blur-3xl -z-10 animate-pulse"></div>

      <div className="text-center mb-20 space-y-4">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-union-secondary/10 text-union-primary text-xs font-bold uppercase tracking-widest"
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
        {contentData.news.items.map((news: any, idx) => (
          <Card 
            key={idx} 
            onClick={() => navigate(`/news/${news.id}`)}
            className="group relative bg-white/40 dark:bg-white/5 border-white/20 dark:border-white/10 shadow-xl backdrop-blur-3xl hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-300 rounded-3xl overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <BorderBeam size={80} duration={4} colorFrom="var(--union-accent)" colorTo="var(--union-primary)" />
            </div>
            
            <div className="absolute top-6 right-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
               <div className="flex items-center gap-2 text-union-accent font-black text-[10px] uppercase tracking-widest">
                  Читати далі <ArrowUpRight size={14} strokeWidth={3} />
               </div>
            </div>

            <CardHeader className="pt-8">
              <CardTitle className="text-2xl font-bold text-union-primary group-hover:text-union-accent transition-colors">{news.title}</CardTitle>
              <p className="text-sm font-bold text-union-secondary uppercase tracking-widest">
                {news.subtitle}
              </p>
            </CardHeader>
            <CardContent className="text-base text-muted-foreground space-y-4 pb-8">
              <p className="leading-relaxed line-clamp-3">{news.content}</p>
              {news.points && (
                <ul className="space-y-2 mt-4">
                  {news.points.slice(0, 2).map((point: string, pIdx: number) => (
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
