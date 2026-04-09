import { useEffect, useState } from "react";
import unionLogo from "../../assets/union-logo.png";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants, MotionProps } from "framer-motion";
import { Menu, X, Sun, Moon, ArrowRight } from "lucide-react";
import { useLenis } from "lenis/react";
import { BorderBeam } from "../lightswind/border-beam";

import contentData from "../../data";

interface NavItem {
  name: string;
  href: string;
}

interface CTAButton {
  name: string;
  href: string;
}

interface BrandData {
  name: string;
  subtitle: string;
  logoAlt: string;
}

interface HeaderData {
  brand: BrandData;
  navItems: NavItem[];
  ctaButton: CTAButton;
}

const headerData = contentData.header as unknown as HeaderData;
const navItems = headerData.navItems;
const ctaButton = headerData.ctaButton;
const brand = headerData.brand;

export default function Header() {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem("theme") || "light";
  });
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lenis = useLenis();

  // Theme toggle
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Scroll listener for hide/show header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false); // Scrolling down
      } else {
        setShowHeader(true); // Scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleScrollTo = (id: string) => {
    if (lenis) {
      lenis.scrollTo(id);
    }
    setIsMobileMenuOpen(false); // Close mobile menu on click
  };

  // ✅ Typed variants
  const menuVariants: Variants = {
    open: {
      clipPath: "circle(1200px at 90% 5%)",
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    },
    closed: {
      clipPath: "circle(20px at 90% 5%)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const listVariants: Variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const itemVariants: Variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  return (
    <AnimatePresence>
      {showHeader && (
        <motion.header
          initial={{ y: -100, top: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0, transition: { duration: 0.4 } }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6"
        >
          <div
            className="border border-white/20 dark:border-white/5 backdrop-blur-2xl
            w-full xl:max-w-7xl rounded-3xl bg-white/70 dark:bg-union-dark/90
            flex items-center justify-between px-6 py-2.5
            transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5 dark:ring-white/5"
          >
            <BorderBeam size={150} duration={10} colorFrom="#223148" colorTo="#d2c7b8" />

            {/* Logo / Brand */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo("#hero");
              }}
              className="cursor-pointer flex items-center gap-3 group shrink-0"
            >
              <div className="relative">
                 <img src={unionLogo} alt={brand.logoAlt} className="h-10 w-auto object-contain transition-transform group-hover:rotate-12 duration-500" />
                 <div className="absolute inset-0 bg-union-accent/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="flex flex-col -space-y-1">
                 <span className="font-black text-sm uppercase tracking-tight text-union-primary font-display">{brand.name}</span>
                 <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest hidden lg:block overflow-hidden whitespace-nowrap font-display">{brand.subtitle}</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex flex-1 justify-center mx-4">
              <ul className="flex items-center space-x-2">
                {navItems.map((item) => (
                  <motion.li
                    key={item.name}
                    className="relative"
                  >
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleScrollTo(item.href);
                      }}
                      className="cursor-pointer px-4 py-2 text-[13px] font-bold text-union-primary/80 hover:text-union-primary dark:text-white/60 dark:hover:text-white transition-all rounded-xl hover:bg-union-primary/5 dark:hover:bg-white/5 block font-display"
                    >
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
               {/* Theme Toggle */}
                <motion.button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2.5 rounded-2xl bg-union-primary/5 dark:bg-white/5 text-union-primary dark:text-white hover:bg-union-primary/10 transition-colors hidden sm:flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={theme === "dark" ? "Увімкнути світлу тему" : "Увімкнути темну тему"}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {theme === "dark" ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
                  </AnimatePresence>
                </motion.button>

                {/* Primary CTA Button */}
                {ctaButton && (
                  <motion.button
                    onClick={() => handleScrollTo(ctaButton.href)}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-union-primary to-union-secondary text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-union-primary/20 border border-white/10 group overflow-hidden relative"
                  >
                     <div className="absolute inset-0 bg-gradient-to-r from-union-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <span className="relative z-10">{ctaButton.name}</span>
                     <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                )}

                {/* Mobile Menu Button - Hamburger */}
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="md:hidden w-10 h-10 rounded-2xl bg-union-primary text-white flex items-center justify-center shadow-lg"
                  aria-label="Відкрити меню"
                >
                  <Menu size={20} aria-hidden="true" />
                </button>
            </div>
          </div>

          {/* Mobile Sidebar */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                {...({
                  initial: "closed",
                  animate: "open",
                  exit: "closed",
                  variants: menuVariants,
                } as MotionProps)}
                className="fixed inset-0 z-40 bg-white/95 dark:bg-union-dark/98 md:hidden flex flex-col items-center justify-center backdrop-blur-md"
              >
                {/* Close Button inside the sidebar */}
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-union-primary/5 flex items-center justify-center text-union-primary"
                  whileHover={{ rotate: 90 }}
                  aria-label="Закрити меню"
                >
                  <X size={28} aria-hidden="true" />
                </motion.button>

                <motion.ul
                  {...({
                    variants: listVariants,
                  } as MotionProps)}
                  className="flex flex-col items-center justify-center h-full space-y-6"
                >
                  {[...navItems, ctaButton].map((item: NavItem | CTAButton) => (
                    <motion.li
                      key={item.name}
                      {...({ variants: itemVariants } as MotionProps)}
                    >
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleScrollTo(item.href);
                        }}
                        className={`text-3xl font-black uppercase tracking-tighter cursor-pointer transition-colors ${
                          item.name === ctaButton.name ? "text-union-accent" : "text-union-primary dark:text-white"
                        }`}
                      >
                        {item.name}
                      </a>
                    </motion.li>
                  ))}
                  
                  {/* Theme toggle mobile */}
                  <motion.li {...({ variants: itemVariants } as MotionProps)} className="pt-8">
                     <button 
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-union-primary/5 text-union-primary font-bold"
                     >
                        {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
                        {theme === "dark" ? "Темна тема" : "Світла тема"}
                     </button>
                  </motion.li>
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
