import { AxeIcon, BanIcon, BugIcon, HomeIcon } from "lucide-react"

export const NewHero = () => {
    return (
        <>
            <div className="text-center py-12">
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">VitePress</h1>
                <p className="mt-4 text-xl">由 Vite 和 Vue 驱动的静态站点生成器</p>
                <p className="mt-2 text-gray-400">将 Markdown 变成优雅的文档，只需几分钟</p>

                <div className="mt-6 flex justify-center space-x-4">
                    <button className="px-6 py-2 rounded-lg bg-gray-800 hover:bg-gray-700">什么是 VitePress?</button>
                    <button className="px-6 py-2 rounded-lg bg-gray-800 hover:bg-gray-700">快速开始</button>
                    <button className="px-6 py-2 rounded-lg bg-gray-800 hover:bg-gray-700">GitHub</button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 py-12 max-w-6xl mx-auto">
                <div className="bg-gray-800 p-6 rounded-lg text-center">
                    <HomeIcon className="mx-auto mb-4 h-12 w-12" />
                    {/* <img src="icon1.png" alt="Icon 1" className="mx-auto mb-4 h-12 w-12" /> */}
                    <h3 className="text-xl font-semibold">专注内容</h3>
                    <p className="mt-2 text-gray-400">只需 Markdown 即可轻松创建美观的文档站点。</p>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg text-center">
                    <BanIcon className="mx-auto mb-4 h-12 w-12" />
                    {/* <img src="icon2.png" alt="Icon 2" className="mx-auto mb-4 h-12 w-12" /> */}
                    <h3 className="text-xl font-semibold">享受 Vite 无可比拟的体验</h3>
                    <p className="mt-2 text-gray-400">服务器即时启动，内建的热更新，还可以使用基于 Vite 的插件。</p>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg text-center">
                    <AxeIcon className="mx-auto mb-4 h-12 w-12" />
                    {/* <img src="icon3.png" alt="Icon 3" className="mx-auto mb-4 h-12 w-12" /> */}
                    <h3 className="text-xl font-semibold">使用 Vue 自定义</h3>
                    <p className="mt-2 text-gray-400">直接在 Markdown 中使用 Vue 语法和组件，自定义主题。</p>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg text-center">
                    <BugIcon className="mx-auto mb-4 h-12 w-12" />
                    {/* <img src="icon4.png" alt="Icon 4" className="mx-auto mb-4 h-12 w-12" /> */}
                    <h3 className="text-xl font-semibold">速度真的很快!</h3>
                    <p className="mt-2 text-gray-400">采用静态 HTML 实现快速的页面初次加载，使用客户端路由实现快速切换导航。</p>
                </div>
            </div>
        </>
    )
}