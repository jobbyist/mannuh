import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2, VolumeX, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  audioUrl?: string;
  title: string;
  subtitle?: string;
  variant?: "compact" | "full" | "inline";
  className?: string;
  isPremium?: boolean;
  userIsPremium?: boolean;
}

export default function AudioPlayer({
  audioUrl,
  title,
  subtitle,
  variant = "full",
  className,
  isPremium = false,
  userIsPremium = false,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Premium access check
  const canPlay = !isPremium || userIsPremium;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    if (!canPlay) return;
    
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newVolume = value[0];
    audio.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isMuted) {
      audio.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (variant === "inline") {
    return (
      <div className={cn("flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-[oklch(0.82_0.06_240_/_0.1)] to-[oklch(0.88_0.05_330_/_0.1)] border border-[oklch(0.82_0.06_240_/_0.2)]", className)}>
        <Headphones className="w-5 h-5 text-primary flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm truncate">{title}</p>
          {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
        </div>
        {!canPlay ? (
          <Button size="sm" variant="outline" className="flex-shrink-0 bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] text-white border-none">
            Upgrade to Listen
          </Button>
        ) : (
          <Button
            size="sm"
            variant="ghost"
            onClick={togglePlayPause}
            className="flex-shrink-0 hover:bg-[oklch(0.82_0.06_240_/_0.15)]"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </Button>
        )}
        {audioUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" />}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-3 p-3 rounded-lg bg-background border", className)}>
        <Button
          size="sm"
          variant="ghost"
          onClick={togglePlayPause}
          disabled={!canPlay}
          className="flex-shrink-0 hover:bg-[oklch(0.82_0.06_240_/_0.15)]"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5 ml-0.5" />
          )}
        </Button>
        
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">{title}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-muted-foreground">{formatTime(currentTime)}</span>
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              onValueChange={handleSeek}
              disabled={!canPlay}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground">{formatTime(duration)}</span>
          </div>
        </div>

        {!canPlay && (
          <span className="text-xs font-medium text-primary px-2 py-1 rounded bg-[oklch(0.82_0.06_240_/_0.1)]">
            Premium
          </span>
        )}
        
        {audioUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" />}
      </div>
    );
  }

  // Full variant
  return (
    <div className={cn("p-6 rounded-xl bg-gradient-to-br from-background to-[oklch(0.82_0.06_240_/_0.05)] border shadow-sm", className)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg truncate">{title}</h3>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        {isPremium && (
          <span className="ml-3 flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] text-white">
            Premium
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div className="space-y-2 mb-6">
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={1}
          onValueChange={handleSeek}
          disabled={!canPlay}
          className="cursor-pointer"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <Button
          onClick={togglePlayPause}
          disabled={!canPlay}
          size="lg"
          className="rounded-full w-14 h-14 bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] hover:opacity-90 transition-opacity shadow-lg"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-1" />
          )}
        </Button>

        {/* Volume Control */}
        <div className="flex items-center gap-3 flex-1 max-w-xs ml-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMute}
            disabled={!canPlay}
            className="flex-shrink-0"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            disabled={!canPlay}
            className="flex-1"
          />
        </div>

        {!canPlay && (
          <Button
            size="lg"
            variant="outline"
            className="ml-auto bg-gradient-to-r from-[oklch(0.82_0.06_240_/_0.1)] to-[oklch(0.88_0.05_330_/_0.1)] border-[oklch(0.82_0.06_240_/_0.3)] hover:border-[oklch(0.82_0.06_240_/_0.5)]"
          >
            Upgrade to Premium
          </Button>
        )}
      </div>

      {audioUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" />}
    </div>
  );
}
