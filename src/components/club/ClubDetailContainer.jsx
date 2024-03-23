import { useParams } from "react-router-dom";
import useData from "../hook/useData";
import { useState } from "react";
import { MdStadium } from "react-icons/md";
import HomeFixture from "../home/HomeFixture";
import HomeResult from "../home/HomeResult";
import PlayerList from "../player/PlayerList";
import { toast } from "react-toastify";

const columnField = ["Player", "Position", "Club", "Nationality"]

function ClubDetailContainer() {
    const { clubId } = useParams();
    const [data, setData] = useState();
    useData(async () => {
        const url = "http://localhost:3000/clubs";
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            setData(fetchData.teams[0]);
        } catch (error) {
            toast.error("Error: " + error);
        }
    });
    return (
        <div className="h-fit w-full flex flex-col absolute">
            <div className="h-[200px] w-full bg-gradient-to-r from-sky-400 to-purple-500 mt-10 flex items-center">
                {data &&
                    <div className="w-fit h-fit ml-80">
                        <div className="flex items-center">
                            <img className="h-[150px]" src={data.crest} />
                            <div className="flex flex-col">
                                <h1 className="text-[60px] text-white ">{data.name}</h1>
                                <div className="flex gap-2 items-center">
                                    <MdStadium className="text-white" />
                                    <p className="text-white">
                                        {data.venue}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className="h-full w-full flex justify-around mt-20 mb-20">
                <div className="w-3/4 flex flex-col">
                    <div className="h-fit w-full bg-white mb-4 border-solid border-[1px] border-[#ebe5eb] rounded-xl overflow-hidden shadow-xl">
                        <HomeFixture />
                    </div>
                    <div className="h-fit w-full bg-white mb-4 border-solid border-[1px] border-[#ebe5eb] rounded-xl overflow-hidden shadow-xl">
                        <HomeResult />
                    </div>
                    {data && 
                        <PlayerList 
                        columnField={columnField}
                        dataPlayer={data}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default ClubDetailContainer;