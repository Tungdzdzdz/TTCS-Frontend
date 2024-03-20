import ColumnField from "../hcom/ColumnField";
import PlayerRow from "./PlayerRow"

const data = Array(20).fill(
    {
        name: "Marcus Rashford",
        img: "https://resources.premierleague.com/premierleague/photos/players/250x250/p176297.png",
        position: "Forward",
        club: "Manchester United",
        clubLogo: "https://resources.premierleague.com/premierleague/badges/t1.png",
        nationality: "England",
    }
)

const columnField = ["Player", "Position", "Club", "Nationality"];

function PlayerList()
{
    return (
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

export default PlayerList