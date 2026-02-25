import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Users, Play, Compass, Search, Bell, LogOut, User, Menu, X, Home, Globe, Settings,
  BookOpen, ShoppingBag, CreditCard, HelpCircle, Baby, Award, Podcast, MoreHorizontal,
  ChevronDown, Calendar, MessageSquare, FileText, Mic, Church, Sparkles, 
  BookMarked, BookHeadphones, Film, Trophy, BarChart3, Package, ShirtIcon, Watch, PaintBucket, Gift,
  Flag
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AIChatbot from "./AIChatbot";

// BROWSE menu items
const browseMenuItems = [
  { href: "/browse", labelKey: "browseMenu.discover", icon: Compass },
  { href: "/groups", labelKey: "browseMenu.cellGroups", icon: Users },
  { href: "/reels", labelKey: "browseMenu.watchReels", icon: Play },
];

// LEARN menu items
const learnMenuItems = {
  library: [
    { href: "/discover", labelKey: "learnMenu.articles", icon: FileText },
    { href: "/unavailable", labelKey: "learnMenu.devotionals", icon: BookMarked },
    { href: "/wordly-series", labelKey: "learnMenu.podcast", icon: Podcast },
  ],
  community: [
    { href: "/pathways", labelKey: "learnMenu.guidedPathways", icon: BookOpen },
    { href: "/unavailable", labelKey: "learnMenu.discussionBoards", icon: MessageSquare },
    { href: "/unavailable", labelKey: "learnMenu.quizzes", icon: Award },
  ]
};

// DISCOVER menu items
const discoverMenuItems = [
  { href: "/events", labelKey: "discoverMenu.upcomingEvents", icon: Calendar },
  { href: "/churches", labelKey: "discoverMenu.churches", icon: Church },
];

// MORE menu items
const moreMenuItems = {
  kids: [
    { href: "/unavailable", labelKey: "moreMenu.audiobooks", icon: BookHeadphones },
    { href: "/unavailable", labelKey: "moreMenu.animations", icon: Film },
    { href: "/unavailable", labelKey: "moreMenu.storybooks", icon: BookOpen },
    { href: "/unavailable", labelKey: "moreMenu.competitions", icon: Trophy },
    { href: "/unavailable", labelKey: "moreMenu.leaderboards", icon: BarChart3 },
  ],
  merchandise: [
    { href: "/unavailable", labelKey: "moreMenu.collectibles", icon: Package },
    { href: "/unavailable", labelKey: "moreMenu.booksJournals", icon: BookMarked },
    { href: "/unavailable", labelKey: "moreMenu.clothing", icon: ShirtIcon },
    { href: "/unavailable", labelKey: "moreMenu.accessories", icon: Watch },
    { href: "/unavailable", labelKey: "moreMenu.homeDecor", icon: PaintBucket },
    { href: "/unavailable", labelKey: "moreMenu.giftCards", icon: Gift },
  ]
};

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "pt", name: "Português" },
  { code: "zh", name: "中文" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, logout } = useAuth();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  
  const currentLanguage = i18n.language;
  
  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  const unreadQuery = trpc.notifications.unreadCount.useQuery(undefined, {
    enabled: isAuthenticated,
    refetchInterval: 30000,
  });
  const unreadCount = (unreadQuery.data as number) ?? 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border/50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img src="/mannuhlogo.png" alt="mannuh logo" style={{ width: '150px', height: 'auto' }} />
            </Link>

            {/* Desktop Nav - Primary Menu */}
            <div className="hidden md:flex items-center gap-1">
              {/* BROWSE Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    <Compass className="w-4 h-4" />
                    {t("nav.browse")}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-52">
                  {browseMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href} className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          {t(item.labelKey)}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* LEARN Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    <BookOpen className="w-4 h-4" />
                    {t("nav.learn")}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">
                    {t("learnMenu.library")}
                  </DropdownMenuLabel>
                  {learnMenuItems.library.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href} className="flex items-center gap-2 pl-4">
                          <Icon className="w-4 h-4" />
                          {t(item.labelKey)}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">
                    {t("learnMenu.community")}
                  </DropdownMenuLabel>
                  {learnMenuItems.community.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href} className="flex items-center gap-2 pl-4">
                          <Icon className="w-4 h-4" />
                          {t(item.labelKey)}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* DISCOVER Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    <Sparkles className="w-4 h-4" />
                    {t("nav.discover")}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-52">
                  {discoverMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href} className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          {t(item.labelKey)}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* MORE Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                    {t("nav.more")}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">
                    {t("moreMenu.kids")}
                  </DropdownMenuLabel>
                  {moreMenuItems.kids.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href} className="flex items-center gap-2 pl-4">
                          <Icon className="w-4 h-4" />
                          {t(item.labelKey)}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">
                    {t("moreMenu.merchandise")}
                  </DropdownMenuLabel>
                  {moreMenuItems.merchandise.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href} className="flex items-center gap-2 pl-4">
                          <Icon className="w-4 h-4" />
                          {t(item.labelKey)}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Right side - Secondary Navigation */}
            <div className="flex items-center gap-2">
              <Link href="/search">
                <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </Link>

              {isAuthenticated && (
                <Link href="/notifications">
                  <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors relative">
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[oklch(0.85_0.06_10)] text-[10px] font-bold text-foreground rounded-full flex items-center justify-center">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </button>
                </Link>
              )}

              {/* Help & Support */}
              <Link href="/help">
                <button className="hidden md:block p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                  <HelpCircle className="w-5 h-5" />
                </button>
              </Link>

              {/* Report / Feedback */}
              <Link href="/unavailable">
                <button className="hidden md:block p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                  <Flag className="w-5 h-5" />
                </button>
              </Link>

              {isAuthenticated ? (
                <>
                  {/* Upgrade To Premium - only for non-premium users */}
                  {!(user as any)?.isPremium && (
                    <Link href="/pricing">
                      <button className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] text-white hover:opacity-90 transition-opacity">
                        <Sparkles className="w-3 h-3" />
                        {t("nav.upgradeToPremium")}
                      </button>
                    </Link>
                  )}

                  {/* User Profile Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-muted transition-colors">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={user?.avatarUrl || undefined} />
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild>
                        <Link href={`/profile/${user?.id}`} className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {t("nav.myProfile")}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/settings" className="flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          {t("nav.settings")}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => logout()} className="text-destructive">
                        <LogOut className="w-4 h-4 mr-2" />
                        {t("nav.signOut")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  {/* Upgrade To Premium for non-registered users */}
                  <Link href="/pricing">
                    <button className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] text-white hover:opacity-90 transition-opacity">
                      <Sparkles className="w-3 h-3" />
                      {t("nav.upgradeToPremium")}
                    </button>
                  </Link>

                  {/* Sign Up / Login with animated gradient outline */}
                  <a 
                    href={getLoginUrl()}
                    className="relative hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-foreground bg-transparent transition-all group overflow-hidden"
                  >
                    <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-75 animate-gradient-xy"></span>
                    <span className="absolute inset-[2px] rounded-lg bg-background"></span>
                    <span className="relative z-10">{t("nav.signUp")}</span>
                  </a>
                </>
              )}

              {/* Mobile menu toggle */}
              <button
                className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-border/50 pt-3">
              <div className="flex flex-col gap-1">
                {/* Home link (mobile only) */}
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <button className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    location === "/"
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}>
                    <Home className="w-4 h-4" />
                    {t("nav.home")}
                  </button>
                </Link>

                {/* Divider */}
                <div className="border-t border-border/50 my-2"></div>

                {/* BROWSE section */}
                <div className="px-2 py-1 text-xs font-bold text-muted-foreground">{t("nav.browse")}</div>
                {browseMenuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.href;
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                      <button className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}>
                        <Icon className="w-4 h-4" />
                        {t(item.labelKey)}
                      </button>
                    </Link>
                  );
                })}

                {/* Divider */}
                <div className="border-t border-border/50 my-2"></div>

                {/* LEARN section */}
                <div className="px-2 py-1 text-xs font-bold text-muted-foreground">{t("nav.learn")}</div>
                <div className="px-2 py-1 text-[11px] font-semibold text-muted-foreground/70">{t("learnMenu.library")}</div>
                {learnMenuItems.library.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.href;
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                      <button className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}>
                        <Icon className="w-4 h-4" />
                        {t(item.labelKey)}
                      </button>
                    </Link>
                  );
                })}
                <div className="px-2 py-1 text-[11px] font-semibold text-muted-foreground/70">{t("learnMenu.community")}</div>
                {learnMenuItems.community.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.href;
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                      <button className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}>
                        <Icon className="w-4 h-4" />
                        {t(item.labelKey)}
                      </button>
                    </Link>
                  );
                })}

                {/* Divider */}
                <div className="border-t border-border/50 my-2"></div>

                {/* DISCOVER section */}
                <div className="px-2 py-1 text-xs font-bold text-muted-foreground">{t("nav.discover")}</div>
                {discoverMenuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.href;
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                      <button className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}>
                        <Icon className="w-4 h-4" />
                        {t(item.labelKey)}
                      </button>
                    </Link>
                  );
                })}

                {/* Divider */}
                <div className="border-t border-border/50 my-2"></div>

                {/* MORE section */}
                <div className="px-2 py-1 text-xs font-bold text-muted-foreground">{t("nav.more")}</div>
                <div className="px-2 py-1 text-[11px] font-semibold text-muted-foreground/70">{t("moreMenu.kids")}</div>
                {moreMenuItems.kids.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.href;
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                      <button className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}>
                        <Icon className="w-4 h-4" />
                        {t(item.labelKey)}
                      </button>
                    </Link>
                  );
                })}
                <div className="px-2 py-1 text-[11px] font-semibold text-muted-foreground/70">{t("moreMenu.merchandise")}</div>
                {moreMenuItems.merchandise.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.href;
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                      <button className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}>
                        <Icon className="w-4 h-4" />
                        {t(item.labelKey)}
                      </button>
                    </Link>
                  );
                })}

                {/* Divider */}
                <div className="border-t border-border/50 my-2"></div>

                {/* Secondary nav items */}
                <Link href="/help" onClick={() => setMobileMenuOpen(false)}>
                  <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    <HelpCircle className="w-4 h-4" />
                    {t("nav.helpSupport")}
                  </button>
                </Link>
                <Link href="/unavailable" onClick={() => setMobileMenuOpen(false)}>
                  <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    <Flag className="w-4 h-4" />
                    {t("nav.reportFeedback")}
                  </button>
                </Link>

                {/* Sign Up/Login or Upgrade for mobile */}
                {!isAuthenticated && (
                  <>
                    <div className="border-t border-border/50 my-2"></div>
                    <a 
                      href={getLoginUrl()}
                      className="relative inline-flex items-center justify-center gap-2 px-4 py-2.5 mx-3 rounded-lg text-sm font-medium text-foreground bg-transparent transition-all group overflow-hidden"
                    >
                      <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-75 animate-gradient-xy"></span>
                      <span className="absolute inset-[2px] rounded-lg bg-background"></span>
                      <span className="relative z-10">{t("nav.signUp")}</span>
                    </a>
                  </>
                )}

                {isAuthenticated && !(user as any)?.isPremium && (
                  <>
                    <div className="border-t border-border/50 my-2"></div>
                    <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>
                      <button className="flex items-center justify-center gap-2 w-full mx-3 px-4 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] text-white hover:opacity-90 transition-opacity">
                        <Sparkles className="w-4 h-4" />
                        {t("nav.upgradeToPremium")}
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
}
