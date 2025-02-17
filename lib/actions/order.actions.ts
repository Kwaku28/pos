'use server'

import { Order, OrderItems } from "@/types";
import { createClient } from "@/utils/supabase/server";

export const fetchOrders = async (): Promise<Order[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }

  const orders: Order[] = data.map((order: any) => ({
    ...order,
    created_at: order.created_at || null,
    id: order.id || '',
    table_number: order.table_number || null,
    total_amount: order.total_amount || 0,
    user_id: order.user_id || null,
  }));

  return orders;
};

export const fetchRecentOrders = async (): Promise<Order[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        order_id,
        menu_item_id,
        quantity,
        subtotal
      )
    `)
    .limit(10)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching recent orders:", error);
    return [];
  }

  const orders: Order[] = data.map((order: any) => ({
    created_at: order.created_at || null,
    customer_name: order.customer_name || null,
    id: order.id || '',
    order_type: order.order_type || '',
    status: order.status || null,
    table_number: order.table_number || null,
    total_amount: order.total_amount || 0,
    user_id: order.user_id || null,
    order_items: order.order_items || [],
    orderItems: order.order_items.reduce((acc: number, item: any) => acc + item.quantity, 0)
  }));

  return orders;
};

export const createOrder = async (
  order: Omit<Order, "id" | "created_at">,
  orderItems: Omit<OrderItems, "id" | "created_at" | "order_id">[] 
): Promise<Order | null> => {
  const supabase = await createClient();
  
  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert(order)
    .select()
    .single();

  if (orderError) {
    console.error("Error creating order:", orderError);
    return null;
  }

  const orderItemsData = orderItems.map(item => ({
    ...item,
    order_id: orderData.id,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItemsData);

  if (itemsError) {
    console.error("Error creating order items:", itemsError);
    return null;
  }

  return orderData as Order;
};
