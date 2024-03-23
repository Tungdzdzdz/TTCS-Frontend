import { useEffect, useState } from "react";
import Filter from "../hcom/Filter";
import FuncContainer from "../hcom/FuncContainer";
import Table from "./Table";
import useData from "../hook/useData";

const table = Array(20).fill({
    pos: 1,
    logo: "https://resources.premierleague.com/premierleague/badges/t1.png",
    name: "Manchester United",
    match: 1,
    win: 10,
    draw: 0,
    lost: 0,
    gf: 100,
    ga: 0,
    gd: 100,
    point: 3,
});

const column = {
    pos: "Pos",
    club: "Club",
    match: "Match",
    win: "Win",
    draw: "Draw",
    lost: "Lost",
    gf: "GF",
    ga: "GA",
    gd: "GD",
    point: "Point",
};

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

function TableContainer()
{
    const [data, setData] = useState(null);
    useData(async () => {
        const url = "http://localhost:3000/standings";
        const response = await fetch(url);
        try{
            const fetchData = await response.json();
            setData(fetchData.standings[0].table);
        }
        catch (error) {
            console.log("Error: " + error);
        }
    });
    return(
        <FuncContainer title={"Table"}>
            <div className="h-full w-full flex gap-2 mt-5">
                <Filter options={options1} title={"Search your club ..."}/>
                <Filter options={options1} title={"Search your club ..."}/>
                <Filter options={options1} title={"Search your club ..."}/>
            </div>
            {data && <Table column={column} data={data} fontSize={20}/>}
        </FuncContainer>
    )
}

export default TableContainer;