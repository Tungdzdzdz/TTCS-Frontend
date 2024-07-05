import { BiPlus, BiPlusCircle } from "react-icons/bi";
import Filter from "../hcom/Filter";
import { useEffect, useState } from "react";
import useData from "../hook/useData";
import { LuPenSquare } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import SelectPlayer from "./SelectPlayer";
import { toast } from "react-toastify";

function SelectClub({number, dispatch, clubs}) {

    const [clubData, setClubData] = useState();
    const [playerData, setPlayerData] = useState();
    const [positionData, setPositionData] = useState();
    const [coachData, setCoachData] = useState();
    const [optionClub, setOptionClub] = useState([{ value: 0, label: "No opiton!" }]);
    const [optionPlayer, setOptionPlayer] = useState([{ value: 0, label: "No opiton!" }]);
    const [optionCoach, setOptionCoach] = useState([{ value: 0, label: "No opiton!" }]);    
    const [selectPlayer, setSelectPlayer] = useState(false);   
    const [index, setIndex] = useState();
    const getClubData = async () => {
        const url = "http://localhost:8088/api/v1/club";
        const response = await fetch(url);
        if (response.ok) {
            const fetchData = await response.json();
            setClubData(fetchData.map(e => {
                const {players, ...club} = e;
                return {
                    ...club,
                    location: club.location.id,
                };
            }));
            setOptionClub([{ value: 0, label: "No opiton!" }].concat(fetchData.filter(e => {
                return clubs.find(club => club.club.id === e.id) ? false : true;
            }).map(e => {
                return {
                    value: e.id,
                    label: e.name
                }
            })));
        }
        else {
            toast.error("Error fetching club data");
        }
    };

    const getPlayerData = async () => {
        const url = "http://localhost:8088/api/v1/player";
        const response = await fetch(url);
        if (response.ok) {
            const fetchData = await response.json();
            setPlayerData(fetchData.map(e => {
                return {
                    ...e,
                    country: e.country.id
                }
            }));
            setOptionPlayer([{ value: 0, label: "No opiton!" }].concat(fetchData.filter(e => {
                return clubs.find(club => club.players.find(player => player.id === e.id)) ? false : true;
            }).map(
                e => {
                    return {
                        value: e.id,
                        label: e.name
                    }
                }
            )));
        }
        else {
            toast.error("Error fetching player data");
        }
    }

    const getPositionData = async () => { 
        const url = "http://localhost:8088/api/v1/position";
        const response = await fetch(url);
        if (response.ok) {
            const fetchData = await response.json();
            setPositionData(fetchData);
        }
        else {
            toast.error("Error fetching position data");
        }
    }

    const getCoachData = async () => {
        const url = "http://localhost:8088/api/v1/coach";
        const response = await fetch(url);
        if (response.ok) {
            const fetchData = await response.json();
            setCoachData(fetchData.map(e => {
                return {
                    ...e,
                    country: e.country.id
                }
            }));
            console.log(fetchData)
            console.log(clubs)
            setOptionCoach([{ value: 0, label: "No opiton!" }].concat(fetchData.filter(e => {
                if(clubs === undefined)
                    return true;
                return clubs.find(club => club.coach.id === e.id) ? false : true;
            }).map(coach => {
                return {
                    value: coach.id,
                    label: coach.name
                }
            })));
        }
        else {
            toast.error("Error fetching coach data");
        }
    }

    useData(getClubData, [number]);
    useData(getPlayerData, [number]);
    useData(getPositionData, [number]);
    useData(getCoachData, [number]);  

    const onChangeClubFilter = (optionSelected) => {
        if(number === clubs.length)
            return;
        if (optionSelected.value != 0) {
            if(clubs.find(e => e.id === optionSelected.value))
                return;
            dispatch({ type: "ADD_CLUB", value: clubData.find(e => e.id === optionSelected.value)});
            setOptionClub((optionClub.filter(e => e.value !== optionSelected.value)));
        }
    };

    const onUnselectedClub = (index) => {
        const club = clubs[index].club;
        dispatch({ type: "REMOVE_CLUB", value: index });
        setOptionClub([...optionClub, { value: club.id, label: club.name }]);
    }

    const onSelectPlayer = (i) => {
        setIndex(i)
        setSelectPlayer(true);
    }

    const onClosePlayer = () => {
        setSelectPlayer(false);
    }

    const onChangePlayerFilter = (optionSelected) => {
        if (optionSelected.value != 0) {
            dispatch({ type: "ADD_PLAYER", valuePlayer: playerData.find(e => e.id === optionSelected.value), index: index, valuePosition: positionData[0]});
            setOptionPlayer((optionPlayer.filter(e => e.value !== optionSelected.value)));
        }
    }

    const onUnselectedPlayer = (i) => {
        const player = clubs[index].players[i];
        console.log(player);
        dispatch({ type: "REMOVE_PLAYER", value: i, index: index });
        setOptionPlayer([...optionPlayer, { value: player.id, label: player.name }]);
    }

    const onChangePostionFilter = (optionSelected, playerIndex) => {
        dispatch({ type: "CHANGE_POSITION", value: positionData.find(e => e.id === optionSelected.value), index: index, playerIndex: playerIndex })
    }

    const onChangeCoachFilter = (optionSelected) => {
        if (optionSelected.value != 0) {
            const preCoach = clubs[index].coach;
            console.log(preCoach)
            dispatch({ type: "ADD_COACH", value: coachData.find(e => e.id === optionSelected.value), index: index });
            setOptionCoach(
               (pre) =>  preCoach ? (optionCoach.filter(e => e.value !== optionSelected.value).concat({ value: preCoach.id, label: preCoach.name }))
                : (optionCoach.filter(e => e.value !== optionSelected.value))
            );
        }
    }

    return (
        <div className="w-fit h-fit flex-grow flex flex-col gap-4">
            <div className="w-full h-fit flex flex-col px-5 gap-4">
                <h1>Select Club</h1>
                {number > 0 && <Filter options={optionClub} onChange={onChangeClubFilter}/>}
            </div>
            <div className="w-full h-fit flex-grow flex flex-wrap">
                {
                    Array(number).fill(1).map((e, i) => {
                        return (
                            <div className="w-1/5 h-fit p-5" key={i}>
                                <div 
                                    className="w-full h-fit min-h-[200px] flex border-2 border-gray-200 rounded-xl shadow-lg justify-center items-center"
                                    onClick={() => {}}    
                                >
                                    {
                                        clubs[i] ? 
                                        <div className="w-full h-full flex flex-col gap-4 items-center">
                                            <div className="flex w-full h-full gap-4 justify-center">
                                                <img 
                                                    className="h-[120px] w-[120px]"
                                                    src={clubs[i].club.logo}
                                                    alt={"Logo of " + clubs[i].club.name}
                                                />
                                                <div className="flex flex-col items-center justify-center gap-4">
                                                    <LuPenSquare 
                                                        className="text-3xl text-gray-300 hover:cursor-pointer hover:text-gray-500"
                                                        onClick={() => onSelectPlayer(i)} 
                                                        />
                                                    <MdDelete 
                                                        className="text-3xl text-red-500 hover:cursor-pointer hover:text-red-700"
                                                        onClick={() => onUnselectedClub(i)}
                                                        />    
                                                </div>
                                            </div>
                                            <label className="text-center text-xl">{clubs[i].club.shortName}</label>
                                        </div> : 
                                        <div className="w-full h-full flex flex-col gap-2 justify-center items-center">
                                            <BiPlusCircle className="text-4xl"/>
                                            <label>Add Club</label>
                                        </div>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {selectPlayer && <SelectPlayer 
                                onClose={onClosePlayer} 
                                optionPlayer={optionPlayer} 
                                onChangePlayerFilter={onChangePlayerFilter}
                                data={clubs[index].players}
                                onUnselectedPlayer={onUnselectedPlayer}
                                onChangePositionFilter={onChangePostionFilter}
                                onChangeCoachFilter={onChangeCoachFilter}
                                optionCoach={optionCoach}
                                positions={clubs[index].positions}
                                coach={clubs[index].coach}
                                numberJersey={clubs[index].numberJersey}
                                dispatch={dispatch}
                                index={index}
                                />}
        </div>
    )
};

export default SelectClub;