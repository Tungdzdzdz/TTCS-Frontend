import { useLocation, useNavigate, useParams } from "react-router-dom";
import useData from "../hook/useData";
import { toast } from "react-toastify";
import ListContainer from "../hcom/ListContainer";
import { useEffect, useState } from "react";
import Filter from "../hcom/Filter";

function PlayerDetailContainer() {
    const { playerId } = useParams();
    const [playerData, setPlayerData] = useState();
    const [matchStat, setMatchStat] = useState();
    const { state } = useLocation();
    const [season, setSeason] = useState(state ? state.seasonId : undefined);
    const [filterSeason, setFilterSeason] = useState(undefined);
    const navigate = useNavigate()

    useEffect(() => {
        if(!state)
        {
            navigate("/not-found")
            return;
        }
    }, [state])

    const getPlayerData = async (season) => {
        const response = await fetch("http://localhost:8088/api/v1/playerstat/" + playerId + "?seasonId=" + season);
        try {
            if (response.status === 400)
                throw new Error("Player not found");
            const fetchData = await response.json();
            setPlayerData(fetchData);
        } catch (error) {
            toast.error(error);
        }
    }

    const getMatchStat = async () => {
        if (playerData === undefined)
            return;
        const response = await fetch("http://localhost:8088/api/v1/playerstat/resultStat/" + playerData.id);
        try {
            const fetchData = await response.json();
            setMatchStat(fetchData);
        }
        catch (error) {
            toast.error(error);
        }
    }

    const getSeason = async () => {
        const response = await fetch("http://localhost:8088/api/v1/player/" + playerId + "/season");
        try {
            if (response.status === 400)
                throw new Error("Season not found");
            const fetchData = await response.json();
            setFilterSeason(fetchData.map(item => {
                const startYear = new Date(item.startSeason).getFullYear();
                const endYear = new Date(item.endSeason).getFullYear();
                return {
                    label: item.name + "(" + startYear + " - " + endYear + ")",
                    value: item.id
                }
            }));
        }
        catch (error) {
            toast.error(error);
        }
    }

    useData(getSeason, []);
    useData(() => getPlayerData(season), [season]);
    useData(getMatchStat, [playerData]);    

    const onSeasonChange = (optionSelected) => {
        setSeason(optionSelected.value);
    }

    return (
        playerData && (
            <div className="h-fit w-full flex flex-col absolute">
                <div className="h-[200px] w-full bg-gradient-to-r from-sky-400 to-purple-500 flex items-center mt-10">
                    <div className="w-fit h-fit ml-80">
                        <div className="flex items-center">
                            <img className="h-[150px]" src={playerData.player.img} />
                            <div className="flex flex-col">
                                <h1 className="text-[60px] text-white ">{playerData.player.name}</h1>
                                <div className="flex gap-2 items-center">
                                    <p className="text-white">
                                        {playerData.position.name}
                                    </p>
                                </div>
                            </div>
                            <img className="h-[150px] ml-10 absolute right-40" src={playerData.club.logo}/>
                        </div>
                    </div>
                </div>
                <div className="h-full w-full flex mt-5 justify-center gap-10">
                    <div className="h-fit w-1/4">
                        <ListContainer title={"Overview"} data={
                            {
                                Name: playerData.player.name,
                                Position: playerData.position.name,
                                Nationality: playerData.player.country.name,
                                "Date of Birth": playerData.player.dateOfBirth,
                                Number: playerData.numberJersey,
                                Height: playerData.player.height,
                                Weight: playerData.player.weight,
                            }
                        } />
                    </div>
                    <div className="h-fit w-[70rem] flex flex-col gap-5 mb-10">
                        {filterSeason && <div className="w-full h-fit flex">
                            <Filter options={filterSeason} onChange={onSeasonChange} defaultValue={filterSeason.find(e => e.value == state.seasonId)}/>
                        </div>}
                        <div className="h-fit w-full flex gap-5">
                            <div className="w-[50rem]">
                                <ListContainer title={"Stat"} data={
                                    {
                                        "Goals": playerData.goal,
                                        "Assists": playerData.assist,
                                        "Yellow Cards": playerData.yellowCard,
                                        "Red Cards": playerData.redCard,
                                        "Cleansheets": playerData.cleanSheet,
                                        "Shot": playerData.shot,
                                        "Saves": playerData.saves,
                                        "Foul": playerData.foul,
                                        "Offsides": playerData.offside,
                                    }
                                } />
                            </div>
                            {
                                matchStat && (
                                    <div className="flex flex-col gap-2">
                                        <div className="w-[200px] rounded-xl p-2 bg-gradient-to-tr from-green-400 to-green-600 flex flex-col justify-center flex-1">
                                            <label className="text-white text-[25px] self-center">WIN</label>
                                            <h1 className="text-[80px] text-white self-center">{matchStat[0]}</h1>
                                        </div>
                                        <div className="w-[200px] rounded-xl p-2 bg-gradient-to-tr from-red-400 to-red-600 flex flex-col justify-center flex-1">
                                            <label className="text-white text-[25px] self-center">LOSE</label>
                                            <h1 className="text-[80px] text-white self-center">{matchStat[1]}</h1>
                                        </div>
                                        <div className="w-[200px] rounded-xl p-2 bg-gradient-to-tr from-gray-400 to-gray-600 flex flex-col justify-center flex-1">
                                            <label className="text-white text-[25px] self-center">DRAW</label>
                                            <h1 className="text-[80px] text-white self-center">{matchStat[2]}</h1>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default PlayerDetailContainer;