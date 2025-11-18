import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Play, Video } from "lucide-react";
import { Media } from "@shared/api";
import { useVideoThumbnail } from "@/hooks/useVideoThumbnail";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  media: Media;
  to: string;
  variant?: "detailed" | "compact";
  className?: string;
}

const PREVIEW_DURATION = 5;

export function VideoCard({ media, to, variant = "detailed", className }: VideoCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(cardRef, { threshold: 0.4 });
  const supportsHover = useSupportsHover();

  const [isHovering, setIsHovering] = useState(false);
  const [isPreviewReady, setIsPreviewReady] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  const { thumbnailUrl } = useVideoThumbnail(media.fileUrl, media.previewUrl);

  const shouldLoadVideo = isInView || isHovering;
  
  // Use proxy URL for video preview to avoid CORS issues
  // Only use proxy for videos, not other media types
  const isVideo = media.category?.toLowerCase() === "video";
  const videoUrl = (media.fileUrl && isVideo)
    ? `/api/media/preview/${media.id}` 
    : "";

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoadVideo || !supportsHover) return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= PREVIEW_DURATION) {
        video.pause();
        video.currentTime = 0;
        setIsHovering(false);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [shouldLoadVideo, supportsHover]);

  // Load video source when hovering
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl || !isVideo) return;

    if (isHovering && shouldLoadVideo && supportsHover && !previewError) {
      // Set video src if not already set or if it changed
      const currentSrc = video.getAttribute('src') || video.src;
      if (!currentSrc || currentSrc !== videoUrl) {
        video.src = videoUrl;
        video.load(); // Force reload
      }
    }
  }, [isHovering, shouldLoadVideo, supportsHover, videoUrl, isVideo, previewError]);

  // Play/pause video based on hover state
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl || !isVideo) return;

    if (isHovering && shouldLoadVideo && supportsHover && !previewError && isPreviewReady) {
      // Wait for video to be ready before playing
      const tryPlay = () => {
        if (video.readyState >= 2) { // HAVE_CURRENT_DATA
          video.currentTime = 0;
          const playPromise = video.play();
          if (playPromise) {
            playPromise.catch(() => {
              // Ignore play errors (e.g., autoplay blocked)
            });
          }
        } else {
          // Wait for video to load
          const handleLoadedData = () => {
            video.currentTime = 0;
            const playPromise = video.play();
            if (playPromise) {
              playPromise.catch(() => {
                // Ignore play errors
              });
            }
          };
          video.addEventListener('loadeddata', handleLoadedData, { once: true });
          video.addEventListener('canplay', handleLoadedData, { once: true });
        }
      };
      tryPlay();
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isHovering, previewError, shouldLoadVideo, supportsHover, videoUrl, isVideo, isPreviewReady]);

  const meta = useMemo(() => {
    const downloads = Number(media.downloads) || 0;
    const views = Number(media.views) || 0;
    return {
      downloads: downloads.toLocaleString(),
      views: views.toLocaleString(),
      date: media.uploadedDate ? new Date(media.uploadedDate).toLocaleDateString() : "",
    };
  }, [media.downloads, media.views, media.uploadedDate]);

  return (
    <Link
      ref={cardRef}
      to={to}
      className={cn(
        "group bg-white dark:bg-slate-900 border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col touch-manipulation active:scale-[0.98] transition-transform",
        className
      )}
      onMouseEnter={() => supportsHover && setIsHovering(true)}
      onMouseLeave={() => supportsHover && setIsHovering(false)}
      onFocus={() => setIsHovering(false)}
    >
      <div className="relative aspect-video bg-slate-900">
        {media.fileUrl && isVideo ? (
          <>
            <video
              ref={videoRef}
              src={shouldLoadVideo && !previewError && videoUrl ? videoUrl : ""}
              poster={thumbnailUrl}
              muted
              playsInline
              preload={shouldLoadVideo && !previewError ? "metadata" : "none"}
              className={cn("w-full h-full object-cover transition-opacity duration-200 absolute inset-0", {
                "opacity-0": !isPreviewReady || previewError,
                "opacity-100": isPreviewReady && !previewError,
              })}
              onLoadedData={() => {
                setIsPreviewReady(true);
                setPreviewError(false);
              }}
              onCanPlay={() => {
                setIsPreviewReady(true);
                setPreviewError(false);
              }}
              onLoadedMetadata={() => {
                setIsPreviewReady(true);
                setPreviewError(false);
              }}
              onError={(e) => {
                // Silently handle video errors - just show thumbnail instead
                // Common causes: network issues, invalid URL
                console.warn("Video preview error for media:", media.id, e);
                setPreviewError(true);
                setIsPreviewReady(false);
              }}
            />
            {/* Always show thumbnail as fallback */}
            <img
              src={thumbnailUrl}
              alt={media.title}
              className={cn("absolute inset-0 w-full h-full object-cover transition-opacity duration-200", {
                "opacity-0": isPreviewReady && !previewError,
                "opacity-100": !isPreviewReady || previewError,
              })}
              loading="lazy"
              onError={() => {
                // If thumbnail also fails, show unavailable message
                setPreviewError(true);
              }}
            />
            {/* Only show unavailable if both video and thumbnail fail */}
            {previewError && !thumbnailUrl && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-gradient-to-br from-slate-600 to-slate-900 gap-2">
                <Video className="w-10 h-10" />
                <span className="text-sm font-medium">Video preview unavailable</span>
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-gradient-to-br from-slate-600 to-slate-900 gap-2">
            <Video className="w-10 h-10" />
            <span className="text-sm font-medium">Video preview unavailable</span>
          </div>
        )}

        <div
          className={cn(
            "absolute inset-0 pointer-events-none bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center",
            !supportsHover && "opacity-0"
          )}
        >
          <span className="flex items-center justify-center rounded-full bg-white/80 text-slate-900 w-12 h-12 shadow-lg">
            <Play className="w-6 h-6" />
          </span>
        </div>
      </div>

      <div className={cn("p-4 space-y-2 flex-1", variant === "compact" && "p-3")}>
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
          <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">{media.category}</span>
          {variant === "detailed" && meta.date && <span>{meta.date}</span>}
        </div>
        <h3 className={cn("font-semibold leading-tight text-base line-clamp-2 group-hover:text-primary transition-colors")}>
          {media.title}
        </h3>
        {variant === "detailed" && media.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{media.description}</p>
        )}
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>{meta.downloads} downloads</span>
          {variant === "detailed" ? <span>{meta.views} views</span> : <span>{media.type}</span>}
        </div>
      </div>
    </Link>
  );
}

function useSupportsHover() {
  const [supportsHover, setSupportsHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia === "undefined") {
      return;
    }
    const mediaQuery = window.matchMedia("(hover: hover)");
    setSupportsHover(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => setSupportsHover(event.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return supportsHover;
}


