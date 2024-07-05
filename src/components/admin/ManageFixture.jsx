import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useData from "../hook/useData";
import FuncContainer from "../hcom/FuncContainer";
import InputComponent from "../hcom/InputComponent";
import SelectSquad from "./SelectSquad";
import EditButton from "../hcom/EditButton";
import { useAppContext } from "../AppContext";
import { toast } from "react-toastify";

function ManageFixture() {
    const { state } = useLocation();
    const {authToken} = useAppContext();
    const [match, setMatch] = useState(() => {
        const matchDate = new Date(state.matchDate);
        const time = `${String(matchDate.getHours()).padStart(2, '0')}:${String(matchDate.getMinutes()).padStart(2, '0')}`;
        const date = `${matchDate.getFullYear()}-${String(matchDate.getMonth() + 1).padStart(2, '0')}-${String(matchDate.getDate()).padStart(2, '0')}`;
        return {
            id: state.id,
            date: date,
            time: time,
            homeClub: state.homeClubStat.id,
            awayClub: state.awayClubStat.id,
            homeFormation: state.homeFormation.id,
            awayFormation: state.awayFormation.id,
            season: state.season.id,
            week: state.week,
        }
    });
    const [homeSquad, setHomeSquad] = useState();
    const [awaySquad, setAwaySquad] = useState();
    const [homeClubPlayer, setHomeClubPlayer] = useState();
    const [awayClubPlayer, setAwayClubPlayer] = useState();

    const navigate = useNavigate();

    const homeClub = useMemo(() => {
        return state.homeClubStat;
    }, [state])

    const awayClub = useMemo(() => {
        return state.awayClubStat;
    }, [state]);

    const getSquad = async (clubStatId, matchId) => {
        const url = `http://localhost:8088/api/v1/squad/clubStat/${clubStatId}/match/${matchId}`;
        const response = await fetch(url);
        const fetchData = await response.json();
        if (fetchData.length === 0) {
            return fetchData;
        }
        return fetchData.map(e => {
            return {
                id: e.id,
                matchId: e.match.id,
                playerStatId: e.playerStat.id,
                clubStatId: e.clubStat.id,
                type: e.type
            }
        })
    };

    const getPlayer = async (clubId, seasonId) => {
        const url = `http://localhost:8088/api/v1/playerstat/players/${clubId}/${seasonId}`;
        const response = await fetch(url);
        const fetchData = await response.json();
        return fetchData;
    }

    useData(async () => {
        setHomeSquad(await getSquad(homeClub.id, match.id));
        setAwaySquad(await getSquad(awayClub.id, match.id));
    }, []);

    useData(async () => {
        setHomeClubPlayer(await getPlayer(homeClub.club.id, match.season));
        setAwayClubPlayer(await getPlayer(awayClub.club.id, match.season));
    }, [state]);

    const onChangeInput = (e, type) => {
        setMatch({
            ...match,
            [type]: e.target.value
        });
    };

    const validSquad = (squad) => {
        const main = squad.filter(e => e.type === true).length;
        if(main !== 11)
        {
            toast.error("Main squad must have 11 players");
            return false;
        }
        if(squad.find(e => e.type === undefined))
        {
            toast.error("Selected player must have a type squad");
            return false;
        }
        return true;
    }

    const validDateTime = (match) => {
        const date = new Date(match.date);
        const endSeason = new Date(state.season.endSeason);
        const startSeason = new Date(state.season.startSeason); 
        if(date < startSeason || date > endSeason)
        {
            toast.error("Date must be in the season");
            return false;
        }
        return true;
    }

    const putData = async (url, data) => {
        const options = {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + authToken
            },
            body: JSON.stringify(data),
        }
        const response = await fetch(url, options);
        if(response.ok)
            return true;
        return false;
    }

    const onClickEdit = async () => {
        console.log(homeSquad, awaySquad);
        if (!validSquad(homeSquad) || !validSquad(awaySquad))
            return;        
        if (!validDateTime(match))
            return;
        const squad = homeSquad.concat(awaySquad);
        if(await putData(`http://localhost:8088/api/v1/admin/match/time`, match) && await putData(`http://localhost:8088/api/v1/admin/squad`, squad))
        {
            toast.success("Edit fixture successfully");
            navigate("/admin/fixture");
        }
        else
        {
            toast.error("Error: Can't edit fixture");
        }
    }

    return (
        <FuncContainer title="Edit Fixture">
            <div className="h-full w-full flex mt-10 gap-4">
                <div className="h-fit w-1/3 flex flex-col gap-4">
                    <h1>Basic Information</h1>
                    <InputComponent field={"Date"} type={"date"} valueInput={match.date} onChangeInput={(e) => onChangeInput(e, 'date')} />
                    <InputComponent field={"Time"} type={"time"} valueInput={match.time} onChangeInput={(e) => onChangeInput(e, 'time')} />
                    <button 
                        className="h-[40px] w-[100px] rounded-md self-center bg-blue-700 text-white mt-5"
                        onClick={onClickEdit}>
                        Edit
                    </button>
                </div>
                <div className="h-fit w-full flex justify-between ml-10">
                    <div className="w-1/2">
                        {
                            homeClubPlayer && homeSquad &&
                            <SelectSquad
                                club={homeClub}
                                players={homeClubPlayer}
                                squad={homeSquad}
                                setSquad={setHomeSquad}
                                formation={match.homeFormation}
                                match={match}
                                setMatch={setMatch}
                                home={true}
                            />
                        }
                    </div>
                    <div className="w-1/2">
                        {
                            awayClubPlayer && awaySquad &&
                            <SelectSquad
                                club={awayClub}
                                players={awayClubPlayer}
                                squad={awaySquad}
                                setSquad={setAwaySquad}
                                formation={match.awayFormation}
                                match={match}
                                setMatch={setMatch}
                                home={false}
                            />
                        }
                    </div>
                </div>
            </div>
        </FuncContainer>
    )
}

export default ManageFixture;