"use client";

import React, { useState } from "react";
import OrderModal from "./OrderModal";
import { Button } from "../ui/button";
import { FaBagShopping } from "react-icons/fa6";
import CreateOrder from "./CreateOrder";
import { useOrder } from "../OrderContext";

export const ProcessOrder = () => {
  return (
    <section className="px-2">
      <CreateOrder />
    </section>
  );
};

export const OrderMobile = () => {
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const { items: orderItems } = useOrder();

  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.totalItem, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <>
      <div className="relative">
        <div className="fixed bottom-0 right-2 left-2 flex items-center justify-between mt-3 p-4 bg-black text-white rounded-full">
          <div className="flex items-center gap-1">
            <FaBagShopping className="w-7 mb-0.5" />
            <span className="pl-1 text-xl">${total.toFixed(2)}</span>
            <span className="text-xs mt-0.5 text-slate-400">{orderItems.length} Items</span>
          </div>
          <Button onClick={() => setInvoiceModalOpen(true)} className="text-xl bg-black">
            Process Invoice
          </Button>
        </div>
      </div>
      {invoiceModalOpen && (
        <OrderModal
          isOpen={invoiceModalOpen}
          handleClose={() => setInvoiceModalOpen(!invoiceModalOpen)}
        >
          <div className="flex flex-col gap-3 h-full">
            <h2 className="text-2xl text-center font-semibold">Order #2255</h2>
            <section className="px-2">
              <CreateOrder />
            </section>
          </div>
        </OrderModal>
      )}
    </>
  );
};
