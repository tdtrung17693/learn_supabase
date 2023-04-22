import { createClient } from '@supabase/supabase-js'
import { supabase as supabaseConfig } from './config'

export const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey)
