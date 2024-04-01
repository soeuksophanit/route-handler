import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { response } from "../../category/route";

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
      return NextResponse.json(
        response(200, `Get product id ${id_name}`, product)
      );
    }
  } else {
    const product = await prisma.products.findUnique({
      where: {
        product_name: id_name,
      },
    });
    if (product) {
      return NextResponse.json(
        response(200, `Get product name ${id_name}`, product)
      );
    }
  }
  return NextResponse.json(response(404, `Product ${id_name} not found`, []));
};
