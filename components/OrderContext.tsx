'use client'

import { MenuItem as SupabaseMenuItem } from "@/types";
import React, { createContext, useContext, useState } from "react";

type MenuItem = SupabaseMenuItem & {
  totalItem: number;
};

type OrderContextType = {
  items: MenuItem[];
  incrementItem: (item: MenuItem) => void;
  decrementItem: (id: string) => void;
  removeItem: (id: string) => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<MenuItem[]>([]);

  const incrementItem = (newItem: MenuItem) => {
    setItems((prev) => {
      const itemExists = prev.find((item) => item.id === newItem.id);
      if (itemExists) {
        return prev.map((item) =>
          item.id === newItem.id ? { ...item, totalItem: item.totalItem + 1 } : item
        );
      } else {
        return [...prev, { ...newItem, totalItem: 1 }];
      }
    });
  };

  const decrementItem = (id: string) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id && item.totalItem > 0
            ? { ...item, totalItem: item.totalItem - 1 }
            : item
        )
        .filter((item) => item.totalItem > 0)
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <OrderContext.Provider value={{ items, incrementItem, decrementItem, removeItem }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
