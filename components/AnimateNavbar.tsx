"use client";

import { Tabs } from "@/components/ui/tabs";

export function MyNavbar() {
  const tabs = [
    {
      title: "Order Table",
      value: "order table",
      link: "/",
    },
    {
      title: "Customer Table",
      value: "customer table",
      link: "customer",
    },
    {
      title: "Product Table",
      value: "product table",
      link: "product",
    },
    {
      title: "Category Table",
      value: "category table",
      link: "category",
    },
  ];

  return <Tabs tabs={tabs} />;
}
