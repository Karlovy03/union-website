// Data definitions

import header from './header.json';
import footer from './footer.json';
import join from './join.json';
import team from './team.json';
import faq from './faq.json';
import dock from './dock.json';
import hero from './hero.json';
import about from './about.json';
import benefits from './benefits.json';
import recommendations from './recommendations.json';
import news from './news.json';
import law from './law.json';
import ui from './ui.json';

const contentData = {
  uk: {
    ui: ui.uk,
    header: header.uk,
    footer: footer.uk,
    join: join.uk,
    team: team.uk,
    faq: faq.uk,
    dock: dock.uk,
    hero: hero.uk,
    about: about.uk,
    benefits: benefits.uk,
    recommendations: recommendations.uk,
    news: news.uk,
    law: law.uk
  },
  en: {
    ui: ui.en,
    header: header.en,
    footer: footer.en,
    join: join.en,
    team: team.en,
    faq: faq.en,
    dock: dock.en,
    hero: hero.en,
    about: about.en,
    benefits: benefits.en,
    recommendations: recommendations.en,
    news: news.en,
    law: law.en
  }
};

export default contentData;
