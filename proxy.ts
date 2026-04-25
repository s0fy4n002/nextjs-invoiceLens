
import { NextRequest, NextResponse } from "next/server";

export default async function proxy(request: NextRequest) {
   
}

export const config = {
    matcher: ['/((?!_next|static|favicon.ico).*)'],
}