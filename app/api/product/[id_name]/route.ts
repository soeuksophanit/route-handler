import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id_name: string };
}

export const GET = async (req: NextRequest, { params: { id_name } }: Props) => {
  if (!isNaN(parseInt(id_name))) {
    const product = await prisma.products.findUnique({
      where: {
        product_id: parseInt(id_name),
      },
    });
    if (product) {
      return NextResponse.json({
        status: 200,
        message: `Get product id ${id_name}`,
        payload: product,
        timestamp: Date.now(),
      });
    }
  } else {
    const product = await prisma.products.findUnique({
      where: {
        product_name: id_name,
      },
    });
    if (product) {
      return NextResponse.json({
        status: 200,
        message: `Get product name ${id_name}`,
        payload: product,
        timestamp: Date.now(),
      });
    }
  }

  return NextResponse.json({
    status: 404,
    message: `Product ${id_name} not found`,
    timestamp: Date.now(),
  });
};
