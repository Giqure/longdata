import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Link from 'next/link'
import { UserAuthForm } from '../ui/UserAuthForm';
import Provider from '../content/client-provider';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Long Net',
  description: 'Long Lab Online',
 }

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="zh">
      <body className={inter.className}>
        <div className="bg-stone-200 min-h-[100vh]">
          <nav className="flex flex-wrap items-center justify-between p-4 bg-stone-50 mb-2">
            <div className="w-auto  lg:w-1/3 lg:text-center">
              <Link className="text-xl font-semibold text-slate-700 font-heading" href="/">
                Long net
              </Link>
            </div>
            <div className='pr-5 lg:pr-10'><Provider session={session}><UserAuthForm></UserAuthForm></Provider></div>
          </nav>
          <div className="flex justify-center">{children}</div>
          <div className="text-center text-stone-500 leading-loose pb-10">
            Long 实验室 <code>Long Lab</code>
            <br />
            <p className='text-sm tracking-tighter leading-snug'>大连理工大学创新实践中心</p>
            <p className='text-sm tracking-tighter leading-snug'>大连理工大学创新创业学院</p>
            <a href='/feedback'>反馈</a>
          </div>
        </div>
      </body>
    </html>
  )
}
