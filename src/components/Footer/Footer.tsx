import { Mail, MapPin } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const Footer = () => {
  const { content } = useLanguage();
  const { footer } = content;

  const handleScrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative w-full border-t border-union-accent/20 bg-union-light/30 dark:bg-union-dark/60 backdrop-blur-3xl pt-32 pb-12 overflow-hidden mt-40">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-union-primary/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-union-accent/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 border-b border-union-accent/10 pb-20">
          
          {/* Logo & Info */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-union-primary to-union-secondary flex items-center justify-center shadow-2xl relative group/logo overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/logo:translate-y-0 transition-transform duration-500"></div>
                <span className="text-white font-bold text-2xl relative z-10">{content.ui.brandChar}</span>
              </div>
              <h3 className="text-2xl font-black text-union-primary tracking-tight font-display">
                {footer.title}
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {footer.subtitle}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-union-primary/40 font-display">
              {footer.sections.navigation}
            </h4>
            <ul className="space-y-4">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleScrollTo(link.href)}
                    className="text-muted-foreground hover:text-union-primary transition-all text-sm font-semibold flex items-center gap-2 group/btn py-1"
                  >
                    <span className="w-1 h-1 rounded-full bg-union-accent opacity-0 group-hover/btn:opacity-100 group-hover/btn:scale-150 transition-all duration-300"></span>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-union-primary/40 font-display">
              {footer.sections.contacts}
            </h4>
            <div className="space-y-5">
              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-union-primary/5 flex items-center justify-center text-union-primary shrink-0 group-hover:bg-union-primary group-hover:text-white transition-colors">
                  <Mail size={14} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <a href={`mailto:${footer.contacts.email}`} className="text-base font-bold text-union-primary hover:text-union-accent transition-colors">
                    {footer.contacts.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-union-primary/40 font-display">
              {footer.sections.address}
            </h4>
            <div className="flex items-start gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-union-primary/5 flex items-center justify-center text-union-primary shrink-0 group-hover:bg-union-primary group-hover:text-white transition-colors">
                <MapPin size={14} />
              </div>
              <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                {footer.contacts.address}
              </p>
            </div>
            
            {/* Official Badge area */}
            <div className="pt-6">
               <div className="rounded-2xl p-6 bg-gradient-to-br from-union-primary/5 via-union-secondary/5 to-union-accent/5 border border-union-accent/10 relative overflow-hidden group/badge">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-union-accent/10 rounded-full blur-2xl group-hover/badge:scale-150 transition-transform duration-700"></div>
                  <p className="text-sm font-black text-union-primary mb-2 font-display uppercase tracking-wider">{footer.badge.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {footer.badge.description}
                  </p>
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-center items-center py-10 gap-6 text-[10px] font-black text-muted-foreground/40 tracking-[0.2em] uppercase font-display border-t border-union-accent/5 mt-12">
          <p>{footer.copyright} • {footer.bottomNote}</p>
        </div>
      </div>
    </footer>
  );
};
