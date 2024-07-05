import Match from "../match/Match";
import ButtonViewMore from "../hcom/ButtonViewMore";
import useData from "../hook/useData";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext";
import { toast } from "react-toastify";

function HomeFixture() {
    const [data, setData] = useState(null);
    const {seasons, authToken, userInfo, client} = useAppContext();
    const [follows, setFollows] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if(!client || !data) return;
        const subcriptions = data.map(fix => {
            
            return client.subscribe(`/topic/match/fixture/${fix.id}`, message => {
                setData(pre => {
                    const newData = JSON.parse(message.body);
                    const newDatas = [...pre]
                    const index = newDatas.findIndex(e => e.id === newData.id)
                    newDatas[index] = newData
                    return newDatas;
                })
            })
        })
        return () => {
            subcriptions.forEach(element => {
                element.unsubscribe(); 
            });
        }
    }, [client, data])

    useData(async () => {
        if(!seasons) return;
        const url = `http://localhost:8088/api/v1/match/next?seasonId=${seasons[seasons.length - 1].value}`;
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            setFollows(fetchData.map(match => {
                if(!userInfo)
                    return "unfollow"
                if(match.users.find(u => u.id === userInfo.id))
                    return "follow";
                return "unfollow";
            }));
            setData(fetchData);
        } catch (error) {
            toast.error("Error: " + error);
        }
    }, [seasons, userInfo])

    const onFollowClick = async (i) => {
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

    return (
        <div className="w-full h-fit flex flex-col">
            <div className="bg-gradient-to-r from-sky-400 to-blue-600 h-[75px] flex justify-center items-center">
                <h1 className="p-3 font-bold text-[30px] text-white">Fixture</h1>
            </div>
            {
                data &&
                <div className="w-full h-fit flex flex-col">
                    {data.map((fixture, i) => {
                        const time = new Date(fixture.matchDate);
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
                            stadiumName: fixture.homeClubStat.club.stadiumName,
                        }
                        return (<Match 
                            match={match} 
                            key={`fixtureMatch${i}`} 
                            onFollowEdit={() => onFollowClick(i)} 
                            followEdit={follows[i]}/>)
                    })}
                </div>
            }
            <ButtonViewMore onClick={() => navigate('/fixture')}/>
        </div>
    )
}

export default HomeFixture;