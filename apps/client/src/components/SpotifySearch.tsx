"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SpotifyTrack, useGlobalStore } from "@/store/global";

export function SpotifySearch() {
  const { data: session } = useSession();
  const addToQueue = useGlobalStore((state) => state.addToQueue);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SpotifyTrack[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery || !session?.accessToken) return;
    setIsLoading(true);

    const encodedQuery = encodeURIComponent(searchQuery);
    const SEARCH_ENDPOINT = `https://api.spotify.com/v1/search?q=${encodedQuery}&type=track&limit=5`;
    
    try {
      const response = await fetch(SEARCH_ENDPOINT, {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      });
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.tracks.items || []);
      } else {
        console.error("Failed to fetch from Spotify API", await response.text());
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error during search:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-neutral-800 rounded-lg w-full max-w-md mx-auto">
      <div className="flex gap-2">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search for a song to add..."
          className="bg-neutral-700 border-neutral-600 text-white"
        />
        <Button onClick={handleSearch} disabled={isLoading}>
          {isLoading ? "..." : "Search"}
        </Button>
      </div>
      <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
        {searchResults.map((track) => (
          <div key={track.uri} className="flex items-center justify-between p-2 bg-neutral-700 rounded">
            <div className="flex items-center gap-3 overflow-hidden">
              <img src={track.album.images[2]?.url || ""} alt={track.name} className="w-10 h-10 flex-shrink-0" />
              <div className="truncate">
                <p className="font-semibold text-white truncate">{track.name}</p>
                <p className="text-sm text-neutral-400 truncate">
                  {track.artists.map((artist: { name: string }) => artist.name).join(", ")}
                </p>
              </div>
            </div>
            <Button onClick={() => addToQueue(track)} size="sm" className="flex-shrink-0 ml-2">
              Add
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}