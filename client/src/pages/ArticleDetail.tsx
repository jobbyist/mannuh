import { useMemo, useState } from "react";
import { useRoute, useLocation } from "wouter";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { BookmarkPlus, Crown, Headphones, MessageCircle, Share2, Sparkles } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { premiumArticlesSeed } from "@/data/premiumArticles";
import { toast } from "sonner";

const shareText = (url: string) => `Check out this story I just discovered on @mannuh.space: ${url}…`;
const previewWords = 190;

export default function ArticleDetail() {
  const [, params] = useRoute("/articles/:slug");
  const [, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const [showQuestions, setShowQuestions] = useState(false);

  const article = premiumArticlesSeed.find((item) => item.slug === params?.slug);
  const isPremiumUser = (user as any)?.subscription === "premium" || (user as any)?.isPremium;

  if (!article) {
    return <Layout><div className="container py-12">Article not found.</div></Layout>;
  }

  const words = article.content.split(/\s+/);
  const isLocked = article.isPremium && !isPremiumUser;
  const content = isLocked ? `${words.slice(0, previewWords).join(" ")}...` : article.content;

  const url = typeof window !== "undefined" ? `${window.location.origin}/articles/${article.slug}` : `/articles/${article.slug}`;

  const discussionQuestions = useMemo(() => [
    `What stood out to you most from "${article.title}" and why?`,
    "How does this story challenge your current prayer life this week?",
    "Which Scripture in this article can your group memorize together?",
    "What practical step can you take in the next 48 hours to apply this lesson?",
    "Who should you share this article with, and how can you pray for them?",
  ], [article.title]);

  const listenToStory = () => {
    if (!isPremiumUser) {
      toast.error("Listening is a premium-only feature.");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(article.content.replace(/[#*]/g, ""));
    utterance.rate = 1;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  const saveOffline = async () => {
    if (!isPremiumUser) {
      toast.error("Offline reading/listening is premium only.");
      return;
    }
    localStorage.setItem(`offline-article-${article.slug}`, JSON.stringify(article));
    toast.success("Saved for offline reading/listening.");
  };

  const addComment = () => {
    if (!comment.trim()) return;
    setComments((prev) => [comment.trim(), ...prev]);
    setComment("");
  };

  const shareTo = (platform: string, shareUrl: string) => {
    const encoded = encodeURIComponent(shareText(url));
    const encodedUrl = encodeURIComponent(url);
    const links: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encoded}`,
      x: `https://twitter.com/intent/tweet?text=${encoded}`,
      whatsapp: `https://wa.me/?text=${encoded}`,
      instagram: `https://www.instagram.com/`,
      threads: `https://www.threads.net/intent/post?text=${encoded}`,
      tiktok: `https://www.tiktok.com/`,
    };
    window.open(links[platform] || shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Layout>
      <div className="container py-8 max-w-4xl space-y-6">
        <div className="space-y-3">
          <Badge className="bg-amber-500 text-white"><Crown className="w-3 h-3 mr-1" /> Premium</Badge>
          <h1 className="text-4xl font-black">{article.title}</h1>
          <p className="text-muted-foreground">{article.excerpt}</p>
          <div className="flex flex-wrap gap-2">
            <Button onClick={listenToStory}><Headphones className="w-4 h-4 mr-2" /> Listen to this story</Button>
            <Button variant="outline" onClick={saveOffline}><BookmarkPlus className="w-4 h-4 mr-2" /> Save offline</Button>
            <Button variant="outline" onClick={() => setShowQuestions(true)}><Sparkles className="w-4 h-4 mr-2" /> Generate 5 discussion questions</Button>
            <Button variant="outline" onClick={() => toast.success("Highlighted text saved to Prayer Journal.")}>Add highlighted text to my Prayer Journal</Button>
            <Button variant="outline" onClick={() => setLocation(`/groups?source=${article.slug}`)}>Create a new Cell Group based on this article</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              ["Facebook", "facebook"], ["Twitter/X", "x"], ["WhatsApp", "whatsapp"],
              ["Instagram Stories", "instagram"], ["Threads", "threads"], ["TikTok", "tiktok"],
            ].map(([label, key]) => (
              <Button key={key} variant="ghost" size="sm" onClick={() => shareTo(key, url)}><Share2 className="w-3 h-3 mr-1" /> {label}</Button>
            ))}
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <article className="whitespace-pre-wrap leading-8 text-[15px]">{content}</article>
            {isLocked && (
              <div className="mt-6 rounded-lg border border-amber-500/30 bg-amber-50 p-4">
                <p className="font-semibold">Premium story locked</p>
                <p className="text-sm text-amber-800">Upgrade to access the full story and unlock the full mannuh experience for $9.99 per month.</p>
                <Button className="mt-3" onClick={() => setLocation("/pricing")}>Upgrade to Premium</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><MessageCircle className="w-4 h-4" /> Comments</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {isPremiumUser ? (
              <>
                <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share your reflection..." />
                <Button onClick={addComment}>Post comment</Button>
                {comments.map((entry, index) => <div key={`${entry}-${index}`} className="rounded border p-3 text-sm">{entry}</div>)}
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Comments are for premium members.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={showQuestions} onOpenChange={setShowQuestions}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Discussion questions</DialogTitle>
            <DialogDescription>Use these in your cell group conversation.</DialogDescription>
          </DialogHeader>
          <ol className="list-decimal ml-6 space-y-2 text-sm">
            {discussionQuestions.map((question) => <li key={question}>{question}</li>)}
          </ol>
          <DialogFooter>
            <Button onClick={() => setShowQuestions(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
