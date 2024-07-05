import { useRef, useState } from "react";
import Filter from "../hcom/Filter";
import FuncContainer from "../hcom/FuncContainer";
import useData from "../hook/useData";
import PlayerList from "./PlayerList";
import { toast } from "react-toastify";
import { useAppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";
import Loader from "../hcom/Loader";

const columnField = ["Player", "Position", "Club", "Nationality"];

function PlayerContainer() {
    const [allData, setAllData] = useState();
    const [data, setData] = useState();
    const [optionsClubData, setOptionsClubData] = useState();
    const [optionsPlayerData, setOptionsPlayerData] = useState();
    const { seasons } = useAppContext();

    const filterPlayerRef = useRef();
    const filterClubRef = useRef();
    const filterSeasonRef = useRef();

    const navigate = useNavigate();

    useData(async () => {
        if (seasons === undefined)
            return;
        const url = `http://localhost:8088/api/v1/playerstat?seasonId=${seasons[seasons.length - 1].value}`;
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            setData(fetchData);
            setAllData(fetchData);
            setOptionsPlayerData(() => {
                return [{
                    value: "all",
                    label: "All Player"
                }, ...fetchData.map(playerStat => ({
                    value: playerStat.player.id,
                    label: playerStat.player.name
                }))]
            });
        } catch (error) {
            toast.error("Error: " + error);
        }
    }, [seasons]);

    useData(async () => {
        if (seasons === undefined)
            return;
        const url = `http://localhost:8088/api/v1/clubstat?seasonId=${seasons[seasons.length - 1].value}`;
        const response = await fetch(url);
        const fetchData = await response.json();
        setOptionsClubData([
            {
                label: "All Club",
                value: "all"
            }
            , ...fetchData.map((playerStat) => {
                return {
                    value: playerStat.club.id,
                    label: playerStat.club.name
                }
            })]);
    }, [JSON.stringify(seasons)]);

    const onChangeClub = (selectedOption) => {
        selectedOption.value === "all" && filterPlayerRef.current.setValue(selectedOption.value, "deselect-option");
        setData(selectedOption.value === "all" ? allData : allData.filter(playerStat => {
            return playerStat.club.id === selectedOption.value;
        }));
        setOptionsPlayerData(
            [{
                label: "All Player",
                value: "all"
            }, ...(selectedOption.value === "all" ? allData.map(playerStat => {
                return {
                    value: playerStat.player.id,
                    label: playerStat.player.name
                }
            }) : allData.filter(playerStat => {
                return playerStat.club.id === selectedOption.value;
            }).map(playerStat => {
                return {
                    value: playerStat.player.id,
                    label: playerStat.player.name
                }
            }))]
        );
    };

    const onChangePlayer = (selectedOption) => {
        if (selectedOption.value === "all") {
            if (filterClubRef.current.getValue()[0].value === "all") {
                setData(allData);
            }
            else {
                const club = allData.filter(playerStat => playerStat.club.id === filterClubRef.current.getValue()[0].value);
                setData(club);
            }
        }
        else {
            const player = allData.filter(playerStat => playerStat.player.id === selectedOption.value);
            setData(player);
        }
    }

    const onClickPlayer = (id) => {
        navigate(`/player/${id}`, {state: {seasonId: filterSeasonRef.current.getValue()[0].value}});
    }

    const onChangeSeasonFilter = async (optionSelected) => {
        const url = `http://localhost:8088/api/v1/playerstat?seasonId=${optionSelected.value}`;
        const response = await fetch(url);
        setData();
        try {
            const fetchData = await response.json();
            setData(fetchData);
            setAllData(fetchData);
            setOptionsPlayerData(() => {
                return [{
                    value: "all",
                    label: "All Player"
                }, ...fetchData.map(playerStat => ({
                    value: playerStat.player.id,
                    label: playerStat.player.name
                }))]
            });
        } catch (error) {
            toast.error("Error: " + error);
        }
    }

    return (
        <FuncContainer title={"Players"}>
            <div className="h-full w-full flex gap-2 mt-5">
                {seasons && <Filter options={seasons} title={"Search your season ..."} ref={filterSeasonRef} defaultValue={seasons[seasons.length-1]} onChange={onChangeSeasonFilter}/>}
                {data && <Filter options={optionsClubData} title={"Search your club ..."} onChange={onChangeClub} ref={filterClubRef} />}
                {data && <Filter options={optionsPlayerData} title={"Search your player name ..."} onChange={onChangePlayer} ref={filterPlayerRef} />}
            </div>
            {data && <PlayerList dataPlayer={data} columnField={columnField} onClickPlayer={onClickPlayer}></PlayerList>}
            {!data && <Loader/>}
        </FuncContainer>
    )
}

export default PlayerContainer;