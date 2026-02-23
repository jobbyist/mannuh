import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, Heart, MessageSquare, Eye, Plus, Upload, Share2, User } from "lucide-react";
import { Link } from "wouter";
import { useState, useRef, useMemo } from "react";
import { toast } from "sonner";

export default function Reels() {
  const { user, isAuthenticated } = useAuth();
  const [tab, setTab] = useState("explore");
  const [createOpen, setCreateOpen] = useState(false);
  const utils = trpc.useUtils();

  const exploreQuery = trpc.reels.list.useQuery({ limit: 30 });
  const feedQuery = trpc.reels.feed.useQuery({ limit: 30 }, { enabled: isAuthenticated && tab === "feed" });

  const reels = tab === "feed" ? feedQuery.data : exploreQuery.data;
  const isLoading = tab === "feed" ? feedQuery.isLoading : exploreQuery.isLoading;

  // Create reel form
  const [form, setForm] = useState({ title: "", description: "", tags: "", videoUrl: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const uploadMutation = trpc.reels.uploadVideo.useMutation();
  const createMutation = trpc.reels.create.useMutation({
    onSuccess: (data) => {
      if (data.flagged) {
        toast.error("Content flagged: " + (data.reason || "Does not meet community guidelines"));
      } else {
        toast.success("Reel posted successfully!");
        utils.reels.list.invalidate();
        utils.reels.feed.invalidate();
        setCreateOpen(false);
        setForm({ title: "", description: "", tags: "", videoUrl: "" });
      }
    },
  });

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 16 * 1024 * 1024) {
      toast.error("File size must be under 16MB");
      return;
    }
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(",")[1];
        const result = await uploadMutation.mutateAsync({
          base64,
          mimeType: file.type,
          filename: file.name,
        });
        setForm(f => ({ ...f, videoUrl: result.url }));
        setUploading(false);
        toast.success("Video uploaded!");
      };
      reader.readAsDataURL(file);
    } catch {
      setUploading(false);
      toast.error("Upload failed");
    }
  };

  const handleCreate = () => {
    if (!form.title.trim()) return toast.error("Please enter a title");
    if (!form.videoUrl) return toast.error("Please upload a video");
    const tagsJson = form.tags ? JSON.stringify(form.tags.split(",").map(t => t.trim()).filter(Boolean)) : undefined;
    createMutation.mutate({
      title: form.title,
      description: form.description,
      videoUrl: form.videoUrl,
      tags: tagsJson,
    });
  };

  return (
    <div className="container py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">Reels</h1>
          <p className="text-muted-foreground mt-1 font-light">Inspiring Christian video content from creators</p>
        </div>
        {isAuthenticated && (
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Post Reel
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">Post a Reel</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
                <Input placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
                <div>
                  <input ref={fileInputRef} type="file" accept="video/*" className="hidden" onChange={handleFileSelect} />
                  {form.videoUrl ? (
                    <div className="bg-muted rounded-xl p-3 flex items-center gap-2">
                      <Play className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground truncate flex-1">Video uploaded</span>
                      <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()}>Replace</Button>
                    </div>
                  ) : (
                    <Button variant="outline" className="w-full rounded-xl" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                      <Upload className="w-4 h-4 mr-2" />
                      {uploading ? "Uploading..." : "Upload Video"}
                    </Button>
                  )}
                </div>
                <Button onClick={handleCreate} className="w-full rounded-xl" disabled={createMutation.isPending}>
                  {createMutation.isPending ? "Posting..." : "Post Reel"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Tabs */}
      {isAuthenticated && (
        <Tabs value={tab} onValueChange={setTab} className="mb-6">
          <TabsList className="bg-muted/50 rounded-xl p-1">
            <TabsTrigger value="explore" className="rounded-lg">Explore</TabsTrigger>
            <TabsTrigger value="feed" className="rounded-lg">My Feed</TabsTrigger>
          </TabsList>
        </Tabs>
      )}

      {/* Reels Grid */}
      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}><CardContent className="p-0"><Skeleton className="aspect-[9/12] rounded-xl" /></CardContent></Card>
          ))}
        </div>
      ) : reels && reels.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reels.map((reel) => (
            <ReelCard key={reel.id} reel={reel} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Play className="w-7 h-7 text-muted-foreground" />
          </div>
          <h3 className="font-bold text-foreground mb-1">
            {tab === "feed" ? "No reels from followed creators" : "No reels yet"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {tab === "feed" ? "Follow some creators to see their reels here" : "Be the first to post a reel!"}
          </p>
        </div>
      )}
    </div>
  );
}

function ReelCard({ reel }: { reel: any }) {
  const { isAuthenticated } = useAuth();
  const utils = trpc.useUtils();
  const [showComments, setShowComments] = useState(false);

  const creatorQuery = trpc.profile.get.useQuery({ userId: reel.creatorId });
  const likeMutation = trpc.reels.like.useMutation({
    onSuccess: () => {
      utils.reels.list.invalidate();
      utils.reels.feed.invalidate();
    },
  });
  const viewMutation = trpc.reels.view.useMutation();
  const commentsQuery = trpc.reels.comments.useQuery({ reelId: reel.id }, { enabled: showComments });

  const creator = creatorQuery.data;
  let parsedTags: string[] = [];
  try { parsedTags = reel.tags ? JSON.parse(reel.tags) : []; } catch {}

  return (
    <Card className="overflow-hidden group">
      <CardContent className="p-0">
        {/* Video area */}
        <div className="relative aspect-[9/12] bg-[oklch(0.12_0.01_250)] overflow-hidden">
          {reel.videoUrl ? (
            <video
              src={reel.videoUrl}
              className="w-full h-full object-cover"
              controls
              preload="metadata"
              onPlay={() => viewMutation.mutate({ reelId: reel.id })}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Play className="w-12 h-12 text-white/30" />
            </div>
          )}

          {/* Overlay info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <Link href={`/profile/${reel.creatorId}`}>
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="w-7 h-7 border border-white/30">
                  <AvatarImage src={creator?.avatarUrl || undefined} />
                  <AvatarFallback className="bg-white/20 text-white text-xs">
                    {creator?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-white text-sm font-medium">{creator?.name || "Creator"}</span>
              </div>
            </Link>
            <h3 className="text-white font-bold text-sm line-clamp-1">{reel.title}</h3>
            {reel.description && <p className="text-white/70 text-xs mt-0.5 line-clamp-2">{reel.description}</p>}
          </div>
        </div>

        {/* Actions */}
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-red-500 transition-colors"
              onClick={() => isAuthenticated && likeMutation.mutate({ reelId: reel.id })}
            >
              <Heart className={`w-4 h-4 ${reel.likesCount > 0 ? "fill-red-500 text-red-500" : ""}`} />
              {reel.likesCount}
            </button>
            <button
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageSquare className="w-4 h-4" />
              Comments
            </button>
          </div>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Eye className="w-3.5 h-3.5" />
            {reel.viewsCount}
          </span>
        </div>

        {/* Tags */}
        {parsedTags.length > 0 && (
          <div className="px-3 pb-3 flex flex-wrap gap-1">
            {parsedTags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>
        )}

        {/* Comments */}
        {showComments && (
          <div className="border-t border-border/50 p-3">
            <CommentSection reelId={reel.id} comments={commentsQuery.data || []} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function CommentSection({ reelId, comments }: { reelId: number; comments: any[] }) {
  const { isAuthenticated } = useAuth();
  const utils = trpc.useUtils();
  const [text, setText] = useState("");

  const addCommentMutation = trpc.reels.addComment.useMutation({
    onSuccess: (data) => {
      if (data.flagged) {
        toast.error("Comment flagged: " + (data.reason || "Does not meet guidelines"));
      } else {
        utils.reels.comments.invalidate({ reelId });
        setText("");
      }
    },
  });

  return (
    <div>
      {comments.length > 0 ? (
        <div className="space-y-2 max-h-40 overflow-y-auto mb-3">
          {comments.map(({ comment, user: commentUser }: any) => (
            <div key={comment.id} className="flex gap-2">
              <Avatar className="w-6 h-6 shrink-0">
                <AvatarImage src={commentUser?.avatarUrl || undefined} />
                <AvatarFallback className="text-[10px] bg-muted">{commentUser?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <span className="text-xs font-medium text-foreground">{commentUser?.name || "User"}</span>
                <p className="text-xs text-muted-foreground">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground mb-3">No comments yet</p>
      )}
      {isAuthenticated && (
        <div className="flex gap-2">
          <Input
            placeholder="Add a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="text-sm h-8"
            onKeyDown={(e) => {
              if (e.key === "Enter" && text.trim()) {
                addCommentMutation.mutate({ reelId, content: text.trim() });
              }
            }}
          />
          <Button
            size="sm"
            className="h-8 px-3"
            disabled={!text.trim() || addCommentMutation.isPending}
            onClick={() => text.trim() && addCommentMutation.mutate({ reelId, content: text.trim() })}
          >
            Post
          </Button>
        </div>
      )}
    </div>
  );
}
