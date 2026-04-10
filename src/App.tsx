import { useState, useEffect, useRef, lazy, Suspense } from "react";
import type { DockItem } from "./types";
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

import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";

const RecommendationDetail = lazy(() => import("./components/RecommendationsSection/RecommendationDetail").then(m => ({ default: m.RecommendationDetail })));
const NewsDetail = lazy(() => import("./components/NewsSection/NewsDetail").then(m => ({ default: m.NewsDetail })));
const MemberDetail = lazy(() => import("./components/TeamSection/MemberDetail").then(m => ({ default: m.MemberDetail })));

// Scroll to top only when navigating TO a detail page (not when returning to landing)
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const isDetailPage =
      pathname.startsWith("/recommendations/") ||
      pathname.startsWith("/news/") ||
      pathname.startsWith("/team/");
    if (isDetailPage) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
};

const LandingPage = ({ dockItems, showDock }: { dockItems: DockItem[]; showDock: boolean }) => {
  return (
    <>
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
    </>
  );
};

const AppContent = ({ dockItems, showDock }: { dockItems: DockItem[]; showDock: boolean }) => {
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith("/recommendations/") || 
                     location.pathname.startsWith("/news/") || 
                     location.pathname.startsWith("/team/");

  return (
    <div className="bg-background min-h-screen flex flex-col w-full">
      <StripedBackground className={"fixed z-0"} />
      <ScrollProgress />

      <ReactLenis root>
        {!isDetailPage && <Header />}

        <div className="relative z-10 w-full">
          {/* Aurora Blobs Background */}
          <div className="aurora-container">
            <div className="aurora-blob aurora-blob-1"></div>
            <div className="aurora-blob aurora-blob-2"></div>
            <div className="aurora-blob aurora-blob-3"></div>
          </div>

          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-union-accent border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <Routes>
              <Route path="/" element={<LandingPage dockItems={dockItems} showDock={showDock} />} />
              <Route path="/recommendations/:id" element={<RecommendationDetail />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/team/:id" element={<MemberDetail />} />
            </Routes>
          </Suspense>
          
          {!isDetailPage && <Footer />}
        </div>
      </ReactLenis>
    </div>
  );
};

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
    <ErrorBoundary>
      <HashRouter>
        <ScrollToTop />
        <AppContent dockItems={dockItems} showDock={showDock} />
      </HashRouter>
    </ErrorBoundary>
  );
}

export default App;
