// App.jsx
import { useState, useEffect, useRef } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { HeroSection } from "./components/HeroSection/HeroSection";
import StripedBackground from "./components/lightswind/StripedBackground";
import { AboutSection } from "./components/AboutSection/AboutSection";
import { RecommendationsSection } from "./components/RecommendationsSection/RecommendationsSection";
import { NewsSection } from "./components/NewsSection/NewsSection";
import { LawSection } from "./components/LawSection/LawSection";
import ReactLenis from "lenis/react";
import contentData from "./data";
import Dock from "./components/lightswind/dock";
import { Footer } from "./components/Footer/Footer";
import { ScrollProgress } from "./components/ScrollProgress";
import { JoinSection } from "./components/JoinSection/JoinSection";
import { TeamSection } from "./components/TeamSection/TeamSection";
import { FaqSection } from "./components/FaqSection/FaqSection";
import {
  Home,
  User,
  UserPlus,
  Users,
  HelpCircle,
  GraduationCap,
  Briefcase,
  BookCheckIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [showDock, setShowDock] = useState(false);
  const lastScrollY = useRef(0);

  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // scrolling down -> show Dock
        setShowDock(true);
      } else if (currentScrollY < lastScrollY.current) {
        // scrolling up -> hide Dock
        setShowDock(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper for smooth scroll
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Dock items
  const dockItems = [
    {
      icon: <Home size={24} />,
      label: contentData.dock.items.home,
      onClick: () => scrollToSection("hero"),
    },
    {
      icon: <User size={24} />,
      label: contentData.dock.items.about,
      onClick: () => scrollToSection("about"),
    },
    {
      icon: <UserPlus size={24} />,
      label: contentData.dock.items.join,
      onClick: () => scrollToSection("join"),
    },
    {
      icon: <Users size={24} />,
      label: contentData.dock.items.team,
      onClick: () => scrollToSection("team"),
    },
    {
      icon: <GraduationCap size={24} />,
      label: contentData.dock.items.news,
      onClick: () => scrollToSection("news"),
    },
    {
      icon: <BookCheckIcon size={24} />,
      label: contentData.dock.items.recommendations,
      onClick: () => scrollToSection("recommendations"),
    },
    {
      icon: <Briefcase size={24} />,
      label: contentData.dock.items.law,
      onClick: () => scrollToSection("law"),
    },
    {
      icon: <HelpCircle size={24} />,
      label: contentData.dock.items.faq,
      onClick: () => scrollToSection("faq"),
    },
  ];

  return (
    <div className="bg-background min-h-screen flex flex-col w-full">
      <StripedBackground className={"fixed z-0"} />
      <ScrollProgress />

      <ReactLenis root>
        <Header />

        <div className="relative z-10 w-full">
          {/* Aurora Blobs Background */}
          <div className="aurora-container">
            <div className="aurora-blob aurora-blob-1"></div>
            <div className="aurora-blob aurora-blob-2"></div>
            <div className="aurora-blob aurora-blob-3"></div>
          </div>

          <div id="hero" className="min-h-[80vh] flex items-center justify-center">
            <HeroSection />
          </div>
          
          <div className="">
            <div id="about">
              <AboutSection />
            </div>
            
            <div id="join">
              <JoinSection />
            </div>

            <div id="team">
              <TeamSection />
            </div>

            <div id="news">
              <NewsSection />
            </div>
            
            <div id="recommendations">
              <RecommendationsSection />
            </div>
            
            <div id="law">
              <LawSection />
            </div>

            <div id="faq">
              <FaqSection />
            </div>
          </div>
          
          <Footer />
        </div>

        {/* Dock with smooth show/hide animation */}
        <AnimatePresence>
          {showDock && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[999]"
            >
              <Dock
                items={dockItems}
                position="bottom"
                magnification={70}
                baseItemSize={50}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </ReactLenis>

    </div>
  );
}

export default App;
