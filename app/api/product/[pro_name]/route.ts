import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { pro_name: string };
}

export const GET = async (
  req: NextRequest,
  { params: { pro_name } }: Props
) => {
  const product = await prisma.products.findUnique({
    where: {
      product_name: pro_name,
    },
  });

  if (product) {
    return NextResponse.json({
      status: 200,
      message: "Get product by Name",
      payload: product,
      timestamp: Date.now(),
    });
  }

  return NextResponse.json({
    status: 404,
    message: "Product not found",
    timestamp: Date.now(),
  });
};
