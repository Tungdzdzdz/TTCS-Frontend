import { useState } from "react";
import ColumnField from "../hcom/ColumnField";
import PlayerRow from "./PlayerRow"

function PlayerList({ dataPlayer, columnField, onClickPlayer, stat}) {
    return (
        <div className="h-fit w-full flex flex-col">
            <ColumnField data={columnField} />
            {dataPlayer && dataPlayer.map((playerStat, i) => {
                const data = {
                    id: playerStat.player.id,
                    img: playerStat.player.img,
                    name: playerStat.player.name,  
                    club: playerStat.club.name,
                    clubLogo: playerStat.club.logo,
                    position: playerStat.position.name,
                    nationality: playerStat.player.country.name,
                    stat: stat && playerStat[stat]
                }
                return <PlayerRow key={i} data={data} onClickPlayer={onClickPlayer}/>
            })}
        </div>
    )
}

export default PlayerList;