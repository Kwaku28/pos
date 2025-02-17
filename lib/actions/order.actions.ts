'use server'

import { Order, OrderItems } from "@/types";
import { createClient } from "@/utils/supabase/server";

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
