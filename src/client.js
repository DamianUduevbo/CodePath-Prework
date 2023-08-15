import { createClient } from '@supabase/supabase-js';

const URL = 'https://cksbpcxmmikmojruqnjv.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrc2JwY3htbWlrbW9qcnVxbmp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA2MDAyMzYsImV4cCI6MjAwNjE3NjIzNn0.3mbkG2DOcFjtfcGm0NK5L7Qlk6mU0TGUHRGAsMQuYMs'
const supabase = createClient(URL, API_KEY);

export default supabase;