import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  FileDown, 
  ShieldCheck, 
  Clock, 
  ChevronRight, 
  Award, 
  Files, 
  ShieldAlert,
  Download,
  ExternalLink,
  BookOpen,
  ChevronLeft
} from "lucide-react";
import contentData from "../../data";
import { useState } from "react";
import { slideVariants } from "../shared/slideVariants";

const iconMap = {
  "membership": Award,
  "samples": Files,
  "rights": Award,
  "defense": ShieldAlert,
};

export const RecommendationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [direction, setDirection] = useState(0);

  const items = contentData.recommendations.items;
  const currentIndex = items.findIndex((i) => i.id === id);
  const item = items[currentIndex];

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="space-y-6 max-w-md">
          <div className="w-20 h-20 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert size={40} />
          </div>
          <h1 className="text-3xl font-bold text-union-primary">{contentData.recommendations.notFound}</h1>
          <p className="text-muted-foreground">{contentData.recommendations.notFoundDescription}</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-union-primary text-white rounded-full font-bold hover:bg-union-accent transition-colors">
            <ArrowLeft size={18} />
            {contentData.recommendations.backButton}
          </Link>
        </div>
      </div>
    );
  }

  const prevItem = items[(currentIndex - 1 + items.length) % items.length];
  const nextItem = items[(currentIndex + 1) % items.length];
  const IconComp = iconMap[item.id as keyof typeof iconMap] || BookOpen;

  const handleNavigate = (newId: string, newDirection: number) => {
    setDirection(newDirection);
    navigate(`/recommendations/${newId}`);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pt-32 pb-24">
      {/* Side Navigation Custom Arrows (Minimalist Style) */}
      <motion.button
        onClick={() => handleNavigate(prevItem.id, -1)}
        className="fixed left-2 lg:left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-0.5 group transition-all duration-300 pointer-events-auto hidden md:flex"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        aria-label="Попередня категорія"
      >
        <span className="text-[9px] font-black text-union-primary/20 group-hover:text-union-accent tracking-[3px] uppercase transition-colors whitespace-nowrap">
           {contentData.recommendations.navLabel}
        </span>
        <motion.div
          animate={{ x: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-union-primary/30 group-hover:text-union-accent transition-colors"
        >
          <ChevronLeft size={48} strokeWidth={1} />
        </motion.div>
      </motion.button>

      <motion.button
        onClick={() => handleNavigate(nextItem.id, 1)}
        className="fixed right-2 lg:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-0.5 group transition-all duration-300 pointer-events-auto hidden md:flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        aria-label="Наступна категорія"
      >
        <span className="text-[9px] font-black text-union-primary/20 group-hover:text-union-accent tracking-[3px] uppercase transition-colors whitespace-nowrap">
           {contentData.recommendations.navLabel}
        </span>
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-union-primary/30 group-hover:text-union-accent transition-colors"
        >
          <ChevronRight size={48} strokeWidth={1} />
        </motion.div>
      </motion.button>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-union-accent/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-union-primary/5 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative">
        {/* Navigation Breadcrumb / Back Button */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 flex items-center gap-6"
        >
          <button
            onClick={() => {
              navigate("/");
              setTimeout(() => {
                document.getElementById("recommendations")?.scrollIntoView({ behavior: "smooth" });
              }, 150);
            }}
            className="flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-union-primary text-white shadow-xl shadow-union-primary/20 hover:bg-union-accent hover:-translate-x-1 transition-all group font-bold text-sm"
          >
            <ArrowLeft size={18} className="transition-transform" />
            <span>{contentData.recommendations.backButton}</span>
          </button>
          
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-union-primary/40">
             <span>{contentData.recommendations.breadcrumb}</span>
             <ChevronRight size={14} />
             <span className="text-union-accent truncate max-w-[200px]">{item.title}</span>
          </div>
        </motion.div>

        {/* Main Content with Animated Exit/Enter */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
             key={id}
             custom={direction}
             variants={slideVariants}
             initial="enter"
             animate="center"
             exit="exit"
             transition={{
               x: { type: "spring", stiffness: 300, damping: 30 },
               opacity: { duration: 0.4 }
             }}
             className="w-full"
          >
            {/* Hero Section of the Detail Page */}
            <div className="flex flex-col md:flex-row gap-12 mb-20 items-center md:items-start text-center md:text-left">
              <div className="w-48 h-48 sm:w-64 sm:h-64 shrink-0">
                <div className="relative group w-full h-full">
                  <div className="absolute inset-0 bg-union-primary/20 rounded-[3rem] blur-3xl group-hover:bg-union-accent/20 transition-all duration-700"></div>
                  <div className="relative w-full h-full rounded-[3rem] bg-gradient-to-br from-union-primary to-union-secondary p-1 shadow-2xl overflow-hidden border border-white/20">
                    <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
                    <div className="h-full w-full rounded-[2.8rem] bg-gradient-to-br from-union-primary to-union-secondary flex items-center justify-center text-white">
                      <IconComp size={100} className="drop-shadow-2xl animate-float" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-union-accent/10 text-union-accent text-[10px] font-bold uppercase tracking-widest">
                  <ShieldCheck size={14} />
                  {contentData.recommendations.statusLabel}
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-union-primary leading-[1.1] tracking-tighter">
                  {item.title}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed font-medium italic">
                  — {item.description}
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-4 opacity-60">
                   <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide">
                     <Clock size={14} /> Оновлено: {item.lastUpdated}
                   </div>
                   <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide">
                     <Files size={14} /> {item.docs?.length || 0} Додатків
                   </div>
                </div>
              </div>
            </div>

            {/* Detailed Body Section */}
            <div className="space-y-16">
              <section className="space-y-8">
                <div className="inline-flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-union-primary text-white flex items-center justify-center shadow-lg shadow-union-primary/20">
                     <BookOpen size={24} />
                  </div>
                  <h2 className="text-3xl font-black text-union-primary tracking-tight">{contentData.recommendations.sectionTitle}</h2>
                </div>
                
                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                  <p>{contentData.recommendations.sectionDescription1}</p>
                  <p>{contentData.recommendations.sectionDescription2}</p>
                </div>
              </section>

              {/* Documents Grid */}
              <section className="space-y-8 pb-12">
                <div className="inline-flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-union-accent text-white flex items-center justify-center shadow-lg shadow-union-accent/20">
                     <Download size={24} />
                  </div>
                  <h2 className="text-3xl font-black text-union-primary tracking-tight">{contentData.recommendations.docsTitle}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {item.docs && item.docs.map((doc) => (
                    <motion.a
                      key={doc.url}
                      href={`/union-website/${doc.url}`}
                      download
                      whileHover={{ y: -5, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="group flex flex-col p-6 rounded-[2rem] bg-white dark:bg-white/5 border border-union-accent/10 hover:border-union-accent hover:bg-gradient-to-br hover:from-white hover:to-union-accent/5 dark:hover:from-white/5 dark:hover:to-union-accent/10 transition-all duration-500 shadow-sm hover:shadow-2xl"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-union-primary/5 text-union-primary flex items-center justify-center group-hover:bg-union-primary group-hover:text-white transition-all duration-500">
                          <FileDown size={28} />
                        </div>
                        <div className="w-10 h-10 rounded-full border border-union-accent/20 flex items-center justify-center text-union-accent group-hover:bg-union-accent group-hover:text-white transition-all">
                          <ExternalLink size={16} />
                        </div>
                      </div>
                      <h3 className="text-lg font-black text-union-primary mb-2 transition-colors">
                        {doc.name}
                      </h3>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">{contentData.recommendations.formatLabel}</span>
                        <div className="h-1 w-1 rounded-full bg-union-accent/30"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-union-accent">{contentData.recommendations.verifiedLabel}</span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
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
