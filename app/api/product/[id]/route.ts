import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export const GET = async (req: NextRequest, { params: { id } }: Props) => {
  const product = await prisma.products.findUnique({
    where: {
      product_id: parseInt(id),
    },
  });

  if (product) {
    return NextResponse.json({
      status: 200,
      message: "Get product by id",
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
