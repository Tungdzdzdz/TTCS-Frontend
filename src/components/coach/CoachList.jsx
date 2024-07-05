import { toast } from "react-toastify";
import ColumnField from "../hcom/ColumnField";
import useData from "../hook/useData";
import PlayerRow from "../player/PlayerRow";
import { useMemo, useState } from "react";
import { useAppContext } from "../AppContext";

const columnField = ["Coach", "Position", "Club", "Nationality"];

function CoachList({coachData, onClickCoach})
{   
    return(
        <div className="h-fit w-full flex flex-col">
        <ColumnField data={columnField}/>
        <div>
            {
                coachData && coachData.map((e, i) => {
                    const data = {
                            name: e.coach.name,
                            position: "Manager",
                            nationality: e.coach.country.name,
                            club: e.club.name,
                            clubLogo: e.club.logo,
                            img: e.coach.img,
                            id: e.coach.id
                        }
                    return (
                        <PlayerRow data={data} key={`coachData${i}`} onClickPlayer={onClickCoach}/>
                    )
                })
            }
        </div>
    </div>
    )
}

export default CoachList;