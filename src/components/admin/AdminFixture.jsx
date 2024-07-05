import Match from "../match/Match";
import Filter from "../hcom/Filter";
import FuncContainer from "../hcom/FuncContainer";
import useData from "../hook/useData";
import { useEffect, useMemo, useState } from "react";
import { useAppContext } from "../AppContext";
import { toast } from "react-toastify";
import Form from "../hcom/Form";
import { useNavigate } from "react-router-dom";

function AdminFixture() {
    const [data, setData] = useState(null);
    const { currentWeek, seasons, admin } = useAppContext();
    const [matchweek, setMatchweek] = useState();
    const navigate = useNavigate();
    const getData = async () => {
        if (currentWeek === undefined || seasons === null) return;
        if (matchweek === undefined) {
            setMatchweek(currentWeek)
            return;
        }
        const url = `http://localhost:8088/api/v1/match?matchweek=${matchweek}&seasonId=${seasons[seasons.length - 1].value}`;
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            setData(fetchData);
        } catch (error) {
            toast.error("Error: " + error);
        }
    }

    useData(getData, [currentWeek, matchweek, JSON.stringify(seasons)]);

    const options = useMemo(() => {
        return Array.from({ length: 38 }, (_, i) => {
            return {
                value: i + 1,
                label: `Matchweek ${i + 1}`
            }
        });
    }, [currentWeek]);

    const onChangeWeekFilter = async (optionSelected) => {
        if (matchweek === optionSelected.value)
            return;
        const url = `http://localhost:8088/api/v1/match?matchweek=${optionSelected.value}&seasonId=${seasons[seasons.length - 1].value}`;
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            setData(fetchData);
        } catch (error) {
            toast.error("Error: " + error);
        }
        setMatchweek(optionSelected.value);
    }

    const onEditClick = (matchId) => {
        navigate(`/admin/fixture/${matchId}`, { state: data.find(match => match.id === matchId)});
    }

    useEffect(() => {
        if(!admin)
        {
            navigate("/*")
            return;
        }
    }, [admin])

    return (
        <FuncContainer title={"Fixtures"}>
            <div className="h-full w-full flex gap-4 mt-5">
                {matchweek && <Filter
                    options={options}
                    title={"Week"}
                    onChange={onChangeWeekFilter}
                    defaultValue={{ value: currentWeek, label: `Matchweek ${matchweek}` }} />}
            </div>
            {data &&
                <div className="w-full h-fit flex flex-col">
                    <h2 className="font-bold text-[20px] my-5">Matchweek {matchweek}</h2>
                    {data.map((fixture, i) => {
                        const time = new Date(fixture.matchDate);
                        const hours = (time.getHours()).toString().padStart(2, "0");
                        const minutes = time.getMinutes().toString().padStart(2, "0");
                        const timeString = `${hours}:${minutes}`;
                        const disabled = time < Date.now();
                        
                        const match = {
                            homeTeam: fixture.homeClubStat.club.name,
                            homeLogo: fixture.homeClubStat.club.logo,
                            awayTeam: fixture.awayClubStat.club.name,
                            awayLogo: fixture.awayClubStat.club.logo,
                            time: timeString,
                            date: time,
                            matchId: fixture.id,
                            stadiumName: fixture.homeClubStat.club.stadiumName
                        }
                        return (
                                <Match match={match} key={`fixtureMatch${i}`} followEdit={true} onFollowEdit={() => onEditClick(match.matchId)} disabled={false}/>
                        )
                    })}
                </div>
            }
        </FuncContainer>
    )
}

export default AdminFixture;