import NextAuth, { NextAuthOptions } from "next-auth"
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/app/lib/auth";

// type User = {
//     id: number;
//     username: string;
//     password: string;
//     avatar: string;
// };


// export default async function auth(req: NextApiRequest, res: NextApiResponse) {
//     if(req.query.NextAuth.includes('callback') && req.method === 'POST'){
//         console.log(
//             "Handling callback request from my Identity Provider",
//             req.body
//         )
//     }

//     return await NextAuth(req, res, authOptions)
// }

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }