import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Download, X, Smartphone, Monitor } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(isInStandaloneMode);

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(iOS);

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[PWA] Service Worker registered:', registration.scope);
        })
        .catch((error) => {
          console.error('[PWA] Service Worker registration failed:', error);
        });
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after 30 seconds if not dismissed
      setTimeout(() => {
        const dismissed = localStorage.getItem('pwa_install_dismissed');
        if (!dismissed && !isInStandaloneMode) {
          setShowPrompt(true);
        }
      }, 30000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for successful installation
    window.addEventListener('appinstalled', () => {
      console.log('[PWA] App installed successfully');
      setShowPrompt(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`[PWA] User response: ${outcome}`);

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa_install_dismissed', 'true');
    // Clear dismissal after 7 days
    setTimeout(() => {
      localStorage.removeItem('pwa_install_dismissed');
    }, 7 * 24 * 60 * 60 * 1000);
  };

  // Don't show if already installed
  if (isStandalone) {
    return null;
  }

  // iOS install instructions
  if (isIOS && showPrompt) {
    return (
      <Dialog open={showPrompt} onOpenChange={setShowPrompt}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              Install mannuh App
            </DialogTitle>
            <DialogDescription>
              Get the full app experience on your iOS device
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              To install mannuh on your iPhone or iPad:
            </p>
            <ol className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="font-semibold">1.</span>
                <span>Tap the <strong>Share</strong> button (box with arrow) at the bottom</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold">2.</span>
                <span>Scroll down and tap <strong>"Add to Home Screen"</strong></span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold">3.</span>
                <span>Tap <strong>Add</strong> to confirm</span>
              </li>
            </ol>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={handleDismiss}>
              Maybe Later
            </Button>
            <Button onClick={() => setShowPrompt(false)}>
              Got It
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Standard install prompt (Chrome, Edge, etc.)
  if (deferredPrompt && showPrompt) {
    return (
      <Dialog open={showPrompt} onOpenChange={setShowPrompt}>
        <DialogContent className="max-w-md">
          <button
            onClick={handleDismiss}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>

          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Install mannuh App
            </DialogTitle>
            <DialogDescription>
              Get the full app experience with offline access and notifications
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-2">
                  <span className="text-primary-foreground font-black text-2xl">m</span>
                </div>
                <p className="text-xs text-muted-foreground">Fast & Secure</p>
              </div>
            </div>

            <div className="space-y-3 text-sm mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Monitor className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Works like a native app</p>
                  <p className="text-xs text-muted-foreground">Fast, reliable, and engaging</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Download className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Instant access from home screen</p>
                  <p className="text-xs text-muted-foreground">One tap to open</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDismiss} className="flex-1">
              Maybe Later
            </Button>
            <Button onClick={handleInstallClick} className="flex-1">
              Install Now
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}
