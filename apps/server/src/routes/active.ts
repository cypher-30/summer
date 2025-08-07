import { errorResponse } from "../utils/responses";

export const getActiveRooms = (_req: Request) => {
  console.log("getActiveRooms: This feature is disabled for local development.");
  return errorResponse("Active rooms feature is not configured.", 501);
};