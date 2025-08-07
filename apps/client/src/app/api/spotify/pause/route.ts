import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // This was the missing part: reading the body of the request.
  const { device_id } = await req.json();
  if (!device_id) {
    return NextResponse.json({ error: "Device ID is required" }, { status: 400 });
  }

  const PAUSE_ENDPOINT = `https://api.spotify.com/v1/me/player/play?device_id=$2{device_id}`;
  
  try {
    const response = await fetch(PAUSE_ENDPOINT, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      const errorData = await response.json();
      return NextResponse.json({ error: "Failed to pause", details: errorData }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}