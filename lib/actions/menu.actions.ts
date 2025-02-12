'use server'

import { MenuItem } from "@/types";
import { createClient } from "@/utils/supabase/server";

export const fetchMenuItems = async (): Promise<MenuItem[]> => {
  const supabase = await createClient()
  const { data: menu_items, error } = await supabase.from("menu_items").select("*");

  if (error) {
    console.error("Error fetching menu items:", error);
    return [];
  }

  return menu_items as MenuItem[];
};

export const createMenuItem = async (menuItem: Omit<MenuItem, "id" | "created_at">): Promise<MenuItem | null> => {
  const supabase = await createClient()
  const { data, error } = await supabase.from("menu_items").insert(menuItem).select().single();

  if (error) {
    console.error("Error creating menu item:", error);
    return null;
  }

  return data as MenuItem;
};

export const updateMenuItem = async (id: string, updates: Partial<MenuItem>): Promise<MenuItem | null> => {
  const supabase = await createClient()
  const { data, error } = await supabase.from("menu_items").update(updates).eq("id", id).select().single();

  if (error) {
    console.error("Error updating menu item:", error);
    return null;
  }

  return data as MenuItem;
};

export const deleteMenuItem = async (id: string): Promise<boolean> => {
  const supabase = await createClient()
  const { error } = await supabase.from("menu_items").delete().eq("id", id);

  if (error) {
    console.error("Error deleting menu item:", error);
    return false;
  }

  return true;
};
