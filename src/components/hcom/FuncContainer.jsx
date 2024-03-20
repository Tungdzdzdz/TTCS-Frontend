function FuncContainer({children, title})
{
    return (
        <div className="h-fit w-full flex flex-col absolute">
            <div className="h-[200px] w-full bg-gradient-to-r from-sky-400 to-purple-500 mt-10 flex items-center">
                <div className="w-fit h-fit ml-80">
                    <h1 className="text-[60px] text-white ">{title}</h1>
                </div>
            </div>
            <div className="h-full w-full flex justify-center">
                <div className="h-full w-3/4 bg-white flex flex-col">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default FuncContainer;