import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zpduqijeyqpxapzevewo.supabase.co";

export function getSupabaseClient() {
  const supabaseKey = process.env.SUPABASE_KEY;
  if (!supabaseKey) throw new Error("Missing SUPABASE_KEY");
  return createClient(supabaseUrl, supabaseKey);
}
