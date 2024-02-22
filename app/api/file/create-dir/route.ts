import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

export async function POST(request: NextRequest) {
    const requestJSON = await request.json();
    const rootPath = "/www/longdata/app/data/file/";
    const dirPath = rootPath + (requestJSON.newDirPath || "") + requestJSON.newDirName
    console.log("NEWDIR: " + dirPath)
    fs.mkdir(dirPath, (err)=>{
        if(err){
            console.log('NEWDIR Fail');
            console.log(err);
        }else{
            console.log('NEWDIR Success');
        }
    });

    return NextResponse.json({ status: 200 })

}
