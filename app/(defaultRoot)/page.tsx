import Card from "../ui/Card"

export default function Home() {
  return (
    <div className="w-4/5 pb-10">
      <div className="grid grid-cols-1 gap-10 mb-10
      sm:grid-cols-2 sm:gap-6
      md:grid-cols-3 md:gap-6
      lg:grid-cols-3 lg:gap-14 lg:pt-10">
        <Card
          // bgimg="/简单工厂内景.jpg"
          imgtext="live"
          title="Live 🟢"
          content="Long lab live stream"
          href="live"
        ></Card>
        <Card
          // bgimg="/简单工厂内景.jpg"
          imgtext="file"
          title="Long Data 🟢"
          content="这里是 Long lab 数据中心"
          href="file"
        ></Card>
        <Card
          // bgimg="/简单工厂内景.jpg"
          imgtext="project"
          title="项目接入 🔴"
          content="Long lab 科创项目网络接入控制"
          href="project"
        ></Card>
        {/* <Card
          bgimg="/化学实验室.jpg"
          title="还有什么？⚫"
          content="不知道"
          href=""
        ></Card> */}
      </div>
    </div>
  );
}
