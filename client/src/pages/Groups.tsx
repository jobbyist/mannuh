import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Search, MapPin, Calendar } from "lucide-react";
import { Link } from "wouter";
import { useState, useMemo } from "react";
import { toast } from "sonner";

const categories = [
  "All", "Bible Study", "Prayer", "Worship", "Youth", "Women", "Men", "Couples", "Family", "Missions"
];

export default function Groups() {
  const { isAuthenticated } = useAuth();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [createOpen, setCreateOpen] = useState(false);

  const stableSearch = useMemo(() => search, [search]);
  const stableCategory = useMemo(() => (category === "All" ? undefined : category), [category]);

  const groupsQuery = trpc.groups.list.useQuery({
    search: stableSearch || undefined,
    category: stableCategory,
    limit: 50,
  });

  const myGroupsQuery = trpc.groups.myGroups.useQuery(undefined, { enabled: isAuthenticated });
  const utils = trpc.useUtils();

  const createMutation = trpc.groups.create.useMutation({
    onSuccess: () => {
      utils.groups.list.invalidate();
      utils.groups.myGroups.invalidate();
      setCreateOpen(false);
      toast.success("Cell group created successfully!");
    },
  });

  const [form, setForm] = useState({
    name: "", description: "", category: "Bible Study", maxMembers: 50,
  });

  const handleCreate = () => {
    if (!form.name.trim()) return toast.error("Please enter a group name");
    createMutation.mutate({
      name: form.name,
      description: form.description,
      category: form.category,
      maxMembers: form.maxMembers,
    });
  };

  return (
    <div className="container py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">Cell Groups</h1>
          <p className="text-muted-foreground mt-1 font-light">Find your community and grow together in faith</p>
        </div>
        {isAuthenticated && (
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Create Group
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">Create a Cell Group</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Group Name</label>
                  <Input
                    placeholder="e.g. Morning Prayer Warriors"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Description</label>
                  <Textarea
                    placeholder="What is this group about?"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Category</label>
                  <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {categories.filter(c => c !== "All").map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Max Members</label>
                  <Input
                    type="number"
                    value={form.maxMembers}
                    onChange={(e) => setForm({ ...form, maxMembers: parseInt(e.target.value) || 50 })}
                  />
                </div>
                <Button onClick={handleCreate} className="w-full rounded-xl" disabled={createMutation.isPending}>
                  {createMutation.isPending ? "Creating..." : "Create Group"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* My Groups */}
      {isAuthenticated && myGroupsQuery.data && myGroupsQuery.data.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-bold text-foreground mb-4">My Groups</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {myGroupsQuery.data.map(({ group }) => (
              <Link key={group.id} href={`/groups/${group.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-primary/20 bg-primary/[0.02]">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-foreground">{group.name}</h3>
                        {group.category && <Badge variant="secondary" className="mt-1.5 text-xs">{group.category}</Badge>}
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search groups..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                category === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Groups Grid */}
      {groupsQuery.isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}><CardContent className="p-5"><Skeleton className="h-24" /></CardContent></Card>
          ))}
        </div>
      ) : groupsQuery.data && groupsQuery.data.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {groupsQuery.data.map((group) => (
            <Link key={group.id} href={`/groups/${group.id}`}>
              <Card className="hover:shadow-md transition-all cursor-pointer group h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                      <Users className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-foreground truncate">{group.name}</h3>
                      {group.description && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{group.description}</p>
                      )}
                      <div className="flex items-center gap-3 mt-3">
                        {group.category && <Badge variant="secondary" className="text-xs">{group.category}</Badge>}
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {group.maxMembers} max
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Users className="w-7 h-7 text-muted-foreground" />
          </div>
          <h3 className="font-bold text-foreground mb-1">No groups found</h3>
          <p className="text-sm text-muted-foreground">Be the first to create a cell group!</p>
        </div>
      )}
    </div>
  );
}
