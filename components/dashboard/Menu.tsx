"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Appetizer from "./menu/Appetizer";
import MainCourse from "./menu/MainCourse";
import Desserts from "./menu/Desserts";
import { MenuItem } from "@/types";
import { fetchMenuItems } from "@/lib/actions/menu.actions";

const Menu = () => {
  const [activeSection, setActiveSection] = useState<string>("Appetizer");
  const [appetizers, setAppetizers] = useState<MenuItem[]>([]);
  const [mainCourses, setMainCourses] = useState<MenuItem[]>([]);
  const [desserts, setDesserts] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch menu items on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const items = await fetchMenuItems();

      // Filter and set items for each category
      setAppetizers(items.filter((item) => item.category === "appetizer"));
      setMainCourses(items.filter((item) => item.category === "main_course"));
      setDesserts(items.filter((item) => item.category === "dessert"));
      setLoading(false);
    };

    fetchData();
  }, []);

  const renderActiveSection = () => {
    if (loading) return <p>Loading menu...</p>;

    switch (activeSection) {
      case "Appetizer":
        return <Appetizer items={appetizers} />;
      case "MainCourse":
        return <MainCourse items={mainCourses} />;
      case "Dessert":
        return <Desserts items={desserts} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex flex-col px-5">
      <Navbar
        className="bg-gray-100 rounded-full"
        setActiveSection={setActiveSection}
        activeSection={activeSection}
      />

      <div className="flex justify-between">
        <h1 className="heading">Menu</h1>
        <p className="text-slate-400 text-sm">
          Showing {activeSection === "Appetizer" && appetizers.length}{" "}
          {activeSection === "MainCourse" && mainCourses.length}{" "}
          {activeSection === "Dessert" && desserts.length} items
        </p>
      </div>

      <div className="remove-scrollbar pb-12 md:p-0 mt-2 w-full h-[64vh] md:h-[50vh] overflow-y-scroll">
        {renderActiveSection()}
      </div>
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
