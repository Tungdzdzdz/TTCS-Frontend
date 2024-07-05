import { useEffect, useMemo, useState } from "react";
import FuncContainer from "../hcom/FuncContainer";
import { useAppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useData from "../hook/useData";
import Match from "../match/Match";
import Filter from "../hcom/Filter";

function AdminResult()
{
    const [data, setData] = useState(null);
    const [result, setResult] = useState(null);
    const [matchweek, setMatchweek] = useState();
    const navigate = useNavigate();

    const {seasons, currentWeek, admin} = useAppContext();

    useEffect(() => {
        if(!admin)
        {
            navigate("/*")
            return;
        }
    }, [admin])

    useData(async () => {
        if(!matchweek || !seasons) return;
        const url = `http://localhost:8088/api/v1/match?matchweek=${matchweek}&seasonId=${seasons[seasons.length - 1].value}`;
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            setData(fetchData);
        } catch (error) {
            toast.error("Error: Internal server error!");
        }
    },[matchweek, seasons]);

    useData(async () => {
        if(!seasons || !matchweek) return;
        const url = `http://localhost:8088/api/v1/matchdetail/result/${matchweek}?seasonId=${seasons[seasons.length - 1].value}`;
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            setResult(fetchData);
        } catch (error) {
            toast.error("Error: " + error);
        }
    }, [seasons, matchweek]);

    useEffect(() => {
        if(currentWeek)
            setMatchweek(currentWeek);
    }, [currentWeek]);

    const optionMatchWeek = useMemo(() => {
        setMatchweek(currentWeek);
        return Array(38).fill(0).map((e, i) => {
            return {
                label: `Matchweek ${i + 1}`,
                value: i + 1
            }
        })
    }, [currentWeek]);

    const onFilterMatchWeek = (optionSelected) => {
        setMatchweek(optionSelected.value);
    };

    const onFollowEdit = (i) => {
        navigate(`/admin/result/${data[i].id}`, {state: data[i]});
    }

    return (
        <FuncContainer title={"Results"}>
            <div className="h-full w-full flex gap-2 mt-5">
                {currentWeek && <Filter options={optionMatchWeek} title={"Week"} onChange={onFilterMatchWeek} defaultValue={{label: "Matchweek " + currentWeek, value: currentWeek}}/>}
            </div>
            {
                data && result &&
                <div className="w-full h-fit flex flex-col">
                    <h2 className="font-bold text-[20px] my-5">Matchweek {matchweek}</h2>
                    {data.map((r, i) => {
                        const time = new Date(r.matchDate);
                        const hours = (time.getHours()).toString().padStart(2, "0");
                        const minutes = time.getMinutes().toString().padStart(2, "0");
                        const timeString = `${hours}:${minutes}`;
                        const disabled = time > Date.now();
                        const match = {
                            homeTeam: r.homeClubStat.club.name,
                            homeLogo: r.homeClubStat.club.logo,
                            awayTeam: r.awayClubStat.club.name,
                            awayLogo: r.awayClubStat.club.logo,
                            matchId: r.id,
                            result: disabled ? undefined : result[i],
                            time: timeString,
                            date: time,
                            stadiumName: r.homeClubStat.club.stadiumName
                        }
                        return (<Match match={match} key={`resultMatch${i}`} onFollowEdit={() => onFollowEdit(i)} followEdit={true} disabled={disabled}/>)
                    })}
                </div>  
            }
        </FuncContainer>
    )
}

export default AdminResult;