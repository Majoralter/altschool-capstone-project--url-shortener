import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = "https://lanjkkdzpqazekbvafmb.supabase.co";
const supabaseKey: any = process.env.VUE_APP_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
