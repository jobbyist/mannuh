import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, Heart, MessageCircle, Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";

interface PodcastEpisode {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  audioUrl: string;
  duration: string;
  publishedAt: string;
  likes: number;
  comments: number;
}

// Placeholder podcast episodes
const podcastEpisodes: PodcastEpisode[] = [
  {
    id: 1,
    title: "Finding Faith in Everyday Moments",
    description: "Exploring how we can discover God's presence in our daily routines and ordinary experiences.",
    thumbnailUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop",
    audioUrl: "#",
    duration: "32:15",
    publishedAt: "2026-02-23",
    likes: 234,
    comments: 45,
  },
  {
    id: 2,
    title: "The Power of Community in Faith",
    description: "Discussion on how Christian community strengthens our walk with God and supports spiritual growth.",
    thumbnailUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=400&fit=crop",
    audioUrl: "#",
    duration: "28:42",
    publishedAt: "2026-02-16",
    likes: 189,
    comments: 32,
  },
  {
    id: 3,
    title: "Overcoming Doubt with Prayer",
    description: "Practical insights on navigating seasons of doubt and uncertainty through prayer and scripture.",
    thumbnailUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=400&fit=crop",
    audioUrl: "#",
    duration: "35:18",
    publishedAt: "2026-02-09",
    likes: 312,
    comments: 58,
  },
  {
    id: 4,
    title: "Worship Beyond Sunday",
    description: "How to cultivate a lifestyle of worship that extends beyond church services into everyday life.",
    thumbnailUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    audioUrl: "#",
    duration: "30:55",
    publishedAt: "2026-02-02",
    likes: 267,
    comments: 41,
  },
  {
    id: 5,
    title: "Biblical Wisdom for Modern Challenges",
    description: "Applying timeless biblical principles to contemporary issues and personal struggles.",
    thumbnailUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop",
    audioUrl: "#",
    duration: "33:27",
    publishedAt: "2026-01-26",
    likes: 198,
    comments: 36,
  },
  {
    id: 6,
    title: "Grace in Times of Suffering",
    description: "Finding God's grace and purpose during life's most difficult and painful seasons.",
    thumbnailUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=400&fit=crop",
    audioUrl: "#",
    duration: "37:12",
    publishedAt: "2026-01-19",
    likes: 423,
    comments: 72,
  },
  {
    id: 7,
    title: "The Joy of Serving Others",
    description: "Discovering fulfillment and Christ-like character through sacrificial service and love.",
    thumbnailUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=400&h=400&fit=crop",
    audioUrl: "#",
    duration: "29:38",
    publishedAt: "2026-01-12",
    likes: 276,
    comments: 48,
  },
  {
    id: 8,
    title: "Understanding God's Calling",
    description: "Discerning God's unique purpose and calling for your life with practical guidance.",
    thumbnailUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=400&h=400&fit=crop",
    audioUrl: "#",
    duration: "31:45",
    publishedAt: "2026-01-05",
    likes: 312,
    comments: 54,
  },
  {
    id: 9,
    title: "Building Healthy Spiritual Habits",
    description: "Practical strategies for developing consistent prayer, Bible reading, and devotional practices.",
    thumbnailUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=400&fit=crop",
    audioUrl: "#",
    duration: "34:22",
    publishedAt: "2025-12-29",
    likes: 289,
    comments: 43,
  },
  {
    id: 10,
    title: "Faith and Family Dynamics",
    description: "Navigating family relationships with Christ-centered wisdom and unconditional love.",
    thumbnailUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=400&fit=crop",
    audioUrl: "#",
    duration: "36:08",
    publishedAt: "2025-12-22",
    likes: 345,
    comments: 61,
  },
];

const AudioPlayer = ({ episode }: { episode: PodcastEpisode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(75);

  // Parse duration string (MM:SS) to total seconds
  const parseDuration = (duration: string): number => {
    const parts = duration.split(":");
    if (parts.length !== 2) {
      console.warn('Invalid duration format:', duration);
      return 0;
    }
    const mins = parseInt(parts[0]);
    const secs = parseInt(parts[1]);
    if (isNaN(mins) || isNaN(secs)) {
      console.warn('Invalid duration values:', duration);
      return 0;
    }
    return mins * 60 + secs;
  };

  // Format seconds to MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const totalSeconds = parseDuration(episode.duration);
  const currentSeconds = (progress / 100) * totalSeconds;

  const handleSkipBack = () => {
    const skipPercentage = (5 / totalSeconds) * 100;
    setProgress(Math.max(0, progress - skipPercentage));
  };

  const handleSkipForward = () => {
    const skipPercentage = (5 / totalSeconds) * 100;
    setProgress(Math.min(100, progress + skipPercentage));
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Thumbnail */}
          <div className="md:w-48 md:h-48 h-48 flex-shrink-0 bg-muted relative overflow-hidden">
            <img
              src={episode.thumbnailUrl}
              alt={episode.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 right-3 text-white text-xs font-semibold bg-black/70 px-2 py-1 rounded">
              {episode.duration}
            </div>
          </div>

          {/* Content & Controls */}
          <div className="flex-1 p-6">
            {/* Episode Info */}
            <div className="mb-4">
              <h3 className="font-bold text-lg text-foreground mb-1">{episode.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {episode.description}
              </p>
              <span className="text-xs text-muted-foreground">
                {new Date(episode.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              {/* Note: Manual seeking is enabled for demonstration. Once real audio URLs are added,
                  this will work with actual audio playback synchronization. */}
              <Slider
                value={[progress]}
                onValueChange={(vals) => setProgress(vals[0])}
                max={100}
                step={1}
                className="cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{formatTime(currentSeconds)}</span>
                <span>{episode.duration}</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={handleSkipBack}
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="default"
                  className="h-10 w-10 rounded-full"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5 ml-0.5" />
                  )}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={handleSkipForward}
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>

              {/* Volume Control */}
              <div className="hidden md:flex items-center gap-2 w-32">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  onValueChange={(vals) => {
                    setVolume(vals[0]);
                    if (vals[0] > 0) setIsMuted(false);
                  }}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>

              {/* Like & Comment */}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className={`h-9 ${isLiked ? "text-red-500" : ""}`}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-4 w-4 mr-1 ${isLiked ? "fill-current" : ""}`} />
                  {episode.likes + (isLiked ? 1 : 0)}
                </Button>
                <Button size="sm" variant="ghost" className="h-9">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  {episode.comments}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function WordlySeries() {
  return (
    <Layout>
      <div className="relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-[10%] w-64 h-64 geo-circle opacity-20 pointer-events-none" />
        <div className="absolute top-[40%] left-[5%] w-32 h-32 geo-circle-pink opacity-15 pointer-events-none" />

        {/* Hero Section */}
        <section className="container pt-16 pb-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-4">
              Weekly Podcast
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
              The Wordly Series
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed font-light max-w-2xl">
              Join us every week for inspiring conversations about faith, life, and walking with God.
              Each episode brings practical wisdom and biblical insights for your spiritual journey.
            </p>
          </motion.div>
        </section>

        {/* Episodes */}
        <section className="container pb-20">
          <div className="space-y-6">
            {podcastEpisodes.map((episode, i) => (
              <motion.div
                key={episode.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i}
              >
                <AudioPlayer episode={episode} />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
