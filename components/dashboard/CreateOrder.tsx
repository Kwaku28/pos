"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import CustomFormField from "../CustomFormField";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "../ui/button";
import { useOrder } from "@/components/OrderContext";
import { createOrder } from "@/lib/actions/order.actions";
import { OrderFormValidation } from "@/lib/validations";
import { orderType } from "@/constants";
import { Users } from "@/types";
import { fetchUser } from "@/lib/actions/user.actions";

export enum FormFieldType {
  INPUT = "input",
  SELECT = "select",
}

const CreateOrder = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    items: orderItems,
    incrementItem,
    decrementItem,
    removeItem,
  } = useOrder();
  
  const [user, setUser] = useState<Users | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const userData = await fetchUser();
      setUser(userData);
    };

    getUser();
  }, []);

  const form = useForm<z.infer<typeof OrderFormValidation>>({
    resolver: zodResolver(OrderFormValidation),
    defaultValues: {
      customer_name: "",
      order_type: "",
      table_number: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof OrderFormValidation>) {
    setIsLoading(true);

    const subtotal = orderItems.reduce(
      (acc, item) => acc + item.price * item.totalItem,
      0
    );
    const tax = subtotal * 0.1;
    const totalAmount = subtotal + tax;

    const orderData = {
      customer_name: values.customer_name,
      order_type: values.order_type,
      status: "waiting",
      table_number: values.table_number ?? null,
      total_amount: totalAmount,
      user_id: user?.id ?? null,
    };

    const orderItemsData = orderItems.map((item) => ({
      menu_item_id: item.id,
      quantity: item.totalItem,
      subtotal: item.price * item.totalItem,
    }));

    const order = await createOrder(orderData, orderItemsData);

    if (order) {
      router.push("/diner/orders");
    } else {
      console.error("Error creating order");
    }

    setIsLoading(false);
  }

  const subtotal = orderItems.reduce(
    (acc, item) => acc + item.price * item.totalItem,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-1 flex-1"
        >
          <section className="mb-1">
            <h1 className="heading">Customer Information</h1>
          </section>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="customer_name"
            placeholder="John Doe"
          />

          <div className="flex gap-1">
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="order_type"
              placeholder="Select an order type"
            >
              {orderType.map((type, i) => (
                <SelectItem key={type + i} value={type}>
                  {type}
                </SelectItem>
              ))}
            </CustomFormField>

            {form.watch("order_type") === "Dine-in" && (
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="table_number"
                placeholder="Table Number"
                type="number"
              />
            )}
          </div>

          <div className="flex flex-col h-[50vh] md:h-48 w-full border-t mt-2 remove-scrollbar overflow-y-scroll">
            <section className="mt-2">
              <h1 className="heading">Order Details</h1>
            </section>
            {orderItems.map((food, index) => (
              <div
                key={index}
                className="flex justify-between p-2 bg-white border-b w-full"
              >
                <div className="flex gap-2 justify-between w-full">
                  <Image
                    src={food.image_url}
                    alt={food.name}
                    width={100}
                    height={50}
                    className="object-fill h-16 w-24 rounded-md"
                  />
                  <div className="flex flex-col justify-between w-44">
                    <h2 className="text-sm font-semibold">{food.name}</h2>
                    <div className="flex justify-between items-center w-full">
                      <div className="gap-5 items-center flex">
                        <span
                          className="cursor-pointer"
                          onClick={() => decrementItem(food.id)}
                        >
                          <FaCircleMinus className="w-5 h-5" color="gray" />
                        </span>
                        <span className="text-xs">{food.totalItem}</span>
                        <span
                          className="cursor-pointer"
                          onClick={() => incrementItem(food)}
                        >
                          <FaCirclePlus className="w-5 h-5" color="blue" />
                        </span>
                      </div>
                      <span className="text-sm font-bold">${food.price}</span>
                    </div>
                  </div>
                  <div className="flex items-center md:items-start">
                    <AiOutlineDelete
                      color="red"
                      className="w-5 h-5 cursor-pointer"
                      onClick={() => removeItem(food.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-12 md:mb-10 h-[12vh] md:h-24">
            <h2 className="heading mt-2">Order Summary</h2>

            <div className="w-full h-full bg-slate-200 p-3 rounded-lg text-slate-500 flex flex-col justify-center gap-1 overflow-y-scroll remove-scrollbar text-sm">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <p>Tax (10%)</p>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <p>Total</p>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full bg-blue-600">
            Process Transaction
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CreateOrder;
