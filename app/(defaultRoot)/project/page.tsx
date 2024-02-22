import Link from "next/link";

export default function Turtorial() {
    return (<>
        <div className="flex flex-col gap-1 p-10">
            <Link href="/" className="w-fit p-2 text-slate-600 hover:bg-stone-300">返回上一页</Link><br />
            <Link href="https://liqure.top"
            className="py-1 px-10 mb-4 border-b-1 border-slate-600/50
            hover:bg-stone-300 hover:border-slate-600/90 hover:border-b-4 hover:mb-3">弹琴机器人控制页面（跳转至liqure.top）</Link>
        </div>
    </>)
}