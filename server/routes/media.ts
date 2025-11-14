import { RequestHandler } from "express";
import { Media, MediaResponse, MediaUploadRequest } from "@shared/api";
import { promises as fs } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to the data file
const DATA_DIR = join(__dirname, "../data");
const MEDIA_DB_FILE = join(DATA_DIR, "media-database.json");

// Default initial data
const DEFAULT_MEDIA: Media[] = [
  {
    id: "1",
    title: "Cinematic Urban Sunset",
    description: "A stunning 4K video of an urban sunset with beautiful golden and orange hues",
    category: "video",
    type: "4K",
    fileSize: "1.2 GB",
    duration: "00:45",
    previewUrl: "https://via.placeholder.com/1280x720?text=Urban+Sunset",
    fileUrl: "https://cloudinary.example.com/media/1",
    tags: ["sunset", "urban", "4k", "cinematic"],
    downloads: 12500,
    views: 45300,
    isPremium: false,
    uploadedBy: "CreativeStudio Pro",
    uploadedDate: "2024-11-15",
    cloudinaryAccount: 1,
  },
  {
    id: "2",
    title: "Professional Business Background",
    description: "High-quality business background image perfect for presentations",
      category: "image",
      type: "5K",
      fileSize: "2.4 MB",
      previewUrl: "https://via.placeholder.com/1280x720?text=Business+BG",
      fileUrl: "https://cloudinary.example.com/media/2",
      tags: ["business", "professional", "background"],
      downloads: 8300,
      views: 24500,
      isPremium: true,
      uploadedBy: "DesignHub",
      uploadedDate: "2024-11-14",
      cloudinaryAccount: 2,
    },
    {
      id: "3",
      title: "Sample Android App",
      description: "Example APK file for testing - download and install on your Android device",
      category: "apk",
      type: "Android APK",
      fileSize: "15.2 MB",
      previewUrl: "https://via.placeholder.com/1280x720?text=Android+APK",
      fileUrl: "https://cloudinary.example.com/media/3",
      tags: ["android", "app", "apk"],
      downloads: 5200,
      views: 15200,
      isPremium: false,
      uploadedBy: "App Developer",
      uploadedDate: "2024-11-16",
      cloudinaryAccount: 1,
    },
  ];

// Load media database from file
async function loadMediaDatabase(): Promise<Media[]> {
  try {
    // Ensure data directory exists
    await fs.mkdir(DATA_DIR, { recursive: true });
    
    // Try to read existing file
    const data = await fs.readFile(MEDIA_DB_FILE, "utf-8");
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : DEFAULT_MEDIA;
  } catch (error: any) {
    // File doesn't exist or is invalid, return default data
    if (error.code === "ENOENT") {
      // Save default data to file
      await saveMediaDatabase(DEFAULT_MEDIA);
      return DEFAULT_MEDIA;
    }
    console.error("Error loading media database:", error);
    return DEFAULT_MEDIA;
  }
}

// Save media database to file
async function saveMediaDatabase(data: Media[]): Promise<void> {
  try {
    // Ensure data directory exists
    await fs.mkdir(DATA_DIR, { recursive: true });
    
    // Write to file
    await fs.writeFile(MEDIA_DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving media database:", error);
    throw error;
  }
}

// Initialize mediaDatabase - start with default data, load async
let mediaDatabase: Media[] = [...DEFAULT_MEDIA];

// Load database from file on startup
loadMediaDatabase()
  .then((loaded) => {
    mediaDatabase = loaded;
    console.log(`Loaded ${loaded.length} media items from database`);
  })
  .catch((error) => {
    console.error("Failed to load media database, using defaults:", error);
  });

// Export mediaDatabase for use in upload handler
export { mediaDatabase, saveMediaDatabase };

// Get all media with pagination and filtering
export const getMedia: RequestHandler = (req, res) => {
  const { page = 1, pageSize = 20, category, search } = req.query;

  let filtered = [...mediaDatabase];

  if (category) {
    // Normalize category to lowercase for case-insensitive comparison
    const normalizedCategory = (category as string).toLowerCase();
    filtered = filtered.filter((m) => m.category.toLowerCase() === normalizedCategory);
  }

  if (search) {
    const searchLower = (search as string).toLowerCase();
    filtered = filtered.filter(
      (m) =>
        m.title.toLowerCase().includes(searchLower) ||
        m.description.toLowerCase().includes(searchLower) ||
        m.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  }

  const pageNum = parseInt(page as string) || 1;
  const pageSizeNum = parseInt(pageSize as string) || 20;
  const start = (pageNum - 1) * pageSizeNum;
  const end = start + pageSizeNum;

  const paginatedData = filtered.slice(start, end);

  const response: MediaResponse = {
    data: paginatedData,
    total: filtered.length,
    page: pageNum,
    pageSize: pageSizeNum,
  };

  res.json(response);
};

// Get single media by ID
export const getMediaById: RequestHandler = (req, res) => {
  const { id } = req.params;
  const media = mediaDatabase.find((m) => m.id === id);

  if (!media) {
    res.status(404).json({ error: "Media not found" });
    return;
  }

  res.json(media);
};

// Create new media (admin only)
export const createMedia: RequestHandler = async (req, res) => {
  const { title, description, category, type, tags, isPremium, previewUrl, fileUrl }: MediaUploadRequest = req.body;

  if (!title || !category || !fileUrl) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const newMedia: Media = {
    id: Date.now().toString(),
    title,
    description,
    category,
    type,
    fileSize: "1 MB",
    previewUrl,
    fileUrl,
    tags,
    downloads: 0,
    views: 0,
    isPremium,
    uploadedBy: req.user?.name || "Admin",
    uploadedDate: new Date().toISOString().split("T")[0],
    cloudinaryAccount: 1,
  };

  mediaDatabase.push(newMedia);

  try {
    await saveMediaDatabase(mediaDatabase);
    res.status(201).json(newMedia);
  } catch (error) {
    console.error("Failed to save media:", error);
    res.status(500).json({ error: "Failed to save media" });
  }
};

// Update media (admin only)
export const updateMedia: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const media = mediaDatabase.find((m) => m.id === id);

  if (!media) {
    res.status(404).json({ error: "Media not found" });
    return;
  }

  Object.assign(media, req.body);

  try {
    await saveMediaDatabase(mediaDatabase);
    res.json(media);
  } catch (error) {
    console.error("Failed to save media:", error);
    res.status(500).json({ error: "Failed to save media" });
  }
};

// Delete media (admin only)
export const deleteMedia: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const index = mediaDatabase.findIndex((m) => m.id === id);

  if (index === -1) {
    res.status(404).json({ error: "Media not found" });
    return;
  }

  mediaDatabase.splice(index, 1);

  try {
    await saveMediaDatabase(mediaDatabase);
    res.json({ message: "Media deleted successfully" });
  } catch (error) {
    console.error("Failed to save media:", error);
    res.status(500).json({ error: "Failed to save media" });
  }
};

// Get trending media
export const getTrendingMedia: RequestHandler = (req, res) => {
  const trending = [...mediaDatabase]
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 10);

  res.json(trending);
};
