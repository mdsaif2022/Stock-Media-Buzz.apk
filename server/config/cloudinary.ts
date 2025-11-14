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

