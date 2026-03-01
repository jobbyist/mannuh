import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Crown, ExternalLink, Eye, Newspaper } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/_core/hooks/useAuth";
import { externalArticlesSeed } from "@/data/externalArticles";
import { premiumArticlesSeed } from "@/data/premiumArticles";

type ExitState = { title: string; url: string } | null;

export default function Discover() {
  const { user } = useAuth();
  const isPremiumUser = (user as any)?.subscription === "premium" || (user as any)?.isPremium;
  const [query, setQuery] = useState("");
  const [selectedExternalId, setSelectedExternalId] = useState<string | null>(null);
  const [exitState, setExitState] = useState<ExitState>(null);
  const [countdown, setCountdown] = useState(10);

  const selectedExternal = externalArticlesSeed.find((article) => article.id === selectedExternalId) ?? null;

  const filteredPremium = useMemo(
    () => premiumArticlesSeed.filter((article) => `${article.title} ${article.category} ${article.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  const filteredExternal = useMemo(
    () => externalArticlesSeed.filter((article) => `${article.title} ${article.sourceName} ${article.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  const triggerExternalRedirect = (title: string, url: string) => {
    setSelectedExternalId(null);
    setExitState({ title, url });
    setCountdown(10);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          window.open(url, "_blank", "noopener,noreferrer");
          setExitState(null);
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="container py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Discover</h1>
        <p className="text-muted-foreground">Explore premium storybooks and aggregated Christian articles.</p>
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search stories, tags, topics..."
        className="w-full rounded-lg border border-border bg-background px-3 py-2"
      />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Premium Storybooks</h2>
          <Badge className="bg-amber-500 text-white">{filteredPremium.length} Premium</Badge>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPremium.map((article) => (
            <Card key={article.id} className="h-full">
              <CardContent className="p-5 space-y-3">
                <img src={article.imageUrl} alt={article.title} className="w-full h-40 rounded-lg object-cover" />
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-amber-500/10 text-amber-700"><Crown className="w-3 h-3 mr-1" />Premium</Badge>
                  <Badge variant="outline">{article.category}</Badge>
                </div>
                <h3 className="font-bold line-clamp-2">{article.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>
                {!isPremiumUser && (
                  <div className="rounded-md border border-amber-500/30 bg-amber-50 p-2 text-xs text-amber-700">
                    Free preview only. Upgrade to unlock the full story and the full mannuh experience for $9.99/month.
                  </div>
                )}
                <Link href={`/articles/${article.slug}`}>
                  <Button className="w-full">{isPremiumUser ? "Read story" : "Preview story"}</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">From Christian Publications</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExternal.map((article) => (
            <Card key={article.id} className="h-full">
              <CardContent className="p-5 space-y-3">
                <img src={article.imageUrl} alt={article.title} className="w-full h-40 rounded-lg object-cover" />
                <Badge variant="outline">{article.sourceName}</Badge>
                <h3 className="font-bold line-clamp-2">{article.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>
                <Button variant="outline" className="w-full" onClick={() => setSelectedExternalId(article.id)}>
                  <Eye className="w-4 h-4 mr-2" /> Preview external article
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Dialog open={Boolean(selectedExternal)} onOpenChange={() => setSelectedExternalId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>External article preview</DialogTitle>
            <DialogDescription>Preview this source before leaving mannuh.</DialogDescription>
          </DialogHeader>
          {selectedExternal && (
            <div className="space-y-3">
              <img src={selectedExternal.imageUrl} alt={selectedExternal.title} className="w-full h-44 object-cover rounded-md" />
              <p className="text-xs uppercase text-muted-foreground">{selectedExternal.sourceName}</p>
              <h3 className="text-lg font-bold">{selectedExternal.title}</h3>
              <p className="text-sm text-muted-foreground">{selectedExternal.excerpt}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedExternalId(null)}>Close</Button>
            {selectedExternal && (
              <Button onClick={() => triggerExternalRedirect(selectedExternal.title, selectedExternal.sourceUrl)}>
                <ExternalLink className="w-4 h-4 mr-2" /> Continue Reading
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(exitState)} onOpenChange={() => setExitState(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>You are being redirected to another website</DialogTitle>
            <DialogDescription>
              Click here or tap the reload button in your browser if the page doesn&apos;t load automatically within 10 seconds.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-md border bg-muted p-3 text-sm">
            <p className="font-medium">{exitState?.title}</p>
            <p className="text-muted-foreground flex items-center gap-2"><Newspaper className="w-3 h-3" /> Redirecting in {countdown}s</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setExitState(null)}>Go back</Button>
            {exitState && <Button onClick={() => window.open(exitState.url, "_blank", "noopener,noreferrer")}>Open now</Button>}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
