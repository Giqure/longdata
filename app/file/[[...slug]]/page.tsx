import FileItem from "../FileItem";
import DirItem from "../DirItem";
import SideBar from "../SideBar";
import { ReactElement, Suspense } from "react";
import fs from "fs";
import { FileData } from "@/app/types/filedata";
import getCurrentUser from "@/app/lib/session";
import { User } from "@/app/types/user";
import prisma from "@/app/lib/prisma";


// function TypeFilter() {
//     const filetypes = ['zip', 'pdf'];
//     const FileTypes = [];
//     for (let i in filetypes) {
//         FileTypes.push(
//             <div className="hover:shadow-md">
//                 <input className="m-2"
//                     type="checkbox"
//                     placeholder="2"
//                 />
//                 <label>{filetypes[i]}</label>
//             </div>);
//     }
//     return FileTypes;
// }

// const [search, setSearch] = useState({});

// function HandleFilenameFilterResult(term: string) {
//     setSearch({
//         ...search,
//         filename: term
//     });
//     console.log(term);
// }
// function HandleUploaderAuthorFilterResult(term: string) {
//     setSearch({
//         ...search,
//         uploaderorauthor: term
//     });
//     console.log(term);
// }

// function isSearchBlank() {
//     let v = Object.values(search)
//     for (let i in v) {
//         if (v[i]) {
//             return false;
//         }
//     }
//     return true;
// }
// {/* HIDDEN START */}
// <div className="w-full px-8 pt-5 hidden">
//     <div className="w-full">
//         <div className="flex gap-x-3 mb-3">
//             <input
//                 className="w-1/2 rounded-lg border border-gray-200 py-[9px] px-10 text-sm outline-2 placeholder:text-gray-500"
//                 placeholder="Filename"
//                 onChange={(e) => {
//                     HandleFilenameFilterResult(e.target.value);
//                 }}
//             />
//             <input
//                 className="w-1/2 rounded-lg border border-gray-200 py-[9px] px-10 text-sm outline-2 placeholder:text-gray-500"
//                 placeholder="Uploader or Author"
//                 onChange={(e) => {
//                     HandleUploaderAuthorFilterResult(e.target.value);
//                 }}
//             />
//         </div>
//         <div className="rounded-sm px-2 py-1 flex flex-wrap items-stretch">
//             <div className="m-1 flex flex-col justify-items-center items-center transition-all">
//                 <div className="grow flex flex-col justify-items-center items-center rounded-lg p-3 border-x-2 border-y border-violet-800 bg-white bg-gradient-to-br shadow-lg  transition-all delay-75
//                             hover:from-40% hover:from-purple-50 hover:to-purple-100 hover:shadow-md">
//                     <p className="w-fit text-stone-600 font-semibold">上传时间</p>
//                     <p className="w-fit mt-2 text-stone-600 text-xl font-light">1 h</p>
//                     <input className="mt-2 grow"
//                         type="range"
//                         min='0'
//                         max='100'
//                         placeholder="2"
//                     ></input>
//                 </div>
//             </div>
//             <div className="m-1 flex flex-col justify-items-center items-center transition-all">
//                 <div className="grow flex flex-col justify-items-center items-center rounded-lg p-3 border-x-2 border-y border-violet-800 bg-white bg-gradient-to-br shadow-lg  transition-all delay-75
//                             hover:from-40% hover:from-purple-50 hover:to-purple-100 hover:shadow-md">
//                     <p className="w-fit text-stone-600 font-semibold">文件格式</p>
//                     <TypeFilter></TypeFilter>
//                 </div>
//             </div>
//         </div>
//     </div>
//     <div>
//         {isSearchBlank() ? (
//             <>
//                 <div>最近上传</div>
//             </>
//         ) : (
//             <>
//                 <div>筛选结果如下</div>
//             </>
//         )
//         }
//         <div>
//             kkkkkk
//         </div>
//     </div>
// </div>
// {/* HIDDEN END */}


const rootPath = "/www/longdata/app/data/file/";

const AllItems = async ({ currentPath }: { currentPath: string }) => {
    const files = fs.readdirSync(rootPath + currentPath);

    let allDirItems: ReactElement[] = [];
    let allFileItems: ReactElement[] = [];
    let allFileDatas: FileData[] = [];

    let fileItemPromise = [];
    for (const fileName of files) {
        fileItemPromise.push(new Promise<void>((resolve, _reject) => {
            fs.stat(decodeURI(rootPath + currentPath + fileName), (_err, fileStat) => {
                if (fileStat.isFile()) {
                    prisma.file.findMany({
                        where: {
                            path: currentPath,
                            filename: fileName
                        }
                    }).then(async (dbFileDatas) => {
                        const defaultFileData = {
                            id: 0,
                            filename: fileName,
                            avatar: "/简单工厂内景.jpg",
                            path: currentPath,
                            uploadAt: "未知时间",
                            updatedAt: "从未",
                            uploadUserId: 0,
                            uploadUserIP: "后台",
                            accessibleUser: "Public"
                        };
                        console.log(dbFileDatas);
                        let dbFileData = {
                            ...defaultFileData,
                            ...dbFileDatas[0]
                        }
                        if (dbFileData) {
                            const fileSize = fileStat.size;
                            const fileUploadUser = await prisma.user.findUnique({
                                where:{
                                    id: dbFileData.uploadUserId
                                }
                            })
                            let fileData:FileData = {
                                ...defaultFileData,
                                ...dbFileData,
                                size: fileSize,
                                uploadUserName: fileUploadUser?.username || "佚名"
                            }
                            allFileDatas.push(fileData);
                            allFileItems.push(
                                <FileItem
                                    fileData={fileData}
                                ></FileItem>
                            );
                            resolve();
                        } else {
                            console.log("文件不在数据库！");
                            resolve()
                        }
                    });
                } else {
                    allDirItems.push(
                        <DirItem
                            dirPath={"/file/" + currentPath + fileName}
                        ></DirItem>
                    );
                    resolve();
                }

            });
        }))
    }
    await Promise.all(fileItemPromise);
    return (
        <div className="w-full px-3 pt-5 md:px-6 ">
            <div className="mb-3 grid grid-cols-3 gap-1 md:grid-cols-4 lg:grid-cols-6">
                {allDirItems}
            </div>
            <div className="grid grid-cols-3 gap-1 md:grid-cols-4 lg:grid-cols-5">
                {allFileItems}
            </div>
        </div>
    );
}


export default async function Page({ params }: { params: { slug?: string[] } }) {
    const currentPath = decodeURI(params.slug?.join("/") || "") + "/";
    const currentUser:User = await getCurrentUser() || {
        id: 1001,
        username: "访客",
        password: "",
        avatar: "/访客头像.jpg",
        email: "",
        createAt: "",
        updatedAt: "",
        group: null
    };

    return (<>
        <div className="flex justify-start content-start">
            <div className="z-50 left-0 h-full shrink-0 hidden md:block md:w-32 lg:w-40 transition-all">
                <SideBar currentPath={currentPath} currentUser={currentUser}></SideBar>
            </div>
            <div className="z-50 right-4 bottom-2 fixed shrink-0 md:hidden transition-all">
                <SideBar currentPath={currentPath} currentUser={currentUser}></SideBar>
            </div>
            <div className='grow'>
                <Suspense fallback={<p className="p-10">Later...</p>}>
                    <AllItems currentPath={currentPath}></AllItems>
                </Suspense>
            </div>
        </div>
    </>);
}