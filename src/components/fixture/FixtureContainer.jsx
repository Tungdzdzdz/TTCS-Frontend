import Match from "../match/Match";
import Filter from "../hcom/Filter";
import FuncContainer from "../hcom/FuncContainer";
import useData from "../hook/useData";
import { useState } from "react";

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

function FixtureContainer() {
    const [data, setData] = useState(null);
    useData(async () => {
        const url = "http://localhost:3000/fixture";
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            setData(fetchData);
        } catch (error) {
            console.log("Error: " + error);
        }
    });
    return (
        <FuncContainer title={"Fixtures"}>
            <div className="h-full w-full flex gap-2 mt-5">
                <Filter options={options1} title={"All club"} />
                <Filter options={options1} title={"All club"} />
                <Filter options={options1} title={"All club"} />
            </div>
            {data &&
                <div className="w-full h-fit flex flex-col">
                    <h2 className="font-bold text-[20px] my-5">Matchweek {data.filters.matchday}</h2>
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
        </FuncContainer>
    )
}

export default FixtureContainer;