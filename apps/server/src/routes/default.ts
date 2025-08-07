import { errorResponse, jsonResponse } from "../utils/responses";

export const handleGetDefaultAudio = async (_req: Request) => {
  try {
    // We are bypassing the cloud storage call and returning an empty array.
    const defaultFiles: { key: string; url: string }[] = [];

    // Using the correct function name: jsonResponse
    return jsonResponse({
      message: "Default audio files retrieved successfully.",
      data: defaultFiles,
    });
  } catch (err) {
    console.error("Failed to list default audio files:", err);
    return errorResponse("Failed to list default audio files.", 500);
  }
};