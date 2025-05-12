import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zpduqijeyqpxapzevewo.supabase.co';

export function getSupabaseClient() {
  const supabaseKey = process.env.SUPABASE_KEY;
  if (!supabaseKey) {
    throw new Error('Supabase key not found in environment variables.');
  }
  return createClient(supabaseUrl, supabaseKey);
}