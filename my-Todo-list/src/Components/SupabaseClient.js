import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kelumvilurqpcxzqivrv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlbHVtdmlsdXJxcGN4enFpdnJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NjYyOTYsImV4cCI6MjAzMjA0MjI5Nn0.0psnah4N0jZf3XBsyfOp1p7H-S80nrElnGNzQjICCJc'

export const supabase = createClient(supabaseUrl, supabaseKey);