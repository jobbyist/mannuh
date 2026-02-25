import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { 
  Clock, Calendar, User, Heart, MessageCircle, Share2, 
  Lock, CrownIcon, ExternalLink, Volume2, VolumeX
} from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

export default function ArticleDetail() {
  const [, params] = useRoute("/articles/:slug");
  const slug = params?.slug;
  const { isAuthenticated, user } = useAuth();
  const [, setLocation] = useLocation();
  const [showFullContent, setShowFullContent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const articleQuery = trpc.articles.get.useQuery(
    { slug: slug! },
    { enabled: !!slug }
  );

  const article = articleQuery.data;
  const isPremiumUser = user?.subscription === "premium";
  const canViewFullArticle = !article?.isPremium || isPremiumUser;

  useEffect(() => {
    // Track article view
    if (article?.id) {
      // Would call view tracking endpoint here
      console.log("Article viewed:", article.id);
    }
  }, [article?.id]);

  const handleAudioToggle = () => {
    setIsPlaying(!isPlaying);
    // Would integrate with audio player here
  };

  if (articleQuery.isLoading) {
    return (
      <Layout>
        <div className="container py-12 max-w-4xl">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-96 w-full mb-8" />
          <Skeleton className="h-48 w-full" />
        </div>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => setLocation("/discover")}>
            Back to Discover
          </Button>
        </div>
      </Layout>
    );
  }

  // Preview content for non-premium users
  const getDisplayContent = () => {
    if (canViewFullArticle) {
      return article.content;
    }
    // Show first 300 characters for preview
    const preview = article.content.slice(0, 300);
    return preview + (article.content.length > 300 ? "..." : "");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Image */}
        {article.imageUrl && (
          <div className="w-full h-96 relative overflow-hidden bg-gradient-to-br from-[oklch(0.82_0.06_240_/_0.1)] to-[oklch(0.88_0.05_330_/_0.1)]">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
        )}

        {/* Article Content */}
        <div className="container py-12 max-w-4xl">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <header className="mb-8">
              {article.category && (
                <Badge className="mb-4">{article.category}</Badge>
              )}
              {article.isPremium && (
                <Badge variant="secondary" className="mb-4 ml-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white">
                  <CrownIcon className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              )}

              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                {article.title}
              </h1>

              {article.excerpt && (
                <p className="text-xl text-muted-foreground mb-6">
                  {article.excerpt}
                </p>
              )}

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readingTimeMinutes} min read</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-6">
                <Button variant="outline" size="sm">
                  <Heart className="w-4 h-4 mr-2" />
                  {article.likesCount}
                </Button>
                <Button variant="outline" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {article.commentsCount}
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                {article.audioUrl && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleAudioToggle}
                  >
                    {isPlaying ? (
                      <VolumeX className="w-4 h-4 mr-2" />
                    ) : (
                      <Volume2 className="w-4 h-4 mr-2" />
                    )}
                    Listen
                  </Button>
                )}
              </div>
            </header>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none mb-12">
              <div 
                dangerouslySetInnerHTML={{ __html: getDisplayContent() }}
                className="leading-relaxed"
              />

              {/* Premium Paywall */}
              {article.isPremium && !canViewFullArticle && (
                <Card className="mt-8 border-2 border-primary/20 bg-gradient-to-br from-[oklch(0.82_0.06_240_/_0.05)] to-[oklch(0.88_0.05_330_/_0.05)]">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] flex items-center justify-center mx-auto mb-4">
                      <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Premium Content</h3>
                    <p className="text-muted-foreground mb-6">
                      Unlock this article and hundreds more with a Premium membership.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button 
                        size="lg"
                        className="bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)]"
                        onClick={() => setLocation("/pricing")}
                      >
                        <CrownIcon className="w-4 h-4 mr-2" />
                        Upgrade to Premium
                      </Button>
                      {!isAuthenticated && (
                        <Button 
                          size="lg"
                          variant="outline"
                          onClick={() => setLocation("/onboarding")}
                        >
                          Sign Up Free
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Tags */}
            {article.tags && (
              <div className="mb-12">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(typeof article.tags === 'string' ? JSON.parse(article.tags) : article.tags).map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Related Articles */}
            <div className="border-t pt-12">
              <h2 className="text-2xl font-bold mb-6">More Articles</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Placeholder for related articles */}
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-2">Related Article Coming Soon</h3>
                    <p className="text-sm text-muted-foreground">
                      Check back for more content from the mannuh team
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.article>
        </div>

        <Footer />
      </div>
    </Layout>
  );
}
