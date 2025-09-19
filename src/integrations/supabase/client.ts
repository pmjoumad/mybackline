import { createClient } from '@supabase/supabase-js';

// Pour le développement - remplacez par vos vraies valeurs Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Client Supabase temporaire - sera remplacé par l'intégration native
export const supabase = createClient(supabaseUrl, supabaseAnonKey);