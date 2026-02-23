import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, UserPlus, UserMinus, Edit, Play, Heart, Eye, Upload } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";

export default function Profile({ userId }: { userId: number }) {
  const { user: currentUser, isAuthenticated } = useAuth();
  const utils = trpc.useUtils();
  const isOwnProfile = currentUser?.id === userId;

  const profileQuery = trpc.profile.get.useQuery({ userId });
  const isFollowingQuery = trpc.follows.isFollowing.useQuery({ userId }, { enabled: isAuthenticated && !isOwnProfile });
  const reelsQuery = trpc.reels.list.useQuery({ creatorId: userId, limit: 20 });

  const followMutation = trpc.follows.follow.useMutation({
    onSuccess: () => {
      utils.follows.isFollowing.invalidate({ userId });
      utils.profile.get.invalidate({ userId });
      toast.success("Following!");
    },
  });

  const unfollowMutation = trpc.follows.unfollow.useMutation({
    onSuccess: () => {
      utils.follows.isFollowing.invalidate({ userId });
      utils.profile.get.invalidate({ userId });
      toast.success("Unfollowed");
    },
  });

  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", bio: "", interests: "", isCreator: false });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateMutation = trpc.profile.update.useMutation({
    onSuccess: () => {
      utils.profile.get.invalidate({ userId });
      utils.auth.me.invalidate();
      setEditOpen(false);
      toast.success("Profile updated!");
    },
  });

  const uploadAvatarMutation = trpc.profile.uploadAvatar.useMutation({
    onSuccess: () => {
      utils.profile.get.invalidate({ userId });
      utils.auth.me.invalidate();
      toast.success("Avatar updated!");
    },
  });

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      uploadAvatarMutation.mutate({ base64, mimeType: file.type });
    };
    reader.readAsDataURL(file);
  };

  const openEdit = () => {
    const p = profileQuery.data;
    setEditForm({
      name: p?.name || "",
      bio: p?.bio || "",
      interests: p?.interests || "",
      isCreator: p?.isCreator || false,
    });
    setEditOpen(true);
  };

  const profile = profileQuery.data;
  const isFollowing = isFollowingQuery.data;
  const reels = reelsQuery.data || [];

  if (profileQuery.isLoading) {
    return (
      <div className="container py-10">
        <div className="flex items-center gap-6 mb-8">
          <Skeleton className="w-24 h-24 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-60" />
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-xl font-bold">User not found</h2>
      </div>
    );
  }

  return (
    <div className="container py-10">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-border/50 p-8 mb-8">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          {/* Avatar */}
          <div className="relative group">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profile.avatarUrl || undefined} />
              <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                {profile.name?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            {isOwnProfile && (
              <>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                <button
                  className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-5 h-5 text-white" />
                </button>
              </>
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-black tracking-tight text-foreground">{profile.name || "Anonymous"}</h1>
                <div className="flex items-center gap-3 mt-2">
                  {profile.isCreator && <Badge className="bg-[oklch(0.85_0.06_10)] text-[oklch(0.35_0.08_10)] border-0">Creator</Badge>}
                  <span className="text-sm text-muted-foreground">
                    <strong className="text-foreground">{profile.followersCount}</strong> followers
                  </span>
                  <span className="text-sm text-muted-foreground">
                    <strong className="text-foreground">{profile.followingCount}</strong> following
                  </span>
                </div>
                {profile.bio && <p className="text-muted-foreground mt-3 max-w-lg">{profile.bio}</p>}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {isOwnProfile ? (
                  <Dialog open={editOpen} onOpenChange={setEditOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="rounded-xl bg-white" onClick={openEdit}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Name</label>
                          <Input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Bio</label>
                          <Textarea value={editForm.bio} onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })} rows={3} />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Interests (comma separated)</label>
                          <Input value={editForm.interests} onChange={(e) => setEditForm({ ...editForm, interests: e.target.value })} placeholder="prayer, worship, bible study" />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">Creator Mode</label>
                          <Switch checked={editForm.isCreator} onCheckedChange={(v) => setEditForm({ ...editForm, isCreator: v })} />
                        </div>
                        <Button onClick={() => updateMutation.mutate(editForm)} className="w-full rounded-xl" disabled={updateMutation.isPending}>
                          {updateMutation.isPending ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : isAuthenticated ? (
                  isFollowing ? (
                    <Button variant="outline" className="rounded-xl bg-white" onClick={() => unfollowMutation.mutate({ userId })}>
                      <UserMinus className="w-4 h-4 mr-2" />
                      Unfollow
                    </Button>
                  ) : (
                    <Button className="rounded-xl" onClick={() => followMutation.mutate({ userId })}>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Follow
                    </Button>
                  )
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reels */}
      {profile.isCreator && (
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">Reels</h2>
          {reelsQuery.isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="aspect-[9/12]" />)}
            </div>
          ) : reels.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reels.map((reel) => (
                <Card key={reel.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-[9/12] bg-[oklch(0.12_0.01_250)]">
                      {reel.videoUrl && (
                        <video src={reel.videoUrl} className="w-full h-full object-cover" preload="metadata" controls />
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <h3 className="text-white font-bold text-sm line-clamp-1">{reel.title}</h3>
                      </div>
                    </div>
                    <div className="p-3 flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{reel.likesCount}</span>
                      <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{reel.viewsCount}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-border/50">
              <Play className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No reels posted yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
