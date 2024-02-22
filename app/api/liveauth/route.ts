import getCurrentUser from "@/app/lib/session";
import md5 from "blueimp-md5";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { User } from "@/app/types/user";

export async function POST(request: NextRequest) {
    const reqParams = await request.text();
    const eventReg = new RegExp(`(?<=\\bevent=)[^&]*`);
    const event = request.url.match(eventReg)?.toString();
    const usrReg = new RegExp(`(?<=\\busr=)[^&]*`);
    const pwdReg = new RegExp(`(?<=\\bpwd=)[^&]*`);
    const ipReg = new RegExp(`(?<=\\baddr=)[^&]*`);
    const reqUser = {
        username: reqParams.match(usrReg)?.toString(),
        password: reqParams.match(pwdReg)?.toString(),
        ip: request.headers.get('x-forwarded-for') || "",
    };

    console.log('From liveauth: requesturl - ' + reqUser.username + reqParams + ' url ' + request.url);
    // @ts-ignore
    const user:User = await prisma.user.findUnique({
        where: {
            username: reqUser.username || ' '
        }
    })
    if (user && md5(reqUser?.password || '') == user.password) {
        const islive = await prisma.liveuser.findUnique({
            where: {
                id: user.id
            }
        })
        if (islive) {
            console.log('From liveauth: event - ' + event);
            switch(event){
                case 'publish':
                    console.log('Already Streaming');
                    await prisma.liveuser.delete({
                        where: {
                            id: user.id,
                        }
                    })
                    break;
                case 'done':
                    await prisma.liveuser.delete({
                        where: {
                            id: user.id,
                        }
                    })
                    console.log('Exit');
                    return NextResponse.json({ error: 'Exit' }, { status: 200 })
                default:
                    console.log('Bad event');
                    return NextResponse.json({ error: 'Bad event' }, { status: 400 })
            }
        }

        const liveuser = await prisma.liveuser.create({
            data: {
                id: user.id,
                sourceIp: reqUser.ip || ''
            }
        })
        if (liveuser) {
            console.log('Live Success' + user.username);
            return NextResponse.json({ error: 'Welcome' }, { status: 200 })
        } else {
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }
    } else {
        console.log('Wrong username or pwd');
        console.log(reqUser);
        console.log('Live bad');
        return NextResponse.json({ error: 'Wrong Usernmae or password' }, { status: 403 })
    }
}

export async function GET(request: NextRequest) {
    console.log('From liveauth: requesturl - ' + request.url);

    return NextResponse.json({ error: 'Invalid Request: GET' }, { status: 200 })
}