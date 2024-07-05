import { useEffect, useMemo, useState } from "react";
import useData from "../hook/useData";
import Filter from "../hcom/Filter";
import ClubList from "../club/ClubList";
import { useAppContext } from "../AppContext";
import { toast } from "react-toastify";
import { clubStatOptions } from "../hcom/FilterOptions";

const columnField = ["Rank", "Club", "Stat"];

function ClubStatContainer() {
    const [data, setData] = useState();
    const [filterData, setFilterData] = useState();
    const { seasons} = useAppContext();
    const [season, setSeason] = useState();
    const [stat, setStat] = useState('goalTaken');

    useEffect(() => {
        if(!seasons)
            return;
        setSeason(seasons[seasons.length-1].value)
    }, [seasons])

    useData(async () => {
        if(!season)
            return;
        const url = `http://localhost:8088/api/v1/clubstat?seasonId=${season}`;
        const response = await fetch(url);
        if (response.ok) {
            const fetchData = await response.json();
            setData(fetchData);
            setFilterData(fetchData.sort((a, b) => b[stat] - a[stat]).map((e, i) => {
                return {
                    name: e.club.name,
                    logo: e.club.logo,
                    stat: e['goalTaken'],
                    position: i + 1
                }
            }));
        }
        else {
            toast.error("Error fetching club data");
        }

    }, [season]);

    const onFilterData = (selectedOption) => {
        let typeOfData = selectedOption.label.split(' ');
        typeOfData[0] = typeOfData[0].toLowerCase();
        typeOfData = typeOfData.join('');
        var sortData = data.sort((a, b) => b[typeOfData] - a[typeOfData]);
        sortData = sortData.map((e, i) => {
            return {
                position: i + 1,
                name: e.club.name,
                logo: e.club.logo,
                stat: e[typeOfData]
            }
        });
        setStat(typeOfData);
        setFilterData(sortData);
    }

    const onFilterSeason = async (selectedOption) => {
        // const url = `http://localhost:8088/api/v1/clubstat?seasonId=${selectedOption.value}`;
        // const response = await fetch(url);
        // if (response.ok) {
        //     const fetchData = await response.json();
        //     setData(fetchData);
        //     setFilterData(fetchData.sort((a, b) => b[stat] - a[stat]).map((e, i) => {
        //         return {
        //             name: e.club.name,
        //             logo: e.club.logo,
        //             stat: e[stat],
        //             position: i + 1
        //         }
        //     }));
        // }
        // else {
        //     toast.error("Error fetching club data");
        // }
        setSeason(selectedOption.value)
    }
    return (
        <div className="h-full w-full flex justify-center">
            <div className="h-full w-3/4 bg-white flex flex-col">
                <div className="h-full w-full flex gap-2 mt-5">
                    <Filter options={clubStatOptions} title={"Stat"} onChange={onFilterData} />
                    { seasons && <Filter options={seasons} title={"Season"} onChange={onFilterSeason} defaultValue={seasons[seasons.length - 1]}/>}
                </div>
                {filterData && <ClubList columnField={columnField} dataClub={filterData} />}
            </div>
        </div>
    )
}

export default ClubStatContainer;