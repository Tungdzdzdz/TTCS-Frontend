import { FaArrowRight } from "react-icons/fa";
function ClubListBox({data, icon, onClickClub})
{
    return data ? (
        <div className="h-fit w-full flex flex-wrap justify-center bg-white p-5 gap-5">
            {
                data.teams.map((e, i) => {
                    return (
                        <div 
                            className="h-fit w-[280px] border-solid border-[1px] border-[#ebe5eb] shadow-xl rounded-xl overflow-hidden hover:bg-slate-100 hover:cursor-pointer hover:underline"
                            key={`Club${i}`}
                            onClick={() => onClickClub(i)}
                        >
                            <div className="w-full h-fit p-2">
                                <img 
                                    className="h-[100px]" 
                                    src={e.crest}
                                    alt={"Image of " + e.name}
                                />
                            </div>
                            <div className="flex justify-between items-center p-2">
                                <label>{e.name}</label>
                                {icon ? icon : <FaArrowRight className="text-[#37003c]" />}  
                            </div>
                        </div>
                    )
                })
            }
        </div>
    ) : (<></>);
}

export default ClubListBox;