import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Users } from "lucide-react";
import { cellGroupsSeed } from "@/data/cellGroups";
import { toast } from "sonner";

type TutorialStep = 1 | 2 | 3;

const categories = ["All", "Bible Study", "Prayer", "Missions", "Family", "Youth", "Women", "Men", "Couples", "Worship"];

export default function Groups() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tutorialStep, setTutorialStep] = useState<TutorialStep>(1);
  const [agreed, setAgreed] = useState(false);

  const filtered = useMemo(
    () => cellGroupsSeed.filter((group) =>
      (category === "All" || group.category === category) &&
      (`${group.name} ${group.description} ${group.tags.join(" ")}`.toLowerCase().includes(search.toLowerCase()))),
    [category, search],
  );

  const selectedGroup = cellGroupsSeed.find((group) => group.id === selectedId) ?? null;

  const handleJoin = (id: string) => {
    const group = cellGroupsSeed.find((item) => item.id === id);
    if (!group) return;
    if (group.privacy === "offline") {
      toast.error("This group is offline. Joining is disabled until the host activates it.");
      return;
    }
    if (group.privacy === "private") {
      toast.info("This is a private group. Use an invitation link from the host.");
      return;
    }
    setSelectedId(id);
    setTutorialStep(1);
    setAgreed(false);
  };

  const completeTutorial = () => {
    if (!agreed) {
      toast.error("Please agree to the Community Guidelines and legal policies.");
      return;
    }
    toast.success(`You joined ${selectedGroup?.name}. Welcome!`);
    setSelectedId(null);
  };

  return (
    <div className="container py-10 space-y-6">
      <div>
        <h1 className="text-3xl font-black">Cell Groups</h1>
        <p className="text-muted-foreground">29 sample groups across Bible Study, Prayer, Missions, Family, Youth, Women, Men, Couples, and Worship.</p>
      </div>

      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search groups..." />
      <div className="flex gap-2 flex-wrap">
        {categories.map((item) => (
          <Button key={item} variant={category === item ? "default" : "outline"} size="sm" onClick={() => setCategory(item)}>{item}</Button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((group) => (
          <Card key={group.id}>
            <CardContent className="p-5 space-y-3">
              <div className="flex justify-between items-start gap-3">
                <h3 className="font-bold">{group.name}</h3>
                <Badge variant={group.privacy === "public" ? "default" : "secondary"}>{group.privacy}</Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">{group.description}</p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p className="flex items-center gap-1"><Users className="w-3 h-3" /> {group.currentMemberCount}/{group.maxMembers} members (allowed range: 2-100)</p>
                <p>DMs: {group.features.dmEnabled ? "Enabled" : "Disabled"}</p>
                <p>Moderation controls: {group.features.moderationEnabled ? "Reports, bans, strikes, takedown enabled" : "Basic moderation only"}</p>
                <p>Push notifications: {group.features.pushNotifications ? "Enabled" : "Disabled"}</p>
              </div>
              <Button className="w-full" onClick={() => handleJoin(group.id)}>
                {group.privacy === "public" ? "Join group" : group.privacy === "private" ? "Invite only" : "Currently offline"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={Boolean(selectedGroup)} onOpenChange={() => setSelectedId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cell Group Onboarding ({tutorialStep}/3)</DialogTitle>
            <DialogDescription>{selectedGroup?.name}</DialogDescription>
          </DialogHeader>

          {tutorialStep === 1 && <p className="text-sm">Welcome! Cell Groups help members grow through weekly prayer, Bible reflection, and shared accountability. You can engage in chats, respond to posts, and receive reminders.</p>}
          {tutorialStep === 2 && <p className="text-sm">Group Guidelines: be respectful, keep prayer requests private, avoid harassment, and report harmful content. Moderators can issue reports, strikes, bans, and content takedowns.</p>}
          {tutorialStep === 3 && (
            <div className="space-y-3 text-sm">
              <p>Agree to abide by Community Guidelines and legal policies before joining.</p>
              <label className="flex items-center gap-2">
                <Switch checked={agreed} onCheckedChange={setAgreed} />
                <span>I agree to the Terms of Service, Cookie Policy, Privacy Policy, and Community Guidelines.</span>
              </label>
            </div>
          )}

          <DialogFooter>
            {tutorialStep > 1 && <Button variant="outline" onClick={() => setTutorialStep((tutorialStep - 1) as TutorialStep)}>Back</Button>}
            {tutorialStep < 3 ? (
              <Button onClick={() => setTutorialStep((tutorialStep + 1) as TutorialStep)}>Next</Button>
            ) : (
              <Button onClick={completeTutorial}>Join Group</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
