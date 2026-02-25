import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        // Non-authenticated nav
        discoveryHub: "Discovery Hub",
        exploreCellGroups: "Explore Cell Groups",
        guidedPathways: "Guided Pathways",
        featuredStories: "Featured Stories",
        mannuhForKids: "Mannuh for Kids",
        theMannuhShop: "The Mannuh Shop",
        supportCenter: "Support Center",
        signUpLogin: "SIGN UP / LOGIN",
        
        // Authenticated nav - Primary
        home: "Home",
        cellGroups: "Cell Groups",
        featuredReels: "Featured Reels",
        storiesArticles: "Stories & Articles",
        guidedPathwaysAuth: "Guided Pathways",
        upcomingEvents: "Upcoming Events",
        churchDirectory: "Church Directory",
        
        // Authenticated nav - Secondary
        shopMerchandise: "Shop Merchandise",
        profileSettings: "Profile Settings",
        
        // Old keys for backward compatibility
        reels: "Reels",
        discover: "Discover",
        more: "More",
        search: "Search",
        notifications: "Notifications",
        signIn: "Sign In",
        signOut: "Sign Out",
        myProfile: "My Profile",
        settings: "Settings",
        language: "Language"
      },
      // More menu items
      moreMenu: {
        browseContent: "Browse Content",
        guidedPathways: "Guided Pathways",
        events: "Events",
        churchDirectory: "Church Directory",
        podcast: "Podcast",
        shop: "The Mannuh Shop",
        merchandise: "Merchandise",
        pricing: "Pricing",
        kids: "Mannuh for Kids",
        foundingMembers: "Founding Members",
        helpCenter: "Help Center"
      },
      // Footer
      footer: {
        about: "ABOUT",
        explore: "EXPLORE",
        quickLinks: "QUICK LINKS",
        companyProfile: "Company Profile",
        foundingMembers: "Founding Members",
        advertise: "Advertise With Us",
        supportCause: "Support A Cause",
        businessSolutions: "Business Solutions",
        partnerProgram: "Partner Program",
        donate: "Donate/Support",
        helpCenter: "Help Center",
        createJoinGroups: "Create/Join Cell Groups",
        featuredArticles: "Featured Articles & Stories",
        guidedPathways: "Guided Pathways & Courses",
        discoverEvents: "Discover Upcoming Events",
        wordlyPodcast: "The Wordly Podcast Series",
        churchDirectory: "Church/Ministry Directory",
        pricingPlans: "Membership Pricing Plans",
        mannuhStore: "The Official Mannuh Store",
        termsOfUse: "Terms of Use",
        privacyPolicy: "Privacy Policy",
        cookiePolicy: "Cookie Policy",
        refundPolicy: "Refund Policy",
        community: "Community",
        contactUs: "Contact Us",
        premierPlatform: "Premier Faith-Based Community Platform",
        copyright: "mannuh. A Gravitas Industries Initiative. All Rights Reserved.",
        acceptedPayment: "Accepted Payment Methods"
      },
      // Home page
      home: {
        tagline: "Premier Faith-Based Community Platform",
        heading: "A safe space",
        headingFaith: "faith",
        headingFellowship: "fellowship",
        description: "Create and discover interactive virtual cell groups, expertly curated Christian content to inspire you, special events and workshops, and connect with a growing community of believers who share your faith journey.",
        createAccount: "Create An Account",
        browse: "Browse",
        exploreGroups: "Explore Groups",
        watchReels: "Watch Reels"
      },
      // Features
      features: {
        cellGroups: "Cell Groups",
        cellGroupsDesc: "Create or join intimate virtual groups for Bible study, prayer, and fellowship with video conferencing.",
        creatorReels: "Creator Reels",
        creatorReelsDesc: "Watch and share short-form Christian video content from creators you love. Follow, like, and engage.",
        discover: "Discover",
        discoverDesc: "Explore curated Christian stories, articles, and resources aggregated from trusted sources worldwide.",
        explore: "Explore"
      }
    }
  },
  es: {
    translation: {
      nav: {
        cellGroups: "Grupos Celulares",
        reels: "Reels",
        discover: "Descubrir",
        more: "Más",
        search: "Buscar",
        notifications: "Notificaciones",
        signIn: "Iniciar Sesión",
        signOut: "Cerrar Sesión",
        myProfile: "Mi Perfil",
        settings: "Configuración",
        language: "Idioma"
      },
      footer: {
        about: "ACERCA DE",
        explore: "EXPLORAR",
        quickLinks: "ENLACES RÁPIDOS",
        premierPlatform: "Plataforma Comunitaria de Fe Premier",
        copyright: "mannuh. Una Iniciativa de Gravitas Industries. Todos los Derechos Reservados."
      },
      home: {
        tagline: "Plataforma Comunitaria de Fe Premier",
        heading: "Un espacio seguro",
        headingFaith: "fe",
        headingFellowship: "hermandad",
        description: "Crea y descubre grupos celulares virtuales interactivos, contenido cristiano expertamente curado para inspirarte, eventos y talleres especiales, y conecta con una comunidad creciente de creyentes que comparten tu viaje de fe.",
        createAccount: "Crear una Cuenta",
        browse: "Explorar"
      }
    }
  },
  fr: {
    translation: {
      nav: {
        cellGroups: "Groupes Cellulaires",
        reels: "Reels",
        discover: "Découvrir",
        more: "Plus",
        search: "Rechercher",
        notifications: "Notifications",
        signIn: "Se Connecter",
        signOut: "Se Déconnecter",
        myProfile: "Mon Profil",
        settings: "Paramètres",
        language: "Langue"
      },
      footer: {
        about: "À PROPOS",
        explore: "EXPLORER",
        quickLinks: "LIENS RAPIDES",
        premierPlatform: "Plateforme Communautaire de Foi Premier",
        copyright: "mannuh. Une Initiative Gravitas Industries. Tous Droits Réservés."
      }
    }
  },
  de: {
    translation: {
      nav: {
        cellGroups: "Zellgruppen",
        reels: "Reels",
        discover: "Entdecken",
        more: "Mehr",
        search: "Suchen",
        notifications: "Benachrichtigungen",
        signIn: "Anmelden",
        signOut: "Abmelden",
        myProfile: "Mein Profil",
        settings: "Einstellungen",
        language: "Sprache"
      },
      footer: {
        about: "ÜBER UNS",
        explore: "ERKUNDEN",
        quickLinks: "SCHNELLLINKS",
        premierPlatform: "Premier Glaubensbasierte Gemeinschaftsplattform",
        copyright: "mannuh. Eine Gravitas Industries Initiative. Alle Rechte Vorbehalten."
      }
    }
  },
  pt: {
    translation: {
      nav: {
        cellGroups: "Grupos Celulares",
        reels: "Reels",
        discover: "Descobrir",
        more: "Mais",
        search: "Pesquisar",
        notifications: "Notificações",
        signIn: "Entrar",
        signOut: "Sair",
        myProfile: "Meu Perfil",
        settings: "Configurações",
        language: "Idioma"
      },
      footer: {
        about: "SOBRE",
        explore: "EXPLORAR",
        quickLinks: "LINKS RÁPIDOS",
        premierPlatform: "Plataforma Comunitária de Fé Premier",
        copyright: "mannuh. Uma Iniciativa Gravitas Industries. Todos os Direitos Reservados."
      }
    }
  },
  zh: {
    translation: {
      nav: {
        cellGroups: "小组",
        reels: "短视频",
        discover: "发现",
        more: "更多",
        search: "搜索",
        notifications: "通知",
        signIn: "登录",
        signOut: "退出",
        myProfile: "我的资料",
        settings: "设置",
        language: "语言"
      },
      footer: {
        about: "关于",
        explore: "探索",
        quickLinks: "快速链接",
        premierPlatform: "顶级信仰社区平台",
        copyright: "mannuh. Gravitas Industries 倡议。保留所有权利。"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
