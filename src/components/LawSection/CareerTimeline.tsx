import { ScrollTimeline } from "../lightswind/scroll-timeline";
import { Layers, FileText, Scale, ShieldCheck } from "lucide-react";
import contentData from "../../data";

export const CareerTimeline = () => {
  const iconFallback = [
    <FileText className="h-4 w-4 mr-2 text-primary" key="1" />,
    <Scale className="h-4 w-4 mr-2 text-primary" key="2" />,
    <ShieldCheck className="h-4 w-4 mr-2 text-primary" key="3" />,
    <Layers className="h-4 w-4 mr-2 text-primary" key="4" />
  ];

  const careerEvents = contentData.law.timeline.map((item, index) => ({
    year: item.year,
    title: item.title,
    subtitle: item.subtitle,
    description: item.description,
    icon: iconFallback[index % iconFallback.length]
  }));

  return (
    <div id="law">
      <ScrollTimeline
        events={careerEvents}
        title={contentData.law.title}
        subtitle={contentData.law.subtitle}
        animationOrder="staggered"
        cardAlignment="alternating"
        cardVariant="elevated"
        parallaxIntensity={0.15}
        revealAnimation="fade"
        progressIndicator={true}
        lineColor="bg-primary/20"
        activeColor="bg-primary"
        progressLineWidth={3}
        progressLineCap="round"
      />
    </div>
  );
};
