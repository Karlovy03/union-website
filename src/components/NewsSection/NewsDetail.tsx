import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft,
  Calendar,
  Share2,
  Check,
  ImageOff
} from "lucide-react";
import contentData from "../../data";
import { useState } from "react";
import { slideVariantsSimple } from "../shared/slideVariants";

export const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [direction, setDirection] = useState(0);
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const items = contentData.news.items;
  const currentIndex = items.findIndex((i) => i.id === id);
  const item = items[currentIndex];

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="space-y-6 max-w-md">
          <h1 className="text-3xl font-bold text-union-primary">{contentData.news.notFound}</h1>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-union-primary text-white rounded-full font-bold">
            <ArrowLeft size={18} />
            {contentData.news.backHome}
          </Link>
        </div>
      </div>
    );
  }

  const prevItem = items[(currentIndex - 1 + items.length) % items.length];
  const nextItem = items[(currentIndex + 1) % items.length];

  const handleNavigate = (newId: string, newDirection: number) => {
    setDirection(newDirection);
    setImgError(false);
    navigate(`/news/${newId}`);
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: item.title,
      text: item.content,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // Silent fail
      }
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pt-32 pb-24">
      {/* Side Navigation */}
      <motion.button
        onClick={() => handleNavigate(prevItem.id, -1)}
        className="fixed left-2 lg:left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-0.5 group transition-all duration-300 hidden md:flex"
      >
        <span className="text-[9px] font-black text-union-primary/20 group-hover:text-union-accent tracking-[3px] uppercase transition-colors whitespace-nowrap">
           {contentData.news.prevLabel}
        </span>
        <motion.div animate={{ x: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-union-primary/30 group-hover:text-union-accent transition-colors">
          <ChevronLeft size={48} strokeWidth={1} />
        </motion.div>
      </motion.button>

      <motion.button
        onClick={() => handleNavigate(nextItem.id, 1)}
        className="fixed right-2 lg:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-0.5 group transition-all duration-300 hidden md:flex"
      >
        <span className="text-[9px] font-black text-union-primary/20 group-hover:text-union-accent tracking-[3px] uppercase transition-colors whitespace-nowrap">
           {contentData.news.nextLabel}
        </span>
        <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-union-primary/30 group-hover:text-union-accent transition-colors">
          <ChevronRight size={48} strokeWidth={1} />
        </motion.div>
      </motion.button>

      <div className="max-w-4xl mx-auto px-6 relative">
        <motion.button
          onClick={() => {
            navigate("/");
            setTimeout(() => {
              document.getElementById("news")?.scrollIntoView({ behavior: "smooth" });
            }, 150);
          }}
          className="mb-12 flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-union-primary text-white shadow-xl hover:bg-union-accent transition-all font-bold text-sm"
        >
          <ArrowLeft size={18} />
          <span>{contentData.news.backButton}</span>
        </motion.button>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.article
             key={id}
             custom={direction}
             variants={slideVariantsSimple}
             initial="enter"
             animate="center"
             exit="exit"
             transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.4 } }}
             className="w-full"
          >
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-union-accent">
                   <Calendar size={14} />
                   <span>{item.date}</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-union-primary leading-[1.1] tracking-tighter">
                  {item.title}
                </h1>
              </div>

              {/* Реальне зображення новини */}
              <div className="aspect-video rounded-[2.5rem] bg-union-primary/5 overflow-hidden border border-union-primary/10 relative group">
                {!imgError && item.image ? (
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    onError={() => setImgError(true)}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-union-primary/20 gap-4">
                    <ImageOff size={48} strokeWidth={1} />
                    <span className="text-sm italic">Зображення недоступне</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>

              <div className="prose prose-xl dark:prose-invert max-w-none text-muted-foreground leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:text-union-primary first-letter:mr-3 first-letter:float-left">
                {item.fullContent || item.content}
              </div>

              {item.points && (
                <div className="p-8 rounded-[2rem] bg-union-primary/5 border border-union-primary/10 space-y-6">
                   <h3 className="text-xl font-bold text-union-primary">{contentData.news.keyPoints}</h3>
                   <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {item.points.map((point: string) => (
                       <li key={point} className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-white/5 shadow-sm border border-black/5">
                          <div className="w-2 h-2 rounded-full bg-union-accent shrink-0" />
                          <span className="text-sm font-semibold">{point}</span>
                       </li>
                     ))}
                   </ul>
                </div>
              )}

              {/* Нижня панель: тільки кнопка "Поділитись" */}
              <div className="pt-12 border-t border-union-primary/5 flex items-center justify-between text-muted-foreground">
                 <div className="flex items-center gap-6">
                    <button 
                      onClick={handleShare}
                      className="flex items-center gap-2 hover:text-union-accent transition-colors group relative"
                    >
                      {copied ? (
                        <>
                          <Check size={18} className="text-green-500" />
                          <span className="text-xs font-bold uppercase tracking-widest text-green-500">
                            {contentData.news.copied}
                          </span>
                        </>
                      ) : (
                        <>
                          <Share2 size={18} />
                          <span className="text-xs font-bold uppercase tracking-widest">{contentData.news.share}</span>
                        </>
                      )}
                    </button>
                 </div>
                 <div className="text-[10px] font-black uppercase tracking-[3px] opacity-30">
                    {contentData.news.copyright}
                 </div>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      {/* Mobile bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/80 dark:bg-union-dark/90 backdrop-blur-xl border-t border-union-accent/20 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => handleNavigate(prevItem.id, -1)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-union-primary/5 text-union-primary font-bold text-xs"
        >
          <ChevronLeft size={16} />
          <span className="truncate max-w-[100px]">{prevItem.title}</span>
        </button>
        <button
          onClick={() => handleNavigate(nextItem.id, 1)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-union-primary/5 text-union-primary font-bold text-xs"
        >
          <span className="truncate max-w-[100px]">{nextItem.title}</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
