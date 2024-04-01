import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const response = <T>(status: number, msg: string, payload: T) => ({
  status,
  msg,
  payload,
  timestamp: Date.now(),
});

export const GET = async (req: NextRequest) => {
  const categories = await prisma.categories.findMany();
  return categories.length
    ? NextResponse.json(response(200, "Get All Categories", categories))
    : NextResponse.json(response(404, "Not Found", categories));
};
