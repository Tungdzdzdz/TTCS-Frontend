import { useContext, useEffect, useRef, useState } from "react";
import useData, { getOptionsClub } from "../hook/useData";
import { FaCirclePlus } from "react-icons/fa6";
import ClubListBox from "../club/ClubListBox";
import { toast } from "react-toastify";
import { useAppContext } from "../AppContext";
import Filter from "../hcom/Filter";
import ReactSelect from "react-select";

const columnField = [
    "Rank", "Point","Match Number", "Win", "Draw", "Lose", "Goal Taken", "Goal Received", "Red Card", "Yellow Card", "Clean Sheet", "Shot", "Saves", "Foul", "Offside"
]

function HeadToHeadContainer() {
    const [club1, setClub1] = useState();
    const [club2, setClub2] = useState();
    const [data, setData] = useState();
    const [clubData, setClubData] = useState();
    const { seasons } = useAppContext();
    const [season, setSeason] = useState();
    const [optionsClub, setOptionsClub] = useState();

    const clubFilterRef = useRef();

    useEffect(() => {
        if(!seasons)
            return;
        setSeason(seasons[seasons.length-1].value);
    }, [seasons])

    useData(async () => {
        if(!season)
            return;
        const url = `http://localhost:8088/api/v1/clubstat?seasonId=${season}`;
        const response = await fetch(url);
        if(response.ok)
        {
            const fetchData = await response.json();
            setData(fetchData);
            setClubData(fetchData.map(e => e.club));
        }
        else
        {
            toast.error("Error fetching club data");
        }
    }, [season]);

    const onChangeSeasonFilter = async (selectedOption) => {
        if(season === selectedOption.value)
            return;
        clubFilterRef.current.setValue("all", 'select-option');
        // const url = `http://localhost:8088/api/v1/clubstat?seasonId=${selectedOption.value}`;
        // const response = await fetch(url);
        // if(response.ok)
        // {
        //     const fetchData = await response.json();
        //     setSeason(selectedOption.value);
        //     setData(fetchData);
        //     setClubData(fetchData.map(e => e.club));
        // }
        // else
        // {
        //     toast.error("Error fetching club data");
        // }
        setSeason(selectedOption.value)
    }

    const onChangeClubFilter = (selectedOption) => {
        if(selectedOption.value === "all")
            setClubData(data.map(e => e.club));
        else
            setClubData(data.filter(e => e.club.id === selectedOption.value).map(e => e.club));
    }

    const onClickClub = (id) => {
        const club = data.find(e => e.club.id === id);
        if(club1 === undefined && club2 !== club)
            setClub1(club);
        else if(club2 === undefined && club1 !== club)
            setClub2(club);
        else if(club1 === club)
            setClub1(undefined);
        else if(club2 === club)
            setClub2(undefined);
    }

    useData(async () => {
        if(!season)
            return;
        const url = `http://localhost:8088/api/v1/clubstat?seasonId=${season}`;
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            setOptionsClub([
                {
                    value: "all",
                    label: "All Club"
                }, ...fetchData.map(e => {
                    return {
                        value: e.club.id,
                        label: e.club.name
                    }
                })
            ]);
        } catch (error) {
            toast.error("Error: " + error);
        }        
    }, [season]);

    return (
        <div className="h-[300px] w-full p-5 flex flex-col mt-10 bg-white gap-5">
            <div className="flex w-full h-fit items-center justify-center">
                <h1>Head-to-Head</h1>
            </div>
            {clubData && <div className="flex gap-2 justify-center">
                    <Filter options={seasons} title={"Season"} onChange={onChangeSeasonFilter} defaultValue={seasons[seasons.length-1]}/>
                    <ReactSelect className="min-w-60" options={optionsClub} placeholder="Choose your club" title={"Club"} onChange={onChangeClubFilter} ref={clubFilterRef}/>
            </div>}
            <div className="flex w-full h-fit justify-around p-5">
                <div className="flex gap-5 flex-1 flex-col">
                    <div className="flex gap-10 flex-wrap justify-center">
                        <div
                            className={`h-[200px] flex items-center justify-center w-[250px] bg-white rounded-xl border-solid border-[1px] border-[#ebe5eb] shadow-xl hover:cursor-pointer ${club1 !== undefined ? "bg-gradient-to-r from-sky-400 to-blue-500" : ""}`}
                            onClick={() => {
                                if (club1 !== undefined)
                                    setClub1(undefined);
                            }}>
                            {club1 === undefined && <FaCirclePlus className="text-[50px] text-[#37003c]" />}
                            {club1 !== undefined && <img src={club1.club.logo} className="h-2/3 p-4" />}
                            {club1 !== undefined && <h4 className="text-white p-2 text-[20px]">{club1.club.name}</h4>}
                        </div>
                        <div
                            className={`h-[200px] flex items-center justify-center w-[250px] bg-white rounded-xl border-solid border-[1px] border-[#ebe5eb] shadow-xl hover:cursor-pointer ${club2 !== undefined ? "bg-gradient-to-r from-sky-400 to-blue-500" : ""}`}
                            onClick={() => {
                                if (club2 !== undefined)
                                    setClub2(undefined);
                            }}
                        >
                            {club2 === undefined && <FaCirclePlus className="text-[50px] text-[#37003c]" />}
                            {club2 !== undefined && <img src={club2.club.logo} className="h-2/3 p-4 bg" />}
                            {club2 !== undefined && <h4 className="text-white p-2 text-[20px]">{club2.club.name}</h4>}
                        </div>
                    </div>
                    {club1 !== undefined && club2 !== undefined && 
                    <div className="h-fit w-full p-3 flex flex-col">
                        {
                            columnField.map((e, i) => {
                                const key = e.split(" ");
                                key[0] = key[0].toLowerCase();
                                const keyName = key.join("");
                                return (
                                    <div key={`column${i}`} className=" w-3/4 flex justify-between p-2 self-center border-b-2">
                                        <h4>{club1[keyName]}</h4>
                                        <h4>{e}</h4>
                                        <h4>{club2[keyName]}</h4>
                                    </div>
                                )
                            })
                        }
                    </div>}
                </div>
                
                {data && <div className="w-2/3 h-fit">
                    <ClubListBox data={clubData} icon={<FaCirclePlus className="text-[#37003c]" />} onClickClub={onClickClub} />
                </div>}
            </div>
        </div>
    );
}

export default HeadToHeadContainer;