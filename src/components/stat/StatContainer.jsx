import { useState } from "react";
import Filter from "../hcom/Filter";
import useData from "../hook/useData";
import PlayerList from "../player/PlayerList";
import { Outlet, useNavigate } from "react-router-dom";

const statContainer = [
    { 
        title: "Player Stat",
        url: "/player-stat"
    }, 
    {
        title: "Club Stat",
        url: "/club-stat" 
    }, 
    {
        title: "Head to Head",
        url: "/head-to-head"
    }, 
    {
        title: "Player Comparison",
        url: "/player-comparison"
    }
];

function StatContainer() {
    const navigate = useNavigate();
    return (
        <div className="h-fit w-full flex flex-col absolute">
            <div className="h-[200px] w-full bg-gradient-to-r from-sky-400 to-purple-500 mt-10 flex flex-col items-center">
                <div className="w-full h-fit grow flex items-center">
                    <h1 className="text-[60px] text-white ml-80">Stats</h1>
                </div>
                <div className="w-2/3 h-[40px] flex gap-5 overflow-hidden pl-2 pt-2">
                    {
                        statContainer.map((e, i) => {
                            return (
                                <div
                                    className="h-full w-fit p-3 z-10 flex items-center justify-between bg-[#f5f2f5] rounded-tl-lg rounded-tr-lg hover:cursor-pointer hover:scale-110"
                                    key={`statContainer${i}`}
                                    onClick={() => navigate(`/stat${e.url}`)}>
                                    <label className="hover:cursor-pointer text-[15px]">{e.title}</label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <Outlet/>
        </div>
    )
}

export default StatContainer;