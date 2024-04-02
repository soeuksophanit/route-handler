import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { response } from "../../category/route";
import { Order } from "../route";

interface Props {
  params: {
    id: string;
  };
}

export const GET = async (req: NextRequest, { params: { id } }: Props) => {
  const order = await prisma.order.findUnique({
    where: { order_id: parseInt(id) },
  });

  if (order) {
    return NextResponse.json(
      response(200, `Get Order ID ${id} successfully`, order),
      { status: 200 }
    );
  }

  return NextResponse.json(response(404, `Order ID ${id} was not found`, []), {
    status: 404,
  });
};

export const PUT = async (req: NextRequest, { params: { id } }: Props) => {
  const existOrder = await prisma.order.findUnique({
    where: { order_id: parseInt(id) },
  });
  if (existOrder) {
    const { customer_id, product_id, order_qty }: Order = await req.json();
    const product = await prisma.products.findUnique({
      where: { product_id: product_id },
    });
    const customer = await prisma.categories.findUnique({
      where: { category_id: customer_id },
    });

    if (product && customer) {
      if (customer_id && product_id && order_qty > 0) {
        const updateOrder = await prisma.order.update({
          where: { order_id: parseInt(id) },
          data: {
            customer_id,
            product_id,
            order_qty,
            order_total: product.price * order_qty,
            order_date: new Date(),
          },
        });

        return NextResponse.json(
          response(201, `Updated Order ID ${id} successfully`, updateOrder),
          {
            status: 201,
          }
        );
      }
    } else {
      return NextResponse.json(
        response(
          404,
          `It seem like the ID of Customer and Product was not found`,
          []
        ),
        { status: 404 }
      );
    }
  }

  return NextResponse.json(response(404, `Order ID ${id} was not found`, []), {
    status: 404,
  });
};

export const DELETE = async (req: NextRequest, { params: { id } }: Props) => {
  const existOrder = await prisma.order.findUnique({
    where: { order_id: parseInt(id) },
  });
  if (existOrder) {
    const deleteOrder = await prisma.order.delete({
      where: { order_id: parseInt(id) },
    });
    return NextResponse.json(
      response(201, `Order ID ${id} was deleted succesfully`, deleteOrder),
      { status: 201 }
    );
  }

  return NextResponse.json(response(404, `Order ID ${id} was not found`, []), {
    status: 404,
  });
};
