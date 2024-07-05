import Match from "../match/Match";
import Filter from "../hcom/Filter";
import FuncContainer from "../hcom/FuncContainer";
import useData from "../hook/useData";
import { useEffect, useMemo, useState } from "react";
import { useAppContext } from "../AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function FixtureContainer() {
    const [data, setData] = useState(null);
    const {currentWeek, authToken, seasons, userInfo, client} = useAppContext();
    const [matchweek, setMatchweek] = useState();
    const [season, setSeason] = useState();
    const [follows, setFollows] = useState();
    const navigate = useNavigate();

    useData(async () => {
        if(!matchweek || !season) return;
        const url = `http://localhost:8088/api/v1/match?matchweek=${matchweek}&seasonId=${season}`;
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            setData(fetchData);
        } catch (error) {
            toast.error("Error: " + error);
        }
    },[matchweek, season]);

    const options = useMemo(() => {
        return Array.from({ length: 38 }, (_, i) => {
            return {
                value: i + 1,
                label: `Matchweek ${i + 1}`
            }
        });
    }, [matchweek, season]);

    const onChangeWeekFilter = async (optionSelected) => {
        if(matchweek === optionSelected.value)
            return;
        // const url = `http://localhost:8088/api/v1/match?matchweek=${optionSelected.value}&seasonId=${seasons[seasons.length-1].value}`;
        // const response = await fetch(url);
        // try {
        //     const fetchData = await response.json();
        //     setFollows(fetchData.map(match => {
        //         const follow = match.users.find(user => user.id === userInfo.id);
        //         return !follow ? 'unfollow' : 'follow'
        //     }));
        //     setData(fetchData);
        // } catch (error) {
        //     toast.error("Error: " + error);
        // }
        setMatchweek(optionSelected.value);
    }

    const onChangeSeasonFilter = (optionSelected) => {
        if(optionSelected.value == season) return;
        setSeason(optionSelected.value)
    }

    const onFollowClick = async (i) => {
        if(authToken === '')
        {
            navigate("/auth/login");
            return;
        }
        const newFollows = [...follows];
        newFollows[i] = follows[i] === "follow" ? "unfollow" : "follow";
        const url = `http://localhost:8088/api/v1/match/follow?matchId=${data[i].id}`;
        const options = {
            method: newFollows[i] === "follow" ? "POST" : "DELETE",
            headers: {
                "Authorization": "Bearer " + authToken, 
            },
        }
        const response = await fetch(url, options);
        if(!response.ok)
        {
            toast.error("Error: " + response.status);
            return;
        }
        setFollows(newFollows);
    }

    useEffect(() => {
        if(!data)
            return;
        setFollows(data.map(match => {
            if(userInfo === undefined)
                return "unfollow";
            const follow = match.users.find(user => user.id === userInfo.id);
            return !follow ? 'unfollow' : 'follow'
        }))
    }, [data, userInfo]);

    useEffect(() => {
        if(!seasons) return;
        setSeason(seasons[seasons.length-1].value)
    }, [seasons])

    useEffect(() => {
        if(!currentWeek) return;
        setMatchweek(currentWeek === 38 ? currentWeek : currentWeek+1)
    }, [currentWeek])

    useEffect(() => {
        if(!client || !data) return;
        const subscription = client.subscribe(`/topic/fixture/season/${seasons[seasons.length-1].value}/week/${matchweek}`, message => {
            setData(JSON.parse(message.body))
        })
    }, [client, data])

    const onNavigateMatch = id => {
        navigate(`/result/${id}`, {state: data.find(e => e.id === id)})
        return;
    }

    return (
        <FuncContainer title={"Fixtures"}>
            <div className="h-full w-full flex gap-2 mt-5">
                {   matchweek && 
                    <Filter 
                    options={options} 
                    title={"Week"} 
                    onChange={onChangeWeekFilter} 
                    defaultValue={{value: matchweek, label: "Matchweek " + matchweek}}/>
                }
                {
                    season && 
                    <Filter
                        options={seasons}
                        title="Season"
                        onChange={onChangeSeasonFilter}
                        defaultValue={{value: season, label: seasons.find(e => e.value == season).label}}
                    />
                }
            </div>
            {data &&
                <div className="w-full h-fit flex flex-col">
                    <h2 className="font-bold text-[20px] my-5">Matchweek {matchweek}</h2>
                    {data.map((fixture, i) => {
                        const time = new Date(fixture.matchDate);;
                        const hours = (time.getHours()).toString().padStart(2, "0");
                        const minutes = time.getMinutes().toString().padStart(2, "0");
                        const timeString = `${hours}:${minutes}`;
                        const match = {
                            homeTeam: fixture.homeClubStat.club.name,
                            homeLogo: fixture.homeClubStat.club.logo,
                            awayTeam: fixture.awayClubStat.club.name,
                            awayLogo: fixture.awayClubStat.club.logo,
                            time: timeString,
                            matchId: fixture.id,
                            stadiumName: fixture.homeClubStat.club.stadiumName
                        }
                        return follows && (<Match 
                                                match={match} 
                                                key={`fixtureMatch${i}`} 
                                                onFollowEdit={() => onFollowClick(i)} 
                                                followEdit={follows[i]}
                                                onNavigateMatch={onNavigateMatch}/>)
                    })}
                </div>
            }
        </FuncContainer>
    )
}

export default FixtureContainer;