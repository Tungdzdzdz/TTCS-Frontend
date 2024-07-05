import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import  Filter  from "../hcom/Filter";
import useData from "../hook/useData.js";
import ListContainer from "../hcom/ListContainer.jsx";

function CoachDetail() {
    const { coachId } = useParams();
    const { state } = useLocation();
    const [coachData, setCoachData] = useState(null);
    const [matchStat, setMatchStat] = useState(null);
    const [season, setSeason] = useState(state ? state.seasonId : undefined);
    const [filterSeason, setFilterSeason] = useState(undefined);

    const getCoachData = async (season) => {
        if(!season) return;
        const url = `http://localhost:8088/api/v1/coach/${coachId}/season/${season}`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setCoachData(data);
        }
        else {
            toast.error("The data is not found");
        }
    }

    const getMatchStat = async (season) => {
        if (!coachData) return;
        const url = `http://localhost:8088/api/v1/clubstat/club/${coachData.club.id}?seasonId=${season}`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setMatchStat({
                win: data.win,
                lose: data.lose,
                draw: data.draw,
                goalTaken: data.goalTaken,
                goalReceived: data.goalReceived,
                match: data.matchNumber
            });
        }
        else {
            toast.error("The data is not found");
        }
    }

    const getSeason = async () => {
        const url = `http://localhost:8088/api/v1/coach/${coachId}/season`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setFilterSeason((pre) => {
                if(!data.length) return;
                return data.map((item => {
                    const startYear = new Date(item.startSeason).getFullYear();
                    const endYear = new Date(item.endSeason).getFullYear();
                    return {
                        label: `${item.name}(${startYear} - ${endYear})`,
                        value: item.id
                    }
                }))
            });
        }
        else {
            toast.error("The data is not found");
        }
    }

    useData(() => getCoachData(season), [season])
    useData(() => getMatchStat(season), [coachData])
    useData(getSeason, [])

    const onChangeSeasonFilter = async (optionSelected) => {
        setSeason(optionSelected.value);
    }

    return (
        coachData && (
            <div className="h-fit w-full flex flex-col absolute">
                <div className="h-[200px] w-full bg-gradient-to-r from-sky-400 to-purple-500 flex items-center mt-10">
                    <div className="w-fit h-fit ml-80">
                        <div className="flex items-center">
                            <img className="h-[150px]" src={coachData.coach.img} />
                            <div className="flex flex-col">
                                <h1 className="text-[60px] text-white ">{coachData.coach.name}</h1>
                                <div className="flex gap-2 items-center">
                                    <p className="text-white">
                                        {"Manager"}
                                    </p>
                                </div>
                            </div>
                            <img src={coachData.club.logo} className="h-[150px] absolute right-40"/>
                        </div>
                    </div>
                </div>
                <div className="h-full w-full flex mt-5 justify-center gap-5">
                    <div className="h-fit w-1/4">
                        <ListContainer title={"Overview"} data={
                            {
                                Name: coachData.coach.name,
                                Position: "Manager",
                                Nationality: coachData.coach.country.name,
                                "Date of Birth": coachData.coach.dateOfBirth,
                                Gender: !coachData.coach.gender ? "Male" : "Female"
                            }
                        } />
                    </div>
                    { matchStat && <div className="h-fit w-[60rem] flex gap-10 justify-center items-center flex-col">
                        <div className="w-full h-fit flex">
                            { filterSeason && <Filter 
                                                options={filterSeason}
                                                onChange={onChangeSeasonFilter}
                                                defaultValue={filterSeason.find(item => item.value === season)}
                                                />}
                        </div>
                        <div className="flex gap-20 justify-between w-fit items-center">
                            <div className="w-[200px] rounded-xl p-2 bg-gradient-to-tr from-green-400 to-green-600 flex flex-col justify-center flex-1">
                                <label className="text-white text-[25px] self-center">WIN</label>
                                <h1 className="text-[80px] text-white self-center">{matchStat.win}</h1>
                            </div>
                            <div className="w-[200px] rounded-xl p-2 bg-gradient-to-tr from-red-400 to-red-600 flex flex-col justify-center flex-1">
                                <label className="text-white text-[25px] self-center">LOSE</label>
                                <h1 className="text-[80px] text-white self-center">{matchStat.lose}</h1>
                            </div>
                            <div className="w-[200px] rounded-xl p-2 bg-gradient-to-tr from-gray-400 to-gray-600 flex flex-col justify-center flex-1">
                                <label className="text-white text-[25px] self-center">DRAW</label>
                                <h1 className="text-[80px] text-white self-center">{matchStat.draw}</h1>
                            </div>
                        </div>
                        <div className="flex gap-20 justify-between w-fit items-center">
                            <div className="w-[200px] rounded-xl p-2 bg-gradient-to-r from-sky-400 to-blue-600 flex flex-col justify-center flex-1">
                                <label className="text-white text-[25px] self-center">Match</label>
                                <h1 className="text-[80px] text-white self-center">{matchStat.match}</h1>
                            </div>
                            <div className="w-[200px] rounded-xl p-2 bg-gradient-to-r from-sky-400 to-blue-600 flex flex-col justify-center flex-1">
                                <label className="text-white text-[25px] self-center">Goal Taken</label>
                                <h1 className="text-[80px] text-white self-center">{matchStat.goalTaken}</h1>
                            </div>
                            <div className="w-[200px] rounded-xl p-2 bg-gradient-to-r from-sky-400 to-blue-600 flex flex-col justify-center flex-1">
                                <label className="text-white text-[25px] self-center">Goal Received</label>
                                <h1 className="text-[80px] text-white self-center">{matchStat.goalReceived}</h1>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        )
    );
}

export default CoachDetail;