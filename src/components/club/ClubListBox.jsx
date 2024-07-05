import { FaArrowRight } from "react-icons/fa";
function ClubListBox({ data, icon, onClickClub, onClickIcon}) {
    return data ? (
        <div className={"h-fit w-full flex flex-wrap bg-white"}>
            {
                data.map((e, i) => {
                    return (
                        <div
                            className="h-fit w-1/4 p-4"
                            key={`Club${i}`}
                        >
                            <div 
                                className="w-full h-full border-solid border-[1px] border-[#ebe5eb] shadow-xl rounded-xl overflow-hidden hover:bg-slate-100 hover:cursor-pointer hover:underline"
                                onClick={() => onClickClub(e.id)}    
                            >
                                <div className="w-full h-fit p-2">
                                    <img
                                        className="h-[100px]"
                                        src={e.logo}
                                        alt={"Image of " + e.name}
                                    />
                                </div>
                                <div className="flex justify-between items-center p-2">
                                    <label>{e.name}</label>
                                    <div onClick={(event) => {
                                        event.stopPropagation();
                                        onClickIcon(e.id)
                                    }}>
                                        {icon ? icon : <FaArrowRight className="text-[#37003c]" />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    ) : (<></>);
}

export default ClubListBox;

// 