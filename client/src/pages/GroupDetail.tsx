import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Video, Calendar, ArrowLeft, Plus, Clock, UserPlus, LogOut } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { toast } from "sonner";

export default function GroupDetail({ id }: { id: number }) {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const utils = trpc.useUtils();

  const groupQuery = trpc.groups.get.useQuery({ id });
  const membersQuery = trpc.groups.members.useQuery({ groupId: id });
  const meetingsQuery = trpc.meetings.list.useQuery({ groupId: id });
  const isMemberQuery = trpc.groups.isMember.useQuery({ groupId: id }, { enabled: isAuthenticated });

  const joinMutation = trpc.groups.join.useMutation({
    onSuccess: () => {
      utils.groups.isMember.invalidate({ groupId: id });
      utils.groups.members.invalidate({ groupId: id });
      utils.groups.get.invalidate({ id });
      toast.success("Joined the group!");
    },
  });

  const leaveMutation = trpc.groups.leave.useMutation({
    onSuccess: () => {
      utils.groups.isMember.invalidate({ groupId: id });
      utils.groups.members.invalidate({ groupId: id });
      utils.groups.get.invalidate({ id });
      toast.success("Left the group");
    },
  });

  const [meetingForm, setMeetingForm] = useState({ title: "", description: "", date: "", time: "", duration: 60 });
  const [meetingOpen, setMeetingOpen] = useState(false);

  const createMeetingMutation = trpc.meetings.create.useMutation({
    onSuccess: () => {
      utils.meetings.list.invalidate({ groupId: id });
      setMeetingOpen(false);
      toast.success("Meeting scheduled!");
    },
  });

  const handleCreateMeeting = () => {
    if (!meetingForm.title || !meetingForm.date || !meetingForm.time) {
      return toast.error("Please fill in all required fields");
    }
    const scheduledAt = new Date(`${meetingForm.date}T${meetingForm.time}`).getTime();
    createMeetingMutation.mutate({
      groupId: id,
      title: meetingForm.title,
      description: meetingForm.description,
      scheduledAt,
      duration: meetingForm.duration,
    });
  };

  const group = groupQuery.data;
  const isMember = isMemberQuery.data;

  if (groupQuery.isLoading) {
    return (
      <div className="container py-10">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (!group) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-xl font-bold">Group not found</h2>
        <Link href="/groups"><Button variant="outline" className="mt-4">Back to Groups</Button></Link>
      </div>
    );
  }

  return (
    <div className="container py-10">
      {/* Back */}
      <Link href="/groups">
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Groups
        </button>
      </Link>

      {/* Group Header */}
      <div className="bg-white rounded-2xl border border-border/50 p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <Users className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-foreground">{group.name}</h1>
              {group.description && <p className="text-muted-foreground mt-2 max-w-lg">{group.description}</p>}
              <div className="flex items-center gap-3 mt-3">
                {group.category && <Badge variant="secondary">{group.category}</Badge>}
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {group.memberCount} member{group.memberCount !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {isAuthenticated && !isMember && (
              <Button onClick={() => joinMutation.mutate({ groupId: id })} disabled={joinMutation.isPending} className="rounded-xl">
                <UserPlus className="w-4 h-4 mr-2" />
                {joinMutation.isPending ? "Joining..." : "Join Group"}
              </Button>
            )}
            {isAuthenticated && isMember && (
              <>
                <Dialog open={meetingOpen} onOpenChange={setMeetingOpen}>
                  <DialogTrigger asChild>
                    <Button className="rounded-xl">
                      <Video className="w-4 h-4 mr-2" />
                      Schedule Meeting
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Schedule a Meeting</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <Input placeholder="Meeting title" value={meetingForm.title} onChange={(e) => setMeetingForm({ ...meetingForm, title: e.target.value })} />
                      <Textarea placeholder="Description (optional)" value={meetingForm.description} onChange={(e) => setMeetingForm({ ...meetingForm, description: e.target.value })} rows={2} />
                      <div className="grid grid-cols-2 gap-3">
                        <Input type="date" value={meetingForm.date} onChange={(e) => setMeetingForm({ ...meetingForm, date: e.target.value })} />
                        <Input type="time" value={meetingForm.time} onChange={(e) => setMeetingForm({ ...meetingForm, time: e.target.value })} />
                      </div>
                      <Input type="number" placeholder="Duration (minutes)" value={meetingForm.duration} onChange={(e) => setMeetingForm({ ...meetingForm, duration: parseInt(e.target.value) || 60 })} />
                      <Button onClick={handleCreateMeeting} className="w-full rounded-xl" disabled={createMeetingMutation.isPending}>
                        {createMeetingMutation.isPending ? "Scheduling..." : "Schedule Meeting"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" className="rounded-xl bg-white" onClick={() => leaveMutation.mutate({ groupId: id })}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Leave
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="meetings" className="w-full">
        <TabsList className="bg-muted/50 rounded-xl p-1 mb-6">
          <TabsTrigger value="meetings" className="rounded-lg">Meetings</TabsTrigger>
          <TabsTrigger value="members" className="rounded-lg">Members</TabsTrigger>
        </TabsList>

        <TabsContent value="meetings">
          {meetingsQuery.isLoading ? (
            <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20" />)}</div>
          ) : meetingsQuery.data && meetingsQuery.data.length > 0 ? (
            <div className="space-y-3">
              {meetingsQuery.data.map((meeting) => {
                const isUpcoming = meeting.scheduledAt > Date.now();
                const isLive = meeting.status === "live";
                return (
                  <Card key={meeting.id} className={isLive ? "border-green-300 bg-green-50/50" : ""}>
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-foreground">{meeting.title}</h3>
                            {isLive && <Badge className="bg-green-500 text-white">Live</Badge>}
                            {!isLive && isUpcoming && <Badge variant="secondary">Upcoming</Badge>}
                            {!isLive && !isUpcoming && <Badge variant="outline">Ended</Badge>}
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {new Date(meeting.scheduledAt).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {new Date(meeting.scheduledAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </span>
                            {meeting.duration && <span>{meeting.duration} min</span>}
                          </div>
                        </div>
                        {isMember && (isLive || isUpcoming) && (
                          <Button
                            size="sm"
                            className="rounded-xl"
                            variant={isLive ? "default" : "outline"}
                            onClick={() => setLocation(`/groups/${id}/meeting/${meeting.id}`)}
                          >
                            <Video className="w-4 h-4 mr-1" />
                            {isLive ? "Join Now" : "Join"}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <Calendar className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-medium text-foreground">No meetings yet</p>
              <p className="text-sm text-muted-foreground">Schedule a meeting to get started</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="members">
          {membersQuery.isLoading ? (
            <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-14" />)}</div>
          ) : membersQuery.data && membersQuery.data.length > 0 ? (
            <div className="space-y-2">
              {membersQuery.data.map(({ member, user: memberUser }) => (
                <div key={member.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <Link href={`/profile/${memberUser.id}`}>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={memberUser.avatarUrl || undefined} />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                        {memberUser.name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/profile/${memberUser.id}`}>
                      <span className="font-medium text-foreground hover:underline">{memberUser.name || "Anonymous"}</span>
                    </Link>
                  </div>
                  {member.role === "admin" && <Badge variant="secondary" className="text-xs">Admin</Badge>}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-10 text-muted-foreground">No members yet</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
