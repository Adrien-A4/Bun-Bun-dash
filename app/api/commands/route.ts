import { NextResponse } from "next/server";

export async function GET() {
	// Minimal response for commands API. Expand as needed.
	const commands = [
		{ name: "/meme", category: "fun", description: "Sends a random meme", premium: false },
	];
	return NextResponse.json({ commands });
}
