"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Appetizer from "./menu/Appetizer";
import MainCourse from "./menu/MainCourse";
import Desserts from "./menu/Desserts";

const Menu = () => {
  const [activeSection, setActiveSection] = useState<string>("Appetizer");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "Appetizer":
        return <Appetizer />;
      case "MainCourse":
        return <MainCourse />;
      case "Dessert":
        return <Desserts />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex flex-col">
      <Navbar
        className="bg-gray-100 rounded-full"
        setActiveSection={setActiveSection}
        activeSection={activeSection}
      />

      <div className="flex justify-between">
        <h1 className="heading">Menu</h1>
        <p className="text-slate-400 text-sm">Showing 50 items</p>
      </div>

      <div className="mt-2 w-full">{renderActiveSection()}</div>
    </div>
  );
};

function Navbar({
  className,
  setActiveSection,
  activeSection,
}: {
  className?: string;
  setActiveSection: (section: string) => void;
  activeSection: string;
}) {
  return (
    <div className={cn("w-full my-3 p-1", className)}>
      <nav>
        <div className="space-x-[10%] flex justify-between w-full">
          <Button
            onClick={() => setActiveSection("Appetizer")}
            className={cn(
              "w-full text-center rounded-full",
              activeSection === "Appetizer"
                ? "bg-white text-black hover:bg-white"
                : "bg-gray-100 text-black hover:bg-gray-50"
            )}
          >
            Appetizer
          </Button>
          <Button
            onClick={() => setActiveSection("MainCourse")}
            className={cn(
              "w-full text-center rounded-full",
              activeSection === "MainCourse"
                ? "bg-white text-black hover:bg-white"
                : "bg-gray-100 text-black hover:bg-gray-50"
            )}
          >
            Main Course
          </Button>
          <Button
            onClick={() => setActiveSection("Dessert")}
            className={cn(
              "w-full text-center rounded-full",
              activeSection === "Dessert"
                ? "bg-white text-black hover:bg-white"
                : "bg-gray-100 text-black hover:bg-gray-50"
            )}
          >
            Dessert
          </Button>
        </div>
      </nav>
    </div>
  );
}

export default Menu;
