/**
 * Vercel Serverless Function Handler
 * This handles all API routes when deployed to Vercel
 */

import serverless from "serverless-http";
import { createServer } from "../server/index.js";

// Create the Express app
const app = createServer();

// Export the serverless handler
export default serverless(app);

