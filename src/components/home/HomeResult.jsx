import Match from "../match/Match";
import ButtonViewMore from "../hcom/ButtonViewMore";

const results = [
    {
        date: "17/03/2024",
        matches: [
            {
                homeTeam: "Manchester United",
                homeLogo: "https://resources.premierleague.com/premierleague/badges/t1.png",
                awayTeam: "Manchester United",
                awayLogo: "https://resources.premierleague.com/premierleague/badges/t1.png",
                result: "0 : 0",
                stadium: "Old Trafford",
            },
            {
                homeTeam: "Manchester United",
                homeLogo: "https://resources.premierleague.com/premierleague/badges/t1.png",
                awayTeam: "Manchester United",
                awayLogo: "https://resources.premierleague.com/premierleague/badges/t1.png",
                result: "0 : 0",
                stadium: "Old Trafford",
            },
            {
                homeTeam: "Manchester United",
                homeLogo: "https://resources.premierleague.com/premierleague/badges/t1.png",
                awayTeam: "Manchester United",
                awayLogo: "https://resources.premierleague.com/premierleague/badges/t1.png",
                result: "0 : 0",
                stadium: "Old Trafford",
            },
        ],
    }
]

function HomeResult() {
    return (
        <div className="h-fit w-full flex flex-col">
            <div className="bg-gradient-to-r from-sky-400 to-blue-600 h-[75px] flex justify-center items-center">
                <h1 className="p-3 font-bold text-[30px] text-white">Result</h1>
            </div>
            {results.map((result, i) => {
                return (
                    <div className="w-full h-fit flex flex-col" key={`result${i}`}>
                        <h2 className="p-3 font-bold text-[20px]">{result.date}</h2>
                        {
                            result.matches.map((match, index) => {
                                return (
                                    <Match match={match} key={`resultMatch${index}`} />
                                )
                            })
                        }
                    </div>
                )
            })}
            <ButtonViewMore/>  
        </div>
    )
}

export default HomeResult;