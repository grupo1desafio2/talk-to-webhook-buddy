// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rxitxxbgfbdkupenrdjn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4aXR4eGJnZmJka3VwZW5yZGpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MTY0MDQsImV4cCI6MjA2MjM5MjQwNH0.9A4Qiz6J0cagTwVdu8yx52C7JM1vRO2HJfYGZRR4NnI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);