import { z } from "zod";

export const OrderFormValidation = z.object({
  customer_name: z.string().min(2, {
    message: "Customer name must be at least 3 characters.",
  }),
  order_type: z.string().min(2, "Select an order type"),
  table_number: z.number().optional(),
});
