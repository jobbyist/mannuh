import { useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/_core/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const existingUsernames = new Set(["@mannuh", "@faithjourney", "@gracehub"]);

export default function Settings() {
  const { user } = useAuth();
  const isPremium = (user as any)?.subscription === "premium" || (user as any)?.isPremium;

  const [profile, setProfile] = useState({
    displayName: user?.name ?? "",
    username: "",
    testimony: "",
    church: "",
    denomination: "None",
    languages: "English",
    currency: "USD",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    profileVisibility: "public",
    spiritualGifts: "Teaching, Mercy",
    prayerPoints: "",
    goals: "community",
    creatorMode: false,
    kycVerified: false,
    tipsEnabled: false,
    aiOptIn: false,
    mutedContent: "",
    blockedUsers: "",
  });

  const usernameError = useMemo(() => {
    if (!profile.username) return "";
    if (!/^@[a-zA-Z0-9_]{3,20}$/.test(profile.username)) return "Use @ + 3-20 letters, numbers, underscore.";
    if (existingUsernames.has(profile.username.toLowerCase())) return "This username is already taken.";
    return "";
  }, [profile.username]);

  const save = () => {
    if (usernameError) {
      toast.error(usernameError);
      return;
    }
    localStorage.setItem("mannuh-profile-preferences", JSON.stringify(profile));
    toast.success("Profile preferences saved.");
  };

  return (
    <Layout>
      <div className="container py-10 max-w-5xl space-y-6">
        <div>
          <h1 className="text-3xl font-black">Profile & Preferences</h1>
          <p className="text-muted-foreground">Free users get basic profiles. Premium unlocks advanced customization.</p>
          <Badge className="mt-2" variant={isPremium ? "default" : "secondary"}>{isPremium ? "Premium profile" : "Free profile"}</Badge>
        </div>

        <Card>
          <CardHeader><CardTitle>Basic profile</CardTitle></CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <Input value={profile.displayName} onChange={(e) => setProfile({ ...profile, displayName: e.target.value })} placeholder="Display name" />
            <div>
              <Input value={profile.username} onChange={(e) => setProfile({ ...profile, username: e.target.value })} placeholder="@username" />
              {usernameError && <p className="text-xs text-red-500 mt-1">{usernameError}</p>}
            </div>
            <Select value={profile.profileVisibility} onValueChange={(v) => setProfile({ ...profile, profileVisibility: v })}>
              <SelectTrigger><SelectValue placeholder="Profile visibility" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
            <label className="flex items-center gap-2 text-sm"><Switch checked={profile.aiOptIn} onCheckedChange={(v) => setProfile({ ...profile, aiOptIn: v })} /> AI data collection opt-in</label>
          </CardContent>
        </Card>

        <Card className={!isPremium ? "opacity-70" : ""}>
          <CardHeader><CardTitle>Premium customization</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {!isPremium && <p className="text-sm text-muted-foreground">Upgrade to unlock testimony, gifts, creator mode, languages/currency/timezone persistence, block list, muted content, and donations.</p>}
            <Textarea disabled={!isPremium} value={profile.testimony} onChange={(e) => setProfile({ ...profile, testimony: e.target.value })} placeholder="Testimony (optional)" />
            <Input disabled={!isPremium} value={profile.spiritualGifts} onChange={(e) => setProfile({ ...profile, spiritualGifts: e.target.value })} placeholder="Spiritual gifts / serving interests" />
            <div className="grid md:grid-cols-3 gap-3">
              <Input disabled={!isPremium} value={profile.languages} onChange={(e) => setProfile({ ...profile, languages: e.target.value })} placeholder="Languages" />
              <Input disabled={!isPremium} value={profile.currency} onChange={(e) => setProfile({ ...profile, currency: e.target.value })} placeholder="Currency" />
              <Input disabled={!isPremium} value={profile.timezone} onChange={(e) => setProfile({ ...profile, timezone: e.target.value })} placeholder="Timezone" />
            </div>
            <Input disabled={!isPremium} value={profile.blockedUsers} onChange={(e) => setProfile({ ...profile, blockedUsers: e.target.value })} placeholder="Block list (comma separated)" />
            <Input disabled={!isPremium} value={profile.mutedContent} onChange={(e) => setProfile({ ...profile, mutedContent: e.target.value })} placeholder="Muted content keywords" />
            <label className="flex items-center gap-2 text-sm"><Switch disabled={!isPremium} checked={profile.creatorMode} onCheckedChange={(v) => setProfile({ ...profile, creatorMode: v })} /> Creator mode (requires KYC verification)</label>
            <label className="flex items-center gap-2 text-sm"><Switch disabled={!isPremium || !profile.kycVerified || !profile.creatorMode} checked={profile.tipsEnabled} onCheckedChange={(v) => setProfile({ ...profile, tipsEnabled: v })} /> Accept tips/donations (verified creators only)</label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Personalized recommendations setup</CardTitle></CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-3">
            <Select value={profile.goals} onValueChange={(v) => setProfile({ ...profile, goals: v })}>
              <SelectTrigger><SelectValue placeholder="What are you here for?" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="community">Community</SelectItem>
                <SelectItem value="learning">Learning</SelectItem>
                <SelectItem value="creating">Creating</SelectItem>
                <SelectItem value="prayer">Prayer</SelectItem>
              </SelectContent>
            </Select>
            <Input value={profile.church} onChange={(e) => setProfile({ ...profile, church: e.target.value })} placeholder="Church/ministry you attend" />
            <Input value={profile.denomination} onChange={(e) => setProfile({ ...profile, denomination: e.target.value })} placeholder="Doctrine/denomination" />
            <Input value={profile.prayerPoints} onChange={(e) => setProfile({ ...profile, prayerPoints: e.target.value })} placeholder="Prayer points requests" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Auto recommendations preview</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>Featured cell groups (3): Romans Road Deep Dive, Intercessors Unite, Legacy Builders for Couples.</p>
            <p>Article topics (5): Prayer life, Identity in Christ, Anxiety and peace, Missions, Biblical stewardship.</p>
            <p>Verified creators (3): @pastorjane, @missionmichael, @worshipwithada.</p>
          </CardContent>
        </Card>

        <Button onClick={save}>Save settings</Button>
      </div>
    </Layout>
  );
}
