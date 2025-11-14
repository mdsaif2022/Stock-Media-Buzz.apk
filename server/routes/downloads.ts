import { RequestHandler } from "express";
import { DownloadResponse } from "@shared/api";
import { mediaDatabase } from "./media.js";

// Track downloads
const downloadLog: Array<{ mediaId: string; userId: string; timestamp: string }> = [];

// Proxy download file to bypass CORS
export const proxyDownload: RequestHandler = async (req, res) => {
  const { mediaId } = req.params;
  
  if (!mediaId) {
    res.status(400).json({ error: "Media ID is required" });
    return;
  }

  try {
    // Find media in database
    const media = mediaDatabase.find((m) => m.id === mediaId);
    
    if (!media) {
      res.status(404).json({ error: "Media not found" });
      return;
    }

    // Fetch the file from Cloudinary
    const fileResponse = await fetch(media.fileUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    if (!fileResponse.ok) {
      throw new Error(`Failed to fetch file: ${fileResponse.statusText}`);
    }

    // Get content type
    const contentType = fileResponse.headers.get('content-type') || 'application/octet-stream';
    
    // Determine filename
    let fileExtension = 'mp4';
    const urlParts = media.fileUrl.split('.');
    if (urlParts.length > 1) {
      const lastPart = urlParts[urlParts.length - 1].split('?')[0].split('#')[0];
      if (lastPart && lastPart.length <= 5) {
        fileExtension = lastPart.toLowerCase();
      }
    }
    
    // Try to get extension from content type or URL
    const urlLower = media.fileUrl.toLowerCase();
    if (urlLower.endsWith('.apk')) {
      fileExtension = 'apk';
    } else if (urlLower.endsWith('.xapk')) {
      fileExtension = 'xapk';
    } else if (contentType.includes('image/jpeg') || contentType.includes('image/jpg')) {
      fileExtension = 'jpg';
    } else if (contentType.includes('image/png')) {
      fileExtension = 'png';
    } else if (contentType.includes('image/gif')) {
      fileExtension = 'gif';
    } else if (contentType.includes('image/webp')) {
      fileExtension = 'webp';
    } else if (contentType.includes('video/mp4')) {
      fileExtension = 'mp4';
    } else if (contentType.includes('video/webm')) {
      fileExtension = 'webm';
    } else if (contentType.includes('audio/mpeg') || contentType.includes('audio/mp3')) {
      fileExtension = 'mp3';
    } else if (contentType.includes('audio/wav')) {
      fileExtension = 'wav';
    } else if (contentType.includes('audio/ogg')) {
      fileExtension = 'ogg';
    } else if (contentType.includes('application/vnd.android.package-archive')) {
      fileExtension = 'apk';
    }

    const filename = `${media.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${fileExtension}`;

    // Set headers for download
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', fileResponse.headers.get('content-length') || '0');
    res.setHeader('Cache-Control', 'no-cache');

    // Stream the file to the response
    const buffer = await fileResponse.arrayBuffer();
    res.send(Buffer.from(buffer));

    // Log the download
    const userId = (req as any).user?.id || "anonymous";
    downloadLog.push({
      mediaId,
      userId,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Proxy download error:", error);
    res.status(500).json({ error: "Failed to download file", message: error.message });
  }
};

// Trigger download with ad display (legacy endpoint)
export const initiateDownload: RequestHandler = (req, res) => {
  const { mediaId } = req.params;
  const userId = (req as any).user?.id || "anonymous";

  if (!mediaId) {
    res.status(400).json({ error: "Media ID is required" });
    return;
  }

  // Find media to get the file URL
  const media = mediaDatabase.find((m) => m.id === mediaId);

  if (!media) {
    res.status(404).json({ error: "Media not found" });
    return;
  }

  // Log the download
  downloadLog.push({
    mediaId,
    userId,
    timestamp: new Date().toISOString(),
  });

  // Return proxy download URL
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);

  const response: DownloadResponse = {
    downloadUrl: `/api/download/proxy/${mediaId}`,
    expiresAt: expiresAt.toISOString(),
  };

  res.json(response);
};

// Get download history for user
export const getDownloadHistory: RequestHandler = (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const userDownloads = downloadLog.filter((d) => d.userId === userId);

  res.json({
    totalDownloads: userDownloads.length,
    downloads: userDownloads.slice(-20), // Last 20 downloads
  });
};

// Get download statistics (admin only)
export const getDownloadStats: RequestHandler = (req, res) => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ error: "Admin access required" });
    return;
  }

  const stats = {
    totalDownloads: downloadLog.length,
    todayDownloads: downloadLog.filter((d) => {
      const date = new Date(d.timestamp);
      const today = new Date();
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    }).length,
    uniqueUsers: new Set(downloadLog.map((d) => d.userId)).size,
    topDownloads: getTopDownloads(),
  };

  res.json(stats);
};

// Helper function to get top downloaded media
function getTopDownloads() {
  const counts: Record<string, number> = {};

  downloadLog.forEach((d) => {
    counts[d.mediaId] = (counts[d.mediaId] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([mediaId, count]) => ({
      mediaId,
      downloads: count,
    }))
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 10);
}
