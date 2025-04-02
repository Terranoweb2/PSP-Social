import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uftfembmuusxiveqpngv.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmdGZlbWJtdXVzeGl2ZXFwbmd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1ODQwMjUsImV4cCI6MjA1OTE2MDAyNX0.LEQgRz8Gi_5WqeyUkBzChTyXqneHy1nxysKFsFHjFMw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
