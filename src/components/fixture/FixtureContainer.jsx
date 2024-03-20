import Match from "../match/Match";
import Filter from "../hcom/Filter";
import FuncContainer from "../hcom/FuncContainer";

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

function FixtureContainer()
{
    return (
        <FuncContainer title={"Fixtures"}>
            <div className="h-full w-full flex gap-2 mt-5">
                <Filter options={options1} title={"All club"}/>
                <Filter options={options1} title={"All club"}/>
                <Filter options={options1} title={"All club"}/>
            </div>
            {fixtures.map((fixture, i) => {
                return (
                    <div className="w-full h-fit flex flex-col" key={`fixture${i}`}>
                        <h2 className="p-3 font-bold text-[20px]">{fixture.date}</h2>
                        {
                            fixture.matches.map((match, index) => {
                                return (
                                    <Match match={match} key={`fixtureMatch${index}`}/>
                                )
                            })
                        }
                    </div>
                )
            })}
        </FuncContainer>
    )
}

export default FixtureContainer;