import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, Video, Play, Users, Compass, UserPlus, Settings, CheckCheck } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

const typeIcons: Record<string, any> = {
  meeting: Video,
  reel: Play,
  group: Users,
  content: Compass,
  follow: UserPlus,
  system: Settings,
};

const typeColors: Record<string, string> = {
  meeting: "bg-blue-100 text-blue-600",
  reel: "bg-pink-100 text-pink-600",
  group: "bg-green-100 text-green-600",
  content: "bg-purple-100 text-purple-600",
  follow: "bg-orange-100 text-orange-600",
  system: "bg-gray-100 text-gray-600",
};

export default function Notifications() {
  const { isAuthenticated } = useAuth({ redirectOnUnauthenticated: true });
  const utils = trpc.useUtils();

  const notificationsQuery = trpc.notifications.list.useQuery(undefined, { enabled: isAuthenticated });
  const markAllReadMutation = trpc.notifications.markAllRead.useMutation({
    onSuccess: () => {
      utils.notifications.list.invalidate();
      utils.notifications.unreadCount.invalidate();
      toast.success("All notifications marked as read");
    },
  });
  const markReadMutation = trpc.notifications.markRead.useMutation({
    onSuccess: () => {
      utils.notifications.list.invalidate();
      utils.notifications.unreadCount.invalidate();
    },
  });

  const notifications = notificationsQuery.data || [];
  const hasUnread = notifications.some((n) => !n.isRead);

  return (
    <div className="container py-10">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground">Notifications</h1>
            <p className="text-muted-foreground mt-1 font-light">Stay updated on your community</p>
          </div>
          {hasUnread && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl bg-white"
              onClick={() => markAllReadMutation.mutate()}
            >
              <CheckCheck className="w-4 h-4 mr-2" />
              Mark all read
            </Button>
          )}
        </div>

        {/* Notifications List */}
        {notificationsQuery.isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16" />)}
          </div>
        ) : notifications.length > 0 ? (
          <div className="space-y-2">
            {notifications.map((notif) => {
              const Icon = typeIcons[notif.type] || Bell;
              const colorClass = typeColors[notif.type] || "bg-gray-100 text-gray-600";

              const content = (
                <Card
                  className={`transition-all cursor-pointer ${
                    !notif.isRead ? "bg-primary/[0.03] border-primary/10" : "hover:bg-muted/30"
                  }`}
                  onClick={() => !notif.isRead && markReadMutation.mutate({ id: notif.id })}
                >
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl ${colorClass} flex items-center justify-center shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className={`text-sm ${!notif.isRead ? "font-bold" : "font-medium"} text-foreground`}>
                          {notif.title}
                        </h3>
                        {!notif.isRead && (
                          <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                        )}
                      </div>
                      {notif.message && (
                        <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">{notif.message}</p>
                      )}
                      <span className="text-xs text-muted-foreground mt-1 block">
                        {new Date(notif.createdAt).toLocaleDateString(undefined, {
                          month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
                        })}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );

              return notif.linkUrl ? (
                <Link key={notif.id} href={notif.linkUrl}>
                  {content}
                </Link>
              ) : (
                <div key={notif.id}>{content}</div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Bell className="w-7 h-7 text-muted-foreground" />
            </div>
            <h3 className="font-bold text-foreground mb-1">No notifications</h3>
            <p className="text-sm text-muted-foreground">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
}
