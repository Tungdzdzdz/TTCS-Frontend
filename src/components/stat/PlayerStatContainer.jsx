import { useEffect, useRef, useState } from "react";
import Filter from "../hcom/Filter";
import PlayerList from "../player/PlayerList";
import useData from "../hook/useData";
import { useAppContext } from "../AppContext";
import { toast } from "react-toastify";
import { playerStatOptions } from "../hcom/FilterOptions";
import { BounceLoader } from "react-spinners";
import Loader from "../hcom/Loader";

const columnField = ["Player", "Position", "Club", "Nationality", "Stat"];

function PlayerStatContainer() {
    const [data, setData] = useState();
    const [filterData, setFilterData] = useState(); 
    const [loader, setLoader] = useState(true);
    const [optionsClubData, setOptionsClubData] = useState();
    const [stat, setStat] = useState('goal');
    const {seasons} = useAppContext();
    const [filterSeasonData, setSeasonData] = useState(undefined);

    const clubFilterRef = useRef();

    useEffect(() => {
        if(!seasons)
        {
            return;
        }
        setSeasonData(seasons[seasons.length-1].value);
    }, [seasons])

    useData(async () => {
        if(!filterSeasonData)
            return;
        const url = `http://localhost:8088/api/v1/playerstat?seasonId=${filterSeasonData}`;
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            const playerStatData = fetchData.sort((a, b) => b[stat] - a[stat]);
            setLoader(false);
            setData(playerStatData);
            setFilterData(playerStatData);
        } catch (error) {
            toast.error("Error: " + error);
        }
    }, [filterSeasonData]);

    useData(async () => {
        if(!filterSeasonData)
            return;
        console.log(filterSeasonData)
        const url = `http://localhost:8088/api/v1/clubstat?seasonId=${filterSeasonData}`;
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            setOptionsClubData([
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
    }, [filterSeasonData]);

    const onChangeStatFilter = (selectedOption) => {
        var filter = selectedOption.label.split(' ')
        filter[0] = filter[0].toLowerCase();
        filter = filter.join('');
        setStat(filter);
        setFilterData(filterData.sort((a, b) => b[filter] - a[filter]));
    }

    const onChangeSeasonFilter = async (selectedOption) => {
        if(selectedOption.value === filterSeasonData)
            return;
        setSeasonData(selectedOption.value);
        clubFilterRef.current.setValue("all", "select-option");
        setLoader(true);
        // const urlPlayerStat = `http://localhost:8088/api/v1/playerstat?seasonId=${selectedOption.value}`;
        // const responsePlayerStat = await fetch(urlPlayerStat);

        // try {
        //     const fetchData = await responsePlayerStat.json();
        //     const playerStatData = fetchData.sort((a, b) => b[stat] - a[stat]);
        //     setData(playerStatData);
        //     setFilterData(playerStatData);
        // } catch (error) {
        //     toast.error("Error: " + error);
        // }

        // const urlClub = `http://localhost:8088/api/v1/clubstat?seasonId=${selectedOption.value}`;
        // const responseClub = await fetch(urlClub);
        // try {
        //     const fetchData = await responseClub.json();
        //     setOptionsClubData([
        //         {
        //             value: "all",
        //             label: "All Club"
        //         }, ...fetchData.map(e => {
        //             return {
        //                 value: e.club.id,
        //                 label: e.club.name
        //             }
        //         })
        //     ]);
        // } catch (error) {
        //     toast.error("Error: " + error);
        // }      
        // setLoader(false);  
    }

    const onChangeClubFilter = (selectedOption) => {
        if(selectedOption.value === "all")
            setFilterData(data.sort((a, b) => b[stat] - a[stat]));
        else
            setFilterData(data.filter(e => e.club.id === selectedOption.value).sort((a, b) => b[stat] - a[stat]));
    }

    return (
        <div className="h-full w-full flex justify-center">
            <div className="h-full w-3/4 bg-white flex flex-col">
                {filterData && <div className="h-full w-full flex gap-2 mt-5">
                    <Filter options={playerStatOptions} title={"Stat"} onChange={onChangeStatFilter}/>
                    <Filter options={seasons} title={"Season"} onChange={onChangeSeasonFilter} defaultValue={seasons[seasons.length-1]}/>
                    <Filter options={optionsClubData}title={"Club"} onChange={onChangeClubFilter} ref={clubFilterRef}/>
                </div>}
                <PlayerList columnField={columnField} dataPlayer={filterData} stat={stat}/>
            </div>
            {loader && <Loader/>}
        </div>
    )
}

export default PlayerStatContainer;