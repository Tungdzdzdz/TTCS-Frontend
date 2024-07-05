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
import ListCoach from "./ListCoach";
import { useNavigate } from "react-router-dom";

function AdminCoach()
{
    const [coachData, setCoachData] = useState();
    const [filterData, setFilterData] = useState();
    const [options, setOptions] = useState();
    const [form, setForm] = useState(false);
    const {authToken, admin} = useAppContext();

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
        img: {
            data: "",
            type: "text",
        }
    }),[]);

    const getData = async () => {
        const url = "http://localhost:8088/api/v1/coach";
        const response = await fetch(url);
        if(response.ok)
        {
            const fetchData = await response.json();
            setCoachData(fetchData);
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
            setFilterData(coachData);
        }
        else
        {
            const filter = coachData.filter(e => e.id === selectedOption.value);
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

    const onAddCoach = async (data) => {
        const url = "http://localhost:8088/api/v1/admin/coach";
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

    const navigate = useNavigate();

    useEffect(() => {
        if(!admin)
        {
            navigate("/notfound")
            return;
        }
    }, [admin])

    return (
        <FuncContainer title={"Coaches"}>
            <div className="h-fit w-full flex flex-col mt-10 gap-10">
                <div className="w-full h-fit flex gap-3">
                    {options && <Filter options={options} title={"Player"} onChange={onFilterData} defaultValue={options[0]}/>}
                    <AddButton className='w-[100px]  h-[40px]' onClick={onAddClick}/>
                </div>
                {coachData && <ListCoach data={filterData} getCoach={getData}/>}
            </div>
            {form && <Form data={blankData} titleSubmit={"Add"} onCancel={onCancelButton} onSubmit={onAddCoach} titleForm={"Add Coach"}/>}
        </FuncContainer>
    );
}

export default AdminCoach;