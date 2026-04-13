// Data model interfaces for content JSON files

export interface HeroData {
  title: string;
  subtitle: string;
  primaryButton: string;
  secondaryButton: string;
  badge: string;
  imageAlt: string;
  imageOverlayTitle: string;
  imageOverlaySubtitle: string;
  scrollHint: string;
}

export interface AboutData {
  title: string;
  description: string;
  stats: { label: string; value: string }[];
}

export interface BenefitItem {
  title: string;
  description: string;
  icon: string;
}

export interface BenefitsData {
  title: string;
  subtitle: string;
  items: BenefitItem[];
}

export interface JoinStep {
  number: string;
  title: string;
  description: string;
  button?: string;
  downloadUrl?: string;
  icon: string;
}

export interface JoinData {
  badge: string;
  title: string;
  subtitle: string;
  steps: JoinStep[];
  cta: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  quote: string;
  bio: string;
  image: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
}

export interface TeamData {
  title: string;
  subtitle: string;
  badge: string;
  viewProfile: string;
  notFound: string;
  backButton: string;
  backHome: string;
  prevLabel: string;
  nextLabel: string;
  verifiedBadge: string;
  contactTitle: string;
  members: TeamMember[];
}

export interface NewsItem {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  fullContent?: string;
  points?: string[];
}

export interface NewsData {
  title: string;
  subtitle: string;
  badge: string;
  readMore: string;
  keyPoints: string;
  share: string;
  save: string;
  notFound: string;
  backButton: string;
  backHome: string;
  prevLabel: string;
  nextLabel: string;
  copyright: string;
  items: NewsItem[];
}

export interface RecommendationDoc {
  name: string;
  url: string;
}

export interface RecommendationItem {
  id: string;
  title: string;
  description: string;
  lastUpdated: string;
  docs: RecommendationDoc[];
}

export interface RecommendationsData {
  title: string;
  subtitle: string;
  badge: string;
  navLabel: string;
  statusLabel: string;
  verifiedLabel: string;
  formatLabel: string;
  backButton: string;
  breadcrumb: string;
  notFound: string;
  notFoundDescription: string;
  sectionTitle: string;
  sectionDescription1: string;
  sectionDescription2: string;
  docsTitle: string;
  items: RecommendationItem[];
  detailedButton: string;
  downloadLabel: string;
}

export interface LawTimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface LawData {
  title: string;
  subtitle: string;
  timeline: LawTimelineItem[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqData {
  badge: string;
  title: string;
  subtitle: string;
  items: FaqItem[];
  contactPrompt: string;
  contactLink: string;
  contactSuffix: string;
}

export interface DockData {
  items: Record<string, string>;
}

export interface NavItem {
  name: string;
  href: string;
}

export interface HeaderData {
  brand: {
    name: string;
    subtitle: string;
    logoAlt: string;
  };
  navItems: NavItem[];
  ctaButton: NavItem;
}

export interface FooterSocial {
  name: string;
  url: string;
  icon: string;
}

export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterData {
  title: string;
  subtitle: string;
  sections: {
    navigation: string;
    contacts: string;
    address: string;
    hotline: string;
  };
  badge: {
    title: string;
    description: string;
  };
  bottomNote: string;
  policyLink: string;
  termsLink: string;
  contacts: {
    phone: string;
    email: string;
    address: string;
  };
  socials: FooterSocial[];
  links: FooterLink[];
  copyright: string;
}

export interface ContentData {
  header: HeaderData;
  footer: FooterData;
  join: JoinData;
  team: TeamData;
  faq: FaqData;
  dock: DockData;
  hero: HeroData;
  about: AboutData;
  benefits: BenefitsData;
  recommendations: RecommendationsData;
  news: NewsData;
  law: LawData;
}

export interface DockItem {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}
