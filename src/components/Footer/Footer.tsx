import { motion } from "framer-motion";
import { Facebook, Youtube, Send, Mail, Phone, MapPin } from "lucide-react";
import contentData from "../../data";

const iconMap = {
  facebook: Facebook,
  youtube: Youtube,
  send: Send,
};

export const Footer = () => {
  const { footer } = contentData;

  const handleScrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative w-full border-t border-union-accent/20 bg-union-light/30 dark:bg-union-dark/60 backdrop-blur-3xl pt-24 pb-12 overflow-hidden mt-32">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-union-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-union-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 border-b border-union-accent/10 pb-20">
          
          {/* Logo & Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-union-primary to-union-secondary flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">П</span>
              </div>
              <h3 className="text-xl font-bold text-union-primary">
                {footer.title}
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {footer.subtitle}
            </p>
            <div className="flex gap-4">
              {footer.socials.map((social, idx) => {
                const Icon = iconMap[social.icon as keyof typeof iconMap] || Send;
                return (
                  <motion.a
                    key={idx}
                    href={social.url}
                    whileHover={{ y: -4, scale: 1.1 }}
                    className="w-10 h-10 rounded-lg border border-union-accent/20 bg-white/50 dark:bg-white/5 flex items-center justify-center text-union-primary hover:bg-union-primary hover:text-white transition-all shadow-sm"
                    aria-label={social.name}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-union-primary/60">
              Навігація
            </h4>
            <ul className="space-y-4">
              {footer.links.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleScrollTo(link.href)}
                    className="text-muted-foreground hover:text-union-primary transition-colors text-sm font-medium flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-union-accent group-hover:w-4 transition-all duration-300"></span>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-union-primary/60">
              Контакти
            </h4>
            <div className="space-y-5">
              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-union-primary/5 flex items-center justify-center text-union-primary shrink-0 group-hover:bg-union-primary group-hover:text-white transition-colors">
                  <Phone size={14} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Гаряча лінія</p>
                  <a href={`tel:${footer.contacts.phone}`} className="text-sm font-bold text-union-primary hover:underline">
                    {footer.contacts.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-union-primary/5 flex items-center justify-center text-union-primary shrink-0 group-hover:bg-union-primary group-hover:text-white transition-colors">
                  <Mail size={14} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <a href={`mailto:${footer.contacts.email}`} className="text-sm font-bold text-union-primary hover:underline">
                    {footer.contacts.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-union-primary/60">
              Адреса
            </h4>
            <div className="flex items-start gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-union-primary/5 flex items-center justify-center text-union-primary shrink-0 group-hover:bg-union-primary group-hover:text-white transition-colors">
                <MapPin size={14} />
              </div>
              <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                {footer.contacts.address}
              </p>
            </div>
            
            {/* Newsletter placeholder or Badge */}
            <div className="pt-4">
               <div className="rounded-2xl p-4 bg-gradient-to-br from-union-primary/5 to-union-accent/5 border border-union-accent/10">
                  <p className="text-xs font-bold text-union-primary mb-2 italic">На варті ваших прав</p>
                  <p className="text-[10px] text-muted-foreground">Приєднуйтесь до лав профспілки та отримайте повний захист сьогодні.</p>
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center py-12 gap-6 text-xs font-medium text-muted-foreground/60 tracking-wider uppercase">
          <p>{footer.copyright}</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-union-primary transition-colors">Політика конфіденційності</a>
            <a href="#" className="hover:text-union-primary transition-colors">Юридичні умови</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
