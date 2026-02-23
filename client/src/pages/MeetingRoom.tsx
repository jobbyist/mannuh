import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Video, VideoOff, Mic, MicOff, Phone, Monitor, Users, MessageSquare, ArrowLeft, Settings } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "sonner";

export default function MeetingRoom({ groupId, meetingId }: { groupId: number; meetingId: number }) {
  const { user, isAuthenticated } = useAuth({ redirectOnUnauthenticated: true });
  const [, setLocation] = useLocation();
  const meetingQuery = trpc.meetings.get.useQuery({ id: meetingId });
  const groupQuery = trpc.groups.get.useQuery({ id: groupId });
  const updateStatusMutation = trpc.meetings.updateStatus.useMutation();

  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [joined, setJoined] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startMedia = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      toast.error("Unable to access camera/microphone. Please check permissions.");
    }
  }, []);

  const stopMedia = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  const handleJoin = async () => {
    await startMedia();
    setJoined(true);
    updateStatusMutation.mutate({ meetingId, status: "live" });
  };

  const handleLeave = () => {
    stopMedia();
    setJoined(false);
    setLocation(`/groups/${groupId}`);
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setAudioEnabled(audioTrack.enabled);
      }
    }
  };

  useEffect(() => {
    return () => { stopMedia(); };
  }, [stopMedia]);

  const meeting = meetingQuery.data;
  const group = groupQuery.data;

  if (meetingQuery.isLoading) {
    return (
      <div className="min-h-screen bg-foreground flex items-center justify-center">
        <Skeleton className="h-96 w-full max-w-4xl" />
      </div>
    );
  }

  if (!meeting) {
    return (
      <div className="min-h-screen bg-foreground flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Meeting not found</h2>
          <Link href={`/groups/${groupId}`}><Button variant="outline">Back to Group</Button></Link>
        </div>
      </div>
    );
  }

  if (!joined) {
    return (
      <div className="min-h-screen bg-[oklch(0.12_0.01_250)] flex items-center justify-center p-4">
        <div className="max-w-lg w-full text-center">
          <div className="mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Video className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl font-black text-white mb-2">{meeting.title}</h1>
            <p className="text-white/50">{group?.name}</p>
            <div className="flex items-center justify-center gap-3 mt-3">
              <Badge className="bg-white/10 text-white/70 border-white/10">
                {new Date(meeting.scheduledAt).toLocaleString()}
              </Badge>
              {meeting.duration && (
                <Badge className="bg-white/10 text-white/70 border-white/10">
                  {meeting.duration} min
                </Badge>
              )}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-[oklch(0.18_0.01_250)] rounded-2xl aspect-video mb-6 flex items-center justify-center overflow-hidden">
            <div className="text-white/30 text-sm">Camera preview will appear after joining</div>
          </div>

          <div className="flex gap-3 justify-center">
            <Button size="lg" className="rounded-xl px-8" onClick={handleJoin}>
              <Video className="w-4 h-4 mr-2" />
              Join Meeting
            </Button>
            <Button size="lg" variant="outline" className="rounded-xl px-8 border-white/20 text-white hover:bg-white/10" onClick={() => setLocation(`/groups/${groupId}`)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[oklch(0.12_0.01_250)] flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Live</Badge>
          <span className="text-white font-medium text-sm">{meeting.title}</span>
        </div>
        <span className="text-white/40 text-sm">{group?.name}</span>
      </div>

      {/* Video area */}
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl w-full">
          {/* Self video */}
          <div className="relative bg-[oklch(0.18_0.01_250)] rounded-2xl aspect-video overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className={`w-full h-full object-cover ${!videoEnabled ? "hidden" : ""}`}
            />
            {!videoEnabled && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{user?.name?.charAt(0) || "U"}</span>
                </div>
              </div>
            )}
            <div className="absolute bottom-3 left-3">
              <Badge className="bg-black/50 text-white border-0 text-xs">{user?.name || "You"}</Badge>
            </div>
          </div>

          {/* Placeholder for other participants */}
          <div className="bg-[oklch(0.18_0.01_250)] rounded-2xl aspect-video flex items-center justify-center">
            <div className="text-center text-white/30">
              <Users className="w-10 h-10 mx-auto mb-2" />
              <p className="text-sm">Waiting for others to join...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 py-5 border-t border-white/10">
        <button
          onClick={toggleAudio}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
            audioEnabled ? "bg-white/10 text-white hover:bg-white/20" : "bg-red-500/20 text-red-400"
          }`}
        >
          {audioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
        </button>
        <button
          onClick={toggleVideo}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
            videoEnabled ? "bg-white/10 text-white hover:bg-white/20" : "bg-red-500/20 text-red-400"
          }`}
        >
          {videoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </button>
        <button
          className="w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors"
          onClick={() => toast.info("Screen sharing coming soon")}
        >
          <Monitor className="w-5 h-5" />
        </button>
        <button
          onClick={handleLeave}
          className="w-14 h-12 rounded-full bg-red-500 text-white hover:bg-red-600 flex items-center justify-center transition-colors"
        >
          <Phone className="w-5 h-5 rotate-[135deg]" />
        </button>
      </div>
    </div>
  );
}
