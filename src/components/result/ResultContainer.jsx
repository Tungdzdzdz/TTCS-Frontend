import Match from "../match/Match";
import Filter from "../hcom/Filter";
import FuncContainer from "../hcom/FuncContainer";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import useData from "../hook/useData";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext";

function ResultContainer() {
    const [data, setData] = useState(null);
    const [result, setResult] = useState(null);
    const [matchweek, setMatchweek] = useState();
    const [follow, setFollow] = useState(['unfollow']);
    const [season, setSeason] = useState();
    const navigate = useNavigate();

    const { seasons, currentWeek, userInfo, authToken, client } = useAppContext();

    useEffect(() => {
        let subscription;
        if (!seasons || !currentWeek || !client) return;
        subscription = client.subscribe(`/topic/result/season/${seasons[seasons.length - 1].value}/week/${matchweek}`, message =>
            setResult(JSON.parse(message.body))
        );
        return () => {
            if (subscription)
                subscription.unsubscribe();
        }
    }, [seasons, matchweek, client]);

    useEffect(() => {
        if(!seasons) return;
        setSeason(seasons[seasons.length-1].value)
    }, [seasons])

    useEffect(() => {
        if(!currentWeek) return;
        setMatchweek(currentWeek)
    }, [currentWeek])

    useData(async () => {
        if (!matchweek|| !season) return;
        const url = `http://localhost:8088/api/v1/match?matchweek=${matchweek}&seasonId=${season}`;
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            setData(fetchData);
        } catch (error) {
            toast.error("Error: Internal server error!");
        }
    }, [matchweek, season]);

    useData(async () => {
        if (!season || !matchweek) return;
        const url = `http://localhost:8088/api/v1/matchdetail/result/${matchweek}?seasonId=${season}`;
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            setResult(fetchData);
        } catch (error) {
            toast.error("Error: " + error);
        }
    }, [season, matchweek]);

    const optionMatchWeek = useMemo(() => {
        setMatchweek(currentWeek);
        return Array(38).fill(0).map((e, i) => {
            return {
                label: `Matchweek ${i + 1}`,
                value: i + 1
            }
        })
    }, [currentWeek]);

    useEffect(() => {
        if (!data)
            return;
        setFollow(data.map(match => {
            if(!userInfo) return "unfollow";
            const follow = match.users.find(user => user.id === userInfo.id);
            return !follow ? 'unfollow' : 'follow'
        }))
    }, [data, userInfo]);

    const onFilterMatchWeek = async (optionSelected) => {
        setMatchweek(optionSelected.value);
        // const url = `http://localhost:8088/api/v1/match?matchweek=${optionSelected.value}&seasonId=${seasons[seasons.length - 1].value}`;
        // const urlResult = `http://localhost:8088/api/v1/matchdetail/result/${optionSelected.value}?seasonId=${seasons[seasons.length - 1].value}`;
        // const response = await fetch(url);
        // const responseResult = await fetch(urlResult);
        // try {
        //     const fetchData = await response.json();
        //     const fetchResult = await responseResult.json();
        //     setData(fetchData);
        //     setResult(fetchResult);
        // } catch (error) {
        //     toast.error("Error: Internal server error!");
        // }
    };

    const onChangeFilterSeason = (optionSelected) =>
    {
        if(season === optionSelected.value) return;
        setSeason(optionSelected.value)
    }

    const onFollowEdit = async (i) => {
        if(!authToken) {
            navigate("/auth/login")
            return;
        }
        const newFollow = [...follow];
        newFollow[i] = follow[i] === 'follow' ? 'unfollow' : 'follow';
        const url = `http://localhost:8088/api/v1/match/follow?matchId=${data[i].id}`;
        const response = await fetch(url, {
            method: newFollow[i] === 'follow' ? 'POST' : 'DELETE',
            headers: {
                "Authorization": "Bearer " + authToken,
            },
        });
        if (!response.ok) {
            toast.error("Error: " + response.status);
            return;
        }
        setFollow(newFollow);
    }

    const onNavigateMatch = (id) => {
        navigate(`/result/${id}`, { state: data.find(e => e.id === id) });
    }

    return (
        <FuncContainer title={"Results"}>
            <div className="h-full w-full flex gap-2 mt-5">
                {matchweek && <Filter options={optionMatchWeek} title={"Week"} onChange={onFilterMatchWeek} defaultValue={{ label: 'Matchweek ' + matchweek, value: matchweek }} />}
                {season && <Filter options={seasons} title="Season" defaultValue={{value: season, label: seasons.find(e => e.value == season).label}} onChange={onChangeFilterSeason}/>}
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
                        return (<Match
                            match={match}
                            key={`resultMatch${i}`}
                            onFollowEdit={() => onFollowEdit(i)}
                            followEdit={follow[i]}
                            disabled={disabled}
                            onNavigateMatch={onNavigateMatch}
                        />)
                    })}
                </div>
            }
        </FuncContainer>
    )
}

export default ResultContainer;