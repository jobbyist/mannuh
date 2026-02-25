import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Cookie, Settings } from "lucide-react";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  functionality: boolean;
  marketing: boolean;
}

const COOKIE_CONSENT_KEY = "mannuh_cookie_consent";
const COOKIE_PREFERENCES_KEY = "mannuh_cookie_preferences";
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    functionality: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);

    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }

    if (!consent) {
      setShowBanner(true);
    } else {
      const consentDate = parseInt(consent, 10);
      const now = Date.now();
      if (now - consentDate >= THIRTY_DAYS) {
        setShowBanner(true);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      functionality: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    saveCookieConsent(allAccepted);
    setShowBanner(false);
  };

  const handleAcceptEssential = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      functionality: false,
      marketing: false,
    };
    setPreferences(essentialOnly);
    saveCookieConsent(essentialOnly);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    saveCookieConsent(preferences);
    setShowPreferences(false);
    setShowBanner(false);
  };

  const saveCookieConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, Date.now().toString());
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === "essential") return; // Essential cookies cannot be disabled
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          >
            <div className="container max-w-5xl">
              <div className="bg-white rounded-2xl shadow-2xl border border-border/50 p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Cookie className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-foreground mb-2">
                      We value your privacy
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                      By clicking "Accept All", you consent to our use of cookies. You can customize your preferences or accept only essential cookies.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button onClick={handleAcceptAll} size="sm" className="rounded-xl">
                        Accept All
                      </Button>
                      <Button onClick={handleAcceptEssential} variant="outline" size="sm" className="rounded-xl">
                        Essential Only
                      </Button>
                      <Button
                        onClick={() => setShowPreferences(true)}
                        variant="ghost"
                        size="sm"
                        className="rounded-xl"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Customize
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookie Preferences Modal */}
      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Cookie Preferences</DialogTitle>
            <DialogDescription>
              Manage your cookie preferences. Essential cookies are required for the platform to function and cannot be disabled.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Essential Cookies */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Label className="font-semibold text-base">Essential Cookies</Label>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Required</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  These cookies are necessary for the platform to function and cannot be disabled. They include authentication, security, and session cookies.
                </p>
              </div>
              <Switch checked={preferences.essential} disabled />
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b">
              <div className="flex-1">
                <Label className="font-semibold text-base">Analytics Cookies</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Help us understand how visitors interact with our platform by collecting and reporting information anonymously.
                </p>
              </div>
              <Switch
                checked={preferences.analytics}
                onCheckedChange={() => togglePreference("analytics")}
              />
            </div>

            {/* Functionality Cookies */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b">
              <div className="flex-1">
                <Label className="font-semibold text-base">Functionality Cookies</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Remember your preferences like language selection, theme (light/dark mode), and other customization settings.
                </p>
              </div>
              <Switch
                checked={preferences.functionality}
                onCheckedChange={() => togglePreference("functionality")}
              />
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <Label className="font-semibold text-base">Marketing Cookies</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Used to deliver personalized advertisements and track the effectiveness of our marketing campaigns.
                </p>
              </div>
              <Switch
                checked={preferences.marketing}
                onCheckedChange={() => togglePreference("marketing")}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setShowPreferences(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePreferences}>
              Save Preferences
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
