import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Compass, ShoppingBag, Newspaper, Video, Headphones, 
  ExternalLink, TrendingUp, Sparkles 
} from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

const categories = ["All", "Articles", "Reels", "Podcasts", "Merchandise"];

const sponsoredAds = [
  {
    id: 1,
    title: "Support Our Mission",
    description: "Become a Premium member and help us grow the platform",
    cta: "Upgrade Now",
    href: "/pricing",
    image: null,
    badge: "Sponsored"
  },
  {
    id: 2,
    title: "Founding Members Campaign",
    description: "Join 100 founding members shaping the future of mannuh",
    cta: "Learn More",
    href: "/founding-members",
    image: null,
    badge: "Sponsored"
  }
];

export default function Browse() {
  const [category, setCategory] = useState("All");
  
  const contentQuery = trpc.discover.content.useQuery({
    category: undefined,
    contentType: undefined,
    limit: 12,
  });

  const content = contentQuery.data || [];

  // Mock merchandise data (would come from backend in production)
  const merchandiseItems = [
    {
      id: "merch-1",
      title: "mannuh Faith T-Shirt",
      price: "$24.99",
      image: null,
      category: "Merchandise"
    },
    {
      id: "merch-2",
      title: "Community Coffee Mug",
      price: "$14.99",
      image: null,
      category: "Merchandise"
    },
    {
      id: "merch-3",
      title: "Scripture Journal",
      price: "$19.99",
      image: null,
      category: "Merchandise"
    }
  ];

  const filteredContent = category === "All" 
    ? content 
    : content.filter(item => {
        if (category === "Articles") return item.contentType === "article";
        if (category === "Reels") return item.contentType === "video";
        if (category === "Podcasts") return item.contentType === "podcast";
        return false;
      });

  const displayedMerch = category === "All" || category === "Merchandise" 
    ? merchandiseItems 
    : [];

  return (
    <div className="container py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-foreground mb-2">
          Browse
        </h1>
        <p className="text-muted-foreground font-light">
          Explore the latest content, merchandise, and community offerings
        </p>
      </div>

      {/* Sponsored Banner Ad - Top */}
      <div className="mb-8">
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <Badge variant="secondary" className="mb-2 text-xs">
                  {sponsoredAds[0].badge}
                </Badge>
                <h3 className="font-bold text-xl text-foreground mb-2">
                  {sponsoredAds[0].title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {sponsoredAds[0].description}
                </p>
                <Button asChild>
                  <Link href={sponsoredAds[0].href}>{sponsoredAds[0].cta}</Link>
                </Button>
              </div>
              <div className="w-full md:w-48 h-32 bg-primary/10 rounded-lg flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              category === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Trending Now</h2>
        </div>
      </div>

      {/* Mixed Content Grid */}
      {contentQuery.isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-5">
                <Skeleton className="h-40" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Render Articles/Reels/Podcasts */}
          {filteredContent.map((item) => {
            const Icon = item.contentType === "podcast" 
              ? Headphones 
              : item.contentType === "video" 
              ? Video 
              : Newspaper;

            return (
              <a
                key={item.id}
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="hover:shadow-md transition-all cursor-pointer group h-full">
                  <CardContent className="p-6">
                    {item.imageUrl && (
                      <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-muted">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs capitalize flex items-center gap-1">
                        <Icon className="w-3 h-3" />
                        {item.contentType}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                        {item.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      {item.sourceName && (
                        <span className="text-xs text-muted-foreground">{item.sourceName}</span>
                      )}
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            );
          })}

          {/* Render Merchandise */}
          {displayedMerch.map((item) => (
            <Link key={item.id} href="/merchandise">
              <Card className="hover:shadow-md transition-all cursor-pointer group h-full">
                <CardContent className="p-6">
                  <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-muted flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs capitalize flex items-center gap-1">
                      <ShoppingBag className="w-3 h-3" />
                      {item.category}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-lg font-bold text-primary">{item.price}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Sponsored Banner Ad - Bottom */}
      <div className="mt-8">
        <Card className="bg-gradient-to-r from-foreground to-foreground/90 text-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <Badge variant="secondary" className="mb-2 text-xs">
                  {sponsoredAds[1].badge}
                </Badge>
                <h3 className="font-bold text-xl mb-2">
                  {sponsoredAds[1].title}
                </h3>
                <p className="text-sm text-white/80 mb-4">
                  {sponsoredAds[1].description}
                </p>
                <Button asChild variant="secondary">
                  <Link href={sponsoredAds[1].href}>{sponsoredAds[1].cta}</Link>
                </Button>
              </div>
              <div className="w-full md:w-48 h-32 bg-white/10 rounded-lg flex items-center justify-center">
                <Compass className="w-12 h-12 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Empty State */}
      {!contentQuery.isLoading && filteredContent.length === 0 && displayedMerch.length === 0 && (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Compass className="w-7 h-7 text-muted-foreground" />
          </div>
          <h3 className="font-bold text-foreground mb-1">No content available</h3>
          <p className="text-sm text-muted-foreground">Check back later for new content</p>
        </div>
      )}
    </div>
  );
}
