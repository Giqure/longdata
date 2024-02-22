import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {

}

export async function GET(request: NextRequest) {
    const reqParams = request.url;
    const pathReg = new RegExp(`(?<=\\bpath=)[^&]*`);
    const filePath = decodeURI(reqParams.match(pathReg)?.toString() || "")
    console.log("DOWNLOAD: " + filePath)
    const buffer = await readFile(filePath);

    const headers = new Headers();
    headers.append('Content-Disposition', `attachment; filename=${encodeURI(path.basename(filePath))}`);
    headers.append('Content-Type', 'application/octet-stream');
    return new Response(buffer, {
        headers,
    });
}

