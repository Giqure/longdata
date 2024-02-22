'use client';

import Link from "next/link";
import { MouseEventHandler, useState } from "react";
import { motion } from "framer-motion";
import { User } from "../types/user";


export function SideLink({
  isSelect,
  content,
  linkto,
  handleOnclick
}: {
  isSelect: Boolean,
  content: string,
  linkto: string,
  handleOnclick: any
}) {
  let style = isSelect ?
    "sideLink group/sideLink transition-all delay-75 bg-stone-200 hover:bg-stone-300" :
    "sideLink group/sideLink transition-all delay-75 bg-stone-50 hover:bg-stone-300";
  return (
    <div className={style} onClick={handleOnclick}>
      <Link className="rounded-md no-underline hover:no-underline active:outline outline-2 outline-offset-4 outline-hardred-500" href={linkto}>
        <div className="sideLink-body pt-5 pb-5 pr-6 pl-6">
          <h2 className="font-black text-slate-800 
                group-hover/sideLink:underline group-hover/sideLink:decoration-2 
                group-hover/sideLink:underline-offset-4 group-hover/sideLink:decoration-hardred-600">{content}</h2>
        </div>
      </Link>
    </div>
  );
}

export function SideOption({
  content,
  handleOnclick
}: {
  content: string,
  handleOnclick: MouseEventHandler
}) {
  let style = "sideOption group/sideOption rounded-lg my-2 select-none md:rounded-none md:m-0 transition-all delay-75 bg-stone-50 hover:bg-stone-300";
  return (
    <div className={style} onClick={handleOnclick}>
      <div className="sideOption-bodymd:rounded-none text-center py-2 px-4 md:text-left md:pt-5 md:pb-5 md:pr-6 md:pl-6 ">
        <h2 className="font-black text-slate-800 
                group-hover/sideOption:underline group-hover/sideOption:decoration-2 
                group-hover/sideOption:underline-offset-4 group-hover/sideOption:decoration-hardred-600">{content}</h2>
      </div>
    </div>
  );
}

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
      initial={false}
      animate={collapseState ? "open" : "closed"}
      variants={{
        open: {
          clipPath: "inset(0% 0% 0% 0% round 10px)",
          transition: {
            type: "spring",
            bounce: 0,
            duration: 0.35,
            delayChildren: 0.2,
            staggerChildren: 0.05
          }
        },
        closed: {
          clipPath: "inset(10% 100% 40% 0% round 10px)",
          transition: {
            type: "spring",
            bounce: 0,
            duration: 0.15
          }
        }
      }}

      className={"relative z-50 transtion-all  p-1 rounded-lg bg-neutral-200/75 " + style}
    >
      {children}
    </motion.div>);
}

export default function SideBar({ currentPath, currentUser }: { currentPath: string, currentUser: User }) {
  // const [pageCurrent, setPageCurrent] = useState('shared');


  const [newDirName, setNewDirName] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const [newFile, setNewFile] = useState<File>();
  const [isAddFileWindowOpen, setIsAddFileWindowOpen] = useState(false);
  const [isAddDirWindowOpen, setIsAddDirWindowOpen] = useState(false);
  const handleAddFileOptionClicked = () => {
    setIsAddFileWindowOpen(!isAddFileWindowOpen);
  }
  const handleAddDirOptionClicked = () => {
    setIsAddDirWindowOpen(!isAddDirWindowOpen);
  }
  // 上传文件
  const handleAddFileSubmitClicked = () => {
    setNewFileName('')
    if (!newFile?.name) return;
    let fileFormData = new FormData();
    fileFormData.append('newFileName', newFileName)
    fileFormData.append('newFile', newFile)
    fileFormData.append('newFilePath', currentPath)
    fileFormData.append('newFileUploadUserId', currentUser.id.toString())
    fetch('/api/file/upload-file', {
      method: 'POST',
      body: fileFormData
    })
      .then(response => response.json())
      .then(data => {
        console.log('sidebar from addfile:', data);
        window.location.reload()
      })
      .catch(error => {
        console.error('sidebar get error from addfile:', error);
      });
  };
  // 新建文件夹
  const handleAddDirSubmitClicked = () => {
    fetch('/api/file/create-dir', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        newDirPath: currentPath,
        newDirName: newDirName,
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log('sidebar from adddir:', data);
        setNewDirName('');
      })
      .catch(error => {
        console.error('sidebar get error from adddir:', error);
      });
  };
  return (<>
    <div className="w-full">
      {/* <SideLink
        isSelect={pageCurrent == 'my'}
        content='我的文件'
        linkto='../file/my'
        handleOnclick={() => {
          setPageCurrent('my');
        }}
      ></SideLink>
      <SideLink
        isSelect={pageCurrent == 'shared'}
        content='公开'
        linkto='../file/shared'
        handleOnclick={() => {
          setPageCurrent('shared');
        }}
      ></SideLink> */}
      <SideOption
        content="添加文件"
        handleOnclick={handleAddFileOptionClicked}
      ></SideOption>
      <SideOption
        content="添加文件夹"
        handleOnclick={handleAddDirOptionClicked}
      ></SideOption>
    </div>

    {/* 上传文件窗口 */}
    <Collapse
      collapseState={isAddFileWindowOpen}
      style={"z-50 w-fit -ml-48 -mt-12 md:-mt-24 md:ml-28 md:-mr-10"}>
      <input
        type="file"
        className="mb-2 file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100"
        onChange={(e) => {
          if (e.target.files) {
            setNewFile(e.target.files[0])
            setNewFileName(e.target.files[0]?.name || "")
          }
        }} />
      <div
        className="flex gap-2">
        <input
          className="flex-1 rounded-lg w-1 border border-gray-200 py-[9px] px-2 text-sm outline-2 placeholder:text-gray-500"
          value={newFileName}
          placeholder="文件名"
          onChange={(e) => { setNewFileName(e.target.value); }}
        />
        <button
          className="flex-none mt-1 py-1 px-2 rounded-lg bg-violet-400  text-slate-50 
        hover:bg-violet-500 active:bg-violet-600 focus:outline-none active:shadow-inner hover:shadow-inner"
          onClick={handleAddFileSubmitClicked}>上传文件
        </button>
      </div>
    </Collapse>

    {/* 新建文件夹窗口 */}
    <Collapse
      collapseState={isAddDirWindowOpen}
      style={"z-50 flex gap-1 -ml-48 mr-36 -mt-12 md:mt-8 md:ml-24 md:-mr-32"}>
      <input
        className="flex-1 rounded-lg w-1 border border-gray-200 py-[9px] px-2 text-sm outline-2 placeholder:text-gray-500"
        value={newDirName}
        placeholder="新建文件夹名称"
        onChange={(e) => { setNewDirName(e.target.value); }}
      />
      <button
        className="flex-none mt-1 py-1 px-2 rounded-lg bg-amber-400  text-slate-50
        hover:bg-amber-500 active:bg-amber-600 focus:outline-none active:shadow-inner hover:shadow-inner"
        onClick={handleAddDirSubmitClicked}>添加
      </button>
    </Collapse>
  </>);
}