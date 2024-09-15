import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_Supa_Url;
const supabaseKey = import.meta.env.VITE_Supa_Key;
export const supabase = createClient(supabaseUrl, supabaseKey);
