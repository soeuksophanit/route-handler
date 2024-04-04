import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { response } from "../../category/route";
import { Product } from "../route";

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
    const product = await prisma.products.findMany({
      where: {
        product_name: {
          in: [id_name],
          mode: "insensitive",
        },
      },
    });
    if (product) {
      return NextResponse.json(
        response(200, `Get product name ${id_name}`, product[0])
      );
    }
  }
  return NextResponse.json(response(404, `Product ${id_name} not found`, []), {
    status: 404,
  });
};

export const PUT = async (
  req: NextRequest,
  { params: { id_name: id } }: Props
) => {
  const product = await prisma.products.findUnique({
    where: { product_id: parseInt(id) },
  });
  if (product) {
    const { product_name, category_id, price }: Product = await req.json();
    if (!product_name.length || !category_id || price <= 0) {
      return NextResponse.json(
        response(501, `Some field might be empty or invalid`, []),
        { status: 501 }
      );
    }
    const updateProduct = await prisma.products.update({
      where: {
        product_id: parseInt(id),
      },
      data: {
        category_id,
        product_name,
        price,
      },
    });

    return NextResponse.json(
      response(201, `Product id ${id} was updated successfully`, updateProduct),
      { status: 201 }
    );
  }
  return NextResponse.json(
    response(404, `Product id ${id} was not found`, []),
    { status: 404 }
  );
};

export const DELETE = async (
  req: NextRequest,
  { params: { id_name: id } }: Props
) => {
  const product = await prisma.products.findUnique({
    where: {
      product_id: parseInt(id),
    },
  });
  if (product) {
    const deleteProduct = await prisma.products.delete({
      where: {
        product_id: parseInt(id),
      },
    });
    return NextResponse.json(
      response(200, `Product id ${id} was deleted successfully`, deleteProduct),
      { status: 200 }
    );
  }
  return NextResponse.json(
    response(404, `Product id ${id} was not found`, []),
    { status: 404 }
  );
};
