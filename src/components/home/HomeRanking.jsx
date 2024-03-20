import Table from "../table/Table";
import ButtonViewMore from "../hcom/ButtonViewMore";

const table = Array(20).fill({
    pos: 1,
    logo: "https://resources.premierleague.com/premierleague/badges/t1.png",
    name: "Manchester United",
    match: 1,
    point: 3,
});

const column = {
    pos: "Pos",
    club: "Club",
    match: "Match",
    point: "Point"
};

function HomeRanking() {
    return (
        <div className="h-fit w-[350px] border-solid border-[1px] border-[#ebe5eb] rounded-3xl bg-white mr-4 flex flex-col overflow-hidden shadow-xl">
            <div className="bg-gradient-to-r from-sky-400 to-blue-600 h-[75px] flex justify-center items-center">
                <h1 className="text-white font-bold text-[30px]">Standings</h1>
            </div>
            <Table column={column} data={table}/>
            <ButtonViewMore/>
        </div>
    )
}

export default HomeRanking;