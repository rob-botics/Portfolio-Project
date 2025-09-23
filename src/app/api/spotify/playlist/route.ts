
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const access_token = req.nextUrl.searchParams.get('token');
  const playlist_id = req.nextUrl.searchParams.get('id');

  if (!access_token || !playlist_id) {
    return NextResponse.json({ error: 'Missing token or playlist ID' }, { status: 400 });
  }

  const res = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks?limit=20`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: data }, { status: res.status });
  }

  return NextResponse.json(data);
}
