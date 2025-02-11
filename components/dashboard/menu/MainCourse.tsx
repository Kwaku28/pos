'use client'

import React, { useState } from 'react'
import { MenuItem } from '@/types';
import Image from 'next/image';
import { FaCircleMinus, FaCirclePlus } from 'react-icons/fa6';

const MainCourse = ({ items }: { items: MenuItem[] }) => {
  const [localItems, setLocalItems] = useState(
    items.map((item) => ({
      ...item,
      totalItem: 0,
    }))
  );

  const incrementItem = (index: number) => {
    setLocalItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, totalItem: item.totalItem + 1 } : item
      )
    );
  };

  const decrementItem = (index: number) => {
    setLocalItems((prev) =>
      prev.map((item, i) =>
        i === index && item.totalItem > 0
          ? { ...item, totalItem: item.totalItem - 1 }
          : item
      )
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {localItems.map((food, index) => (
        <div
          key={index}
          className="flex flex-col justify-between p-2 bg-white shadow-lg rounded-md w-full md:w-full md:h-40 h-full"
        >
          <div className="flex flex-col md:flex-row gap-2">
            <Image
              src={food.image_url}
              alt={food.name}
              width={100}
              height={50}
              className="object-fill h-24 w-full md:w-24 rounded-md"
            />
            <div className="remove-scrollbar h-24 overflow-scroll">
              <h2 className="text-lg font-semibold">{food.name}</h2>
              <p className="text-sm text-slate-600 overflow-hidden">
                {food.description}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">${food.price}</span>
            <p className="text-sm font-semibold text-slate-400">
              {food.total_sold} sold
            </p>
            <div className="gap-5 items-center flex">
              <span
                className="cursor-pointer"
                onClick={() => decrementItem(index)}
              >
                <FaCircleMinus className="w-6 h-6 border-none" color="gray" />
              </span>
              <span className="text-xs">{food.totalItem}</span>
              <span
                className="cursor-pointer"
                onClick={() => incrementItem(index)}
              >
                <FaCirclePlus className="w-6 h-6" color="blue" />
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MainCourse