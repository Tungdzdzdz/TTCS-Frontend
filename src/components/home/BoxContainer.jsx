function BoxContainer({ infor, title }) {
    return (
        <div className="flex flex-col h-fit w-1/2 p-2 gap-2">
            <h1>{title}</h1>
            <div className="h-[450px] w-full bg-white border-solid border-[1px] border-[#ebe5eb] rounded-2xl flex flex-col overflow-hidden shadow-xl">
                <div className="w-full h-fit flex">
                    <div className="w-[150px] h-fit flex flex-col flex-wrap border-b-2">
                        <img src={infor.logo} className="p-2" />
                        {
                            Object.keys(infor.detail).map((e, i) => {
                                return (
                                    <div className="flex flex-col p-2" key={`Box${i}`}>
                                        <span className="text-center">{e.toUpperCase()}</span>
                                        <h3 className="text-center">{infor.detail[e]}</h3>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="h-full w-full justify-center items-end flex bg-gradient-to-r from-sky-400 to-blue-600">
                        <img src={infor.img} className="h-[280px]" />
                    </div>
                </div>
                <div className="h-full w-full flex justify-between items-center p-2 hover:underline hover:cursor-pointer hover:bg-slate-100">
                    <h3 className="ml-3">{infor.name}</h3>
                    <p className="mr-3">View profile</p>
                </div>
            </div>
        </div>
    )
}

export default BoxContainer;