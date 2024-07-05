import { useEffect, useRef, useState } from "react";
import Filter from "../hcom/Filter";
import useData, { getOptionsClub } from "../hook/useData";
import PlayerList from "../player/PlayerList";
import { FaCirclePlus } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useAppContext } from "../AppContext";
import Loader from "../hcom/Loader";

const columnField = ["Goal", "Assist", "Yellow Card", "Red Card", "Appearance", "Shot", "Saves", "Foul", "Offside"]

function PlayerComparisonContainer() {
    const [player1, setPlayer1] = useState();
    const [player2, setPlayer2] = useState();
    const [data, setData] = useState();
    const [playerList, setPlayerList] = useState();
    const [optionsPlayer, setOptionsPlayer] = useState();
    const [optionsClub, setOptionsClub] = useState();
    const { seasons } = useAppContext();
    const [season, setSeason] = useState();
    const [loader, setLoader] = useState(true);

    const filterPlayerRef = useRef();
    const filterClubRef = useRef();

    useEffect(() => {
        if(!seasons)
            return;
        setSeason(seasons[seasons.length-1].value)
    }, [seasons])

    useData(async () => {
        if (!season)
            return;
        const url = `http://localhost:8088/api/v1/playerstat?seasonId=${season}`;
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            setData(fetchData);
            setOptionsPlayer([
                {
                    label: "All Player",
                    value: "all"
                },
                ...fetchData.map(e => {
                    return {
                        label: e.player.name,
                        value: e.player.id
                    }
                })
            ]);
            setPlayerList(fetchData);
            setLoader(false)
        } catch (error) {
            toast.error("Error: " + error);
        }
    }, [season]);

    useData(async () => {
        if(!season)
            return;
        const url = `http://localhost:8088/api/v1/clubstat?seasonId=${season}`;
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            setOptionsClub([
                {
                    value: "all",
                    label: "All Club"
                }, ...fetchData.map(e => {
                    return {
                        value: e.club.id,
                        label: e.club.name
                    }
                })
            ]);
        } catch (error) {
            toast.error("Error: " + error);
        }        
    }, [season]);

    const onChangeSeasonFilter = async (optionSelected) => {
        if (season === optionSelected.value)
            return;
        filterClubRef.current.setValue("all", 'select-option');
        filterPlayerRef.current.setValue("all", 'select-option');
        setLoader(true);
        // const urlPlayerStat = `http://localhost:8088/api/v1/playerstat?seasonId=${optionSelected.value}`;
        // await fetch(urlPlayerStat)
        //     .then(response => response.json())
        //     .then(data => {
        //         setData(data);
        //         setPlayerList(data);
        //         setOptionsPlayer([
        //             {
        //                 label: "All Player",
        //                 value: "all"
        //             },
        //             ...data.map(e => {
        //                 return {
        //                     label: e.player.name,
        //                     value: e.player.id
        //                 }
        //             })
        //         ]);
        //         setSeason(optionSelected.value);
        //     })
        //     .catch(error => toast.error("Error: " + error));

        // const urlClubStat = `http://localhost:8088/api/v1/clubstat?seasonId=${optionSelected.value}`;
        // await fetch(urlClubStat)
        //     .then(response => response.json())
        //     .then(data => {
        //         setOptionsClub([
        //             {
        //                 label: "All Club",
        //                 value: "all"
        //             },
        //             ...data.map(e => {
        //                 return {
        //                     label: e.club.name,
        //                     value: e.club.id
        //                 }
        //             })
        //         ]);
        //     })
        //     .catch(error => toast.error("Error: " + error));
        // setLoader(false);
        setSeason(optionSelected.value)
    }

    const onChangeClubFilter = (optionSelected) => {
        filterPlayerRef.current.setValue("all", 'select-option');
        if (optionSelected.value === "all")
            setPlayerList(data);
        else {
            setPlayerList(data.filter(e => e.club.id === optionSelected.value));
            setOptionsPlayer([{
                label: "All Player",
                value: "all"
            }, ...data.filter(e => e.club.id === optionSelected.value).map(e => {
                return {
                    label: e.player.name,
                    value: e.player.id
                }
            })]);
        }
    }

    const onChangePlayerFilter = (optionSelected) => {
        if (optionSelected.value === "all") {
            if (filterClubRef.current.getValue()[0].value === "all")
                setPlayerList(data);
            else
                setPlayerList(data.filter(e => e.club.id === filterClubRef.current.getValue()[0].value));
        }
        else
            setPlayerList(data.filter(e => e.player.id === optionSelected.value));
    }

    const onClickPlayer = (id) => {
        const player = data.find(e => e.player.id === id);
        if (player1 === undefined && player2 !== player) setPlayer1(player);
        else if (player2 === undefined && player1 !== player) setPlayer2(player);
    }
    return (
        <div className="h-fit w-full flex justify-center">
            <div className="h-fit w-3/4 p-5 flex flex-col z-0">
                {playerList && <div className="flex gap-2">
                    <Filter options={seasons} title={"Season"} onChange={onChangeSeasonFilter} defaultValue={seasons[seasons.length-1]}/>
                    <Filter options={optionsClub} title={"Club"} onChange={onChangeClubFilter} ref={filterClubRef} />
                    <Filter options={optionsPlayer} title={"Player"} onChange={onChangePlayerFilter} ref={filterPlayerRef} />
                </div>}
                <div className="flex gap-5 flex-1 flex-col my-20">
                    <div className="flex gap-10 flex-wrap justify-center">
                        <div
                            className={`h-[200px] flex items-center justify-center w-[350px] bg-white rounded-xl border-solid border-[1px] border-[#ebe5eb] shadow-xl hover:cursor-pointer ${player1 !== undefined ? "bg-gradient-to-r from-sky-400 to-blue-500" : ""}`}
                            onClick={() => {
                                if (player1 !== undefined)
                                    setPlayer1(undefined);
                            }}>
                            {player1 === undefined && <FaCirclePlus className="text-[50px] text-[#37003c]" />}
                            {player1 !== undefined && <img src={player1.player.img} className="h-full p-4" />}
                            {player1 !== undefined && <h4 className="text-white text-[20px]">{player1.player.name}</h4>}
                        </div>
                        <div
                            className={`h-[200px] flex items-center justify-center w-[350px] bg-white rounded-xl border-solid border-[1px] border-[#ebe5eb] shadow-xl hover:cursor-pointer ${player2 !== undefined ? "bg-gradient-to-r from-sky-400 to-blue-500" : ""}`}
                            onClick={() => {
                                if (player2 !== undefined)
                                    setPlayer2(undefined);
                            }}
                        >
                            {player2 === undefined && <FaCirclePlus className="text-[50px] text-[#37003c]" />}
                            {player2 !== undefined && <img src={player2.player.img} className="h-full p-4 bg" />}
                            {player2 !== undefined && <h4 className="text-white text-[20px]">{player2.player.name}</h4>}
                        </div>
                    </div>
                    {player1 !== undefined && player2 !== undefined &&
                        <div className="h-fit w-full p-3 flex flex-col">
                            {
                                columnField.map((e, i) => {
                                    var field = e.split(' ');
                                    field[0] = field[0].toLowerCase();
                                    field = field.join('');
                                    return (
                                        <div key={`column${i}`} className=" w-3/4 flex justify-between p-2 self-center border-b-2">
                                            <h4>{player1[field]}</h4>
                                            <h4>{e}</h4>
                                            <h4>{player2[field]}</h4>
                                        </div>
                                    )
                                })
                            }
                        </div>}
                </div>
                <div className="h-fit w-full">
                    <PlayerList columnField={["Player", "Position", "player", "Nationality"]} dataPlayer={playerList} onClickPlayer={onClickPlayer} />
                </div>
                {loader && <Loader/>}
            </div>
        </div>
    );
}

export default PlayerComparisonContainer;