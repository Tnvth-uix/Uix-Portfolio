import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabaseClient = null;

// Safely initialize Supabase client only if we have valid credentials
const initializeSupabase = () => {
  try {
    // Skip if running on server without valid credentials
    if (!url || !key) return null;

    // Check if credentials are placeholders
    if (
      url === "your_supabase_project_url_here" ||
      key === "your_supabase_anon_key_here"
    ) {
      if (typeof window !== "undefined") {
        console.warn(
          "Supabase credentials not configured. Using localStorage fallback only. See SETUP_SUPABASE.md"
        );
      }
      return null;
    }

    // Validate URL format
    if (!url.includes("supabase")) {
      if (typeof window !== "undefined") {
        console.warn("Invalid Supabase URL format");
      }
      return null;
    }

    return createClient(url, key);
  } catch (err) {
    if (typeof window !== "undefined") {
      console.warn("Failed to initialize Supabase:", err.message);
    }
    return null;
  }
};

supabaseClient = initializeSupabase();
export const supabase = supabaseClient;
