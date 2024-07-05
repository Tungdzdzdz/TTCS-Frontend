import Table from "../table/Table";
import ButtonViewMore from "../hcom/ButtonViewMore";
import { useEffect, useState } from "react";
import useData from "../hook/useData";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext";

const column = {
    pos: "Pos",
    club: "Club",
    point: "Point",
};

function HomeRanking() {
    const [data, setData] = useState(null);
    const {seasons, client} = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(!client || !seasons) return; 
        const subscription = client.subscribe(`/topic/clubstat/${seasons[seasons.length-1].value}`, message => {
            setData(JSON.parse(message.body));
        })
        return () => {
            if(subscription)
                subscription.unsubscribe();
        }
    }, [seasons, client])

    useData(async () => {
        if(seasons === undefined) return;
        const url = `http://localhost:8088/api/v1/clubstat/table/${seasons[seasons.length - 1].value}`;
            const response = await fetch(url);
            try {
                const fetchData = await response.json();
                setData(fetchData);
            } catch (error) {
                toast.error("Error: " + error);
            }
    }, [JSON.stringify(seasons)])

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