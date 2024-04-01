import { response } from "@/app/api/category/route";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export const GET = async (req: NextRequest, { params: { id } }: Props) => {
  if (!isNaN(parseInt(id))) {
    const products = await prisma.products.findMany({
      where: {
        category_id: parseInt(id),
      },
    });
    if (products.length >= 1) {
      return NextResponse.json(
        response(
          200,
          `${products.length} ${
            products.length > 1 ? "products" : "product"
          } with category id ${id}`,
          products
        ),
        { status: 200 }
      );
    }
  }
  return NextResponse.json(response(404, `Product ${id} not found`, []), {
    status: 404,
  });
};
