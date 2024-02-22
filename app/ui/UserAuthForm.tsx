'use client'

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { User } from "../types/user";
import { motion, useCycle } from "framer-motion";
import SignupForm from "./SignupForm";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

const Collapse = ({
    isOpen,
    children
}: {
    isOpen: boolean,
    children: React.ReactNode
}) => {
    return (
        <motion.div
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={{
                open: {
                    height: "fit-content",
                    transition: {
                        type: "ease",
                    },
                },
                closed: {
                    height: "0px",
                    transition: {
                        type: "ease"
                    },
                }
            }}
            className="static bg-stone-200 overflow-hidden w-fit"
        >{children}</motion.div>
    )
}


export function UserAuthForm() {
    const login = async () => {
        signIn("credentials", {
            callbackUrl: `${window.location.origin}`,
        });
    };
    const { data: session } = useSession();
    // @ts-ignore
    const user: User = session?.user
    console.log('From UserAuthForm: User in session is - ' + user?.username + user?.id);

    // const user: User = {
    //     id: 1,
    //     username: 'username',
    //     password: '',
    //     avatar: 'avatar',
    //     email: 'email',
    //     createAt: 'createAt',
    //     updatedAt: 'updatedAt',
    // }


    const [isSignoutOpen, setIsSignoutOpen] = useCycle(false, true);
    const [isSignupOpen, setIsSignupOpen] = useCycle(false, true);

    const handleHeadCilcked = () => {
        setIsSignoutOpen();
    }
    const handleSignupOptionCilcked = () => {
        setIsSignupOpen();
    }

    return (
        <div className="mr-4 my-1">
            {user ? (
                <>
                    <div onClick={handleHeadCilcked} className="pl-5">
                        Hi, {user.username}
                    </div>
                    <Collapse
                        isOpen={isSignoutOpen}
                    >
                        <div className="p-1 flex h-fit w-fit"
                            onClick={() => signOut()}>
                            <span className="px-3 py-1 justify-self-center align-middle text-center self-center
                            border-2 border-gray-100 bg-stone-100 text-gray-400 cursor-pointer
                            transition-all 
                            hover:text-gray-500 hover:bg-slate-200">
                                <p>退出登录</p>
                            </span>
                        </div>
                    </Collapse>
                </>
            ) : (
                <>
                    <button
                        type="button"
                        className="px-2 py-1"
                        onClick={() => signIn()}>
                        登录
                    </button>
                    <button
                        type="button"
                        className={isSignupOpen?"bg-stone-200 px-2 py-1":"py-1"}
                        onClick={handleSignupOptionCilcked}>
                        注册
                    </button>
                    <Collapse isOpen={isSignupOpen}>
                        <SignupForm></SignupForm>
                    </Collapse>
                </>
            )
            }

        </div >
    );
}
