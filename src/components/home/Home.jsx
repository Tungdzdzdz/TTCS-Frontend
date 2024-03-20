import BoxContainer from "./BoxContainer";
import HomeFixture from "./HomeFixture";
import HomeRanking from "./HomeRanking";
import HomeResult from "./HomeResult";

const inforPlayer = {
    detail: {
        appearance: 12,
        score: 1,
        assist: 1,
        cleanSheet: 2,
    },
    name: "Marcus Rashford",
    img: "https://resources.premierleague.com/premierleague/photos/players/250x250/p176297.png",
    logo: "https://resources.premierleague.com/premierleague/badges/t1.png",
}

const inforManager = {
    detail: {
        matches: 12,
        wins: 1,
        draws: 1,
        loses: 2,
    },
    name: "Erik Ten Hag",
    img: "https://resources.premierleague.com/premierleague/photos/players/250x250/Photo-Missing.png",
    logo: "https://resources.premierleague.com/premierleague/badges/t1.png",
}

function Home() {
    return (
        <div className="h-fit grow w-full flex justify-center absolute">
            <div className="flex w-fit h-full p-5 mt-10">
                <HomeRanking/>
                <div className="flex flex-col h-fit w-fit bg-white ml-4 flex-wrap gap-2">
                    <div className="h-fit w-full bg-white mb-4 border-solid border-[1px] border-[#ebe5eb] rounded-xl overflow-hidden shadow-xl">
                        <HomeFixture/>
                    </div>
                    <div className="h-fit w-full bg-white mb-4 border-solid border-[1px] border-[#ebe5eb] rounded-xl overflow-hidden shadow-xl">
                        <HomeResult/>
                    </div>
                    <div className="h-fit w-full bg-white mb-4 flex justify-around overflow-hidden gap-3">
                        <BoxContainer infor={inforPlayer} title={"Feature Player"}/>
                        <BoxContainer infor={inforManager} title={"Feature Manager"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;