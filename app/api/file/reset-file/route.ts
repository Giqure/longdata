import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

export async function POST(request: NextRequest) {
    const requestJSON = await request.json();
    const rootPath = "/www/longdata/app/data/file/";
    const filePath = rootPath + (requestJSON.filePath || "") + requestJSON.fileName
    const newPath = rootPath + (requestJSON.newFilePath || "") + requestJSON.newFileName
    console.log("RESET: " + filePath)
    console.log("TO: " + newPath)

    fs.rename(filePath, newPath, (err)=>{
        if(err){
            console.log('RESET Fail');
            console.log(err);
        }else{
            console.log('RESET Success');
        }
    });

    return NextResponse.json({ status: 200 })

}
