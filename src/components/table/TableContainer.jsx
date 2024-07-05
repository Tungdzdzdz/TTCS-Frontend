import { useEffect, useState } from "react";
import Filter from "../hcom/Filter";
import FuncContainer from "../hcom/FuncContainer";
import Table from "./Table";
import useData from "../hook/useData";
import { useAppContext } from "../AppContext";
import { toast } from "react-toastify";

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

function TableContainer()
{
    const [data, setData] = useState(null);
    const {seasons, client} = useAppContext();
    const [season, setSeason] = useState();

    useEffect(() => {
        if(!seasons) return;
        setSeason(seasons[seasons.length-1].value);
    })

    useData(async () => {
        if(!season) return;
        const url = `http://localhost:8088/api/v1/clubstat/table/${season}`;
        const response = await fetch(url);
        try{
            const fetchData = await response.json();
            setData(fetchData);
        }
        catch (error) {
            toast.error("Error: " + error);
        }
    }, [season]);

    const onChangeSeasonFilter = async (optionSelected) => {
        const url = `http://localhost:8088/api/v1/clubstat/table/${optionSelected.value}`;
        const response = await fetch(url);
        setSeason(optionSelected.value)
        try{
            const fetchData = await response.json();
            setData(fetchData);
        }
        catch (error) {
            toast.error("Error: " + error);
        }
    }

    useEffect(() => {
        if(!client || !season) return;
        const subscription = client.subscribe(`/topic/clubstat/${season}`, message => {
            console.log(JSON.parse(message.body));
            setData(JSON.parse(message.body));
        })
    }, [client, season])
    return(
        <FuncContainer title={"Table"}>
            <div className="h-full w-full flex gap-2 mt-5">
                {seasons && <Filter options={seasons} onChange={onChangeSeasonFilter} defaultValue={seasons[seasons.length-1]} />}
            </div>
            {data && <Table column={column} data={data} fontSize={20}/>}
        </FuncContainer>
    )
}

export default TableContainer;