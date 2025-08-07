import { WSBroadcastType, WSUnicastType } from "@beatsync/shared";
import { Server, ServerWebSocket } from "bun";
import { WSData } from "./websocket";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Allow-Headers": "*",
};

// Helper functions for common responses
export const jsonResponse = (data: any, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders,
  });

export const errorResponse = (message: string, status = 400) =>
  new Response(message, {
    status,
    headers: corsHeaders,
  });

// Broadcast to all clients in the room
export const sendBroadcast = ({
  server,
  roomId,
  message,
}: {
  server: Server;
  roomId: string;
  message: WSBroadcastType;
}) => {
  server.publish(roomId, JSON.stringify(message));
};

export const sendUnicast = ({
  ws,
  message,
}: {
  ws: ServerWebSocket<WSData>;
  message: WSUnicastType;
}) => {
  ws.send(JSON.stringify(message));
};
