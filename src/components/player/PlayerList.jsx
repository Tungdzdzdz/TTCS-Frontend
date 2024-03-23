import { useState } from "react";
import ColumnField from "../hcom/ColumnField";
import PlayerRow from "./PlayerRow"

function PlayerList({ dataPlayer, columnField, stat, onClickPlayer }) {
    console.log(dataPlayer);
    return (
        <div className="h-fit w-full flex flex-col">
            <ColumnField data={columnField} />
            {dataPlayer && dataPlayer.squad && dataPlayer.squad.map((e, index) => {
                const player = {
                                    ...e,
                                    club: dataPlayer.name,
                                    clubLogo: dataPlayer.crest,
                                    img: "https://resources.premierleague.com/premierleague/photos/players/250x250/p176297.png",
                                }
                return <PlayerRow data={player} key={`playerData${index}`} onPlayerClick={() => onClickPlayer(index)} />
            })}
            {dataPlayer && dataPlayer.teams &&
                (<div>
                    {
                        dataPlayer.teams.map((team) => {
            
                            return team.squad.map((e, index) => {
                                const player = {
                                    ...e,
                                    club: team.name,
                                    clubLogo: team.crest,
                                    img: "https://resources.premierleague.com/premierleague/photos/players/250x250/p176297.png",
                                    stat: stat ? stat : undefined
                                }
                                return (
                                    <PlayerRow data={player} key={`playerData${index}`} onPlayerClick={() => onClickPlayer(index)} />
                                )
                            })
                        })
                    }
                </div>)}
        </div>
    )
}

export default PlayerList;