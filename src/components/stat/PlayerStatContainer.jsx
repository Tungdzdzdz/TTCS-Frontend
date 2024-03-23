import { useState } from "react";
import Filter from "../hcom/Filter";
import PlayerList from "../player/PlayerList";
import useData from "../hook/useData";

const columnField = ["Player", "Position", "Club", "Nationality", "Stat"];
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

function PlayerStatContainer() {
    const [data, setData] = useState();
    useData(async () => {
        const url = "http://localhost:3000/clubs";
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            setData(fetchData);
        } catch (error) {
            toast.error("Error: " + error);
        }
    });
    return (
        <div className="h-full w-full flex justify-center">
            <div className="h-full w-3/4 bg-white flex flex-col">
                <div className="h-full w-full flex gap-2 mt-5">
                    <Filter options={options1} title={"Search your club ..."} />
                    <Filter options={options1} title={"Search your club ..."} />
                    <Filter options={options1} title={"Search your club ..."} />
                </div>
                <PlayerList columnField={columnField} dataPlayer={data} stat={10} />
            </div>
        </div>
    )
}

export default PlayerStatContainer;