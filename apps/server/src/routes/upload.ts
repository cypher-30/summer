import {
  UploadCompleteResponseType,
  UploadUrlResponseType,
} from "@beatsync/shared";
import { Server } from "bun";
import { errorResponse, jsonResponse } from "../utils/responses";

// This function now safely returns an error instead of trying to use R2
export const handleGetPresignedURL = async (req: Request) => {
  if (req.method !== "POST") {
    return errorResponse("Method not allowed", 405);
  }
  console.log("handleGetPresignedURL: Uploads are disabled for local development.");
  return errorResponse("File uploads are not configured.", 501);
};

// This function now safely returns an error
export const handleUploadComplete = async (req: Request, server: Server) => {
  if (req.method !== "POST") {
    return errorResponse("Method not allowed", 405);
  }
  console.log("handleUploadComplete: Uploads are disabled for local development.");
  return errorResponse("File uploads are not configured.", 501);
};