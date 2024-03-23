function PlayerRow({ data, onPlayerClick}) {
    return (
        <div className="h-fit w-full flex border-b-2 hover:underline hover:cursor-pointer" onClick={onPlayerClick}>
            <div className="flex items-center flex-1 p-2 gap-5">
                <div>
                    <img className="h-[40px]" src={data.img} />
                </div>
                <div>
                    <label className="hover:cursor-pointer">{data.name}</label>
                </div>
            </div>
            <div className="flex items-center flex-1 p-2">
                <label>{data.position}</label>
            </div>
            <div className="flex items-center flex-1 p-2 gap-5">
                <div>
                    <img className="h-[40px]" src={data.clubLogo} />
                </div>
                <div>
                    <label>{data.club}</label>
                </div>
            </div>
            <div className="flex items-center justify-start flex-1 p-2">
                <label>{data.nationality}</label>
            </div>
            {
                data.stat &&
                <div className="flex items-center justify-start flex-1 p-2">
                    <label>{data.stat}</label>
                </div>
            }
        </div>
    )
}

export default PlayerRow;