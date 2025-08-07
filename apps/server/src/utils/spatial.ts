import { ClientType, GRID } from "@beatsync/shared";

/**
 * Positions clients in a circle around a center point
 * @param clients Map of clients to position
 */
export function positionClientsInCircle(
  clients: Map<string, ClientType>
): void {
  const clientCount = clients.size;

  // Early return for single client case
  if (clientCount === 1) {
    // Center the single client explicitly
    const client = clients.values().next().value!;
    client.position = {
      x: GRID.ORIGIN_X,
      y: GRID.ORIGIN_Y - 25,
    };
    return;
  }

  // Position multiple clients in a circle
  let index = 0;
  clients.forEach((client) => {
    // Calculate position on the circle
    const angle = (index / clientCount) * 2 * Math.PI - Math.PI / 2;
    client.position = {
      x: GRID.ORIGIN_X + GRID.CLIENT_RADIUS * Math.cos(angle),
      y: GRID.ORIGIN_Y + GRID.CLIENT_RADIUS * Math.sin(angle),
    };
    index++;
  });
}

/**
 * Debug function to print client positions
 * @param clients Map of clients to debug
 */
export function debugClientPositions(clients: Map<string, ClientType>): void {
  console.log("Client Positions:");
  clients.forEach((client, id) => {
    console.log(`Client ${id}: x=${client.position.x}, y=${client.position.y}`);
  });
}
