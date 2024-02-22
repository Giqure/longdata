import { getServerSession } from "next-auth/next"
import type { NextRequest } from "next/server"
import { authOptions } from "@/app/lib/auth"
import { User } from "../types/user"

export default async function getCurrentUser(req?: NextRequest) {
  const session = await getServerSession(authOptions)
  // @ts-ignore
  const user:User = session?.user
  console.log('From session.ts: user - ' + user?.username);
  return user;
}
