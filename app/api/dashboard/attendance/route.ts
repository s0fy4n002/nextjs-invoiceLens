import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/server/user-utils";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      employeeId: user.id,
    };

    if (search) {
      where.employee = {
        name: {
          contains: search,
          mode: "insensitive",
        },
      };
    }

    // Get total count
    const totalItems = await prisma.attendance.count({
      where,
    });

    // Get data with pagination
    const attendances = await prisma.attendance.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        employee: {
          select: {
            name: true,
          },
        },
      },
    });
    console.log('attendances ', attendances)
    const totalPages = Math.ceil(totalItems / limit);

    return NextResponse.json({
      success: true,
      data: attendances,
      currentPage: page,
      totalPages,
      totalItems,
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}