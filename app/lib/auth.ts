import { NextAuthOptions } from "next-auth";
import prisma from "@/app/lib/prisma"
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import md5 from "blueimp-md5";
import { User } from "@/app/types/user";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    secret: "pfs6KM/+JueMZzanXeqaOkIAUhuvNSBiTgFOt4j6I8k=",
    pages: {
        // error: '/auth/error.tsx',
        // signIn: '/auth/signin'
    },
    providers: [
        CredentialsProvider({
            name: "密码",
            credentials: {
                username: { label: "Username", type: "text", placeholder: 'Username here' },
                password: { label: "Password", type: "password" }
            },
            // @ts-ignore
            async authorize(credentials, req) {
                if (!credentials || !credentials.password) {
                    return null;
                }
                const user = await prisma.user.findUnique({
                    where: {
                        username: credentials.username || ' '
                    }
                })
                // const user: User = {
                //     id: 1,
                //     username: 'username',
                //     password: 'c4ca4238a0b923820dcc509a6f75849b',
                //     avatar: 'avatar',
                //     email: 'email',
                //     createAt: 'createAt',
                //     updatedAt: 'updatedAt',
                //     group: []
                // }

                if (user && md5(credentials?.password || '') == user.password) {
                    console.log('Success' + user.username);
                    return user;
                } else {
                    console.log('bad');
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        session: async ({ session, token }) => {
            if(!token.id){
                return session;
            }
            const res = await prisma.user.findUnique({
                where: {
                    id: <number>token.id,
                },
            })
            if (res) {
                session.user = {
                    id: res.id,
                    username: res.username,
                    password: res.password,
                    avatar: res.avatar,
                    email: res.email,
                    createAt: res.createAt,
                    updatedAt: res.updatedAt,
                } as User
            }
            return session;
        },
    },
}
