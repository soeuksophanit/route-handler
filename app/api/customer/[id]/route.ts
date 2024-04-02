import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { response } from "../../category/route";
import { Customer } from "../route";

interface Props {
  params: { id: string };
}

export const GET = async (req: NextRequest, { params: { id } }: Props) => {
  const customer = await prisma.customers.findUnique({
    where: { customer_id: parseInt(id) },
  });

  if (customer) {
    return NextResponse.json(
      response(200, `Get Customer ID ${id} successfully`, customer),
      { status: 200 }
    );
  }

  return NextResponse.json(
    response(404, `Customer ID ${id} was not found`, []),
    { status: 404 }
  );
};

export const PUT = async (req: NextRequest, { params: { id } }: Props) => {
  const existCustomer = await prisma.customers.findUnique({
    where: { customer_id: parseInt(id) },
  });
  if (existCustomer) {
    const { first_name, last_name, money_spent, birth }: Customer =
      await req.json();
    if (!first_name.length || !last_name.length || money_spent < 0) {
      return NextResponse.json(
        response(
          501,
          `Update was not successfully. Some fields might be empty or Invalid`,
          []
        ),
        { status: 501 }
      );
    }
    const updateCustomer = await prisma.customers.update({
      where: {
        customer_id: parseInt(id),
      },
      data: {
        birth: birth + "T00:00:00Z",
        first_name,
        last_name,
        money_spent,
      },
    });
    return NextResponse.json(
      response(
        201,
        `Customer ID ${id} was update successfully.`,
        updateCustomer
      ),
      { status: 201 }
    );
  }
  return NextResponse.json(
    response(404, `Customer ID ${id} was not found`, []),
    { status: 404 }
  );
};

export const DELETE = async (req: NextRequest, { params: { id } }: Props) => {
  const existCustomer = await prisma.customers.findUnique({
    where: { customer_id: parseInt(id) },
  });
  if (existCustomer) {
    const deleteCustomer = await prisma.customers.delete({
      where: { customer_id: parseInt(id) },
    });
    return NextResponse.json(
      response(
        201,
        `Customer ID ${id} was deleted successfully`,
        deleteCustomer
      ),
      { status: 201 }
    );
  }
  return NextResponse.json(
    response(404, `Customer ID ${id} was not found`, []),
    { status: 404 }
  );
};
