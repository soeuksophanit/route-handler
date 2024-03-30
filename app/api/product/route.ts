import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// get all the data about product
export const GET = async (req: NextRequest) => {
  const products = await prisma.products.findMany();
  if (products)
    return NextResponse.json({
      status: 200,
      message: "Get all products successfully",
      payload: products,
      timestamp: Date.now(),
    });
  return NextResponse.json({
    message: "There is no product",
  });
};
