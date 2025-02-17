'use server'

import { createClient } from "@/utils/supabase/server";

export const fetchUser = async () => {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError) {
    console.error("Error fetching user from auth:", authError);
    return null;
  }

  const userId = user?.id;

  if (userId) {
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (userError) {
      console.error("Error fetching user data:", userError);
      return null;
    }

    return userData;
  }
  return null;
};
