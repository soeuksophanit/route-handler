import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { response } from "../../category/route";

interface Props {
  params: { id_name: string };
}

export const GET = async (req: NextRequest, { params: { id_name } }: Props) => {
  if (!isNaN(parseInt(id_name))) {
    const category = await prisma.categories.findUnique({
      where: {
        category_id: parseInt(id_name),
      },
    });
    if (category) {
      return NextResponse.json(
        response(200, `Get category by id ${id_name}`, category),
        { status: 200 }
      );
    }
  } else {
    const category = await prisma.categories.findUnique({
      where: {
        category_name: id_name,
      },
    });
    if (category) {
      return NextResponse.json(
        response(200, `Get category by name ${id_name}`, category),
        { status: 200 }
      );
    }
  }
  return NextResponse.json(response(404, `Category ${id_name} not found`, []), {
    status: 404,
  });
};
