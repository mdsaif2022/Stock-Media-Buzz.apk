import { useEffect, useState } from "react";

const FALLBACK_THUMBNAIL = "https://placehold.co/640x360?text=Video";
const thumbnailCache = new Map<string, string>();

type ThumbnailStatus = "idle" | "loading" | "ready" | "error";

function isLikelyImageSource(url?: string | null): boolean {
  if (!url) {
    return false;
  }

  if (url.startsWith("data:image")) {
    return true;
  }

  try {
    const sanitized = url.split("?")[0].toLowerCase();
    return /\.(png|jpe?g|gif|webp|svg)$/i.test(sanitized);
  } catch {
    return false;
  }
}

export function useVideoThumbnail(videoUrl?: string, existing?: string | null, mediaId?: string) {
  const hasValidExisting = isLikelyImageSource(existing);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>(
    hasValidExisting ? existing || undefined : undefined
  );
  const [status, setStatus] = useState<ThumbnailStatus>(hasValidExisting ? "ready" : "idle");

  useEffect(() => {
    const existingIsImage = isLikelyImageSource(existing);

    if (existingIsImage) {
      setThumbnailUrl(existing || undefined);
      setStatus("ready");
      return;
    }

    if (!videoUrl) {
      setThumbnailUrl(undefined);
      setStatus("idle");
      return;
    }

    // Use proxy endpoint for video thumbnails to avoid CORS issues
    // If mediaId is provided, use the preview proxy endpoint
    const thumbnailVideoUrl = mediaId 
      ? `/api/media/preview/${mediaId}`
      : videoUrl;

    if (thumbnailCache.has(thumbnailVideoUrl)) {
      setThumbnailUrl(thumbnailCache.get(thumbnailVideoUrl));
      setStatus("ready");
      return;
    }

    let isCancelled = false;
    setStatus("loading");

    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.preload = "metadata";
    video.src = thumbnailVideoUrl;

    const extractThumbnail = () => {
      if (isCancelled) return;
      
      // Ensure video has valid dimensions
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        if (process.env.NODE_ENV === 'development') {
          console.warn("Video dimensions not available yet, waiting...");
        }
        return;
      }

      try {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          fallback();
          return;
        }

        // Draw the current video frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert to data URL
        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
        
        // Cache and set thumbnail
        thumbnailCache.set(thumbnailVideoUrl, dataUrl);
        setThumbnailUrl(dataUrl);
        setStatus("ready");
        
        if (process.env.NODE_ENV === 'development') {
          console.log("Video thumbnail extracted successfully");
        }
      } catch (error) {
        console.error("Failed to extract video thumbnail:", error);
        fallback();
      }
    };

    const handleLoadedMetadata = () => {
      if (isCancelled) return;
      
      // Seek to 1 second (or 10% of duration) for a better thumbnail
      // First frame (0s) is often black
      if (video.duration && video.duration > 0) {
        const seekTime = Math.min(1, video.duration * 0.1);
        video.currentTime = seekTime;
      } else {
        // If duration not available, try to extract from first frame
        extractThumbnail();
      }
    };

    const handleSeeked = () => {
      if (isCancelled) return;
      // Video has seeked to the desired time, now extract thumbnail
      extractThumbnail();
    };

    const handleCanPlay = () => {
      if (isCancelled) return;
      // If we haven't seeked yet and video can play, try to extract
      if (video.currentTime === 0 && video.duration > 0) {
        const seekTime = Math.min(1, video.duration * 0.1);
        video.currentTime = seekTime;
      } else if (video.videoWidth > 0 && video.videoHeight > 0) {
        // Video is ready, extract thumbnail
        extractThumbnail();
      }
    };

    const handleError = (e: Event) => {
      if (isCancelled) return;
      if (process.env.NODE_ENV === 'development') {
        console.warn("Video thumbnail error:", e);
      }
      fallback();
    };

    const fallback = () => {
      if (isCancelled) return;
      thumbnailCache.set(thumbnailVideoUrl, FALLBACK_THUMBNAIL);
      setThumbnailUrl(FALLBACK_THUMBNAIL);
      setStatus("error");
    };

    // Try multiple events for better compatibility
    video.addEventListener("loadedmetadata", handleLoadedMetadata, { once: true });
    video.addEventListener("seeked", handleSeeked, { once: true });
    video.addEventListener("canplay", handleCanPlay, { once: true });
    video.addEventListener("loadeddata", handleCanPlay, { once: true });
    video.addEventListener("error", handleError, { once: true });
    
    // Fallback timeout - if thumbnail extraction takes too long, use fallback
    const timeoutId = setTimeout(() => {
      if (isCancelled) return;
      if (process.env.NODE_ENV === 'development') {
        console.warn("Video thumbnail extraction timeout, using fallback");
      }
      fallback();
    }, 10000); // 10 second timeout

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadeddata", handleCanPlay);
      video.removeEventListener("error", handleError);
      video.src = "";
    };
  }, [videoUrl, existing, mediaId]);

  return {
    thumbnailUrl: thumbnailUrl || FALLBACK_THUMBNAIL,
    status,
  };
}

