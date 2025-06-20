import "https://deno.land/std@0.200.0/dotenv/load.ts";

const JWT_SECRET = Deno.env.get("JWT_SECRET");
if (!JWT_SECRET) {
  console.error("JWT_SECRET environment variable not set!");
  Deno.exit(1);
}

const GOOGLE_CLIENT_ID = Deno.env.get("GOOGLE_CLIENT_ID");
if (!GOOGLE_CLIENT_ID) {
  console.error("GOOGLE_CLIENT_ID environment variable not set!");
  Deno.exit(1);
}


export const config = {
  jwtSecret: JWT_SECRET,
  googleClientId: GOOGLE_CLIENT_ID,
}; 