import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
    const backendres = await fetch("http://localhost:3000/api/status", { 
        method: "GET",
        cache: 'no-cache'
      });
    const data = await backendres.json();
    return NextResponse.json(data);
}