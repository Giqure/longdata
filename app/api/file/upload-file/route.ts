
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { isFile } from "@/app/utils/typePredicate";
import prisma from "@/app/lib/prisma";

export async function POST(request: Request) {
    const rootPath = "/www/longdata/app/data/file/";
    const fileFormData = await request.formData()
    if (fileFormData) {
        if (!isFile(fileFormData.get("newFile"))) return NextResponse.json({ status: 400 });
        // if (!isString(fileFormData.get("newFileName"))) return NextResponse.json({ status: 4001 });
        // if (!isString(fileFormData.get("newFilePath"))) return NextResponse.json({ status: 4002 });
    }
    const fileName = <string>fileFormData.get("newFileName")
    const filePath = rootPath + <string>fileFormData.get("newFilePath")
    const fileUploadUserId = parseInt(<string>fileFormData.get("newFileUploadUserId"))
    if (fs.existsSync(filePath+fileName)) return NextResponse.json({ status: 400, error: "文件重名" });
    const file = <File>fileFormData.get("newFile")
    const fileReader = file.stream().getReader()
    console.log("UPLOAD: " + fileFormData)
    console.log("TO: " + filePath)
    const writeStream = fs.createWriteStream(filePath + fileName);
    async function pump():Promise<any> {
        const { value, done } = await fileReader.read();
        console.log("上传中...");
        
        if (done) {
            console.log("上传成功，写入数据库");
            prisma.file.create({
                data: {
                    id: undefined,
                    filename: fileName,
                    path: <string>fileFormData.get("newFilePath"),
                    uploadAt: new Date().toString(),
                    uploadUserId: fileUploadUserId,
                    uploadUserIP: request.headers.get('x-forwarded-for') || "",
                    accessibleUser: ""
                }
            }).catch((error) => {
                console.log(error)
            })
            return;
        }
        // console.log("上传中...");
        writeStream.write(value);
        return pump();
    }
    await pump();
    writeStream.end();


    return NextResponse.json({ status: 200 });

}

export async function GET(request: NextRequest) {
    return NextResponse.json({ status: 0 });
}

