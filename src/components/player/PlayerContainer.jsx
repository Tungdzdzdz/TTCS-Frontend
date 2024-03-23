import { useState } from "react";
import Filter from "../hcom/Filter";
import FuncContainer from "../hcom/FuncContainer";
import useData from "../hook/useData";
import PlayerList from "./PlayerList";
import { toast } from "react-toastify";

const options1 = [
    {
        value: "all",
        label: "All Club"
    },
    {
        value: "1",
        label: "Manchester United",
    },
    {
        value: "2",
        label: "Manchester United",
    },
    {
        value: "3",
        label: "Manchester United",
    },
    {
        value: "4",
        label: "Manchester United",
    },
    {
        value: "5",
        label: "Manchester United",
    },
]

const columnField = ["Player", "Position", "Club", "Nationality"];

function PlayerContainer() {
    const [allData, setAllData] = useState();
    const [data, setData] = useState();
    const [optionsClubData, setOptionsClubData] = useState();
    const [optionsPlayerData, setOptionsPlayerData] = useState();
    useData(async () => {
        const url = "http://localhost:3000/clubs";
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            setData(fetchData);
            setAllData(fetchData);
            setOptionsClubData([
                {
                    label: "All Club",
                    value: "all"
                }
                , ...fetchData.teams.map((team) => {
                    return {
                        value: team.id,
                        label: team.name
                    }
                })]);
            setOptionsPlayerData(fetchData.teams.reduce((pre, current) => {
                return [...pre, ...current.squad.map((player) => {
                    return {
                        value: player.id,
                        label: player.name
                    }
                })];
            }, [{ value: "all", label: "All Player" }]));
        } catch (error) {
            toast.error("Error: " + error);
        }
    })

    const onChangeClub = (selectedOption) => {
        setData(selectedOption.value === "all" ? allData : allData.teams.find((team) => {
            return team.id === selectedOption.value;
        }));
        setOptionsPlayerData(selectedOption.value === "all" ?
            allData.teams.reduce((pre, current) => {
                return [...pre, ...current.squad.map((player) => {
                    return {
                        value: player.id,
                        label: player.name
                    }
                })];
            }, [{ value: "all", label: "All Player" }]) : 
            allData.teams.reduce((pre, cur) => {
                if(cur.id === selectedOption.value) {
                    return cur.squad.map((player) => {
                        return {
                            value: player.id,
                            label: player.name
                        }
                    });
                }
                return pre;
            }, [])
        );
    };

    const onChangePlayer = (selectedOption) => {
        if (selectedOption.value === "all") {
            setData(allData);
        }
        else {
            const player = allData.teams.reduce((pre, current) => {
                const playerData = current.squad.find((player) => {
                    return player.id === selectedOption.value;
                });
                if (playerData) {
                    return {
                        ...playerData,
                        club: current.name,
                        clubLogo: current.crest,
                        img: "https://resources.premierleague.com/premierleague/photos/players/250x250/p176297.png"
                    };
                }
                return pre;
            }, {})
            setData(player);
        }
    }
    return (
        <FuncContainer title={"Players"}>
            <div className="h-full w-full flex gap-2 mt-5">
                <Filter options={optionsClubData} title={"Search your club ..."} onChange={onChangeClub} />
                <Filter options={optionsPlayerData} title={"Search your player name ..."} onChange={onChangePlayer} />
            </div>
            <PlayerList dataPlayer={data} columnField={columnField}></PlayerList>
        </FuncContainer>
    )
}

export default PlayerContainer;