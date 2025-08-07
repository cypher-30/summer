import { NewSyncer } from "@/components/NewSyncer";
import { SpotifyPlayer } from "@/components/SpotifyPlayer";
import { validateFullRoomId } from "@/lib/room";
import React from "react";

export default function Page({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = React.use(params);

  if (!validateFullRoomId(roomId)) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-2">
        <div>
          Invalid room ID: <span className="font-bold">{roomId}</span>.
        </div>
        <div className="text-sm text-gray-500">
          Please enter a valid 6-digit numeric code.
        </div>
      </div>
    );
  }

  return (
    <>
      <SpotifyPlayer />
      <NewSyncer roomId={roomId} />
    </>
  );
}