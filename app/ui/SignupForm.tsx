'use client';

import md5 from "blueimp-md5";
import { useState } from "react";

export default function SignupForm() {
    const [userName, setUserName] = useState<string>();
    const [userPassword, setUserPassword] = useState<string>();
    const [userPasswordTwice, setUserPasswordTwice] = useState<string>();
    const [signUpError, setSignUpError] = useState<string>();
    const [signUpDone, setSignUpDone] = useState(false);

    function handleSignupClicked() {
        if (userPassword != userPasswordTwice) {
            setSignUpError("确认密码与密码不一致")
            return;
        }
        if (!userName) {
            setSignUpError("用户名不能为空")
            return;
        }
        if (!userPassword) {
            setSignUpError("密码不能为空")
            return;
        }
        if (userName.includes('&') || userName.includes('%') ||
            userPassword.includes('&') || userPassword.includes('%')) {
            setSignUpError("用户名或密码不能包含& %\n请避免特殊字符，防止部分功能受限");
            return;
        }
        fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify({
                userName: userName,
                userPassword: md5(userPassword)
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('signup from signupapi:', data);
                switch (data.status) {
                    case 200:
                        setSignUpError("");
                        setSignUpDone(true);
                        console.log("注册成功！")
                        break;
                    case 400:
                        switch (data.error.code) {
                            case "P2002":
                                console.log("用户名已被注册，请更换")
                                setSignUpError("用户名已被注册，请更换");
                                break;
                        }
                        break;
                    default:
                        setSignUpError("发生未知错误，注册失败");
                }
            })
            .catch(error => {
                console.error('signup error:', error);
            });
    }

    return (<>
        <div
            className={"z-50 min-w-16 w-56 flex flex-col gap-2 px-3 py-2"}>
            {
                signUpError ?
                    <div className="px-3 py-2 rounded-lg text-sm text-white bg-red-600">
                        <p>{signUpError}</p>
                    </div> :
                    <></>
            }
            {
                signUpDone ?
                    <div className="px-3 py-2 rounded-lg text-sm text-white bg-emerald-600">
                        <p>注册成功！</p>
                    </div> :
                    <></>
            }
            <input
                className="rounded-md border border-gray-200 py-1 px-2 outline-2 placeholder:text-sm placeholder:text-gray-500"
                type="text"
                value={userName}
                placeholder="用户名"
                onChange={(e) => { setUserName(e.target.value); setSignUpDone(false); }}
            />
            <input
                className="rounded-md border border-gray-200 py-1 px-2 outline-2 placeholder:text-sm placeholder:text-gray-500"
                type="password"
                value={userPassword}
                placeholder="密码"
                onChange={(e) => { setUserPassword(e.target.value); setSignUpDone(false); }}
            />
            <input
                className="rounded-md border border-gray-200 py-1 px-2 outline-2 placeholder:text-sm placeholder:text-gray-500"
                type="password"
                value={userPasswordTwice}
                placeholder="确认密码"
                onChange={(e) => { setUserPasswordTwice(e.target.value); setSignUpDone(false); }}
            />
            <button
                className="flex-none my-1 py-1 rounded-lg bg-slate-500  text-slate-50
            hover:bg-slate-600 active:bg-slate-700 focus:outline-none active:shadow-inner hover:shadow-inner"
                onClick={handleSignupClicked}>注册
            </button>
        </div>
    </>);
}