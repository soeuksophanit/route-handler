import { NextRequest, NextResponse } from "next/server";
import { response } from "../category/route";
import prisma from "@/prisma/client";

interface Customer {
  customer_id?: number;
  first_name: string;
  last_name: string;
  birth: Date;
  money_spent: number;
}

export const GET = async (req: NextRequest) => {
  const customers = await prisma.customers.findMany();
  if (!customers.length) {
    return NextResponse.json(response(200, `There is no customer`, []), {
      status: 200,
    });
  }
  return NextResponse.json(
    response(
      200,
      `Get All ${customers.length} Customers Successfully`,
      customers
    ),
    { status: 200 }
  );
};

export const POST = async (req: NextRequest) => {
  const { first_name, last_name, money_spent, birth }: Customer =
    await req.json();
  if (!first_name.length || !last_name.length || money_spent < 0) {
    return NextResponse.json(
      response(
        501,
        `POST was not successfully. Some fields might be empty or Invalid`,
        []
      ),
      { status: 501 }
    );
  }
  const newCustomer = await prisma.customers.create({
    data: {
      first_name,
      last_name,
      money_spent,
      birth: birth + "T00:00:00Z",
    },
  });

  return NextResponse.json(
    response(201, `Create new Customer Successfully`, newCustomer),
    { status: 201 }
  );
};
