import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users, Video, DollarSign, CheckCircle, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { format } from "date-fns";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

export default function Events() {
  const { isAuthenticated, user } = useAuth();
  const eventsQuery = trpc.events.list.useQuery({ limit: 20 });
  const events = eventsQuery.data || [];

  const userIsPremium = (user as any)?.isPremium || false;

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "online":
        return <Video className="w-4 h-4" />;
      case "in-person":
        return <MapPin className="w-4 h-4" />;
      case "hybrid":
        return <><Video className="w-3 h-3" /><MapPin className="w-3 h-3" /></>;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "online":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
      case "in-person":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      case "hybrid":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="container py-20">
        {/* Hero Section */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[oklch(0.82_0.06_240_/_0.15)] to-[oklch(0.88_0.05_330_/_0.15)] text-sm font-semibold mb-6">
            <Calendar className="w-4 h-4" />
            Community Events
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
            Upcoming <span className="bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] bg-clip-text text-transparent">Events</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Join worship nights, Bible studies, conferences, and more. Connect with believers worldwide or in your local area.
          </p>

          {isAuthenticated && userIsPremium && (
            <Button size="lg" className="bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] hover:opacity-90">
              <Plus className="w-5 h-5 mr-2" />
              Create Event
            </Button>
          )}
        </motion.div>

        {/* Events Grid */}
        <div className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={index + 1}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[oklch(0.82_0.06_240_/_0.5)] overflow-hidden">
                {/* Event Image */}
                {event.imageUrl && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Event Type Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className={getEventTypeColor(event.eventType)}>
                        {getEventTypeIcon(event.eventType)}
                        <span className="ml-1 capitalize">{event.eventType}</span>
                      </Badge>
                    </div>

                    {/* Verified Badge */}
                    {event.isVerified && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-white/90 text-foreground">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                    )}
                  </div>
                )}

                <CardContent className="p-6">
                  {/* Category */}
                  {event.category && (
                    <Badge variant="outline" className="mb-3 capitalize">
                      {event.category.replace("-", " ")}
                    </Badge>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[oklch(0.82_0.06_240)] transition-colors">
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span>{format(new Date(event.startTime), "EEEE, MMMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <span>
                        {format(new Date(event.startTime), "h:mm a")} - {format(new Date(event.endTime), "h:mm a")}
                        {event.timezone && ` (${event.timezone})`}
                      </span>
                    </div>
                    {event.eventType !== "online" && event.location && (
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    )}
                    {event.maxAttendees && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4 flex-shrink-0" />
                        <span>Max {event.maxAttendees} attendees</span>
                      </div>
                    )}
                    {event.isPaid && event.ticketPrice && (
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <DollarSign className="w-4 h-4 flex-shrink-0" />
                        <span>${(event.ticketPrice / 100).toFixed(2)} per ticket</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {!isAuthenticated ? (
                      <Link href="/pricing" className="flex-1">
                        <Button className="w-full bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] hover:opacity-90">
                          Sign Up to Register
                        </Button>
                      </Link>
                    ) : (
                      <>
                        <Button className="flex-1 bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] hover:opacity-90">
                          {event.isPaid ? "Buy Ticket" : "Register"}
                        </Button>
                        <Button variant="outline" size="icon">
                          <Calendar className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {events.length === 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="text-center py-12"
          >
            <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No Events Yet</h3>
            <p className="text-muted-foreground">Check back soon for upcoming events!</p>
          </motion.div>
        )}

        {/* Create Event CTA for Premium */}
        {isAuthenticated && userIsPremium && events.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={events.length + 1}
            className="mt-16 max-w-2xl mx-auto"
          >
            <Card className="p-8 text-center bg-gradient-to-br from-[oklch(0.82_0.06_240_/_0.05)] to-[oklch(0.88_0.05_330_/_0.05)] border-2 border-[oklch(0.82_0.06_240_/_0.2)]">
              <Plus className="w-12 h-12 mx-auto mb-4 text-[oklch(0.82_0.06_240)]" />
              <h3 className="text-2xl font-bold mb-2">Host Your Own Event</h3>
              <p className="text-muted-foreground mb-6">
                As a Premium member, you can create and host events for the community
              </p>
              <Button size="lg" className="bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] hover:opacity-90">
                Create Event
              </Button>
            </Card>
          </motion.div>
        )}

        {/* Premium CTA for Non-Premium */}
        {isAuthenticated && !userIsPremium && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={events.length + 1}
            className="mt-16 max-w-2xl mx-auto"
          >
            <Card className="p-8 text-center bg-gradient-to-br from-[oklch(0.82_0.06_240_/_0.05)] to-[oklch(0.88_0.05_330_/_0.05)] border-2 border-[oklch(0.82_0.06_240_/_0.2)]">
              <h3 className="text-2xl font-bold mb-2">Want to Create Events?</h3>
              <p className="text-muted-foreground mb-6">
                Upgrade to Premium to host your own events and connect with the community
              </p>
              <Link href="/pricing">
                <Button size="lg" className="bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] hover:opacity-90">
                  Upgrade to Premium
                </Button>
              </Link>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
