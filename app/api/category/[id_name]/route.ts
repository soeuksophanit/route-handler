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
        response(200, `Get category by id : ${id_name}`, category),
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
        response(200, `Get category by name : ${id_name}`, category),
        { status: 200 }
      );
    }
  }
  return NextResponse.json(
    response(404, `Category : ${id_name} was not found`, []),
    {
      status: 404,
    }
  );
};

export const PUT = async (req: NextRequest, { params: { id_name } }: Props) => {
  if (!isNaN(parseInt(id_name))) {
    const category = await prisma.categories.findUnique({
      where: { category_id: parseInt(id_name) },
    });
    if (category) {
      const { name } = await req.json();
      const updateCate = await prisma.categories.update({
        where: { category_id: parseInt(id_name) },
        data: {
          category_name: name,
        },
      });
      return NextResponse.json(
        response(
          201,
          `Category id : ${id_name} was update successfully`,
          updateCate
        ),
        { status: 201 }
      );
    }
  }

  return NextResponse.json(
    response(404, `Category id : ${id_name} was not found`, []),
    { status: 404 }
  );
};
