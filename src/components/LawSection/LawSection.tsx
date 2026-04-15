import { ScrollTimeline } from "../lightswind/scroll-timeline";
import { Layers, FileText, Scale, ShieldCheck } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const LawSection = () => {
  const { content } = useLanguage();
    const iconFallback = [
    <FileText className="h-5 w-5 text-white" key="1" />,
    <Scale className="h-5 w-5 text-white" key="2" />,
    <ShieldCheck className="h-5 w-5 text-white" key="3" />,
    <Layers className="h-5 w-5 text-white" key="4" />
  ];

  const careerEvents = content.law.timeline.map((item, index) => ({
    year: item.year,
    title: item.title,
    subtitle: item.subtitle,
    description: item.description,
    icon: iconFallback[index % iconFallback.length]
  }));

  return (
    <section id="law" className="max-w-7xl mx-auto px-6 py-16 relative overflow-hidden">
       {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-union-accent/5 rounded-full blur-3xl -z-10 animate-pulse"></div>

      <ScrollTimeline
        events={careerEvents}
        title={content.law.title}
        subtitle={content.law.subtitle}
        animationOrder="staggered"
        cardAlignment="alternating"
        cardVariant="elevated"
        parallaxIntensity={0.15}
        revealAnimation="fade"
        progressIndicator={true}
        lineColor="bg-union-primary/20 dark:bg-white/10"
        activeColor="bg-union-accent shadow-[0_0_15px_rgba(214,158,46,0.5)]"
        progressLineWidth={4}
        progressLineCap="round"
      />
    </section>
  );
};
