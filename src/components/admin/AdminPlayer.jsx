import { toast } from "react-toastify";
import AddButton from "../hcom/AddButton";
import Filter from "../hcom/Filter";
import Form from "../hcom/Form";
import FuncContainer from "../hcom/FuncContainer";
import useData from "../hook/useData";
import { useEffect, useMemo, useState } from "react";
import ListPlayer from "./ListPlayer";
import { countryOptions } from "../hcom/FilterOptions";
import { useAppContext } from "../AppContext";
import Loader from "../hcom/Loader";
import { useNavigate } from "react-router-dom";

function AdminPlayer()
{
    const [playerData, setPlayerData] = useState();
    const [filterData, setFilterData] = useState();
    const [options, setOptions] = useState();
    const [form, setForm] = useState(false);
    const {authToken, admin} = useAppContext();

    const navigate = useNavigate();

    useEffect(() => {
         
        if(!admin)
        {
            navigate("/*")
            return;
        }
    }, [admin])

    const blankData = useMemo(() => ({
        name: {
            data: "",
            type: "text",
        },
        country: {
            data: countryOptions,
            type: "selection",
            value: {
                value: 1,
                label: countryOptions[0].label,
            }
        },
        dateOfBirth: {
            data: "",
            type: "date",
        },
        height: {
            data: "",
            type: "text",
        },
        weight: {
            data: "",
            type: "text",
        },
        img: {
            data: "",
            type: "text",
        }
    }),[]);

    const getData = async () => {
        const url = "http://localhost:8088/api/v1/player";
        const response = await fetch(url);
        if(response.ok)
        {
            const fetchData = await response.json();
            setPlayerData(fetchData);
            setFilterData(fetchData);
            setOptions([
                {value: 0, label: "All"},
                ...fetchData.map(e => {
                return {
                    value: e.id,
                    label: e.name
                }
            })]);
        }
        else{
            toast.error("Error fetching player data");
        }
    }

    const onFilterData = (selectedOption) => {
        if(selectedOption.value === 0)
        {
            setFilterData(playerData);
        }
        else
        {
            const filter = playerData.filter(e => e.id === selectedOption.value);
            setFilterData(filter);
        }
    }

    useData(getData,[]);

    const onAddClick = () => {
        setForm(true);
    }

    const onCancelButton = () => {
        setForm(false);
    }

    const onAddPlayer = async (data) => {
        const url = "http://localhost:8088/api/v1/admin/player";
        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + authToken
            },
            body: JSON.stringify(data),
        }
        const response = await fetch(url, options);
        if(response.ok)
        {
            setForm(false);
            getData();
            toast.success("Add player successfully");
        }
        else
        {
            const errors = await response.json();
            errors.forEach((e, i) => {
                toast.error(`Error: ${e.message}`, {toastId: i});
            });
        }
    }

    return (
        <FuncContainer title={"Players"}>
            <div className="h-fit w-full flex flex-col mt-10 gap-10">
                <div className="w-full h-fit flex gap-3">
                    {options && <Filter options={options} title={"Player"} onChange={onFilterData} defaultValue={options[0]}/>}
                    <AddButton className='w-[100px]  h-[40px]' onClick={onAddClick}/>
                </div>
                {playerData && <ListPlayer data={filterData} getPlayer={getData}/>}
            </div>
            {form && <Form data={blankData} titleSubmit={"Add"} onCancel={onCancelButton} onSubmit={onAddPlayer} titleForm={"Add Player"}/>}
            {!filterData && <Loader/>}
        </FuncContainer>
    );
}

export default AdminPlayer;