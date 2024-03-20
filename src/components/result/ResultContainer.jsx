import Match from "../match/Match";
import Filter from "../hcom/Filter";
import FuncContainer from "../hcom/FuncContainer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const results = [
    {
        date: "17/03/2024",
        matches: [
            {
                homeTeam: "Manchester United",
                homeLogo: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
                awayTeam: "Manchester United",
                awayLogo: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
                result: "0 : 0",
                stadium: "Old Trafford",
            },
            {
                homeTeam: "Manchester United",
                homeLogo: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
                awayTeam: "Manchester United",
                awayLogo: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
                result: "0 : 0",
                stadium: "Old Trafford",
            },
            {
                homeTeam: "Manchester United",
                homeLogo: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
                awayTeam: "Manchester United",
                awayLogo: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
                result: "0 : 0",
                stadium: "Old Trafford",
            },
        ],
    },
    {
        date: "16/03/2024",
        matches: [
            {
                homeTeam: "Manchester United",
                homeLogo: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
                awayTeam: "Manchester United",
                awayLogo: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
                result: "0 : 0",
                stadium: "Old Trafford",
            },
            {
                homeTeam: "Manchester United",
                homeLogo: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
                awayTeam: "Manchester United",
                awayLogo: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
                result: "0 : 0",
                stadium: "Old Trafford",
            },
            {
                homeTeam: "Manchester United",
                homeLogo: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
                awayTeam: "Manchester United",
                awayLogo: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
                result: "0 : 0",
                stadium: "Old Trafford",
            },
        ],
    },
    {
        date: "15/03/2024",
        matches: [
            {
                homeTeam: "Manchester United",
                homeLogo: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
                awayTeam: "Manchester United",
                awayLogo: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
                result: "0 : 0",
                stadium: "Old Trafford",
            },
            {
                homeTeam: "Manchester United",
                homeLogo: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
                awayTeam: "Manchester United",
                awayLogo: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
                result: "0 : 0",
                stadium: "Old Trafford",
            },
            {
                homeTeam: "Manchester United",
                homeLogo: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
                awayTeam: "Manchester United",
                awayLogo: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
                result: "0 : 0",
                stadium: "Old Trafford",
            },
        ],
    }
]

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

function ResultContainer() {
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchApi = async () => {
            const url = "http://localhost:3000/match";
            const response = await fetch(url);
            try {
                const fetchData = await response.json();
                console.log(fetchData.filters);
                setData(fetchData);
            } catch (error) {
                toast.error("Error: " + error);
            }
        }

        fetchApi();
    }, [data]);
    return (
        <FuncContainer title={"Results"}>
            <div className="h-full w-full flex gap-2 mt-5">
                <Filter options={options1} title={"Search your club ..."} />
                <Filter options={options1} title={"Search your club ..."} />
                <Filter options={options1} title={"Search your club ..."} />
            </div>
            {
                data && 
                <div className="w-full h-fit flex flex-col">
                    <h2 className="font-bold text-[20px] my-5">Matchday {data.filters.matchday}</h2>
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
        </FuncContainer>
    )
}

export default ResultContainer;