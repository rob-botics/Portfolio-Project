// app/api/spotify/token/route.ts
import { NextResponse } from 'next/server';
import { getToken, setToken } from '../server/tokenCache';

export async function GET() {
  const cachedToken = getToken();
  if (cachedToken) {
    return NextResponse.json({ access_token: cachedToken });
  }

  // If no valid token, request a new one from Spotify using Client Credentials flow
  const basicAuth = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString('base64');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch token' }, { status: 500 });
  }

  const data = await response.json();
  setToken(data.access_token, data.expires_in);
  
  return NextResponse.json({ access_token: data.access_token, expires_in: data.expires_in });
}
