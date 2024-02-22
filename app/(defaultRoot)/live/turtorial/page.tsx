export default function Turtorial() {
    return (<>
        <div className="p-10">
            <h1 className="text-4xl leading-5 text-indigo-600 font-semibold m-10">推流教程</h1>
            <p className="">
                若要推流到此服务器，需要：<br />
                · 拥有本网站账户（教程用户名：tutorial）<br />
                · 已安装obs或其他推流软件<br />
            </p>
            <br />
            <p>
                打开obs，在左上角文件中进入设置，<br />
                点击直播选项，按以下配置：<br />
                · 服务：自定义... <br />
                · 服务器：rtmp://本服务器ip:1935/live/ <br />
                · 推流码：直播主页所示<br />
            </p>
            <div className="w-[32rem]">
                <img src="/直播教程图一.png" />
                <img src="/直播教程图二.png" />
            </div>
        </div>
    </>)
}