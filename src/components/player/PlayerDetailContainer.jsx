import { useParams } from "react-router-dom";
import useData from "../hook/useData";
import { useState } from "react";
import { toast } from "react-toastify";
import Filter from "../hcom/Filter";
import ListContainer from "../hcom/ListContainer";

function PlayerDetailContainer() {
    const { playerId } = useParams();
    const [playerData, setPlayerData] = useState();
    useData(async () => {
        const response = await fetch("http://localhost:3000/playerId");
        try {
            const rawPlayerData = await response.json();
            const playerData = {
                ...rawPlayerData,
                img: "https://resources.premierleague.com/premierleague/photos/players/250x250/p176297.png",
                club: "Manchester United",
                clubLogo: "https://crests.football-data.org/66.svg",
            }
            console.log(playerData);
            setPlayerData(playerData);
        } catch (error) {
            toast.error("Error: " + error);
        }
    });
    return (
        playerData && (
            <div className="h-fit w-full flex flex-col absolute">
                <div className="h-[200px] w-full bg-gradient-to-r from-sky-400 to-purple-500 flex items-center mt-10">
                    <div className="w-fit h-fit ml-80">
                        <div className="flex items-center">
                            <img className="h-[150px]" src={playerData.img} />
                            <div className="flex flex-col">
                                <h1 className="text-[60px] text-white ">{playerData.name}</h1>
                                <div className="flex gap-2 items-center">
                                    <p className="text-white">
                                        {playerData.position}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-full w-full flex mt-5 justify-around">
                    <div className="h-fit w-1/4">
                        <ListContainer title={"Overview"} data={
                            {
                                Name: playerData.name,
                                Position: playerData.position,
                                Nationality: playerData.nationality,
                                "Date of Birth": playerData.dateOfBirth,
                                Number: playerData.shirtNumber,
                            }
                        } />
                    </div>
                    <div className="h-fit w-[70rem] flex flex-col gap-5 mb-10">
                        <div className="flex gap-2">
                            <Filter />
                            <Filter />
                        </div>
                        <div className="h-fit w-full flex gap-5">
                            <div className="w-[50rem]">
                                <ListContainer title={"Stat"} data={
                                    {
                                        "Appearances": 10,
                                        "Goals": 10,
                                        "Assists": 10,
                                        "Yellow Cards": 10,
                                        "Red Cards": 10,
                                        "Passes": 10,
                                        "Tackles": 10,
                                        "Interceptions": 10,
                                        "Clearances": 10,
                                        "Blocks": 10,
                                        "Saves": 10
                                    }
                                } />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="w-[200px] rounded-xl p-2 bg-gradient-to-r from-sky-400 to-blue-600 flex flex-col justify-center flex-1">
                                    <label className="text-white text-[25px] self-center">WIN</label>
                                    <h1 className="text-[80px] text-white self-center">10</h1>
                                </div>
                                <div className="w-[200px] rounded-xl p-2 bg-gradient-to-r from-sky-400 to-blue-600 flex flex-col justify-center flex-1">
                                    <label className="text-white text-[25px] self-center">DRAW</label>
                                    <h1 className="text-[80px] text-white self-center">10</h1>
                                </div>
                                <div className="w-[200px] rounded-xl p-2 bg-gradient-to-r from-sky-400 to-blue-600 flex flex-col justify-center flex-1">
                                    <label className="text-white text-[25px] self-center">LOSE</label>
                                    <h1 className="text-[80px] text-white self-center">10</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default PlayerDetailContainer;