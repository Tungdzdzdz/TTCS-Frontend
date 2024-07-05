function PlayerRow({ data, onClickPlayer }) {
    return (
        <div className="h-fit w-full flex border-b-2 hover:underline hover:cursor-pointer" onClick={() => onClickPlayer(data.id)}>
            <div className="flex items-center flex-1 p-2 gap-2">
                <div>
                    <img className="h-[40px] min-w-10" src={data.img} />
                </div>
                <div>
                    <label className="hover:cursor-pointer">{data.name}</label>
                </div>
            </div>
            <div className="flex items-center flex-1 p-2">
                <label>{data.position}</label>
            </div>
            <div className="flex items-center flex-1 p-2 gap-2">
                <div>
                    <img className="h-[40px] min-w-10" src={data.clubLogo} />
                </div>
                <div>
                    <label>{data.club}</label>
                </div>
            </div>
            <div className="flex items-center justify-start flex-1 p-2">
                <label>{data.nationality}</label>
            </div>
            <div className={`flex items-center justify-start flex-1 p-2 ${data.stat === undefined && 'hidden'}`}>
                <label>{data.stat}</label>
            </div>
        </div>
    )
}

export default PlayerRow;