import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
export async function POST(request: NextRequest) {
    const requestJSON = await request.json();
    const userName = requestJSON.userName
    const userPassword = requestJSON.userPassword
    console.log("CREATE USER: " + userName)

    let createError;
    await prisma.user.create({
        data: {
            username: userName,
            password: userPassword,
            createAt: new Date().toString(),
        }
    }).catch((err) => {
        console.log(err)
        createError = err;
    })
    if (createError) {
        return NextResponse.json({
            status: 400,
            error: createError
        })
    }
    return NextResponse.json({ status: 200 })

}
