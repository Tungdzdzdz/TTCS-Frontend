function ClubRow({ data }) {
    return (
        <div className="h-fit w-full flex border-b-2">
            <div className="flex items-center p-2 min-w-[50px]">
                <label>{data.position}</label>
            </div>
            <div className="flex items-center p-2 gap-5 hover:underline hover:cursor-pointer grow">
                <div>
                    <img className="h-[40px]" src={data.logo} />
                </div>
                <div>
                    <label className="hover:cursor-pointer">{data.name}</label>
                </div>
            </div>
            <div className="flex items-center justify-start p-2">
                <label>{data.stat}</label>
            </div>
        </div>
    );
}

export default ClubRow;