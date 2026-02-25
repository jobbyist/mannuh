import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Story {
  id: number;
  username: string;
  avatarUrl: string;
  imageUrl: string;
  title: string;
}

const sampleStories: Story[] = [
  {
    id: 1,
    username: "Sarah M.",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop",
    title: "Faith Journey",
  },
  {
    id: 2,
    username: "John D.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1200&fit=crop",
    title: "Prayer Power",
  },
  {
    id: 3,
    username: "Maria G.",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=1200&fit=crop",
    title: "God's Love",
  },
  {
    id: 4,
    username: "David L.",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1200&fit=crop",
    title: "Testimony",
  },
  {
    id: 5,
    username: "Emma S.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=800&h=1200&fit=crop",
    title: "Blessed Life",
  },
  {
    id: 6,
    username: "Michael P.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=1200&fit=crop",
    title: "Worship",
  },
  {
    id: 7,
    username: "Jessica R.",
    avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=800&h=1200&fit=crop",
    title: "Hope",
  },
  {
    id: 8,
    username: "Chris T.",
    avatarUrl: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=1200&fit=crop",
    title: "Grace",
  },
  {
    id: 9,
    username: "Rachel K.",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?w=800&h=1200&fit=crop",
    title: "Joy",
  },
  {
    id: 10,
    username: "Daniel M.",
    avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1532635270-9c30f79d45ed?w=800&h=1200&fit=crop",
    title: "Peace",
  },
];

export default function HighlightReel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sampleStories.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + sampleStories.length) % sampleStories.length);
    setIsPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sampleStories.length);
    setIsPlaying(false);
  };

  const currentStory = sampleStories[currentIndex];

  return (
    <div className="bg-gradient-to-b from-muted/50 to-background border-y border-border/50">
      <div className="container py-8">
        {/* Stories Thumbnails */}
        <div className="flex items-center gap-4 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {sampleStories.map((story, index) => (
            <button
              key={story.id}
              onClick={() => {
                setCurrentIndex(index);
                setIsPlaying(false);
              }}
              className="flex flex-col items-center gap-2 flex-shrink-0 group"
            >
              <div
                className={`relative ${
                  index === currentIndex
                    ? "ring-4 ring-primary ring-offset-2"
                    : "ring-2 ring-border hover:ring-primary/50"
                } rounded-full p-1 transition-all`}
              >
                <img
                  src={story.avatarUrl}
                  alt={story.username}
                  className="w-16 h-16 rounded-full object-cover"
                />
                {index === currentIndex && (
                  <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
                )}
              </div>
              <span className="text-xs font-medium text-foreground truncate w-16 text-center">
                {story.username}
              </span>
            </button>
          ))}
        </div>

        {/* Main Story Display */}
        <div className="relative max-w-md mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-muted shadow-2xl"
            >
              <img
                src={currentStory.imageUrl}
                alt={currentStory.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
              
              {/* Progress Bars */}
              <div className="absolute top-4 left-4 right-4 flex gap-1">
                {sampleStories.map((_, index) => (
                  <div
                    key={index}
                    className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
                  >
                    <div
                      className={`h-full bg-white transition-all duration-300 ${
                        index < currentIndex
                          ? "w-full"
                          : index === currentIndex
                          ? "w-full animate-progress"
                          : "w-0"
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* Story Header */}
              <div className="absolute top-8 left-4 right-4 flex items-center gap-3 mt-4">
                <img
                  src={currentStory.avatarUrl}
                  alt={currentStory.username}
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm">{currentStory.username}</p>
                  <p className="text-white/80 text-xs">5m ago</p>
                </div>
              </div>

              {/* Story Content */}
              <div className="absolute bottom-8 left-4 right-4">
                <h3 className="text-white text-2xl font-bold mb-2">{currentStory.title}</h3>
                <p className="text-white/90 text-sm">
                  Sharing my faith journey with the community 🙏
                </p>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Auto-play indicator */}
        <div className="text-center mt-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {isPlaying ? "⏸ Pause" : "▶ Play"} Auto-Rotate
          </button>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress 5s linear;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
