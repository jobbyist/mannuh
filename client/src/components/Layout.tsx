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
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Users, Play, Compass, Search, Bell, LogOut, User, Menu, X, Home, Globe, Settings,
  BookOpen, ShoppingBag, CreditCard, HelpCircle, Baby, Award, Podcast, MoreHorizontal
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import AIChatbot from "./AIChatbot";

const navItems = [
  { href: "/groups", label: "Cell Groups", icon: Users },
  { href: "/reels", label: "Reels", icon: Play },
  { href: "/discover", label: "Discover", icon: Compass },
];

const moreNavItems = [
  { href: "/browse", label: "Browse Content", icon: BookOpen },
  { href: "/pathways", label: "Guided Pathways", icon: BookOpen },
  { href: "/events", label: "Events", icon: Award },
  { href: "/churches", label: "Church Directory", icon: Users },
  { href: "/wordly-series", label: "Podcast", icon: Podcast },
  { href: "/shop", label: "The Mannuh Shop", icon: ShoppingBag },
  { href: "/merchandise", label: "Merchandise", icon: ShoppingBag },
  { href: "/pricing", label: "Pricing", icon: CreditCard },
  { href: "/kids", label: "Mannuh for Kids", icon: Baby },
  { href: "/founding-members", label: "Founding Members", icon: Award },
  { href: "/help", label: "Help Center", icon: HelpCircle },
];

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
  const [currentLanguage, setCurrentLanguage] = useState("en");

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
              <img src="/mannuhlogo.png" alt="mannuh logo" style={{ width: '175px', height: 'auto' }} />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}>
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  </Link>
                );
              })}
              
              {/* More menu dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                    More
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  {moreNavItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href} className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Language Picker */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    <Globe className="w-5 h-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuLabel className="text-xs">Language</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setCurrentLanguage(lang.code)}
                      className={currentLanguage === lang.code ? "bg-muted" : ""}
                    >
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

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

              {isAuthenticated ? (
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
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => logout()} className="text-destructive">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button size="sm" asChild>
                  <a href={getLoginUrl()}>Sign In</a>
                </Button>
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
                {navItems.map((item) => {
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
                        {item.label}
                      </button>
                    </Link>
                  );
                })}
                
                {/* Divider */}
                <div className="border-t border-border/50 my-2"></div>
                
                {/* More items in mobile */}
                {moreNavItems.map((item) => {
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
                        {item.label}
                      </button>
                    </Link>
                  );
                })}
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
