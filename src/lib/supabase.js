import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if we have valid credentials (not placeholders)
const hasValidCredentials = () => {
  return (
    url &&
    key &&
    url.includes(".supabase.") &&
    key !== "your_supabase_anon_key_here"
  );
};

let supabaseClient = null;

if (hasValidCredentials()) {
  try {
    supabaseClient = createClient(url, key);
  } catch (err) {
    console.warn("Failed to initialize Supabase:", err);
    supabaseClient = null;
  }
} else if (typeof window !== "undefined") {
  console.warn(
    "Supabase credentials not configured. Using localStorage fallback only. See SETUP_SUPABASE.md"
  );
}

export const supabase = supabaseClient;
