import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { response } from "../category/route";

export interface Product {
  product_id?: number;
  category_id: number;
  product_name: string;
  price: number;
}

// get all the data about product
export const GET = async (req: NextRequest) => {
  const products: Product[] = await prisma.products.findMany();
  if (products)
    return NextResponse.json(
      response(
        200,
        `Get all ${products.length} products successfully`,
        products
      ),
      { status: 200 }
    );

  return NextResponse.json(response(200, `There is no product`, []), {
    status: 200,
  });
};

export const POST = async (req: NextRequest) => {
  const { category_id, product_name, price }: Product = await req.json();
  const existProduct = await prisma.products.findUnique({
    where: { product_name: product_name },
  });
  if (existProduct) {
    return NextResponse.json(response(501, `Product is already exist`, []), {
      status: 501,
    });
  }
  if (!category_id || !product_name.length || price <= 0) {
    return NextResponse.json(
      response(501, "Some fields is empty or invalid", []),
      { status: 501 }
    );
  }
  const newProduct = await prisma.products.create({
    data: {
      category_id,
      product_name,
      price,
    },
  });

  return NextResponse.json(
    response(201, `Add new Product successfully`, newProduct),
    { status: 201 }
  );
};
