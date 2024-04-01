import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { response } from "../category/route";

// get all the data about product
export const GET = async (req: NextRequest) => {
  const products = await prisma.products.findMany();
  if (products)
    return NextResponse.json(
      response(200, "Get all products successfully", products)
    );

  return NextResponse.json(
    response(200, "Get all products successfully", products)
  );
};
