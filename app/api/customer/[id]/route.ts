import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { response } from "../../category/route";

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
