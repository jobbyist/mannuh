import { ExternalLink, Info } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

interface SponsoredBannerProps {
  variant?: "horizontal" | "vertical";
}

export default function SponsoredBanner({ variant = "horizontal" }: SponsoredBannerProps) {
  // This is a placeholder component - in production, this would fetch actual sponsor data
  const sponsorData = {
    title: "Sponsor Your Message Here",
    description: "Reach thousands of believers in our growing community",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop",
    buttonText: "Learn More About Advertising",
    link: "/sponsor",
  };

  if (variant === "vertical") {
    return (
      <Card className="overflow-hidden border-2 border-dashed border-muted-foreground/30 bg-muted/20">
        <div className="relative h-48 bg-muted">
          <img
            src={sponsorData.imageUrl}
            alt="Sponsored"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Info className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-xs text-muted-foreground font-medium">Sponsored Content</p>
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <Badge variant="secondary" className="mb-2 text-xs">
            Sponsored
          </Badge>
          <h3 className="font-semibold text-sm mb-2">{sponsorData.title}</h3>
          <p className="text-xs text-muted-foreground mb-3">{sponsorData.description}</p>
          <a
            href={sponsorData.link}
            className="flex items-center gap-1 text-xs text-primary hover:underline"
          >
            {sponsorData.buttonText}
            <ExternalLink className="w-3 h-3" />
          </a>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-2 border-dashed border-muted-foreground/30 bg-muted/20">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-1/3 h-48 md:h-auto bg-muted">
            <img
              src={sponsorData.imageUrl}
              alt="Sponsored"
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Info className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground font-medium">Sponsored Content</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-6">
            <Badge variant="secondary" className="mb-3">
              Sponsored
            </Badge>
            <h3 className="text-xl font-bold mb-2">{sponsorData.title}</h3>
            <p className="text-muted-foreground mb-4">{sponsorData.description}</p>
            <a
              href={sponsorData.link}
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              {sponsorData.buttonText}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
