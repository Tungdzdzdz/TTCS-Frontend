import Filter from "../hcom/Filter";
import FuncContainer from "../hcom/FuncContainer";
import Table from "./Table";

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

table.push({
    pos: 1,
    logo: "https://resources.premierleague.com/premierleague/badges/t1.png",
    name: "Wolvehampton Wanderer",
    match: 1,
    win: 10,
    draw: 0,
    lost: 0,
    gf: 100,
    ga: 0,
    gd: 100,
    point: 3,
})

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
    return(
        <FuncContainer title={"Table"}>
            <div className="h-full w-full flex gap-2 mt-5">
                <Filter options={options1} title={"Search your club ..."}/>
                <Filter options={options1} title={"Search your club ..."}/>
                <Filter options={options1} title={"Search your club ..."}/>
            </div>
            <Table column={column} data={table} fontSize={20}/>
        </FuncContainer>
    )
}

export default TableContainer;