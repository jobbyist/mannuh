import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, RefreshCw } from "lucide-react";

export default function Timeout() {
  const handleRefresh = () => {
    // Clear cache and reload
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
    }
    
    // Clear session storage
    sessionStorage.clear();
    
    // Reload to homepage
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <Card className="w-full max-w-lg mx-4 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-100 rounded-full animate-pulse" />
              <Clock className="relative h-16 w-16 text-orange-500" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Session Timed Out
          </h1>

          <h2 className="text-xl font-semibold text-slate-700 mb-4">
            Page Inactive
          </h2>

          <p className="text-slate-600 mb-4 leading-relaxed">
            Your session has timed out due to inactivity.
          </p>
          
          <p className="text-slate-600 mb-8 leading-relaxed">
            Click the button below to clear your cache and reload the homepage.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleRefresh}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh & Continue
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-xs text-slate-500">
              If you continue to experience issues, please contact our support team at{" "}
              <a href="mailto:support@mannuh.space" className="text-primary hover:underline">
                support@mannuh.space
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
