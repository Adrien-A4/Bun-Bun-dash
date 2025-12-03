import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
    const invitelink = 'https://discord.gg/P2UQewd6Vy';
    return NextResponse.redirect(invitelink);
}