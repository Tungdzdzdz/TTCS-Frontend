import Table from "../table/Table";
import ButtonViewMore from "../hcom/ButtonViewMore";
import { useEffect, useState } from "react";
import useData from "../hook/useData";
import { useNavigate } from "react-router-dom";

const column = {
    pos: "Pos",
    club: "Club",
    point: "Point",
};

function HomeRanking() {
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    useData(async () => {
        const url = "http://localhost:3000/standings";
            const response = await fetch(url);
            try {
                const fetchData = await response.json();
                setData(fetchData.standings[0].table);
            } catch (error) {
                toast.error("Error: " + error);
            }
    })

    return (
        <div className="h-fit w-[350px] border-solid border-[1px] border-[#ebe5eb] rounded-3xl bg-white mr-4 flex flex-col overflow-hidden shadow-xl">
            <div className="bg-gradient-to-r from-sky-400 to-blue-600 h-[75px] flex justify-center items-center">
                <h1 className="text-white font-bold text-[30px]">Standings</h1>
            </div>
            {data && <Table column={column} data={data} />}
            <ButtonViewMore onClick={() => navigate('/table')}/>
        </div>
    )
}

export default HomeRanking;