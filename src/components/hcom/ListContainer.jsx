function ListContainer({ title, data }) {
    return (
        <div className="w-full h-fit flex flex-col rounded-xl overflow-hidden gap-2 shadow-xl">
            {title && 
                <div className="w-full h-fit bg-gradient-to-r from-sky-400 to-blue-600 justify-center flex p-3">
                    <h1 className="text-white">{title}</h1>
                </div>
            }
            <div className="h-fit w-full">
                {Object.keys(data).map((key, i) => {
                    return (
                        <div key={`row${i}`} className="h-fit w-full flex items-center justify-between p-3 border-b-2">
                            <h3 className="text-[20px]">{key}</h3>
                            <p>{data[key]}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default ListContainer;