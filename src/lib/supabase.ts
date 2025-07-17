import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wnfkadcqoaeqkfwyzrzp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduZmthZGNxb2FlcWtmd3l6cnpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxOTAzMDEsImV4cCI6MjA2MDc2NjMwMX0.DcKvJdHpkt7NBuNxc3jO2EdHKXtalzxSDaDYnBbr5tY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 