import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

export async function POST(request: NextRequest) {
    const requestJSON = await request.json();
    const rootPath = "/www/longdata/app/data/file/";
    const filePath = rootPath + (requestJSON.filePath || "") + requestJSON.fileName
    console.log("DELETE: " + filePath)
    fs.unlink(filePath, (err)=>{
        if(err){
            console.log('DELETE Fail');
            console.log(err);
        }else{
            console.log('DELETE Success');
        }
    });

    return NextResponse.json({ status: 200 })

}
