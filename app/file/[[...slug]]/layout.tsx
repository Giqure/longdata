import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../../globals.css'
import Link from 'next/link'
import { UserAuthForm } from '../../ui/UserAuthForm';
import Provider from '../../content/client-provider';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';
import { ReactNode } from 'react';
import path from 'path';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Long Net',
  description: 'Long Lab Online',
}

function BreadcrumbLink({ linkPath, slug }: { linkPath: string, slug: string }) {
  return (
    <div className='text-white mx-1 px-1 rounded-sm hover:bg-stone-400/50' key={path.basename(linkPath)}>
      <Link href={linkPath} className=''>
        <p className=''>{decodeURI(slug)}</p>
      </Link>
    </div>
  );
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: { slug?: string[] }
}) {
  const session = await getServerSession(authOptions)
  const currentPathSlugs: string[] = params.slug || [];
  let breadcrumbLinks: ReactNode[] = [];
  breadcrumbLinks.push(
    <BreadcrumbLink linkPath="/file" slug="file"></BreadcrumbLink>
  )
  let linkPath = "/file";
  currentPathSlugs.forEach(slug => {
    linkPath = linkPath.concat("/", slug)
    breadcrumbLinks.push(<p className='text-white'>/</p>)
    breadcrumbLinks.push(<BreadcrumbLink linkPath={linkPath} slug={slug}></BreadcrumbLink>)
  })
  return (
    <html lang="zh">
      <body className={inter.className}>
        <div className="bg-zinc-100 min-h-screen pb-10">
          <nav className="flex flex-wrap items-center justify-between bg-zinc-700 pl-6">
            <div className="w-auto pt-1 pb-2 mr-5 lg:w-1/6">
              <div className='w-fit px-2 hover:bg-zinc-600'>
                <Link className="text-slate-50 font-heading" href="/">
                  <p className='text-xs font-light'>返回</p>
                  <p className='text-xs font-'>Lab主页</p>
                </Link>
              </div>
            </div>
            <div className="grow pt-2 pb-3  select-none">
              <div className='flex'>{breadcrumbLinks}</div>
            </div>
            <div className='flex flex-wrap items-center gap-0 self-stretch'>
              <div className='w-0.5 h-full bg-zinc-600'>{' '}</div>
              <div className='w-1 h-full bg-zinc-300'>{' '}</div>
              <div className='flex h-full pl-3 items-center bg-stone-100'><Provider session={session}><UserAuthForm></UserAuthForm></Provider></div>
            </div>
          </nav>
          {children}
        </div>
      </body>
    </html>
  )
}
