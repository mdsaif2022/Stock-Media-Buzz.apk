import { useEffect, useState, useRef } from "react";

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
  
  // Use proxy endpoint for video thumbnails to avoid CORS issues
  // If mediaId is provided, use the preview proxy endpoint
  // CRITICAL: Use absolute URL in production (Vercel) to ensure correct domain
  const getProxyUrl = (id: string) => {
    if (typeof window !== 'undefined') {
      // Use current origin to ensure correct domain in production
      return `${window.location.origin}/api/media/preview/${id}`;
    }
    return `/api/media/preview/${id}`;
  };
  
  const thumbnailVideoUrl = mediaId && videoUrl
    ? getProxyUrl(mediaId)
    : videoUrl;
  
  // Check cache first for initial state
  const cachedThumbnail = thumbnailVideoUrl && thumbnailCache.has(thumbnailVideoUrl)
    ? thumbnailCache.get(thumbnailVideoUrl)
    : undefined;
  
  // Use ref to persist thumbnail across effect re-runs - CRITICAL for preventing disappearing
  const persistentThumbnailRef = useRef<string | undefined>(
    hasValidExisting ? existing || undefined : cachedThumbnail || undefined
  );
  
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>(
    persistentThumbnailRef.current
  );
  const [status, setStatus] = useState<ThumbnailStatus>(
    hasValidExisting || cachedThumbnail ? "ready" : "idle"
  );

  useEffect(() => {
    const existingIsImage = isLikelyImageSource(existing);

    if (existingIsImage) {
      // Only update if different to prevent unnecessary re-renders
      if (persistentThumbnailRef.current !== existing) {
        persistentThumbnailRef.current = existing || undefined;
        setThumbnailUrl(existing || undefined);
        setStatus("ready");
      }
      return;
    }

    if (!videoUrl || !thumbnailVideoUrl) {
      // CRITICAL: Never clear if we already have a persistent thumbnail
      // This is the key fix - we check the ref, not the state
      if (!persistentThumbnailRef.current || persistentThumbnailRef.current === FALLBACK_THUMBNAIL) {
        persistentThumbnailRef.current = undefined;
        setThumbnailUrl(undefined);
        setStatus("idle");
      } else {
        // We have a persistent thumbnail, restore it if state was cleared
        if (!thumbnailUrl || thumbnailUrl === FALLBACK_THUMBNAIL) {
          setThumbnailUrl(persistentThumbnailRef.current);
          setStatus("ready");
        }
      }
      return;
    }

    // Check cache first - if we have it, use it immediately
    if (thumbnailCache.has(thumbnailVideoUrl)) {
      const cachedThumbnail = thumbnailCache.get(thumbnailVideoUrl);
      // Update both ref and state if different
      if (persistentThumbnailRef.current !== cachedThumbnail && cachedThumbnail) {
        persistentThumbnailRef.current = cachedThumbnail;
        setThumbnailUrl(cachedThumbnail);
        setStatus("ready");
      } else if (!thumbnailUrl || thumbnailUrl === FALLBACK_THUMBNAIL) {
        // Restore from ref if state was cleared
        setThumbnailUrl(persistentThumbnailRef.current || cachedThumbnail);
        setStatus("ready");
      }
      return;
    }

    // CRITICAL: If we already have a valid persistent thumbnail, NEVER reset it
    // This is the main fix - check the ref, not the state
    if (persistentThumbnailRef.current && persistentThumbnailRef.current !== FALLBACK_THUMBNAIL) {
      // We already have a thumbnail in ref, restore it to state if needed
      if (!thumbnailUrl || thumbnailUrl === FALLBACK_THUMBNAIL) {
        setThumbnailUrl(persistentThumbnailRef.current);
        setStatus("ready");
      }
      // Don't start new extraction - we already have a thumbnail
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
        // Only update if not cancelled
        if (!isCancelled) {
          // CRITICAL: Update both ref and state - ref ensures persistence across re-renders
          persistentThumbnailRef.current = dataUrl;
          setThumbnailUrl(dataUrl);
          setStatus("ready");
          
          if (process.env.NODE_ENV === 'development') {
            console.log("Video thumbnail extracted and set (persistent):", dataUrl.substring(0, 50) + "...");
          }
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
      // Log error details for debugging (especially important in production)
      const errorDetails = {
        code: (e.target as HTMLVideoElement)?.error?.code,
        message: (e.target as HTMLVideoElement)?.error?.message,
        url: thumbnailVideoUrl,
        mediaId,
      };
      
      if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
        console.warn("Video thumbnail error:", errorDetails);
      }
      fallback();
    };

    const fallback = () => {
      if (isCancelled) return;
      // Only set fallback if we don't already have a valid persistent thumbnail
      // Check ref, not state - this prevents overwriting a good thumbnail
      if (!persistentThumbnailRef.current || persistentThumbnailRef.current === FALLBACK_THUMBNAIL) {
        persistentThumbnailRef.current = FALLBACK_THUMBNAIL;
        thumbnailCache.set(thumbnailVideoUrl, FALLBACK_THUMBNAIL);
        setThumbnailUrl(FALLBACK_THUMBNAIL);
        setStatus("error");
      } else {
        // We have a valid thumbnail in ref, restore it and cache it
        thumbnailCache.set(thumbnailVideoUrl, persistentThumbnailRef.current);
        setThumbnailUrl(persistentThumbnailRef.current);
        setStatus("ready");
      }
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

  // Always return persistent thumbnail if available, otherwise use state or fallback
  // This ensures thumbnails never disappear even if state is temporarily cleared
  const finalThumbnail = persistentThumbnailRef.current || thumbnailUrl || FALLBACK_THUMBNAIL;
  
  return {
    thumbnailUrl: finalThumbnail,
    status,
  };
}

