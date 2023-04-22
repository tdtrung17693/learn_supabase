import { Provider } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = {
    url: supabaseUrl,
    anonKey: supabaseAnonKey
}

export  const OAuthProviders: Provider[] = ["discord"]

export const apiUrl = import.meta.env.VITE_API_URL
