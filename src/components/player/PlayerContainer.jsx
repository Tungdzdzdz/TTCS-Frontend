import Filter from "../hcom/Filter";
import FuncContainer from "../hcom/FuncContainer";
import PlayerList from "./PlayerList";

const options1 = [
    {
        value: "all",
        label: "All Club"
    },
    {
        value: "1",
        label: "Manchester United",
    },
    {
        value: "2",
        label: "Manchester United",
    },
    {
        value: "3",
        label: "Manchester United",
    },
    {
        value: "4",
        label: "Manchester United",
    },
    {
        value: "5",
        label: "Manchester United",
    },
]


function PlayerContainer() {
    return (
        <FuncContainer title={"Players"}>
            <div className="h-full w-full flex gap-2 mt-5">
                <Filter options={options1} title={"Search your club ..."} />
                <Filter options={options1} title={"Search your club ..."} />
                <Filter options={options1} title={"Search your club ..."} />
            </div>
            <PlayerList></PlayerList>
        </FuncContainer>
    )
}

export default PlayerContainer;