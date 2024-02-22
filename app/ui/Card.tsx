import Link from "next/link"

export default function Card({ bgimg, imgtext, title, content='', href }:
    { bgimg?: string, imgtext?:string, title: string, content?: string, href: string }){
    return (
        <>
        <div className="card group/card transition-all delay-75 shadow-2xl  bg-stone-100 hover:shadow-sm hover:scale-90 lg: ">
        <Link className="rounded-md no-underline hover:no-underline active:outline outline-2 outline-offset-4 outline-hardred-500" href={ href }>
            { 
                bgimg ? 
                <>
                <figure className="overflow-hidden">
                    <img className="overflow-hidden transition-all delay-100
                    group-hover/card:scale-110 group-hover/card:translate-y-2" 
                    src={bgimg} title={ imgtext ? imgtext : "这是一张图片" }/>
                </figure>
                <div className="card-body mt-5 pb-5 pr-6 pl-6 transition-all delay-100
                    group-hover/card:translate-x-1 group-hover/card:-translate-y-1">
                    <h2 className="font-black text-slate-800 
                        group-hover/card:underline group-hover/card:underline-offset-4 
                        group-hover/card:decoration-2 group-hover/card:decoration-hardred-600 ">{ title }</h2>
                    <p className="max-h-36 overflow-clip text-sm leading-5 text-slate-400">{ content }</p>
                </div>
                </>
                : 
                <div className="card-body pt-5 pb-5 pr-6 pl-6 ">
                    <h2 className="font-black text-slate-800 
                    group-hover/card:underline group-hover/card:decoration-2 
                    group-hover/card:underline-offset-4 group-hover/card:decoration-hardred-600">{ title }</h2>
                    <p className="max-h-36 overflow-clip text-sm leading-5 text-slate-400">{ content }</p>
                </div>
            }
        </Link>
        </div>
        </>
    );
}
