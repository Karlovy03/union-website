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
          {contentData.news.badge}
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
        {contentData.news.items.map((news, idx) => {
          const number = String(idx + 1).padStart(2, "0");
          return (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group/card relative"
            >
              <div 
                onClick={() => navigate(`/news/${news.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/news/${news.id}`); } }}
                aria-label={news.title}
                className="h-full relative overflow-hidden rounded-[2.5rem] bg-white/60 dark:bg-white/[0.08] border border-union-primary/10 dark:border-white/10 backdrop-blur-2xl p-8 md:p-10 transition-all duration-500 hover:shadow-[0_25px_60px_-12px_rgba(34,49,72,0.15)] dark:hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.6)] hover:border-union-accent/30 cursor-pointer"
              >
                {/* Декоративний номер */}
                <span className="absolute top-6 right-8 text-7xl font-black text-union-primary/[0.03] dark:text-white/[0.03] select-none leading-none group-hover/card:text-union-accent/5 transition-colors duration-500">
                  {number}
                </span>

                {/* Фонове світіння при hover */}
                <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-union-accent/0 group-hover/card:bg-union-accent/5 blur-3xl transition-all duration-700 pointer-events-none"></div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <BorderBeam size={80} duration={4} colorFrom="var(--union-accent)" colorTo="var(--union-primary)" />
                </div>

                <div className="relative z-10 h-full flex flex-col justify-between space-y-6">
                  {/* Заголовок та Дата */}
                  <div className="space-y-3">
                    <p className="inline-block px-3 py-1 rounded-lg bg-union-secondary/10 text-union-secondary text-[10px] font-black uppercase tracking-widest">
                      {news.date || news.subtitle}
                    </p>
                    <h3 className="text-2xl font-black text-union-primary tracking-tight leading-tight group-hover/card:text-union-accent transition-colors duration-300">
                      {news.title}
                    </h3>
                  </div>

                  {/* Опис новини */}
                  <div className="space-y-4">
                    <p className="text-base text-muted-foreground leading-relaxed line-clamp-3">
                      {news.content}
                    </p>
                    
                    {news.points && (
                      <ul className="space-y-2 mt-4">
                        {news.points.slice(0, 2).map((point: string) => (
                          <li key={point} className="flex items-start gap-3">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-union-accent shrink-0" aria-hidden="true" />
                            <span className="text-xs font-bold text-muted-foreground/80">{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Індикатор "Читати далі" - тепер знизу справа */}
                  <div className="pt-4 flex justify-end">
                    <div className="flex items-center gap-2 text-union-accent font-black text-[10px] uppercase tracking-[0.2em] opacity-0 translate-x-4 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all duration-500">
                      {contentData.news.readMore} <ArrowUpRight size={16} strokeWidth={3} />
                    </div>
                  </div>
                </div>

                {/* Градієнтна нижня лінія */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-union-primary via-union-accent to-union-secondary opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};
