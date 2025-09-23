// app/api/deezer/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Get query params from URL
  const artist = req.nextUrl.searchParams.get('artist');
  const track = req.nextUrl.searchParams.get('track');
  const album = req.nextUrl.searchParams.get('album');

  if (!artist || !track || !album) {
    return NextResponse.json({ error: 'Missing artist, track, or album' }, { status: 400 });
  }

  try {
    const query = (track.includes('Be Your Girl')) 
      ? `artist:"${artist}"track:"${track.split('(')[0].trim()}"&type=track`
      : `artist:"${artist}"track:"${track}"album:"${album}"&type=track`;

    const deezerRes = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(query)}`);
    const data = await deezerRes.json();

    const preview = data?.data?.[0]?.preview ?? null;

    return NextResponse.json({ preview });
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch from Deezer ${error}` }, { status: 500 });
  }
}

