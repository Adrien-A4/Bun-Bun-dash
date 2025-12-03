import { NextRequest, NextResponse } from 'next/server';

const BOT_API_BASE = 'http://localhost:3000/api/bot-appearance';

export async function GET(req: NextRequest) {
    const guildId = req.nextUrl.searchParams.get('guildId');
    if (!guildId) {
        return NextResponse.json({ success: false, error: 'Missing guildId' }, { status: 400 });
    }
    try {
        const res = await fetch(`${BOT_API_BASE}/${guildId}`);
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const guildId = req.nextUrl.searchParams.get('guildId');
    if (!guildId) {
        return NextResponse.json({ success: false, error: 'Missing guildId' }, { status: 400 });
    }
    const body = await req.json();
    try {
        const res = await fetch(`${BOT_API_BASE}/${guildId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}