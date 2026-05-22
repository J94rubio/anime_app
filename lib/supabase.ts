import "react-native-url-polyfill/auto";

import { createClient } from "@supabase/supabase-js";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Platform } from "react-native";

const supabaseUrl = "https://wbrwpwejjqoqqmbglcdz.supabase.co";

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indicndwd2VqanFvcXFtYmdsY2R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyNzU5MDEsImV4cCI6MjA5Mzg1MTkwMX0.aYxsyLxcvFfS1jUzc9n7-2H9teJbjR8_YAVnbbZB-0w";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: Platform.OS === "web" ? undefined : AsyncStorage,

    autoRefreshToken: true,

    persistSession: true,

    detectSessionInUrl: false,
  },
});
