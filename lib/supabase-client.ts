// lib/supabase-server.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supbasePublicKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const adminSupabase = createClient(supabaseUrl, supbasePublicKey)