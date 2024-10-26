import { env } from "@/env";
import { getToken } from "@/lib/token";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const authToken = getToken();
  if (!authToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const DJANGO_API_URL = `${env.NEXT_PUBLIC_API_URL}/counts-account-by-course`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(DJANGO_API_URL, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching Course counts", error);
    return NextResponse.json(
      { error: "Failed to fetch Course counts" },
      { status: 500 }
    );
  }
}
