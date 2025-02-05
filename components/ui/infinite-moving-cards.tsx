"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    orderNo: number;
    orderType: string;
    orderItems: number;
    customerName: string;
    status: string;
    amount: number;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative w-full overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_2%,white_98%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="w-[180px] max-w-full flex flex-col justify-between relative rounded-lg border flex-shrink-0 px-2 py-2"
            style={{
              background: "rgba(251,251,251)",
            }}
            key={idx}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <div className="relative z-20 flex flex-col">
                <div className="flex justify-between">
                  <span className="text-sm leading-[1.6] font-normal">
                    {item.customerName}
                  </span>
                  <span className="text-xs leading-[1.6] text-gray-400 font-normal">
                    #{item.orderNo}
                  </span>
                </div>
                <div className="flex gap-3 items-center">
                  <span className=" text-xs leading-[1.6] text-gray-400 font-normal">
                    {item.orderItems} items
                  </span>
                  {" - "}
                  <span className=" text-xs leading-[1.6] text-gray-400 font-normal">
                    {item.orderType}
                  </span>
                </div>
                <span
                  className={cn(
                    "text-xs leading-[1.6] w-fit text-gray-50 font-normal px-2 py-1 rounded-full",
                    {
                      "bg-green-800": item.status === "Ready to Serve",
                      "bg-red-800": item.status === "Cancelled",
                      "bg-orange-600": item.status === "Waiting",
                      "bg-blue-600": item.status === "Completed",
                    }
                  )}
                >
                  {item.status}
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
