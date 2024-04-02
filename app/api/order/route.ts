import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { response } from "../category/route";

export interface Order {
  order_id?: number;
  product_id: number;
  customer_id: number;
  order_qty: number;
  order_total?: number;
  order_date?: Date;
}

export const GET = async (req: NextRequest) => {
  const orderList = await prisma.order.findMany();
  if (orderList.length) {
    return NextResponse.json(
      response(200, `Get All ${orderList.length} order lists`, orderList),
      { status: 200 }
    );
  }
  return NextResponse.json(
    response(200, `There is no order list right now`, []),
    { status: 200 }
  );
};

export const POST = async (req: NextRequest) => {
  const { customer_id, order_qty, product_id }: Order = await req.json();
  const customer = await prisma.customers.findUnique({
    where: {
      customer_id,
    },
  });
  const product = await prisma.products.findUnique({
    where: { product_id },
  });
  if (customer && product) {
    if (customer_id && order_qty && product_id) {
      const neworder = await prisma.order.create({
        data: {
          product_id,
          customer_id,
          order_qty,
          order_date: new Date(),
          order_total: product.price * order_qty,
        },
      });

      return NextResponse.json(
        response(
          201,
          `Order ID ${neworder.order_id} was add successfully`,
          neworder
        ),
        { status: 201 }
      );
    }
    return NextResponse.json(
      response(501, `Some field might be empty or Invalid`, []),
      { status: 501 }
    );
  }

  return NextResponse.json(
    response(200, `It seem like ther is no Customer and Product`, []),
    { status: 200 }
  );
};
