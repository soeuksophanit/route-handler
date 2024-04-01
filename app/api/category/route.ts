import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Category {
  category_id?: number;
  category_name: string;
}

export const response = <T>(status: number, message: string, payload: T) => ({
  status,
  message,
  payload,
  timestamp: new Date(),
});

export const GET = async (req: NextRequest) => {
  const categories = await prisma.categories.findMany();
  return categories.length
    ? NextResponse.json(
        response(200, `Get All ${categories.length} Categories`, categories),
        {
          status: 200,
        }
      )
    : NextResponse.json(response(404, "Not Found", categories), {
        status: 404,
      });
};

export const POST = async (req: NextRequest) => {
  let count = 0;
  const allCate = await prisma.categories.findMany();
  const body: Category[] = await req.json();
  allCate.map((cate) => {
    body.map((request) => {
      if (cate.category_name === request.category_name) {
        count++;
      }
    });
  });

  if (count >= 1)
    return NextResponse.json(
      {
        status: 501,
        message: "Category already exist.",
      },
      { status: 501 }
    );
  for (let cate of body) {
    if (cate.category_name.length <= 0) {
      return NextResponse.json(
        { status: 501, message: "Some Field might be empty." },
        { status: 501 }
      );
    }
  }

  let results: Category[] = [];
  for (let cate of body) {
    const newCate = await addCategory(cate);
    results = [...results, newCate];
  }

  return NextResponse.json(
    response(201, "Add new categories successfully", results),
    { status: 201 }
  );
};

// function add new Catetgories
async function addCategory(cate: Category) {
  const results = await prisma.categories.create({
    data: {
      category_name: cate.category_name,
    },
  });
  return results;
}
