export default function Page({ csrfToken }) {
    return(<>
        <form method="post" action="/api/auth/callback/credentials">
            <label>
                用户名
                <input name="username" type="text"></input>
            </label>
            <label>
                密码
                <input name="password" type="password"></input>
            </label>
            <button type="submit">登录</button>
        </form>
    </>)
}