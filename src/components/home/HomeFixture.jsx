import { MdOutlineStadium } from "react-icons/md";
import Match from "../match/Match";
import ButtonViewMore from "../hcom/ButtonViewMore";
const fixtures = [
    {
        date: "17/03/2024",
        matches: [
            {
                homeTeam: "Manchester United",
                homeLogo: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
                awayTeam: "Manchester United",
                awayLogo: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
                time: "21:00",
                stadium: "Old Trafford",
            },
            {
                homeTeam: "Manchester United",
                homeLogo: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
                awayTeam: "Manchester United",
                awayLogo: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
                time: "21:00",
                stadium: "Old Trafford",
            },
            {
                homeTeam: "Manchester United",
                homeLogo: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
                awayTeam: "Manchester United",
                awayLogo: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
                time: "21:00",
                stadium: "Old Trafford",
            }
        ],
    }
]

function HomeFixture() {
    return (
        <div className="w-full h-fit flex flex-col">
            <div className="bg-gradient-to-r from-sky-400 to-blue-600 h-[75px] flex justify-center items-center">
                <h1 className="p-3 font-bold text-[30px] text-white">Fixture</h1>
            </div>
            {fixtures.map((fixture, i) => {
                return (
                    <div className="w-full h-fit flex flex-col" key={`fixture${i}`}>
                        <h2 className="p-3 font-bold text-[20px]">{fixture.date}</h2>
                        {
                            fixture.matches.map((match, index) => {
                                return (
                                    <Match match={match} key={`fixtureMatch${index}`} />
                                )
                            })
                        }
                    </div>
                )
            })}
            <ButtonViewMore />
        </div>
    )
}

export default HomeFixture;