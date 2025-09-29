import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  const missing = [
    !supabaseUrl ? "VITE_SUPABASE_URL" : undefined,
    !supabaseAnonKey ? "VITE_SUPABASE_ANON_KEY" : undefined,
  ].filter(Boolean).join(", ");
  throw new Error(`Missing environment variable(s): ${missing}. Add them to your .env and restart the dev server.`);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});

export async function sendContactEmail(params: { name: string; email: string; msg: string }) {
  const { data, error } = await supabase.functions.invoke("contact-email", {
    body: params,
  });
  if (error) throw error;
  return data;
}


