import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Check, Plus, Calendar, Heart } from "lucide-react";
import { format } from "date-fns";

interface Prayer {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  answeredAt?: Date;
  answered: boolean;
  category?: string;
}

export default function PrayerJournal() {
  const [prayers, setPrayers] = useState<Prayer[]>([
    {
      id: "1",
      title: "Guidance in Career Decision",
      content: "Lord, please guide me in making the right career choice...",
      createdAt: new Date("2026-01-15"),
      answered: false,
      category: "Career",
    },
    {
      id: "2",
      title: "Family Health",
      content: "Praying for my mother's recovery from illness...",
      createdAt: new Date("2026-01-20"),
      answeredAt: new Date("2026-02-10"),
      answered: true,
      category: "Health",
    },
    {
      id: "3",
      title: "Financial Breakthrough",
      content: "God, I trust You to provide for my needs...",
      createdAt: new Date("2026-02-01"),
      answeredAt: new Date("2026-02-20"),
      answered: true,
      category: "Finance",
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newPrayer, setNewPrayer] = useState({
    title: "",
    content: "",
    category: "",
  });

  const handleAddPrayer = () => {
    if (!newPrayer.title || !newPrayer.content) return;

    const prayer: Prayer = {
      id: Date.now().toString(),
      title: newPrayer.title,
      content: newPrayer.content,
      createdAt: new Date(),
      answered: false,
      category: newPrayer.category,
    };

    setPrayers([prayer, ...prayers]);
    setNewPrayer({ title: "", content: "", category: "" });
    setIsAddDialogOpen(false);
  };

  const handleMarkAnswered = (id: string) => {
    setPrayers(
      prayers.map((p) =>
        p.id === id
          ? { ...p, answered: true, answeredAt: new Date() }
          : p
      )
    );
  };

  const activePrayers = prayers.filter((p) => !p.answered);
  const answeredPrayers = prayers.filter((p) => p.answered);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Prayer Journal</h2>
          <p className="text-sm text-muted-foreground">
            Track your prayer requests and celebrate answered prayers
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Prayer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>New Prayer Request</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="prayer-title">Title</Label>
                <Input
                  id="prayer-title"
                  placeholder="e.g., Job Interview Success"
                  value={newPrayer.title}
                  onChange={(e) =>
                    setNewPrayer({ ...newPrayer, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="prayer-category">Category (optional)</Label>
                <Input
                  id="prayer-category"
                  placeholder="e.g., Career, Health, Family"
                  value={newPrayer.category}
                  onChange={(e) =>
                    setNewPrayer({ ...newPrayer, category: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="prayer-content">Prayer</Label>
                <Textarea
                  id="prayer-content"
                  placeholder="Write your prayer here..."
                  value={newPrayer.content}
                  onChange={(e) =>
                    setNewPrayer({ ...newPrayer, content: e.target.value })
                  }
                  rows={5}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddPrayer}>Add Prayer</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Active Prayers */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Active Prayer Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {activePrayers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Heart className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No active prayers. Start by adding a prayer request!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activePrayers.map((prayer) => (
                <Card key={prayer.id} className="border-l-4 border-l-primary">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{prayer.title}</h3>
                          {prayer.category && (
                            <Badge variant="secondary" className="text-xs">
                              {prayer.category}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {prayer.content}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {format(prayer.createdAt, "MMM dd, yyyy")}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMarkAnswered(prayer.id)}
                        className="ml-4"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Mark Answered
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Answered Prayers Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            Answered Prayers Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          {answeredPrayers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No answered prayers yet. Keep praying and have faith!</p>
            </div>
          ) : (
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-6 relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                
                {answeredPrayers
                  .sort((a, b) => 
                    (b.answeredAt?.getTime() || 0) - (a.answeredAt?.getTime() || 0)
                  )
                  .map((prayer, index) => (
                    <div key={prayer.id} className="relative pl-12">
                      {/* Timeline dot */}
                      <div className="absolute left-2.5 top-2 w-3 h-3 rounded-full bg-green-600 border-4 border-background" />
                      
                      <Card className="border-green-200 bg-green-50/50">
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{prayer.title}</h3>
                              {prayer.category && (
                                <Badge variant="secondary" className="text-xs">
                                  {prayer.category}
                                </Badge>
                              )}
                            </div>
                            <Badge className="bg-green-600">Answered</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {prayer.content}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>Prayed: {format(prayer.createdAt, "MMM dd, yyyy")}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Check className="w-3 h-3 text-green-600" />
                              <span>Answered: {prayer.answeredAt && format(prayer.answeredAt, "MMM dd, yyyy")}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
