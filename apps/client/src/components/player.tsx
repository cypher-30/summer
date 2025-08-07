"use client";
import { useGlobalStore } from "@/store/global";
import { Button } from "./ui/button";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";

export const PlayerControls = () => {
  const currentTrack = useGlobalStore((state) => state.currentTrack);
  const isPlaying = useGlobalStore((state) => state.isPlaying);
  const togglePlayPause = useGlobalStore((state) => state.togglePlayPause);
  const playNextTrack = useGlobalStore((state) => state.playNextTrack);

  // If there's no song currently selected, we show a disabled placeholder state.
  if (!currentTrack) {
    return (
      <div className="flex items-center justify-center gap-4 text-neutral-500">
        <Button variant="ghost" size="icon" disabled>
          <SkipBack />
        </Button>
        <Button
          size="lg"
          className="bg-neutral-500 text-black rounded-full w-12 h-12"
          disabled
        >
          <Play size={24} className="ml-1" />
        </Button>
        <Button variant="ghost" size="icon" disabled>
          <SkipForward />
        </Button>
      </div>
    );
  }

  // If there is a song, we show the active controls.
  return (
    <div className="flex items-center justify-center gap-4">
      <Button variant="ghost" size="icon">
        <SkipBack />
      </Button>
      <Button
        onClick={togglePlayPause}
        size="lg"
        className="bg-white text-black rounded-full w-12 h-12 hover:bg-neutral-200"
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
      </Button>
      <Button onClick={playNextTrack} variant="ghost" size="icon">
        <SkipForward />
      </Button>
    </div>
  );
};