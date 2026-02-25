import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        browse: "BROWSE",
        learn: "LEARN",
        discover: "DISCOVER",
        more: "MORE",
        home: "Home",
        cellGroups: "Cell Groups",
        reels: "Reels",
        watchReels: "Watch Reels",
        search: "Search",
        notifications: "Notifications",
        signIn: "Sign In",
        signUp: "Sign Up / Login",
        signOut: "Sign Out",
        myProfile: "My Profile",
        settings: "Settings",
        profileSettings: "My Profile / Settings",
        language: "Language",
        upgradeToPremium: "Upgrade To Premium",
        helpSupport: "Help & Support",
        reportFeedback: "Report / Feedback"
      },
      // Browse menu
      browseMenu: {
        discover: "Discover",
        cellGroups: "Cell Groups",
        watchReels: "Watch Reels"
      },
      // Learn menu
      learnMenu: {
        library: "Library",
        articles: "Articles/Stories",
        devotionals: "Daily Devotionals",
        podcast: "Podcast Episodes",
        community: "Community",
        guidedPathways: "Guided Pathways",
        discussionBoards: "Discussion Boards",
        quizzes: "Quizzes / Surveys"
      },
      // Discover menu
      discoverMenu: {
        upcomingEvents: "Upcoming Events",
        churches: "Churches/Ministries"
      },
      // More menu items
      moreMenu: {
        kids: "Mannuh for Kids",
        audiobooks: "Audiobooks",
        animations: "Animations",
        storybooks: "Storybooks",
        competitions: "Competitions",
        leaderboards: "Leaderboards",
        merchandise: "Merchandise",
        collectibles: "Collectibles",
        booksJournals: "Books/Journals",
        clothing: "Clothing",
        accessories: "Accessories",
        homeDecor: "Home Decor",
        giftCards: "Gift Cards"
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
        browse: "NAVEGAR",
        learn: "APRENDER",
        discover: "DESCUBRIR",
        more: "MÁS",
        home: "Inicio",
        cellGroups: "Grupos Celulares",
        reels: "Reels",
        watchReels: "Ver Reels",
        search: "Buscar",
        notifications: "Notificaciones",
        signIn: "Iniciar Sesión",
        signUp: "Registrarse / Iniciar Sesión",
        signOut: "Cerrar Sesión",
        myProfile: "Mi Perfil",
        settings: "Configuración",
        profileSettings: "Mi Perfil / Configuración",
        language: "Idioma",
        upgradeToPremium: "Actualizar a Premium",
        helpSupport: "Ayuda y Soporte",
        reportFeedback: "Reportar / Comentarios"
      },
      browseMenu: {
        discover: "Descubrir",
        cellGroups: "Grupos Celulares",
        watchReels: "Ver Reels"
      },
      learnMenu: {
        library: "Biblioteca",
        articles: "Artículos/Historias",
        devotionals: "Devocionales Diarios",
        podcast: "Episodios de Podcast",
        community: "Comunidad",
        guidedPathways: "Caminos Guiados",
        discussionBoards: "Foros de Discusión",
        quizzes: "Cuestionarios / Encuestas"
      },
      discoverMenu: {
        upcomingEvents: "Próximos Eventos",
        churches: "Iglesias/Ministerios"
      },
      moreMenu: {
        kids: "Mannuh para Niños",
        audiobooks: "Audiolibros",
        animations: "Animaciones",
        storybooks: "Libros de Cuentos",
        competitions: "Competencias",
        leaderboards: "Tablas de Clasificación",
        merchandise: "Mercancía",
        collectibles: "Coleccionables",
        booksJournals: "Libros/Diarios",
        clothing: "Ropa",
        accessories: "Accesorios",
        homeDecor: "Decoración del Hogar",
        giftCards: "Tarjetas de Regalo"
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
        browse: "PARCOURIR",
        learn: "APPRENDRE",
        discover: "DÉCOUVRIR",
        more: "PLUS",
        home: "Accueil",
        cellGroups: "Groupes Cellulaires",
        reels: "Reels",
        watchReels: "Regarder Reels",
        search: "Rechercher",
        notifications: "Notifications",
        signIn: "Se Connecter",
        signUp: "S'inscrire / Se Connecter",
        signOut: "Se Déconnecter",
        myProfile: "Mon Profil",
        settings: "Paramètres",
        profileSettings: "Mon Profil / Paramètres",
        language: "Langue",
        upgradeToPremium: "Passer à Premium",
        helpSupport: "Aide et Support",
        reportFeedback: "Signaler / Commentaires"
      },
      browseMenu: {
        discover: "Découvrir",
        cellGroups: "Groupes Cellulaires",
        watchReels: "Regarder Reels"
      },
      learnMenu: {
        library: "Bibliothèque",
        articles: "Articles/Histoires",
        devotionals: "Dévotions Quotidiennes",
        podcast: "Épisodes de Podcast",
        community: "Communauté",
        guidedPathways: "Parcours Guidés",
        discussionBoards: "Forums de Discussion",
        quizzes: "Quiz / Sondages"
      },
      discoverMenu: {
        upcomingEvents: "Événements à Venir",
        churches: "Églises/Ministères"
      },
      moreMenu: {
        kids: "Mannuh pour Enfants",
        audiobooks: "Livres Audio",
        animations: "Animations",
        storybooks: "Livres d'Histoires",
        competitions: "Compétitions",
        leaderboards: "Classements",
        merchandise: "Marchandise",
        collectibles: "Objets de Collection",
        booksJournals: "Livres/Journaux",
        clothing: "Vêtements",
        accessories: "Accessoires",
        homeDecor: "Décoration de Maison",
        giftCards: "Cartes Cadeaux"
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
        browse: "DURCHSUCHEN",
        learn: "LERNEN",
        discover: "ENTDECKEN",
        more: "MEHR",
        home: "Startseite",
        cellGroups: "Zellgruppen",
        reels: "Reels",
        watchReels: "Reels Ansehen",
        search: "Suchen",
        notifications: "Benachrichtigungen",
        signIn: "Anmelden",
        signUp: "Registrieren / Anmelden",
        signOut: "Abmelden",
        myProfile: "Mein Profil",
        settings: "Einstellungen",
        profileSettings: "Mein Profil / Einstellungen",
        language: "Sprache",
        upgradeToPremium: "Auf Premium Upgraden",
        helpSupport: "Hilfe & Support",
        reportFeedback: "Melden / Feedback"
      },
      browseMenu: {
        discover: "Entdecken",
        cellGroups: "Zellgruppen",
        watchReels: "Reels Ansehen"
      },
      learnMenu: {
        library: "Bibliothek",
        articles: "Artikel/Geschichten",
        devotionals: "Tägliche Andachten",
        podcast: "Podcast-Episoden",
        community: "Gemeinschaft",
        guidedPathways: "Geführte Pfade",
        discussionBoards: "Diskussionsforen",
        quizzes: "Quiz / Umfragen"
      },
      discoverMenu: {
        upcomingEvents: "Kommende Veranstaltungen",
        churches: "Kirchen/Dienste"
      },
      moreMenu: {
        kids: "Mannuh für Kinder",
        audiobooks: "Hörbücher",
        animations: "Animationen",
        storybooks: "Geschichtenbücher",
        competitions: "Wettbewerbe",
        leaderboards: "Bestenlisten",
        merchandise: "Merchandise",
        collectibles: "Sammlerstücke",
        booksJournals: "Bücher/Tagebücher",
        clothing: "Kleidung",
        accessories: "Zubehör",
        homeDecor: "Heimdekoration",
        giftCards: "Geschenkkarten"
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
        browse: "NAVEGAR",
        learn: "APRENDER",
        discover: "DESCOBRIR",
        more: "MAIS",
        home: "Início",
        cellGroups: "Grupos Celulares",
        reels: "Reels",
        watchReels: "Assistir Reels",
        search: "Pesquisar",
        notifications: "Notificações",
        signIn: "Entrar",
        signUp: "Cadastrar / Entrar",
        signOut: "Sair",
        myProfile: "Meu Perfil",
        settings: "Configurações",
        profileSettings: "Meu Perfil / Configurações",
        language: "Idioma",
        upgradeToPremium: "Atualizar para Premium",
        helpSupport: "Ajuda e Suporte",
        reportFeedback: "Relatar / Feedback"
      },
      browseMenu: {
        discover: "Descobrir",
        cellGroups: "Grupos Celulares",
        watchReels: "Assistir Reels"
      },
      learnMenu: {
        library: "Biblioteca",
        articles: "Artigos/Histórias",
        devotionals: "Devocionais Diários",
        podcast: "Episódios de Podcast",
        community: "Comunidade",
        guidedPathways: "Caminhos Guiados",
        discussionBoards: "Fóruns de Discussão",
        quizzes: "Questionários / Pesquisas"
      },
      discoverMenu: {
        upcomingEvents: "Próximos Eventos",
        churches: "Igrejas/Ministérios"
      },
      moreMenu: {
        kids: "Mannuh para Crianças",
        audiobooks: "Audiolivros",
        animations: "Animações",
        storybooks: "Livros de Histórias",
        competitions: "Competições",
        leaderboards: "Classificações",
        merchandise: "Mercadoria",
        collectibles: "Colecionáveis",
        booksJournals: "Livros/Diários",
        clothing: "Roupas",
        accessories: "Acessórios",
        homeDecor: "Decoração de Casa",
        giftCards: "Cartões Presente"
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
        browse: "浏览",
        learn: "学习",
        discover: "发现",
        more: "更多",
        home: "首页",
        cellGroups: "小组",
        reels: "短视频",
        watchReels: "观看短视频",
        search: "搜索",
        notifications: "通知",
        signIn: "登录",
        signUp: "注册 / 登录",
        signOut: "退出",
        myProfile: "我的资料",
        settings: "设置",
        profileSettings: "我的资料 / 设置",
        language: "语言",
        upgradeToPremium: "升级到高级版",
        helpSupport: "帮助与支持",
        reportFeedback: "报告 / 反馈"
      },
      browseMenu: {
        discover: "发现",
        cellGroups: "小组",
        watchReels: "观看短视频"
      },
      learnMenu: {
        library: "图书馆",
        articles: "文章/故事",
        devotionals: "每日灵修",
        podcast: "播客剧集",
        community: "社区",
        guidedPathways: "指导路径",
        discussionBoards: "讨论板",
        quizzes: "测验 / 调查"
      },
      discoverMenu: {
        upcomingEvents: "即将举行的活动",
        churches: "教会/事工"
      },
      moreMenu: {
        kids: "儿童曼努",
        audiobooks: "有声读物",
        animations: "动画",
        storybooks: "故事书",
        competitions: "竞赛",
        leaderboards: "排行榜",
        merchandise: "商品",
        collectibles: "收藏品",
        booksJournals: "书籍/日志",
        clothing: "服装",
        accessories: "配件",
        homeDecor: "家居装饰",
        giftCards: "礼品卡"
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
