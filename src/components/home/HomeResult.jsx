import Match from "../match/Match";
import ButtonViewMore from "../hcom/ButtonViewMore";
import { useEffect, useState } from "react";
import useData from "../hook/useData";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext";
import { toast } from "react-toastify";

function HomeResult() {
    const [data, setData] = useState();
    const [result, setResult] = useState();
    const navigate = useNavigate();
    const {seasons, authToken, userInfo, client} = useAppContext(); 
    const [follows, setFollows] = useState([]);
    useData(async () => {
        if(!seasons) return;
        const url = `http://localhost:8088/api/v1/match/result/last?seasonId=${seasons[seasons.length - 1].value}`;
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            const follows = fetchData.map(match => {
                if(!userInfo)
                    return 'unfollow';
                const follow = match.users.find(user => user.id === userInfo.id);
                return !follow ? 'unfollow' : 'follow';
            })
            setFollows(follows)
            setData(fetchData);
        } catch (error) {
            toast.error("Error: " + error);
        }
    }, [seasons, userInfo]);

    useData(async () => {
        if(data === undefined) return;
        const url = `http://localhost:8088/api/v1/matchdetail/result/last`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data.map(e => e.id))
        }
        const response = await fetch(url, options);
        try {
            const fetchData = await response.json();
            setResult(fetchData);
        } catch (error) {
            toast.error("Error: " + error);
        }
    }, [data])

    const onFollowEdit = async (i) => {
        if(authToken === '')
        {
            navigate('/auth/login');
            return;
        }
        const newFollows = [...follows];
        newFollows[i] = follows[i] === 'follow' ? 'unfollow' : 'follow';
        const url = `http://localhost:8088/api/v1/match/follow?matchId=${data[i].id}`;
        const response = await fetch(url, {
            method: newFollows[i] === 'follow' ? 'POST' : 'DELETE',
            headers: {
                "Authorization": "Bearer " + authToken,
            },
        });
        if (!response.ok) {
            toast.error("Error: " + response.status);
            return;
        }
        setFollows(newFollows);
    }

    useEffect(() => {
        if(!data || !client)   
            return;
        const subscriptions = data.map(match => {
            return client.subscribe(`/topic/match/result/${match.id}`, message => {
                setResult(pre => {
                    const newResult = [...pre];
                    const index = data.findIndex(e => e.id === match.id);
                    newResult[index] = message.body;
                    return newResult;
                
                });
            })
        })
        return () => {
            subscriptions.forEach(subscription => subscription.unsubscribe());
        }
    }, [data, client])

    return (
        <div className="h-fit w-full flex flex-col">
            <div className="bg-gradient-to-r from-sky-400 to-blue-600 h-[75px] flex justify-center items-center">
                <h1 className="p-3 font-bold text-[30px] text-white">Result</h1>
            </div>
            {
                data && result &&
                <div className="w-full h-fit flex flex-col">
                    {data.map((r, i) => {
                        const match = {
                            matchId: r.id,
                            homeTeam: r.homeClubStat.club.name,
                            homeLogo: r.homeClubStat.club.logo,
                            awayTeam: r.awayClubStat.club.name,
                            awayLogo: r.awayClubStat.club.logo,
                            result: result[i],
                            stadiumName: r.homeClubStat.club.stadiumName,
                        };
                        return (
                            <Match 
                                match={match} 
                                key={`resultMatch${i}`} 
                                onNavigateMatch={(id) => navigate(`/result/${id}`, {state: r})}
                                onFollowEdit={() => onFollowEdit(i)}
                                followEdit={follows[i]}
                                />
                        )
                    })}
                </div>
            }
            <ButtonViewMore onClick={() => navigate('/result')} />
        </div>
    )
}

export default HomeResult;