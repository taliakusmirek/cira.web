import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { error: 'Analysis functionality is temporarily unavailable.' },
    { status: 503 }
  );
} 