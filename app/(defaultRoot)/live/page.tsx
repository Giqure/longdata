import getCurrentUser from "../../lib/session";
import LiveItem from "./LiveItem";
import prisma from "../../lib/prisma";

export default async function Live() {

  const user = await getCurrentUser();
  console.log("From live: user.username - " + user?.username);
  let userStream;
  if (user) {
    userStream = {
      address: 'rtmp://111.222.233.244:1935/live/',
      code: user.id,
    };
  }

  const allStreamUser = await prisma.liveuser.findMany() || [];

  let allStreamItems = [];
  for (let i in allStreamUser) {
    const streamUser = await prisma.user.findUnique({
      where: {
        id: allStreamUser[i].id
      }
    });
    allStreamItems.push(
      <LiveItem
        stream={{
          username: streamUser?.username || '',
          sourceIp: allStreamUser[i].sourceIp,
          No: streamUser?.id || 1,
        }}
        key={i}
      ></LiveItem>
    );
  }

  return (
    <>
      <div className="mt-10 mb-10 mx-10">
        <div className="grid grid-cols-1 gap-5
        sm:grid-cols-3 sm:gap-x-10
        lg:grid-cols-5 lg:gap-x-20">
          {/* pull */}
          <div className="Pull group/pull transition-all delay-75 shadow-sm bg-stone-100 rounded-2xl h-fit pb-5 lg:col-span-2">
            <div className="pull-body pt-5 pb-5 pr-6 pl-6">
              <h2 className="font-black text-slate-800 text-2xl my-3 select-none
                  group-hover/pull:underline group-hover/card:decoration-2 
                  group-hover/pull:underline-offset-4 group-hover/card:decoration-hardred-600">推流</h2>
              {user ? (<>
                <p className="max-h-36 overflow-clip text-sm leading-5 text-slate-600"><span className="select-none">推流码</span><span className="ml-2 pl-2">{userStream? userStream.code + '?usr=' + user.username + '&pwd=您的密码' : ""}</span></p>
                <a className="max-h-36 overflow-clip text-sm leading-5 text-indigo-500 font-semibold hover:text-blue-400" href="/live/turtorial">推流教程</a>
              </>
              ) : (
                <p>登陆后获得推流权限</p>
              )}
            </div>
          </div>

          {/* push */}
          <div className="Pull group/pull transition-all delay-75 shadow-sm bg-stone-100 rounded-2xl pb-5 sm:col-span-2 lg:col-span-3">
            <div className="pull-body pt-5 pb-5 pr-6 pl-6 ">
              <h2 className="font-black text-slate-800 text-2xl my-3 select-none
                    group-hover/pull:underline group-hover/card:decoration-2 
                    group-hover/pull:underline-offset-4 group-hover/card:decoration-hardred-600">正在直播</h2>
              <div>
                {allStreamItems}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}