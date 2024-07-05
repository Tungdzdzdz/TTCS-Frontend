import { useState } from "react";
import { useAppContext } from "../AppContext";
import BoxContainer from "./BoxContainer";
import HomeFixture from "./HomeFixture";
import HomeRanking from "./HomeRanking";
import HomeResult from "./HomeResult";
import useData from "../hook/useData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Home() {
    const {seasons} = useAppContext();
    const [inforPlayer, setInforPlayer] = useState();
    const [inforManager, setInforManager] = useState();

    const navigate = useNavigate();

    useData(async () => {
        if(seasons === undefined) return;
        const url = `http://localhost:8088/api/v1/playerstat/random?seasonId=${seasons[seasons.length - 1].value}`;
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            setInforPlayer({
                detail: {
                    appearance: fetchData.appearance,
                    goal: fetchData.goal,
                    assist: fetchData.assist,
                },
                name: fetchData.player.name,    
                img: fetchData.player.img,
                logo: fetchData.club.logo,
                id: fetchData.player.id,
            });
        } catch (error) {
            toast.error("Error: " + error);
        }
    },  [JSON.stringify(seasons)]);

    useData(async () => {
        if(seasons === undefined) return;
        const url = `http://localhost:8088/api/v1/coach/random?seasonId=${seasons[seasons.length - 1].value}`;
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            setInforManager({
                detail: {
                    country : fetchData.coach.country.name,
                    age: new Date().getFullYear() - new Date(fetchData.coach.dateOfBirth).getFullYear(),
                    gender: fetchData.gender ? "Female" : "Male"
                },
                name: fetchData.coach.name,    
                img: fetchData.coach.img,
                logo: fetchData.club.logo,
                id: fetchData.coach.id,
            });
        } catch (error) {
            toast.error("Error: " + error);
        }
    },  [JSON.stringify(seasons)]);

    const onNavigatePlayerDetail = (id) => {
        navigate(`/player/${id}`, {state: {
            seasonId: seasons[seasons.length - 1].value
        }});
    }

    const onNavigateCoachDetail = (id) => {
        navigate(`/coach/${id}`, {state: {
            seasonId: seasons[seasons.length - 1].value
        }});
    }

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
                        {inforPlayer && <BoxContainer infor={inforPlayer} title={"Feature Player"} onNavigate={onNavigatePlayerDetail}/>}
                        {inforManager && <BoxContainer infor={inforManager} title={"Feature Manager"} onNavigate={onNavigateCoachDetail}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;