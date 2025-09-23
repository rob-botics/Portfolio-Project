// server/tokenCache.ts
let accessToken: string | null = null;
let expiry: number = 0; // timestamp in ms

export function getToken() {
  if (accessToken && Date.now() < expiry) {
    return accessToken;
  }
  return null;
}

export function setToken(token: string, expiresIn: number) {
  accessToken = token;
  expiry = Date.now() + expiresIn * 1000 - 60000; // Refresh 1 min before expiry
}
