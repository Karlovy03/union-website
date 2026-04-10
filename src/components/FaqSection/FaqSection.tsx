import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, MessageCircleQuestion } from "lucide-react";
import { useLenis } from 'lenis/react';
import contentData from "../../data";

export const FaqSection = () => {
    const { faq } = contentData;
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const lenis = useLenis();

    const toggleFaq = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    // Force Lenis to recalculate height multiple times during animation
    useEffect(() => {
        if (lenis && activeIndex !== null) {
            const interval = setInterval(() => lenis.resize(), 80);
            const timeout = setTimeout(() => {
                clearInterval(interval);
                lenis.resize();
            }, 600); // Covers animation duration (400ms) + buffer
            
            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
            };
        }
    }, [activeIndex, lenis]);

    return (
        <section id="faq" className="max-w-7xl mx-auto px-6 py-16 relative">
             {/* Background decoration */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-union-secondary/5 rounded-full blur-3xl -z-10 animate-pulse"></div>

            <div className="text-center mb-20 space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-union-secondary/10 text-union-primary text-xs font-bold uppercase tracking-widest"
                >
                    <HelpCircle size={14} />
                    {faq.badge}
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold text-union-primary">
                    {faq.title}
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    {faq.subtitle}
                </p>
            </div>

            <div className="relative space-y-4">
                {faq.items.map((item, idx) => {
                    const isOpen = activeIndex === idx;
                    return (
                        <div
                            key={idx}
                            className={`relative rounded-2xl border transition-all duration-500 ${
                                isOpen 
                                ? "border-union-accent/50 bg-union-light/50 dark:bg-white/5 shadow-2xl" 
                                : "border-union-accent/10 bg-white/40 dark:bg-white/[0.02] hover:bg-white/60 dark:hover:bg-white/[0.04]"
                            }`}
                        >
                            <button
                                onClick={() => toggleFaq(idx)}
                                className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
                            >
                                <div className="flex items-center gap-4">
                                    <MessageCircleQuestion className={`h-6 w-6 transition-colors duration-300 ${
                                        isOpen ? "text-union-accent" : "text-union-primary/40 group-hover:text-union-primary"
                                    }`} />
                                    <span className={`text-lg font-bold transition-colors duration-300 ${
                                        isOpen ? "text-union-primary" : "text-union-primary/80"
                                    }`}>
                                        {item.question}
                                    </span>
                                </div>
                                <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                                    isOpen ? "bg-union-accent border-union-accent text-white" : "border-union-accent/20 text-union-primary/40"
                                }`}>
                                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ 
                                            height: { duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] },
                                            opacity: { duration: 0.3 }
                                        }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 md:px-8 pb-8 pt-0 border-t border-union-accent/5 mt-2">
                                            <p className="text-muted-foreground leading-relaxed text-base italic pt-6">
                                                {item.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>

            <div className="text-center pt-8">
                <p className="text-sm font-medium text-muted-foreground">
                    {faq.contactPrompt} <a href="#footer" className="text-union-accent hover:underline font-bold">{faq.contactLink}</a> {faq.contactSuffix}
                </p>
            </div>
        </section>
    );
};
