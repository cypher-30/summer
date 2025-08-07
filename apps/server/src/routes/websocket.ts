import { Server } from "bun";
import { nanoid } from "nanoid";
import { errorResponse } from "../utils/responses";
import { WSData } from "../utils/websocket";

export const handleWebSocketUpgrade = (req: Request, server: Server) => {
  const url = new URL(req.url);
  const roomId = url.searchParams.get("roomId");
  const username = url.searchParams.get("username");

  if (!roomId || !username) {
    // Check which parameters are missing and log them
    const missingParams = [];

    if (!roomId) missingParams.push("roomId");
    if (!username) missingParams.push("username");

    console.log(
      `WebSocket connection attempt missing parameters: ${missingParams.join(
        ", "
      )}`
    );

    return errorResponse("roomId and userId are required");
  }

  const clientId = nanoid();
  console.log(`User ${username} joined room ${roomId} with userId ${clientId}`);

  const data: WSData = {
    roomId,
    username,
    clientId,
  };

  // Upgrade the connection with the WSData context
  const upgraded = server.upgrade(req, {
    data,
  });

  if (!upgraded) {
    return errorResponse("WebSocket upgrade failed");
  }

  return undefined;
};
