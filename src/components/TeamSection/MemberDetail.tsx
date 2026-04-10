import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft,
  Quote,
  ShieldCheck,
  Mail,
  Linkedin,
  Twitter
} from "lucide-react";
import contentData from "../../data";
import { useState } from "react";

export const MemberDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [direction, setDirection] = useState(0);

  const members = contentData.team.members;
  const currentIndex = members.findIndex((m) => m.id === id);
  const member = members[currentIndex];

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="space-y-6 max-w-md">
          <h1 className="text-3xl font-bold text-union-primary">{contentData.team.notFound}</h1>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-union-primary text-white rounded-full font-bold">
            <ArrowLeft size={18} />
            {contentData.team.backHome}
          </Link>
        </div>
      </div>
    );
  }

  const prevMember = members[(currentIndex - 1 + members.length) % members.length];
  const nextMember = members[(currentIndex + 1) % members.length];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      filter: "blur(10px)"
    }),
    center: { x: 0, opacity: 1, filter: "blur(0px)" },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      filter: "blur(10px)"
    })
  };

  const handleNavigate = (newId: string, newDirection: number) => {
    setDirection(newDirection);
    navigate(`/team/${newId}`);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pt-32 pb-24">
      {/* Side Navigation */}
      <motion.button
        onClick={() => handleNavigate(prevMember.id, -1)}
        className="fixed left-2 lg:left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-0.5 group transition-all duration-300 hidden md:flex"
      >
        <span className="text-[9px] font-black text-union-primary/20 group-hover:text-union-accent tracking-[3px] uppercase transition-colors whitespace-nowrap">
           {contentData.team.prevLabel}
        </span>
        <motion.div animate={{ x: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-union-primary/30 group-hover:text-union-accent transition-colors">
          <ChevronLeft size={48} strokeWidth={1} />
        </motion.div>
      </motion.button>

      <motion.button
        onClick={() => handleNavigate(nextMember.id, 1)}
        className="fixed right-2 lg:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-0.5 group transition-all duration-300 hidden md:flex"
      >
        <span className="text-[9px] font-black text-union-primary/20 group-hover:text-union-accent tracking-[3px] uppercase transition-colors whitespace-nowrap">
           {contentData.team.nextLabel}
        </span>
        <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-union-primary/30 group-hover:text-union-accent transition-colors">
          <ChevronRight size={48} strokeWidth={1} />
        </motion.div>
      </motion.button>

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.button
          onClick={() => {
            navigate("/");
            setTimeout(() => {
              document.getElementById("team")?.scrollIntoView({ behavior: "smooth" });
            }, 150);
          }}
          className="mb-16 flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-union-primary text-white shadow-xl hover:bg-union-accent transition-all font-bold text-sm"
        >
          <ArrowLeft size={18} />
          <span>{contentData.team.backButton}</span>
        </motion.button>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
             key={id}
             custom={direction}
             variants={slideVariants}
             initial="enter"
             animate="center"
             exit="exit"
             transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.4 } }}
             className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start"
          >
            {/* Profile Image */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute inset-0 bg-union-primary/20 rounded-[3rem] blur-3xl group-hover:bg-union-accent/20 transition-all duration-700"></div>
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-union-primary/10 shadow-3xl">
                <img
                  src={member.image}
                  alt={member.name}
                  width={2574}
                  height={3218}
                  className="w-full h-full object-cover grayscale-0 brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-union-primary/60 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating Quote */}
              <div className="absolute -bottom-8 -right-8 w-64 p-6 rounded-3xl bg-white dark:bg-union-dark border border-union-accent/20 shadow-2xl backdrop-blur-3xl hidden md:block">
                 <Quote size={20} className="text-union-accent mb-3" />
                 <p className="text-xs font-bold text-union-primary leading-relaxed italic">
                    «{member.quote}»
                 </p>
              </div>
            </div>

            {/* Info Section */}
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-4">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-union-accent/10 text-union-accent text-[10px] font-bold uppercase tracking-widest border border-union-accent/20">
                    <ShieldCheck size={14} />
                    {contentData.team.verifiedBadge}
                 </div>
                 <h1 className="text-4xl md:text-6xl font-black text-union-primary leading-none tracking-tighter">
                    {member.name.split(' ').map((part, i) => (
                      <span key={i} className="block">{part}</span>
                    ))}
                 </h1>
                 <p className="text-xl font-bold text-union-accent uppercase tracking-widest pl-1">
                    {member.role}
                 </p>
              </div>

              <div className="prose prose-lg dark:prose-invert text-muted-foreground leading-relaxed">
                 <p className="font-semibold text-union-primary italic text-2xl mb-8">
                   "{member.quote}"
                 </p>
                 <div className="space-y-6 text-lg">
                    {member.bio}
                 </div>
              </div>

              <div className="pt-10 border-t border-union-primary/5 space-y-6">
                 <h3 className="text-sm font-black text-union-primary uppercase tracking-widest">{contentData.team.contactTitle}</h3>
                 <div className="flex flex-wrap gap-4">
                    <button className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-union-primary/5 text-union-primary hover:bg-union-primary hover:text-white transition-all font-bold text-sm">
                       <Mail size={18} /> <span>Пошта</span>
                    </button>
                    <button className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-union-primary/5 text-union-primary hover:bg-union-primary hover:text-white transition-all font-bold text-sm">
                       <Linkedin size={18} /> <span>LinkedIn</span>
                    </button>
                    <button className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-union-primary/5 text-union-primary hover:bg-union-primary hover:text-white transition-all font-bold text-sm">
                       <Twitter size={18} /> <span>Twitter</span>
                    </button>
                 </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/80 dark:bg-union-dark/90 backdrop-blur-xl border-t border-union-accent/20 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => handleNavigate(prevMember.id, -1)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-union-primary/5 text-union-primary font-bold text-xs"
        >
          <ChevronLeft size={16} />
          <span className="truncate max-w-[80px]">{prevMember.name.split(' ')[0]}</span>
        </button>
        <button
          onClick={() => handleNavigate(nextMember.id, 1)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-union-primary/5 text-union-primary font-bold text-xs"
        >
          <span className="truncate max-w-[80px]">{nextMember.name.split(' ')[0]}</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
