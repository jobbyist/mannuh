import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Groups from "./pages/Groups";
import GroupDetail from "./pages/GroupDetail";
import MeetingRoom from "./pages/MeetingRoom";
import Reels from "./pages/Reels";
import Discover from "./pages/Discover";
import Browse from "./pages/Browse";
import Merchandise from "./pages/Merchandise";
import Shop from "./pages/Shop";
import SupportCenter from "./pages/SupportCenter";
import FoundingMembers from "./pages/FoundingMembers";
import About from "./pages/About";
import Onboarding from "./pages/Onboarding";
import AdvertiseWithUs from "./pages/AdvertiseWithUs";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Notifications from "./pages/Notifications";
import WordlySeries from "./pages/WordlySeries";
import Pricing from "./pages/Pricing";
import MannuhForKids from "./pages/MannuhForKids";
import Settings from "./pages/Settings";
import Pathways from "./pages/Pathways";
import Events from "./pages/Events";
import Churches from "./pages/Churches";
import Causes from "./pages/Causes";
import Donate from "./pages/Donate";
import Unavailable from "./pages/Unavailable";
import Layout from "./components/Layout";
import CookieBanner from "./components/CookieBanner";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import FoundingMembersModal from "./components/FoundingMembersModal";
import Timeout from "./pages/Timeout";
import { useEffect } from "react";

function Router() {
  const [location] = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/groups" component={() => <Layout><Groups /></Layout>} />
      <Route path="/groups/:id">{(params) => <Layout><GroupDetail id={Number(params.id)} /></Layout>}</Route>
      <Route path="/groups/:groupId/meeting/:meetingId">{(params) => <MeetingRoom groupId={Number(params.groupId)} meetingId={Number(params.meetingId)} />}</Route>
      <Route path="/reels" component={() => <Layout><Reels /></Layout>} />
      <Route path="/discover" component={() => <Layout><Discover /></Layout>} />
      <Route path="/browse" component={() => <Layout><Browse /></Layout>} />
      <Route path="/pathways" component={() => <Layout><Pathways /></Layout>} />
      <Route path="/events" component={() => <Layout><Events /></Layout>} />
      <Route path="/churches" component={() => <Layout><Churches /></Layout>} />
      <Route path="/causes" component={() => <Layout><Causes /></Layout>} />
      <Route path="/donate" component={() => <Layout><Donate /></Layout>} />
      <Route path="/unavailable" component={() => <Layout><Unavailable /></Layout>} />
      <Route path="/merchandise" component={Merchandise} />
      <Route path="/shop" component={Shop} />
      <Route path="/ads" component={AdvertiseWithUs} />
      <Route path="/support" component={SupportCenter} />
      <Route path="/about" component={About} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/founding-members" component={FoundingMembers} />
      <Route path="/profile/:id">{(params) => <Layout><Profile userId={Number(params.id)} /></Layout>}</Route>
      <Route path="/search" component={() => <Layout><Search /></Layout>} />
      <Route path="/notifications" component={() => <Layout><Notifications /></Layout>} />
      <Route path="/wordly-series" component={WordlySeries} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/kids" component={MannuhForKids} />
      <Route path="/settings" component={Settings} />
      <Route path="/timeout" component={Timeout} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <CookieBanner />
          <PWAInstallPrompt />
          <FoundingMembersModal />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
