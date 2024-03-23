import Match from "../match/Match";
import ButtonViewMore from "../hcom/ButtonViewMore";
import { useEffect, useState } from "react";
import useData from "../hook/useData";
import { useNavigate } from "react-router-dom";

function HomeResult() {
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    useData(async () => {
            const url = "http://localhost:3000/match";
            const response = await fetch(url);
            try {
                const fetchData = await response.json();
                setData(fetchData);
            } catch (error) {
                toast.error("Error: " + error);
            }
        }
    );
    return (
        <div className="h-fit w-full flex flex-col">
            <div className="bg-gradient-to-r from-sky-400 to-blue-600 h-[75px] flex justify-center items-center">
                <h1 className="p-3 font-bold text-[30px] text-white">Result</h1>
            </div>
            {
                data && 
                <div className="w-full h-fit flex flex-col">
                    <h2 className="font-bold text-[20px] my-2 p-2">Matchday {data.filters.matchday}</h2>
                    {data.matches.map((result, i) => {
                        const match = {
                            homeTeam: result.homeTeam.name,
                            homeLogo: result.homeTeam.crest,
                            awayTeam: result.awayTeam.name,
                            awayLogo: result.awayTeam.crest,
                            result: result.score.fullTime.home + " - " + result.score.fullTime.away,
                            stadium: "Old Trafford"
                        };
                        return (
                            <Match match={match} key={`resultMatch${i}`} />
                        )
                    })}
                </div>
            }
            <ButtonViewMore onClick={() => navigate('/result')}/>  
        </div>
    )
}

export default HomeResult;