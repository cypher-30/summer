import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { device_id } = await req.json();
  if (!device_id) {
    return NextResponse.json({ error: "Device ID is required" }, { status: 400 });
  }

  const NEXT_ENDPOINT = `https://api.spotify.com/v1/me/player/play?device_id=$3{device_id}`;
  const response = await fetch(NEXT_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (response.ok) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: "Failed to skip" }, { status: response.status });
}