import { v2 as cloudinary } from "cloudinary";

// Cloudinary Account 1
export const cloudinaryAccounts = {
  server1: {
    cloud_name: "dk81tgmae",
    api_key: "255731855284435",
    api_secret: "fFNFWaqqZN2HWjrAmy82tszFLqU",
    secure: true,
  },
  server2: {
    cloud_name: "dxijk3ivo",
    api_key: "155419187991824",
    api_secret: "ClE7gZfBykyHUs2l2Gz3RVc8wZ0",
    secure: true,
    folder_mode: "dynamic",
  },
  server3: {
    cloud_name: "dvdtbffva",
    api_key: "767879943653787",
    api_secret: "okUt1vJMZP1X0aEl9cOYUKwXUGQ",
    secure: true,
    folder_mode: "dynamic",
  },
};

export type CloudinaryServer = "server1" | "server2" | "server3" | "auto";

/**
 * Get Cloudinary configuration for a specific server
 */
export function getCloudinaryConfig(server: CloudinaryServer = "auto") {
  if (server === "auto") {
    // Return the least used server (for now, default to server1)
    // In production, you would track usage and select the least used
    return cloudinaryAccounts.server1;
  }
  return cloudinaryAccounts[server];
}

/**
 * Initialize Cloudinary with a specific server configuration
 */
export function initializeCloudinary(server: CloudinaryServer = "auto") {
  const config = getCloudinaryConfig(server);
  cloudinary.config(config);
  return cloudinary;
}

/**
 * Upload file to Cloudinary
 */
export async function uploadToCloudinary(
  file: Buffer | string,
  options: {
    server?: CloudinaryServer;
    folder?: string;
    resource_type?: "image" | "video" | "raw" | "auto";
    public_id?: string;
    overwrite?: boolean;
  } = {}
): Promise<{
  url: string;
  public_id: string;
  secure_url: string;
  server: CloudinaryServer;
}> {
  const { server = "auto", folder, resource_type = "auto", public_id, overwrite = true } = options;
  
  // Initialize Cloudinary with the specified server
  const config = getCloudinaryConfig(server);
  cloudinary.config(config);
  
  // Prepare upload options
  const uploadOptions: any = {
    resource_type,
    overwrite,
  };

  if (folder) {
    uploadOptions.folder = folder;
  }

  if (public_id) {
    uploadOptions.public_id = public_id;
  }

  // Upload file
  let uploadResult;
  if (typeof file === "string") {
    // If file is a URL, upload from URL
    uploadResult = await cloudinary.uploader.upload(file, uploadOptions);
  } else {
    // If file is a Buffer, use upload_stream with promise
    uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(file);
    }) as any;
  }

  return {
    url: uploadResult.secure_url,
    public_id: uploadResult.public_id,
    secure_url: uploadResult.secure_url,
    server,
  };
}

/**
 * Delete file from Cloudinary
 */
export async function deleteFromCloudinary(
  publicId: string,
  server: CloudinaryServer,
  resource_type: "image" | "video" | "raw" = "image"
): Promise<void> {
  const cloudinaryInstance = initializeCloudinary(server);
  await cloudinaryInstance.uploader.destroy(publicId, {
    resource_type,
  });
}

/**
 * Get Cloudinary URL for a public ID
 */
export function getCloudinaryUrl(publicId: string, server: CloudinaryServer): string {
  const config = getCloudinaryConfig(server);
  return `https://res.cloudinary.com/${config.cloud_name}/${config.api_key === "255731855284435" ? "image" : "video"}/upload/${publicId}`;
}

/**
 * List all resources from Cloudinary
 */
export async function listCloudinaryResources(
  server: CloudinaryServer = "auto",
  options: {
    resource_type?: "image" | "video" | "raw" | "auto";
    max_results?: number;
    next_cursor?: string;
  } = {}
): Promise<{
  resources: any[];
  next_cursor?: string;
}> {
  const config = getCloudinaryConfig(server);
  cloudinary.config(config);
  
  const { resource_type = "image", max_results = 500, next_cursor } = options;
  
  try {
    // Use admin API to list resources
    // Try to get all files including those in folders
    const result = await cloudinary.api.resources({
      resource_type: resource_type === "raw" ? "raw" : resource_type,
      type: "upload", // Only uploaded files, not derived
      max_results,
      next_cursor,
      // Include all folders by not specifying a folder
      // This will get files from root and all subfolders
    });
    
    return {
      resources: result.resources || [],
      next_cursor: result.next_cursor,
    };
  } catch (error) {
    console.error(`Error listing resources from ${server}:`, error);
    throw error;
  }
}

/**
 * List all resources from all Cloudinary accounts
 */
export async function listAllCloudinaryResources(): Promise<Array<{
  resource: any;
  server: CloudinaryServer;
  account: number;
}>> {
  const servers: Array<{ server: CloudinaryServer; account: number }> = [
    { server: "server1", account: 1 },
    { server: "server2", account: 2 },
    { server: "server3", account: 3 },
  ];
  
  const allResources: Array<{ resource: any; server: CloudinaryServer; account: number }> = [];
  
  for (const { server, account } of servers) {
    try {
      const resourceTypes: Array<"image" | "video" | "raw"> = ["image", "video", "raw"];
      
      for (const resourceType of resourceTypes) {
        let nextCursor: string | undefined;
        let hasMore = true;
        let pageCount = 0;
        
        while (hasMore && pageCount < 10) { // Limit to 10 pages per type to avoid timeouts
          try {
            const result = await listCloudinaryResources(server, {
              resource_type: resourceType,
              max_results: 500,
              next_cursor: nextCursor,
            });
            
            result.resources.forEach((resource) => {
              allResources.push({ resource, server, account });
            });
            
            nextCursor = result.next_cursor;
            hasMore = !!nextCursor;
            pageCount++;
            
            if (result.resources.length === 0) {
              hasMore = false;
            }
          } catch (error) {
            console.error(`Error fetching ${resourceType} from ${server} (page ${pageCount}):`, error);
            hasMore = false;
          }
        }
        
        const count = allResources.filter(r => r.server === server && r.resource.resource_type === resourceType).length;
        if (count > 0) {
          console.log(`  ✅ ${count} ${resourceType} files from ${server}`);
        }
      }
    } catch (error) {
      console.error(`❌ Error listing from ${server}:`, error);
    }
  }
  
  console.log(`📦 Total resources found: ${allResources.length}`);
  return allResources;
}

