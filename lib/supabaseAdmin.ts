import { createClient } from '@supabase/supabase-js'

// server-only client that bypasses row level security, never import this in a client component
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
)
