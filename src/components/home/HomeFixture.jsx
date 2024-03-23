import Match from "../match/Match";
import ButtonViewMore from "../hcom/ButtonViewMore";
import useData from "../hook/useData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomeFixture() {
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    useData(async () => {
        const url = "http://localhost:3000/fixture";
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            setData(fetchData);
        } catch (error) {
            toast.error("Error: " + error);
        }
    })
    return (
        <div className="w-full h-fit flex flex-col">
            <div className="bg-gradient-to-r from-sky-400 to-blue-600 h-[75px] flex justify-center items-center">
                <h1 className="p-3 font-bold text-[30px] text-white">Fixture</h1>
            </div>
            {
                data &&
                <div className="w-full h-fit flex flex-col">
                    <h2 className="font-bold text-[20px] my-2 p-2">Matchweek {data.filters.matchday}</h2>
                    {data.matches.map((fixture, i) => {
                        const time = new Date(fixture.utcDate);
                        const hours = time.getUTCHours().toString().padStart(2, "0");
                        const minutes = time.getUTCMinutes().toString().padStart(2, "0");
                        const timeString = `${hours}:${minutes}`;
                        const match = {
                            homeTeam: fixture.homeTeam.name,
                            homeLogo: fixture.homeTeam.crest,
                            awayTeam: fixture.awayTeam.name,
                            awayLogo: fixture.awayTeam.crest,
                            time: timeString,
                            stadium: "Old Trafford"
                        }
                        return (<Match match={match} key={`fixtureMatch${i}`} />)
                    })}
                </div>
            }
            <ButtonViewMore onClick={() => navigate('/fixture')}/>
        </div>
    )
}

export default HomeFixture;