import { useState } from "react";
import useData from "../hook/useData";
import { FaCirclePlus } from "react-icons/fa6";
import ClubListBox from "../club/ClubListBox";
import { toast } from "react-toastify";

const columnField = [
    "Match", "Won", "Draw", "Lost",
]

function HeadToHeadContainer() {
    const [club1, setClub1] = useState();
    const [club2, setClub2] = useState();
    const [data, setData] = useState();
    useData(async () => {
        const url = "http://localhost:3000/clubs";
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            setData(fetchData);
        } catch (error) {
            toast.error("Error: " + error);
        }
    });

    const onClickClub = (i) => {
        if (i === club1 || i === club2) return;
        if (club1 === undefined) setClub1(i);
        else if (club2 === undefined) setClub2(i);
    }

    return (
        <div className="h-[300px] w-full p-5 flex flex-col mt-10 bg-white gap-5">
            <div className="flex w-full h-fit items-center justify-center">
                <h1>Head-to-Head</h1>
            </div>
            <div className="flex w-full h-fit justify-around p-5">
                <div className="flex gap-5 flex-1 flex-col">
                    <div className="flex gap-10 flex-wrap justify-center">
                        <div
                            className={`h-[200px] flex items-center justify-center w-[350px] bg-white rounded-xl border-solid border-[1px] border-[#ebe5eb] shadow-xl hover:cursor-pointer ${club1 !== undefined ? "bg-gradient-to-r from-sky-400 to-blue-500" : ""}`}
                            onClick={() => {
                                if (club1 !== undefined)
                                    setClub1(undefined);
                            }}>
                            {club1 === undefined && <FaCirclePlus className="text-[50px] text-[#37003c]" />}
                            {club1 !== undefined && <img src={data.teams[club1].crest} className="h-full p-4" />}
                            {club1 !== undefined && <h4 className="text-white p-2 text-[20px]">{data.teams[club1].name}</h4>}
                        </div>
                        <div
                            className={`h-[200px] flex items-center justify-center w-[350px] bg-white rounded-xl border-solid border-[1px] border-[#ebe5eb] shadow-xl hover:cursor-pointer ${club2 !== undefined ? "bg-gradient-to-r from-sky-400 to-blue-500" : ""}`}
                            onClick={() => {
                                if (club2 !== undefined)
                                    setClub2(undefined);
                            }}
                        >
                            {club2 === undefined && <FaCirclePlus className="text-[50px] text-[#37003c]" />}
                            {club2 !== undefined && <img src={data.teams[club2].crest} className="h-full p-4 bg" />}
                            {club2 !== undefined && <h4 className="text-white p-2 text-[20px]">{data.teams[club2].name}</h4>}
                        </div>
                    </div>
                    {club1 !== undefined && club2 !== undefined && 
                    <div className="h-fit w-full p-3 flex flex-col">
                        {
                            columnField.map((e, i) => {
                                return (
                                    <div key={`column${i}`} className=" w-3/4 flex justify-between p-2 self-center border-b-2">
                                        <h4>0</h4>
                                        <h4>{e}</h4>
                                        <h4>0</h4>
                                    </div>
                                )
                            })
                        }
                    </div>}
                </div>
                
                {data && <div className="flex-1">
                    <ClubListBox data={data} icon={<FaCirclePlus className="text-[#37003c]" />} onClickClub={onClickClub} />
                </div>}
            </div>
        </div>
    );
}

export default HeadToHeadContainer;