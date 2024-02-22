'use client';

import path from "path";

export default function DirItem({dirPath}: {dirPath: string}) {
    // 应该写一个自动生成avatar的
    
    return (<>
        <div className="fileItem group/fileItem transition-all delay-75 shadow-xs bg-stone-100 border-4 hover:border-amber-500/50 hover:bg-amber-500/25 lg:border-4 ">
            <a className="rounded-md no-underline hover:no-underline active:outline outline-2 outline-offset-4 outline-hardred-500" href={dirPath}>
                {/* <figure className="overflow-hidden">
                    <img className="overflow-hidden transition-all delay-100
                group-hover/fileItem:brightness-110"
                        src="/化学实验室.jpg" title={"文件夹：" + path.basename(dirPath)} />
                </figure> */}
                <div className="fileItem-body pt-5 pb-5 pr-6 pl-6 transition-all delay-100">
                    <h2 className="font-black text-slate-800 
                    group-hover/fileItem:underline group-hover/fileItem:underline-offset-4 
                    group-hover/fileItem:decoration-2 group-hover/fileItem:decoration-hardred-600 ">{path.basename(dirPath)}</h2>
                </div>
            </a>
        </div >
    </>);
}
