import { Tables } from "./supabase.database";

export type MenuItem = Tables<'menu_items'>

export type Order = Tables<'orders'>

export type OrderItems = Tables<'order_items'>

export type Payment = Tables<'payments'>

export type User = Tables<'users'>
