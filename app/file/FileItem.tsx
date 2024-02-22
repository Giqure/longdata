'use client';

import { FileData } from "../types/filedata";
import { useState } from "react";
import { motion } from "framer-motion";

const Collapse = ({
    children,
    collapseState,
    style
}: {
    children: React.ReactNode,
    collapseState: boolean,
    style: string
}) => {
    return (
        <motion.div
            animate={collapseState ? "open" : "closed"}
            variants={{
                open: {
                    opacity: 1,
                    transition: {
                        type: "spring",
                        bounce: 0,
                        duration: 0.35,
                        delayChildren: 0.2,
                        staggerChildren: 0.05
                    }
                },
                closed: {
                    opacity: 0,
                    transition: {
                        type: "spring",
                        bounce: 0,
                        duration: 0.15
                    }
                }
            }}
            className={"transtion-all " + style}
        >
            {children}
        </motion.div>);
}

export default function FileItem({
    fileData
}: {
    fileData: FileData,
}) {
    const fileSize = fileData.size;
    const fileUploadTime = fileData.uploadAt;

    const fileSizeString = () => {
        if (fileSize > 1125899906842624) return (fileSize / 1125899906842624).toFixed(2) + "ZB";
        if (fileSize > 1099511627776) return (fileSize / 1099511627776).toFixed(2) + "TB";
        if (fileSize > 1073741824) return (fileSize / 1073741824).toFixed(2) + "GB";
        if (fileSize > 1048576) return (fileSize / 1048576).toFixed(2) + "MB";
        if (fileSize > 1024) return (fileSize / 1024).toFixed(2) + "KB";
        return fileSize + "B"
    }
    const fileUploadTimeString = () => {
        const regex = /^(\w{3}) (\w{3}) (\d{2}) (\d{4}) (\d{2}):(\d{2}):(\d{2})/;
        const match = fileUploadTime.match(regex)
        if (!match) return "未知时间"
        const [, day, month, date, year, hours, minutes] = match;
        const monthIndex = new Date(`${month} 1, ${year}`).getMonth() + 1;
        return `${year}.${monthIndex}.${date} ${hours}:${minutes}`
    }

    const [isHoverFileAvatar, setIsHoverFileAvatar] = useState(false);
    const [isFileOperationCollpseOpen, setIsFileOperationCollpseOpen] = useState(false);
    const handleFileOperationSwitchClicked = () => {
        setIsFileOperationCollpseOpen(!isFileOperationCollpseOpen);
    }

    const [newPath, setNewPath] = useState("")
    const [newFileName, setNewFileName] = useState("")



    const handleFileItemOnclick = async () => {
        const response = await fetch('/api/file?path=/www/longdata/app/data/file/' + fileData.path + fileData.filename);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileData.filename;
        link.click();
        window.URL.revokeObjectURL(url);
    };

    const handleDeleteFileOptionClicked = () => {
        fetch('/api/file/delete-file', {
            method: 'POST',
            body: JSON.stringify({
                filePath: fileData.path,
                fileName: fileData.filename
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('fileitem from deletefile:', data);
                window.location.reload()
            })
            .catch(error => {
                console.error('fileitem get error from deletefile:', error);
            });
    }

    const handleMoveFileOptionClicked = () => {
        // fetch('/api/file/reset-file', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         filePath: fileData.path,
        //         fileName: fileData.filename,
        //         newFilePath: newPath,
        //         newFileName: fileData.filename
        //     })
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log('fileitem from deletefile:', data);
        //     })
        //     .catch(error => {
        //         console.error('fileitem get error from deletefile:', error);
        //     });
        alert("请下载后重新上传以完成移动（复制）")
    }
    const handleRenameFileOptionClicked = () => {
        // fetch('/api/file/reset-file', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         filePath: fileData.path,
        //         fileName: fileData.filename,
        //         newFilePath: fileData.path,
        //         newFileName: newFileName
        //     })
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log('fileitem from deletefile:', data);
        //     })
        //     .catch(error => {
        //         console.error('fileitem get error from deletefile:', error);
        //     });
        alert("请下载后重新上传以完成重命名")
    }

    const handleFileAvatarOnclick = () => {
        if (!isFileOperationCollpseOpen) {
            handleFileItemOnclick();
        }
    }
    if (!fileData.avatar) {
        fileData.avatar = "/简单工厂内景.jpg";
    }


    return (<>
        <div className="fileItem group/fileItem transition-all delay-75 shadow-xs bg-stone-100 border border-stone-900 
        hover:border-indigo-500/50 active:border-indigo-600/50  active:outline outline-2 outline-offset-2 outline-hardred-500
        md:border-inherit md:border-4 ">
            <div className="flex flex-col h-full rounded-md no-underline hover:no-underline ">
                <motion.div
                    onHoverStart={() => { setIsHoverFileAvatar(true) }}
                    onHoverEnd={() => { setIsHoverFileAvatar(false) }}
                    className="relative overflow-hidden" >
                    {/* 文件图片 */}
                    <motion.div
                        onClick={handleFileAvatarOnclick}>
                        <img
                            className="overflow-hidden transition-all delay-100 w-full h-16 object-cover 
                            md:h-28
                            contrast-125 saturate-[.75] 
                            group-hover/fileItem:brightness-125 group-hover/fileItem:contrast-100
                            md:contrast-100 md:saturate-[.90]
                            md:group-hover/fileItem:brightness-110 md:group-hover/fileItem:saturate-[1.2]"
                            src={fileData.avatar}
                            title={fileData.filename}
                        />
                    </motion.div>

                    {/* 文件操作 */}
                    <Collapse
                        collapseState={isFileOperationCollpseOpen}
                        style={isFileOperationCollpseOpen ? "z-30 absolute inset-0 select-none" : "hidden"}>
                        <div
                            className="h-full flex justify-evenly items-center bg-stone-100/80 text-center align-middle text-slate-700 ">
                            <p
                                className=" mb-2 border-2 border-white rounded-full bg-gray-200 py-1.5 shadow-lg
                                w-10 h-8 text-xs
                                md:w-16 md:h-12 md:py-2.5 md:text-base
                                hover:shadow-inner hover:bg-slate-300  transition-all"
                                onClick={handleRenameFileOptionClicked}
                                title="其实是下载"
                            >重命名</p>
                            <p
                                className=" mb-2 border-2 border-white rounded-full bg-gray-200 py-1.5 shadow-lg
                                w-8 h-8 text-xs
                                md:w-12 md:h-12 md:py-2.5 md:text-base
                                hover:shadow-inner hover:bg-slate-300  transition-all"
                                onClick={handleMoveFileOptionClicked}
                                title="其实是下载"
                            >移动</p>
                            <p
                                className=" mb-2 border-2 border-white rounded-full bg-gray-200 py-1.5 shadow-lg
                                w-8 h-8 text-xs
                                md:w-12 md:h-12 md:py-2.5 md:text-base
                                hover:shadow-inner hover:bg-slate-300  transition-all"
                                onClick={handleDeleteFileOptionClicked}
                            >删除</p>
                        </div>
                    </Collapse>
                    {/* 打开文件操作按钮 */}
                    <motion.div
                        className="z-40 absolute rounded bottom-0 right-0 mx-3 my-2 px-1 py-px bg-stone-100/60 text-xs text-slate-500 select-none
                        hover:bg-stone-200"
                        animate={isHoverFileAvatar ? "hoverStart" : "hoverEnd"}
                        variants={{
                            hoverStart: {
                                opacity: 1,
                                transition: {
                                    type: "spring",
                                    bounce: 0,
                                    duration: 0.35,
                                    delayChildren: 0.2,
                                    staggerChildren: 0.05
                                }
                            },
                            hoverEnd: {
                                opacity: 0,
                                transition: {
                                    type: "spring",
                                    bounce: 0,
                                    duration: 0.15
                                }
                            }
                        }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        onClick={handleFileOperationSwitchClicked}
                    >
                        {isFileOperationCollpseOpen ? "不操作" : "操作"}
                    </motion.div>
                    {/* 上传用户 */}
                    <motion.div
                        className="z-30 max-w-fit absolute rounded bottom-0 left-0 right-12 mx-3 my-2 px-1 py-px overflow-hidden bg-stone-100/60 text-xs text-slate-500 select-none
                        hover:bg-stone-200"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        {fileData.uploadUserName}
                    </motion.div>
                </motion.div>



                <div className="fileItem-body grow flex flex-col gap-1 px-1 pt-2 mt-1 my-2 mx-0.5 transition-all delay-100 md:mt-2 md:pb-1 md:px-3 lg:mt-5 lg:pb-5 lg:px-6">
                    {/* 文件名 */}
                    <h2 className="grow font-semibold text-slate-800 break-words hyphens-suto text-sm md:text-base md:font-bold lg:font-black 
                    group-hover/fileItem:underline group-hover/fileItem:underline-offset-4 
                    group-hover/fileItem:decoration-2 group-hover/fileItem:decoration-hardred-600 "
                        onClick={handleFileItemOnclick}>{fileData.filename}</h2>
                    {/* 文件信息 */}
                    <div className="justify-self-end bottom-0 max-h-36 overflow-clip text-xs leading-5 text-slate-400 ">
                        <p className="">{fileSizeString()}</p>
                        <p className="">上传于{fileUploadTimeString()}</p>
                        <p className="">{fileData.updatedAt||"从未"}修改</p>
                    </div>
                </div>
            </div>
        </div >
    </>);
}
