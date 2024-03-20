import ColumnField from "../hcom/ColumnField";
import PlayerRow from "../player/PlayerRow";

const data = Array(20).fill(
    {
        name: "Erik Tenhag",
        img: "https://resources.premierleague.com/premierleague/photos/players/250x250/man41668.png",
        position: "Manager",
        club: "Manchester United",
        clubLogo: "https://resources.premierleague.com/premierleague/badges/t1.png",
        nationality: "Netherlands",
    }
)

const columnField = ["Player", "Position", "Club", "Nationality"];

function CoachList()
{
    return(
        <div className="h-fit w-full flex flex-col">
        <ColumnField data={columnField}/>
        <div>
            {
                data.map((e, i) => {
                    return (
                        <PlayerRow data={e} key={`playerData${i}`}/>
                    )
                })
            }
        </div>
    </div>
    )
}

export default CoachList;