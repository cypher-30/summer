import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  // Get the user's session to securely access their Spotify token
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  // Get the device_id and track URI from the request the button sends
  const { device_id, track_uri } = await req.json();
  if (!device_id) {
    return NextResponse.json(
      { error: "Device ID is required" },
      { status: 400 }
    );
  }

  // This is the official endpoint for Spotify's Web API to start playback
  const PLAY_ENDPOINT = `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`;

  try {
    const response = await fetch(PLAY_ENDPOINT, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      // We send the specific track we want to play in the body of the request
      body: JSON.stringify({
        uris: [track_uri],
      }),
    });

    if (response.ok) {
      // If Spotify returns a success code (like 204 No Content), it means it worked.
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      // If Spotify returns an error, we log it and send it back to the client
      const errorData = await response.json();
      console.error("Spotify API Error:", errorData);
      return NextResponse.json(
        { error: "Failed to start playback", details: errorData },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}