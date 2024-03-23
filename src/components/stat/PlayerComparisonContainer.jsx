import { useState } from "react";
import Filter from "../hcom/Filter";
import useData from "../hook/useData";
import PlayerList from "../player/PlayerList";
import { FaCirclePlus } from "react-icons/fa6";
import { toast } from "react-toastify";

const options1 = [
    {
        h4: "All player",
        value: "all"
    },
    {
        h4: "Manchester United",
        value: "1"
    },
    {
        h4: "Manchester United",
        value: "2"
    },
    {
        h4: "Manchester United",
        value: "3"
    },
    {
        h4: "Manchester United",
        value: "4"
    },
    {
        h4: "Manchester United",
        value: "5"
    }
]

const columnField = ["Goal", "Assit", "Cleansheet", "Yellow Card", "Red Card"]

function PlayerComparisonContainer() {
    const [player1, setPlayer1] = useState();
    const [player2, setPlayer2] = useState();
    const [data, setData] = useState();
    const [playerList, setPlayerList] = useState();
    useData(async () => {
        const url = "http://localhost:3000/clubs";
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            const players = fetchData.teams.reduce((pre, current) => {
                return pre.concat(current.squad.map((e) => {
                    const player = {
                        ...e,
                        club: current.name,
                        clubLogo: current.crest,
                        img: "https://resources.premierleague.com/premierleague/photos/players/250x250/p176297.png",
                    }
                    return player;
                }));
            }, []);
            setPlayerList(fetchData.teams); 
            setData(players);
        } catch (error) {
            toast.error("Error: " + error);
        }
    });

    const onClickPlayer = (i) => {
        if (i === player1 || i === player2) return;
        if (player1 === undefined) setPlayer1(i);
        else if (player2 === undefined) setPlayer2(i);
    }
    console.log(player1, player2);
    return (
        <div className="h-fit w-full flex justify-center">
            <div className="h-fit w-3/4 p-5 flex flex-col">
                <div className="flex gap-2">
                    <Filter options={options1} title={"Search your player ..."} />
                    <Filter options={options1} title={"Search your player ..."} />
                    <Filter options={options1} title={"Search your player ..."} />
                </div>
                <div className="flex gap-5 flex-1 flex-col my-20">
                    <div className="flex gap-10 flex-wrap justify-center">
                        <div
                            className={`h-[200px] flex items-center justify-center w-[350px] bg-white rounded-xl border-solid border-[1px] border-[#ebe5eb] shadow-xl hover:cursor-pointer ${player1 !== undefined ? "bg-gradient-to-r from-sky-400 to-blue-500" : ""}`}
                            onClick={() => {
                                if (player1 !== undefined)
                                    setPlayer1(undefined);
                            }}>
                            {player1 === undefined && <FaCirclePlus className="text-[50px] text-[#37003c]" />}
                            {player1 !== undefined && <img src={data[player1].img} className="h-full p-4"/>}
                            {player1 !== undefined && <h4 className="text-white text-[20px]">{data[player1].name}</h4>}
                        </div>
                        <div
                            className={`h-[200px] flex items-center justify-center w-[350px] bg-white rounded-xl border-solid border-[1px] border-[#ebe5eb] shadow-xl hover:cursor-pointer ${player2 !== undefined ? "bg-gradient-to-r from-sky-400 to-blue-500" : ""}`}
                            onClick={() => {
                                if (player2 !== undefined)
                                    setPlayer2(undefined);
                            }}
                        >
                            {player2 === undefined && <FaCirclePlus className="text-[50px] text-[#37003c]" />}
                            {player2 !== undefined && <img src={data[player2].img} className="h-full p-4 bg" />}
                            {player2 !== undefined && <h4 className="text-white text-[20px]">{data[player2].name}</h4>}
                        </div>
                    </div>
                    {player1 !== undefined && player2 !== undefined &&
                        <div className="h-fit w-full p-3 flex flex-col">
                            {
                                columnField.map((e, i) => {
                                    return (
                                        <div key={`column${i}`} className=" w-3/4 flex justify-between p-2 self-center border-b-2">
                                            <h4>0</h4>
                                            <h4>{e}</h4>
                                            <h4>0</h4>
                                        </div>
                                    )
                                })
                            }
                        </div>}
                </div>
                <div className="h-fit w-full">
                    <PlayerList columnField={["Player", "Position", "player", "Nationality"]} dataPlayer={playerList} onClickPlayer={onClickPlayer}/>
                </div>
            </div>
        </div>
    );
}

export default PlayerComparisonContainer;