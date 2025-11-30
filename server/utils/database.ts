/**
 * Database abstraction layer
 * Supports both Vercel KV (Redis) for serverless environments and file storage for localhost
 */

import { promises as fs } from "fs";
import { join } from "path";
import { DATA_DIR } from "./dataPath.js";

// Lazy-load Vercel KV (only available in Vercel environment)
let kv: any = null;
let kvInitialized = false;

async function getKV() {
  if (kvInitialized) return kv;
  kvInitialized = true;
  
  if (process.env.KV_URL) {
    try {
      const kvModule = await import("@vercel/kv");
      kv = kvModule.kv;
      return kv;
    } catch (error) {
      // KV not available (not installed or not configured)
      console.log("Vercel KV not available, using file storage");
      return null;
    }
  }
  return null;
}

/**
 * Determine if we should use KV storage
 * Use KV if:
 * 1. We're in a Vercel environment (KV_URL is set)
 * 2. KV client is available
 */
async function shouldUseKV(): Promise<boolean> {
  const kvClient = await getKV();
  return !!(process.env.KV_URL && kvClient);
}

/**
 * Generic database interface for storing JSON data
 */
export class Database<T> {
  private key: string;
  private defaultValue: T[];

  constructor(key: string, defaultValue: T[] = [] as T[]) {
    this.key = key;
    this.defaultValue = defaultValue;
  }

  /**
   * Load data from storage
   */
  async load(): Promise<T[]> {
    const useKV = await shouldUseKV();
    if (useKV) {
      try {
        const kvClient = await getKV();
        if (!kvClient) throw new Error("KV client not available");
        const data = await kvClient.get<T[]>(this.key);
        
        // If KV returns null/undefined, return empty array (not defaults)
        // This means the database is empty, not that there was an error
        if (data === null || data === undefined) {
          console.log(`KV key "${this.key}" is empty (new database)`);
          return [] as T[];
        }
        
        if (Array.isArray(data)) {
          console.log(`Loaded ${data.length} items from KV (${this.key})`);
          return data;
        }
        
        console.warn(`KV key "${this.key}" contains invalid data, returning empty array`);
        return [] as T[];
      } catch (error) {
        console.error(`❌ Error loading from KV (${this.key}):`, error);
        // On Vercel, don't fall back to file storage - throw error instead
        if (process.env.VERCEL) {
          throw new Error(`Failed to load from KV: ${error instanceof Error ? error.message : String(error)}`);
        }
        // Localhost: fallback to file storage
        return this.loadFromFile();
      }
    } else {
      // Check if we're on Vercel but KV is not configured
      if (process.env.VERCEL || process.env.VERCEL_ENV) {
        console.error(`⚠️  WARNING: Running on Vercel but KV_URL is not set! Data will not persist.`);
        console.error(`⚠️  Please set up Vercel KV: https://vercel.com/docs/storage/vercel-kv`);
        // Return empty array instead of defaults on Vercel without KV
        return [] as T[];
      }
      // File storage fallback (localhost only)
      return this.loadFromFile();
    }
  }

  /**
   * Save data to storage
   */
  async save(data: T[]): Promise<void> {
    const useKV = await shouldUseKV();
    if (useKV) {
      try {
        const kvClient = await getKV();
        if (!kvClient) throw new Error("KV client not available");
        await kvClient.set(this.key, data);
        console.log(`✅ Saved ${data.length} items to KV (${this.key})`);
      } catch (error) {
        console.error(`❌ Error saving to KV (${this.key}):`, error);
        // On Vercel, don't fall back to file storage - throw error
        if (process.env.VERCEL) {
          throw new Error(`Failed to save to KV: ${error instanceof Error ? error.message : String(error)}`);
        }
        // Localhost: fallback to file storage
        await this.saveToFile(data);
      }
    } else {
      // Check if we're on Vercel but KV is not configured
      if (process.env.VERCEL || process.env.VERCEL_ENV) {
        const errorMsg = `⚠️  CRITICAL: Cannot save data on Vercel without KV! Please set up Vercel KV.`;
        console.error(errorMsg);
        throw new Error(errorMsg);
      }
      // File storage fallback (localhost only)
      await this.saveToFile(data);
    }
  }

  /**
   * Load from file (localhost fallback)
   */
  private async loadFromFile(): Promise<T[]> {
    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
      const filePath = join(DATA_DIR, `${this.key}.json`);
      const data = await fs.readFile(filePath, "utf-8");
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : this.defaultValue;
    } catch (error: any) {
      if (error.code === "ENOENT") {
        // File doesn't exist, save default and return it
        await this.saveToFile(this.defaultValue);
        return this.defaultValue;
      }
      console.error(`Error loading from file (${this.key}):`, error);
      return this.defaultValue;
    }
  }

  /**
   * Save to file (localhost fallback)
   */
  private async saveToFile(data: T[]): Promise<void> {
    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
      const filePath = join(DATA_DIR, `${this.key}.json`);
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
      console.error(`Error saving to file (${this.key}):`, error);
      throw error;
    }
  }

  /**
   * Get all items
   */
  async getAll(): Promise<T[]> {
    return this.load();
  }

  /**
   * Get item by ID (assumes items have an 'id' property)
   */
  async getById(id: string): Promise<T | undefined> {
    const data = await this.load();
    return data.find((item: any) => item.id === id);
  }

  /**
   * Add item
   */
  async add(item: T): Promise<void> {
    const data = await this.load();
    data.push(item);
    await this.save(data);
  }

  /**
   * Update item by ID
   */
  async update(id: string, updates: Partial<T>): Promise<T | null> {
    const data = await this.load();
    const index = data.findIndex((item: any) => item.id === id);
    if (index === -1) return null;
    data[index] = { ...data[index], ...updates };
    await this.save(data);
    return data[index];
  }

  /**
   * Delete item by ID
   */
  async delete(id: string): Promise<boolean> {
    const data = await this.load();
    const index = data.findIndex((item: any) => item.id === id);
    if (index === -1) return false;
    data.splice(index, 1);
    await this.save(data);
    return true;
  }

  /**
   * Replace entire dataset
   */
  async replace(data: T[]): Promise<void> {
    await this.save(data);
  }
}

/**
 * Initialize KV connection (for Vercel)
 */
export async function initializeKV() {
  const kvClient = await getKV();
  const isVercel = !!(process.env.VERCEL || process.env.VERCEL_ENV);
  
  if (kvClient && process.env.KV_URL) {
    try {
      // Test connection by setting a test key
      await kvClient.set("__test__", "ok");
      await kvClient.del("__test__");
      console.log("✅ Connected to Vercel KV - Data will persist");
    } catch (error) {
      console.error("❌ Failed to connect to Vercel KV:", error);
      if (isVercel) {
        console.error("⚠️  CRITICAL: On Vercel but KV connection failed! Data will not persist.");
        console.error("⚠️  Please check your KV configuration in Vercel Dashboard.");
      } else {
        console.log("⚠️  Falling back to file storage");
      }
    }
  } else {
    if (isVercel) {
      console.error("⚠️  ⚠️  ⚠️  WARNING: Running on Vercel but KV_URL is not set!");
      console.error("⚠️  Your data will NOT persist. Please set up Vercel KV:");
      console.error("⚠️  1. Go to Vercel Dashboard → Storage → Create Database → KV");
      console.error("⚠️  2. Link it to your project");
      console.error("⚠️  3. Redeploy");
    } else {
      console.log("📁 Using file storage (localhost mode)");
    }
  }
}

