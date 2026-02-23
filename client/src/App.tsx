import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Groups from "./pages/Groups";
import GroupDetail from "./pages/GroupDetail";
import MeetingRoom from "./pages/MeetingRoom";
import Reels from "./pages/Reels";
import Discover from "./pages/Discover";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Notifications from "./pages/Notifications";
import Layout from "./components/Layout";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/groups" component={() => <Layout><Groups /></Layout>} />
      <Route path="/groups/:id">{(params) => <Layout><GroupDetail id={Number(params.id)} /></Layout>}</Route>
      <Route path="/groups/:groupId/meeting/:meetingId">{(params) => <MeetingRoom groupId={Number(params.groupId)} meetingId={Number(params.meetingId)} />}</Route>
      <Route path="/reels" component={() => <Layout><Reels /></Layout>} />
      <Route path="/discover" component={() => <Layout><Discover /></Layout>} />
      <Route path="/profile/:id">{(params) => <Layout><Profile userId={Number(params.id)} /></Layout>}</Route>
      <Route path="/search" component={() => <Layout><Search /></Layout>} />
      <Route path="/notifications" component={() => <Layout><Notifications /></Layout>} />
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
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
