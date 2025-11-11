import { RequestHandler } from "express";
import { DownloadResponse } from "@shared/api";

// Track downloads
const downloadLog: Array<{ mediaId: string; userId: string; timestamp: string }> = [];

// Trigger download with ad display
export const initiateDownload: RequestHandler = (req, res) => {
  const { mediaId } = req.params;
  const userId = req.user?.id || "anonymous";

  if (!mediaId) {
    res.status(400).json({ error: "Media ID is required" });
    return;
  }

  // Log the download
  downloadLog.push({
    mediaId,
    userId,
    timestamp: new Date().toISOString(),
  });

  // Generate signed download URL (in production, use Cloudinary signed URLs)
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);

  const response: DownloadResponse = {
    downloadUrl: `https://cloudinary.example.com/download/${mediaId}`,
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
