import AddButton from "../hcom/AddButton";
import Filter from "../hcom/Filter";
import FuncContainer from "../hcom/FuncContainer";
import { useAppContext } from "../AppContext";
import { useEffect, useMemo, useState } from "react";
import ListSeason from "./ListSeason";
import useData from "../hook/useData";
import { useNavigate } from "react-router-dom";
import Loader from "../hcom/Loader";

function AdminSeason() {
    const { seasons, admin} = useAppContext();

    useEffect(() => {
        if(!admin )
        {
            navigate("/*")
            return;
        }
    }, [admin])
    const optionSeasons = useMemo(() => {
        if (seasons != undefined) {
            return [
                {
                    value: 0,
                    label: "All Seasons"
                },
                ...seasons];
        }
        return [{
            value: 0,
            label: "All Seasons"
        }]
    }, [seasons]);

    const [data, setData] = useState();
    const [filterData, setFilterData] = useState();
    const navigate = useNavigate();

    const getData = async () => {
        const url = "http://localhost:8088/api/v1/season";
        const response = await fetch(url);
        if (response.ok) {
            const fetchData = await response.json();
            setFilterData(fetchData);
            setData(fetchData);
        }
        else {
            toast.error("Error fetching season data");
        }
    };

    useData(getData, []);

    const onChangeSeason = (selectedOption) => {
        if (selectedOption.value === 0) {
            setFilterData(data);
        }
        else {
            const filter = data.filter(season => season.id === selectedOption.value);
            setFilterData(filter);
        }
    }

    const onAddClick = () => navigate("/admin/season/add", {
        state: {
            name: "",
            startSeason: "",
            endSeason: "",
            sponsor: "",
            quanity: 0,
            clubs: [],
        }
    });

    return (
        <FuncContainer title={"Seasons"}>
            <div className="h-fit w-full flex flex-col mt-10 gap-10">
                <div className="w-full h-fit flex gap-3">
                    {
                        optionSeasons &&
                        <Filter
                            options={optionSeasons}
                            onChange={onChangeSeason}
                        />
                    }
                    <AddButton className='w-[100px]  h-[40px]' onClick={onAddClick} />
                </div>
                {filterData && <ListSeason seasons={filterData} getData={getData} />}
            </div>
            {!filterData && <Loader />}
        </FuncContainer>
    )
}

export default AdminSeason;