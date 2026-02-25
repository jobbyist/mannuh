import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Crown, X } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function FoundingMembersModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    // Check if user has already seen the modal in this session
    const hasSeenModal = sessionStorage.getItem("foundingMembersModalSeen");
    
    if (!hasSeenModal) {
      // Show modal after 60 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("foundingMembersModalSeen", "true");
      }, 60000); // 60 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  // Hide modal when navigating to founding members page
  useEffect(() => {
    if (location === "/founding-members") {
      setIsOpen(false);
    }
  }, [location]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Crown className="w-8 h-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl font-black">
            Become a Founding Member
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center">
            <Badge className="mb-4">Limited to 100 Members</Badge>
            <p className="text-muted-foreground mb-4">
              Join an exclusive group of founding members shaping the future of mannuh. 
              Support our equity-based crowdfunding campaign for the official public beta launch on April 1st, 2026.
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">Annual Contribution</span>
              <span className="text-xl font-black text-primary">$100</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">Launch Date</span>
              <span className="font-semibold text-foreground">April 1, 2026</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">Available Spots</span>
              <span className="font-semibold text-foreground">100 Only</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">What You Get:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✓ Term-based equity stake in mannuh platform</li>
              <li>✓ Signed ownership certificate (valid 12 months)</li>
              <li>✓ Dividend payments at end of term</li>
              <li>✓ Quarterly performance reports</li>
              <li>✓ Exclusive founding member recognition</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button asChild className="flex-1">
              <Link href="/founding-members">Learn More</Link>
            </Button>
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Maybe Later
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Visit <a href="https://www.gravitas.uno/mannuh" target="_blank" rel="noopener noreferrer" className="underline">www.gravitas.uno/mannuh</a> or 
            email <a href="mailto:mannuh@gravitas.uno" className="underline">mannuh@gravitas.uno</a> for more information.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
