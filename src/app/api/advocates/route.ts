import type { NextRequest } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { asc, count, or, ilike, sql } from "drizzle-orm";
import { advocateData } from "@/db/seed/advocates";

export async function GET(req: NextRequest) {
  const searchTerm = req.nextUrl?.searchParams.get("searchTerm");
  const limit = req.nextUrl?.searchParams.get("limit");
  const offset = req.nextUrl?.searchParams.get("offset");

  if (!db) {
    const data = searchTerm
      ? advocateData.filter((advocate) => {
          return (
            advocate.firstName.includes(searchTerm) ||
            advocate.lastName.includes(searchTerm) ||
            advocate.city.includes(searchTerm) ||
            advocate.degree.includes(searchTerm) ||
            advocate.specialties.includes(searchTerm)
          );
        })
      : advocateData;

    return Response.json({
      data: {
        advocates: data.slice(Number(offset), Number(offset) + Number(limit)),
        totalCount: data.length,
      },
    });
  }

  const advocatesData = await db
    .select()
    .from(advocates)
    .where(
      searchTerm
        ? or(
            ilike(advocates.firstName, `%${searchTerm}%`),
            ilike(advocates.lastName, `%${searchTerm}%`),
            ilike(advocates.city, `%${searchTerm}%`),
            ilike(advocates.degree, `%${searchTerm}%`),
            sql`${advocates.specialties}::text ILIKE ${`%${searchTerm}%`}`
          )
        : undefined
    )
    .orderBy(asc(advocates.id))
    .limit(Number(limit))
    .offset(Number(offset));

  const advocatesTotalCount = await db
    .select({ count: count() })
    .from(advocates);

  return Response.json({
    data: {
      advocates: advocatesData,
      totalCount: advocatesTotalCount[0].count,
    },
  });
}
