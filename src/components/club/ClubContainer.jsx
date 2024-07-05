import { useRef, useState } from "react";
import Filter from "../hcom/Filter";
import FuncContainer from "../hcom/FuncContainer";
import useData from "../hook/useData";
import ClubListBox from "./ClubListBox";
import { toast } from "react-toastify";
import { useAppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";

function ClubContainer() {
    const [data, setData] = useState();
    const [filterData, setFilterData] = useState();
    const [clubs, setClubs] = useState();
    const { seasons } = useAppContext();
    const navigate = useNavigate();

    const fitlerRef = useRef();
    const seasonRef = useRef();

    useData(async () => {
        if(seasons === undefined)
            return;
        const url = `http://localhost:8088/api/v1/clubstat?seasonId=${seasons[seasons.length - 1].value}`;
        const response = await fetch(url);
        if (response.ok) {
            const fetchData = await response.json();
            const clubData = fetchData.map(e => e.club);
            setData(clubData);
            setFilterData(clubData);
            setClubs([{value: "all", label: "All Club"}].concat(clubData.map(club => {
                return {
                    value: club.id,
                    label: club.name
                }
            })))
        }
        else {
            toast.error("Error fetching club data");
        }
    },[seasons]);

    const onFilterSeason = async (selectedOption) => {
        const url = `http://localhost:8088/api/v1/clubstat?seasonId=${selectedOption.value}`;
        const response = await fetch(url);
        if (response.ok) {
            const fetchData = await response.json();
            const clubData = fetchData.map(e => e.club);
            fitlerRef.current.setValue(selectedOption.value, 'deselect-option');
            setData(clubData);
            setFilterData(clubData);
            setClubs([{value: "all", label: "All Club"}].concat(clubData.map(club => {
                return {
                    value: club.id,
                    label: club.name
                }
            })))
        }
        else {
            toast.error("Error fetching season data");
        }
    }

    const onFilterData = (selectedOption) => {
        if(selectedOption.value === "all")
            setFilterData(data);
        else
            setFilterData(data.filter(e => e.id === selectedOption.value));
    }

    const onClickClub = async (id) => {
        navigate(`/club/${id}`, {state: {seasonId: seasonRef.current.getValue()[0].value}});
    }

    return (
        <FuncContainer title={"Clubs"}>
            {filterData && <div className="h-full w-full flex gap-2 mt-5">
                <Filter options={seasons} title={"Season"} onChange={onFilterSeason} defaultValue={seasons[seasons.length-1]} ref={seasonRef}/>
                <Filter options={clubs} title={"Your Club"} onChange={onFilterData} ref={fitlerRef}/>
            </div>}
            <ClubListBox data={filterData} onClickClub={onClickClub} onClickIcon={onClickClub}/>
        </FuncContainer>
    )
}

export default ClubContainer;