import { useEffect, useRef, useState } from "react";
import { RotateCcw, RotateCw, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatMediaTimestamp } from "@/lib/media";

interface VideoPlayerProps {
  src: string;
  poster?: string | null;
  preload?: "none" | "metadata" | "auto";
  className?: string;
}

export function VideoPlayer({ src, poster, preload = "metadata", className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isDoubleClickRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const seekBy = (offset: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    // Check if media is ready and has valid duration
    const mediaDuration = video.duration;
    const validDuration = (mediaDuration && isFinite(mediaDuration) && mediaDuration > 0) 
      ? mediaDuration 
      : (duration && isFinite(duration) && duration > 0) 
        ? duration 
        : null;
    
    // If no valid duration, we can still seek but with no upper bound
    const currentTime = video.currentTime || 0;
    const newTime = currentTime + offset;
    
    if (validDuration !== null) {
      video.currentTime = Math.min(Math.max(newTime, 0), validDuration);
    } else {
      // Even without duration, we can seek forward/backward from current position
      video.currentTime = Math.max(newTime, 0);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reset duration when src changes
    setDuration(0);
    setCurrentTime(0);

    // Force video to load metadata (only if src is already set)
    if (video.src || video.getAttribute('src')) {
      // Small delay to ensure src is set, then load
      setTimeout(() => {
        if (video.readyState === 0) {
          video.load();
        }
      }, 50);
    }

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    let lastDuration = 0;
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      // Also check duration during playback (some videos only reveal duration after starting)
      if (video.duration && isFinite(video.duration) && video.duration > 0 && lastDuration === 0) {
        lastDuration = video.duration;
        setDuration(video.duration);
      }
    };
    
    // Helper function to update duration
    const updateDuration = () => {
      const dur = video.duration;
      if (dur && isFinite(dur) && dur > 0) {
        setDuration(dur);
        return true;
      }
      return false;
    };
    
    // Multiple handlers to catch duration from different events
    const handleLoadedMetadata = () => {
      updateDuration();
    };
    
    const handleDurationChange = () => {
      updateDuration();
    };
    
    const handleLoadedData = () => {
      updateDuration();
    };
    
    const handleCanPlay = () => {
      updateDuration();
    };
    
    const handleCanPlayThrough = () => {
      updateDuration();
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("durationchange", handleDurationChange);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("canplaythrough", handleCanPlayThrough);
    
    // Immediate check
    setTimeout(() => updateDuration(), 100);
    
    // Fallback: check duration periodically if still 0 (for videos that load slowly)
    let attempts = 0;
    const durationInterval = setInterval(() => {
      attempts++;
      if (updateDuration()) {
        clearInterval(durationInterval);
      } else if (attempts > 40) {
        // Stop checking after 20 seconds (40 * 500ms)
        clearInterval(durationInterval);
      }
    }, 500);

    return () => {
      clearInterval(durationInterval);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("durationchange", handleDurationChange);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("canplaythrough", handleCanPlayThrough);
    };
  }, [src]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div ref={containerRef} className={cn("w-full rounded-xl overflow-hidden shadow-md bg-black relative", className)}>
      <video
        ref={videoRef}
        src={src}
        poster={poster ?? undefined}
        preload={preload}
        controls={duration > 0}
        className="w-full h-full bg-black"
        onClick={duration === 0 ? handleVideoClick : undefined}
        onLoadedMetadata={(e) => {
          const video = e.currentTarget;
          if (video.duration && isFinite(video.duration) && video.duration > 0) {
            setDuration(video.duration);
          }
        }}
      />
      {duration === 0 && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer z-10"
          onClick={handleVideoClick}
        >
          <div className="bg-white/90 rounded-full p-4 hover:bg-white transition-colors">
            <Play className="w-8 h-8 text-black fill-black" />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-2 px-4 py-3 bg-slate-900 text-white text-sm">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              if (isDoubleClickRef.current) {
                isDoubleClickRef.current = false;
                return;
              }
              clickTimeoutRef.current = setTimeout(() => {
                if (!isDoubleClickRef.current) {
                  seekBy(-10);
                }
                clickTimeoutRef.current = null;
              }, 300);
            }}
            onDoubleClick={(e) => {
              e.preventDefault();
              isDoubleClickRef.current = true;
              if (clickTimeoutRef.current) {
                clearTimeout(clickTimeoutRef.current);
                clickTimeoutRef.current = null;
              }
              seekBy(-30);
              // Reset flag after a short delay
              setTimeout(() => {
                isDoubleClickRef.current = false;
              }, 100);
            }}
            className="flex items-center gap-1 rounded-full bg-white/10 hover:bg-white/20 px-3 py-1 transition-colors select-none"
          >
            <RotateCcw className="w-4 h-4" /> 10s
          </button>
          <button
            type="button"
            onClick={(e) => {
              if (isDoubleClickRef.current) {
                isDoubleClickRef.current = false;
                return;
              }
              clickTimeoutRef.current = setTimeout(() => {
                if (!isDoubleClickRef.current) {
                  seekBy(10);
                }
                clickTimeoutRef.current = null;
              }, 300);
            }}
            onDoubleClick={(e) => {
              e.preventDefault();
              isDoubleClickRef.current = true;
              if (clickTimeoutRef.current) {
                clearTimeout(clickTimeoutRef.current);
                clickTimeoutRef.current = null;
              }
              seekBy(30);
              // Reset flag after a short delay
              setTimeout(() => {
                isDoubleClickRef.current = false;
              }, 100);
            }}
            className="flex items-center gap-1 rounded-full bg-white/10 hover:bg-white/20 px-3 py-1 transition-colors select-none"
          >
            10s <RotateCw className="w-4 h-4" />
          </button>
        </div>

        <div className="font-mono text-xs tabular-nums text-white/80">
          {formatMediaTimestamp(currentTime)} / {formatMediaTimestamp(duration)}
        </div>

        <div className="text-xs text-white/60">{isPlaying ? "Playing" : "Paused"}</div>
      </div>
    </div>
  );
}


