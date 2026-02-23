import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Compass, ExternalLink, RefreshCw, BookOpen, Headphones, Video, Newspaper, PenTool } from "lucide-react";
import { useState, useMemo } from "react";

const contentCategories = [
  "All", "faith", "prayer", "worship", "bible-study", "testimony", "devotional", "community"
];

const contentTypeIcons: Record<string, any> = {
  article: Newspaper,
  video: Video,
  podcast: Headphones,
  blog: PenTool,
  news: Newspaper,
};

export default function Discover() {
  const { isAuthenticated } = useAuth();
  const [category, setCategory] = useState("All");
  const [contentType, setContentType] = useState<string | undefined>(undefined);

  const stableCategory = useMemo(() => (category === "All" ? undefined : category), [category]);

  const contentQuery = trpc.discover.content.useQuery({
    category: stableCategory,
    contentType,
    limit: 30,
  });

  const tagsQuery = trpc.discover.tags.useQuery();
  const utils = trpc.useUtils();

  const aggregateMutation = trpc.discover.aggregate.useMutation({
    onSuccess: () => {
      utils.discover.content.invalidate();
      utils.discover.tags.invalidate();
    },
  });

  const content = contentQuery.data || [];
  const tags = tagsQuery.data || [];

  return (
    <div className="container py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">Discover</h1>
          <p className="text-muted-foreground mt-1 font-light">Curated Christian stories, articles, and resources</p>
        </div>
        {isAuthenticated && (
          <Button
            variant="outline"
            className="rounded-xl bg-white"
            onClick={() => aggregateMutation.mutate()}
            disabled={aggregateMutation.isPending}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${aggregateMutation.isPending ? "animate-spin" : ""}`} />
            {aggregateMutation.isPending ? "Aggregating..." : "Refresh Content"}
          </Button>
        )}
      </div>

      {/* Popular Tags */}
      {tags.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Trending Topics</h3>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 15).map((tag) => (
              <Badge
                key={tag.id}
                variant="secondary"
                className="cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        {contentCategories.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
              category === c
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {c === "All" ? "All" : c.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Content Type Filter */}
      <div className="flex gap-2 mb-8">
        {["article", "video", "podcast", "blog", "news"].map(type => {
          const Icon = contentTypeIcons[type] || Newspaper;
          return (
            <button
              key={type}
              onClick={() => setContentType(contentType === type ? undefined : type)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                contentType === type
                  ? "bg-[oklch(0.85_0.06_10)] text-[oklch(0.35_0.08_10)]"
                  : "bg-white border border-border/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {type}
            </button>
          );
        })}
      </div>

      {/* Content Grid */}
      {contentQuery.isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}><CardContent className="p-5"><Skeleton className="h-40" /></CardContent></Card>
          ))}
        </div>
      ) : content.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {content.map((item) => {
            const Icon = contentTypeIcons[item.contentType] || Newspaper;
            let itemTags: string[] = [];
            try { itemTags = item.tags ? JSON.parse(item.tags) : []; } catch {}

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
                    {/* Image */}
                    {item.imageUrl && (
                      <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-muted">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    )}

                    {/* Type badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs capitalize flex items-center gap-1">
                        <Icon className="w-3 h-3" />
                        {item.contentType}
                      </Badge>
                      {item.category && (
                        <Badge variant="outline" className="text-xs capitalize">{item.category.replace("-", " ")}</Badge>
                      )}
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-bold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{item.description}</p>
                    )}

                    {/* Source */}
                    <div className="flex items-center justify-between">
                      {item.sourceName && (
                        <span className="text-xs text-muted-foreground">{item.sourceName}</span>
                      )}
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Tags */}
                    {itemTags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {itemTags.slice(0, 3).map((tag: string) => (
                          <span key={tag} className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Compass className="w-7 h-7 text-muted-foreground" />
          </div>
          <h3 className="font-bold text-foreground mb-1">No content yet</h3>
          <p className="text-sm text-muted-foreground mb-4">Click "Refresh Content" to aggregate Christian content from the web</p>
          {isAuthenticated && (
            <Button onClick={() => aggregateMutation.mutate()} disabled={aggregateMutation.isPending} className="rounded-xl">
              <RefreshCw className="w-4 h-4 mr-2" />
              Aggregate Content
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
