import { useEffect, useState } from "react";
import unionLogo from "../../assets/union-logo.png";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants, MotionProps } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useLenis } from "lenis/react";
import { BorderBeam } from "../lightswind/border-beam";

import contentData from "../../data";

const navItems = contentData.header.navItems;

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
          initial={{ y: -100, top: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0, transition: { duration: 0.4 } }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4"
        >
          <div
            className="border border-union-accent/30 backdrop-blur-2xl
            w-full xl:max-w-6xl rounded-full bg-white/60 dark:bg-union-dark/80
            flex items-center justify-between px-8 py-4
            transition-all duration-300 shadow-2xl ring-1 ring-black/5 dark:ring-white/5"
          >
            <BorderBeam />

            {/* Logo / Brand */}
            <a
              onClick={() => handleScrollTo("#hero")}
              className="cursor-pointer flex items-center gap-2"
            >
              <img src={unionLogo} alt="Логотип Профспілки" className="h-10 w-auto object-contain" />
              <span className="font-bold text-lg text-union-primary hidden sm:block">
                {contentData.hero.title}
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex flex-1 justify-center">
              <ul className="flex space-x-6">
                {navItems.map((item) => (
                  <motion.li
                    key={item.name}
                    className="relative group text-sm font-medium text-muted-foreground 
                    dark:text-white/70 transition-colors"
                  >
                    <a
                      onClick={() => handleScrollTo(item.href)}
                      className="cursor-pointer hover:text-union-accent transition-colors font-semibold tracking-wide"
                    >
                      {item.name}
                    </a>
                    <motion.span
                      className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-union-accent rounded-full"
                      initial={{ width: 0, x: "-50%" }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Theme Toggle Button */}
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full text-sm font-semibold
              hover:bg-pink-400 dark:hover:bg-pink-800 transition-colors
               hidden md:block"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.div
                    key="moon"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={20} className="text-gray-800 dark:text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={20} className="text-gray-800 dark:text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Button - Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-gray-800 dark:text-white"
            >
              <Menu size={24} />
            </button>
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
                className="fixed inset-0 z-40 bg-background md:hidden flex flex-col items-center justify-center backdrop-blur-3xl"
              >
                {/* Close Button inside the sidebar */}
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-8 right-8 text-gray-800 dark:text-white"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <X size={32} />
                </motion.button>

                <motion.ul
                  {...({
                    variants: listVariants,
                  } as MotionProps)}
                  className="flex flex-col items-center justify-center h-full space-y-8"
                >
                  {navItems.map((item) => (
                    <motion.li
                      key={item.name}
                      {...({ variants: itemVariants } as MotionProps)}
                    >
                      <a
                        onClick={() => handleScrollTo(item.href)}
                        className="text-4xl font-bold text-foreground cursor-pointer hover:text-union-accent transition-colors"
                      >
                        {item.name}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
