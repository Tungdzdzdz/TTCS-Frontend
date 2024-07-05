import { useLocation, useNavigate, useParams } from "react-router-dom";
import useData from "../hook/useData";
import { useEffect, useMemo, useState } from "react";
import { MdStadium } from "react-icons/md";
import PlayerList from "../player/PlayerList";
import { toast } from "react-toastify";
import { useAppContext } from "../AppContext";
import Match from "../match/Match";
import ListContainer from "../hcom/ListContainer";

const columnField = ["Player", "Position", "Club", "Nationality"]

function ClubDetailContainer() {
    const { clubId } = useParams();
    const {state} = useLocation();
    const [clubStat, setClubStat] = useState();
    const [playerStat, setPlayerStat] = useState();
    const [fixtures, setFixtures] = useState();
    const [resultMatches, setResultMatches] = useState();
    const [results, setResults] = useState();
    const [resultFollows, setResultFollows] = useState();
    const [fixtureFollows, setFixtureFollows] = useState();
    const { authToken, userInfo, client } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(!state)
        {
            navigate("/not-found")
            return;
        }
    },[state])

    useData(async () => {
        const url = `http://localhost:8088/api/v1/playerstat/players/${clubId}/${state.seasonId}`;
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            setPlayerStat(fetchData);
        } catch (error) {
            toast.error("Error: " + error);
        }
    }, []);

    useData(async () => {
        const url = "http://localhost:8088/api/v1/clubstat/club/" + clubId + "?seasonId=" + state.seasonId;
        const response = await fetch(url);
        try {
            if(response.ok)
            {
                const fetchData = await response.json();
                setClubStat(fetchData);
            }
            else
                throw new Error("Club not found");
        } catch (error) {
            toast.error("Error: " + error);
        }
    }, []);

    useData(async () => {
        if (!clubStat) return;
        const url = "http://localhost:8088/api/v1/match/fixture/club/" + clubStat.id;
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            setFixtureFollows(fetchData.map(match => {
                if(!userInfo) return "unfollow";
                return userInfo.matches.find(m => m.id === match.id) ? "follow" : "unfollow";
            }))
            setFixtures(fetchData);
        } catch (error) {
            toast.error("Error: " + error);
        }
    }, [clubStat, userInfo]);

    useData(async () => {
        if (!clubStat) return;
        const url = "http://localhost:8088/api/v1/match/result/club/" + clubStat.id;
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            setResultFollows(fetchData.map(match => {
                if(!userInfo) return "unfollow";
                return userInfo.matches.find(m => m.id === match.id) ? "follow" : "unfollow"
            }))
            setResultMatches(fetchData);
        } catch (error) {
            toast.error("Error: " + error);
        }
    }, [clubStat, userInfo]);

    useData(async () => {
        if (!resultMatches) return;
        const url = "http://localhost:8088/api/v1/matchdetail/result/last";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(resultMatches.map(match => match.id))
        }
        const response = await fetch(url, options);
        try {
            const fetchData = await response.json();
            setResults(fetchData);
        } catch (error) {
            toast.error("Error: " + error);
        }
    }, [resultMatches]);

    const clubOverview = useMemo(() => {
        if (clubStat === undefined) return undefined;
        return {
            Name: clubStat.club.name,
            Founded: clubStat.club.founded,
            Stadium: clubStat.club.stadiumName,
            Location: clubStat.club.location.name,
            Rank: clubStat.rank,
            Win: clubStat.win,
            Lose: clubStat.lose,
            Draw: clubStat.draw,
            "Goal Taken": clubStat.goalTaken,
            "Goal Received": clubStat.goalReceived,
            CleanSheet: clubStat.cleanSheet,
        }
    }, [clubStat]);

    const club = useMemo(() => {
        if (clubStat === undefined) return undefined;
        return {
            name: clubStat.club.name,
            logo: clubStat.club.logo,
            stadiumName: clubStat.club.stadiumName,
        }
    }, [clubStat]);

    const onFollowFixture = async (i) => {
        if(authToken === '')
            navigate('/auth/login');
        const newFollows = [...fixtureFollows];
        newFollows[i] = fixtureFollows[i] === "follow" ? "unfollow" : "follow";
        setFixtureFollows(newFollows);
        const url = `http://localhost:8088/api/v1/match/follow?matchId=${fixtures[i].id}`;
        const options = {
            method: fixtureFollows[i] === "follow" ? "DELETE" : "POST",
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        }
        const response = await fetch(url, options);
        if(!response.ok)
        {
            toast.error("Error following match");
            setFixtureFollows(fixtureFollows);
        }
    }

    const onFollowResult = async (i) => {
        if(authToken === '')
        {    
            navigate('/auth/login');
            return;
        }
        const newFollows = [...resultFollows];
        newFollows[i] = resultFollows[i] === "follow" ? "unfollow" : "follow";  
        setResultFollows(newFollows);
        const url = `http://localhost:8088/api/v1/match/follow?matchId=${resultMatches[i].id}`;
        const options = {
            method: resultFollows[i] === "follow" ? "DELETE" : "POST",
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        }
        const response = await fetch(url, options);
        if(!response.ok)
        {
            toast.error("Error following match");
            setResultFollows(resultFollows);
        }
    }

    useEffect(() => {
        if(!client || !resultMatches) return;
        const subscriptions = resultMatches.map(match => {
            return client.subscribe(`/topic/match/result/${match.id}`, message => {
                setResults(pre => {
                    const newResults = [...pre];
                    newResults[resultMatches.findIndex(e => e.id === match.id)] = message.body;
                    return newResults;
                })
            })
        });
        return () => {
            subscriptions.forEach(sub => sub.unsubscribe());
        }
    }, [client, resultMatches])

    useEffect(() => {
        if(!client || !fixtures) return;
        const subscriptions = fixtures.map(e => {
            return client.subscribe(`/topic/match/fixture/${e.id}`, message => {
                setFixtures(pre => {
                    const newFixture = JSON.parse(message.body)
                    const newFixtures = [...pre]
                    const index = newFixtures.findIndex(e => e.id === newFixture.id)
                    newFixtures[index] = newFixture;
                    console.log(newFixtures)
                    return newFixtures;
                })
            })
        })
        return () => {
            subscriptions.forEach(e => e && e.unsubscribe())
        }
    }, [client, fixtures])

    return (
        <div className="h-fit w-full flex flex-col absolute">
            <div className="h-[200px] w-full bg-gradient-to-r from-sky-400 to-purple-500 mt-10 flex items-center">
                {clubStat &&
                    <div className="w-fit h-fit ml-80">
                        <div className="flex items-center">
                            <img className="h-[150px]" src={club.logo} />
                            <div className="flex flex-col">
                                <h1 className="text-[60px] text-white ">{club.name}</h1>
                                <div className="flex gap-2 items-center">
                                    <MdStadium className="text-white" />
                                    <p className="text-white">
                                        {club.stadiumName}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className="h-full w-full flex flex-col mt-20 mb-20">
                <div className="w-full flex h-fit justify-center gap-10 px-20">
                    <div className="h-full flex flex-col gap-10">
                        {clubStat && <ListContainer title={"Overview"} data={clubOverview} />}
                        {playerStat && <div className="flex flex-col h-full w-full rounded-xl shadow-lg overflow-hidden">
                                <div className="bg-gradient-to-r from-sky-400 to-blue-600 h-[75px] flex justify-center items-center min-w-[35rem]">
                                    <h1 className="p-3 font-bold text-[30px] text-white">Squad</h1>
                                </div>
                            <PlayerList title={"Player"} dataPlayer={playerStat} columnField={columnField} onClickPlayer={(id) => navigate(`/player/${id}`, {state: {seasonId: state.seasonId}})} />
                        </div>}
                    </div>
                    <div className="w-2/3 flex-col h-fit">
                        <div className="h-fit w-full bg-white mb-4 border-solid border-[1px] border-[#ebe5eb] rounded-xl overflow-hidden shadow-xl">
                            <div className="w-full h-fit flex flex-col">
                                <div className="bg-gradient-to-r from-sky-400 to-blue-600 h-[75px] flex justify-center items-center">
                                    <h1 className="p-3 font-bold text-[30px] text-white">Fixture</h1>
                                </div>
                                {
                                    fixtures &&
                                    <div className="w-full h-fit flex flex-col">
                                        {fixtures.map((fixture, i) => {
                                            const time = new Date(fixture.matchDate);
                                            const hours = time.getHours().toString().padStart(2, "0");
                                            const minutes = time.getMinutes().toString().padStart(2, "0");
                                            const timeString = `${hours}:${minutes}`;
                                            const match = {
                                                homeTeam: fixture.homeClubStat.club.name,
                                                homeLogo: fixture.homeClubStat.club.logo,
                                                awayTeam: fixture.awayClubStat.club.name,
                                                awayLogo: fixture.awayClubStat.club.logo,
                                                time: timeString,
                                                matchId: fixture.id,
                                                stadiumName: fixture.homeClubStat.club.stadiumName,
                                            }
                                            return <Match 
                                                        match={match} 
                                                        key={`fixtureMatch${i}`} 
                                                        followEdit={fixtureFollows[i]}
                                                        onFollowEdit={() => onFollowFixture(i)}
                                                    />
                                        })}
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="h-fit w-full bg-white mb-4 border-solid border-[1px] border-[#ebe5eb] rounded-xl overflow-hidden shadow-xl">
                            <div className="h-fit w-full flex flex-col">
                                <div className="bg-gradient-to-r from-sky-400 to-blue-600 h-[75px] flex justify-center items-center">
                                    <h1 className="p-3 font-bold text-[30px] text-white">Result</h1>
                                </div>
                                {
                                    results &&
                                    <div className="w-full h-fit flex flex-col">
                                        {resultMatches.map((r, i) => {
                                            const match = {
                                                matchId: r.id,
                                                homeTeam: r.homeClubStat.club.name,
                                                homeLogo: r.homeClubStat.club.logo,
                                                awayTeam: r.awayClubStat.club.name,
                                                awayLogo: r.awayClubStat.club.logo,
                                                result: results[i],
                                                stadiumName: r.homeClubStat.club.stadiumName,
                                            };
                                            return (
                                                <Match 
                                                    match={match} 
                                                    key={`resultMatch${i}`} 
                                                    onNavigateMatch={(id) => navigate(`/result/${id}`, {state: r})} 
                                                    onFollowEdit={() => onFollowResult(i)}
                                                    followEdit={resultFollows[i]}
                                                />
                                            )
                                        })}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClubDetailContainer;