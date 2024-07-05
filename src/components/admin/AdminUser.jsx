import { useEffect, useMemo, useState } from "react";
import { useAppContext } from "../AppContext";
import Filter from "../hcom/Filter";
import FuncContainer from "../hcom/FuncContainer";
import useData from "../hook/useData";
import { toast } from "react-toastify";
import ListUser from "./ListUser";
import { roleOptions } from "../hcom/FilterOptions";
import AddButton from "../hcom/AddButton";
import Form from "../hcom/Form";
import { useNavigate } from "react-router-dom";

function AdminUser()
{
    const [data, setData] = useState();
    const [filterData, setFilterData] = useState();
    const {authToken, admin} = useAppContext();
    const [form, setForm] = useState(false);

    const navigate = useNavigate();

    useEffect(() => { 
        if(!admin)
        {
            navigate("/auth/login/admin")
            return;
        }
    }, [admin])

    const blankData = useMemo(() => ({
        username: {
            data: "",
            type: "text",
        },
        password: {
            data: "",
            type: "text",
        },
        retypePassword: {
            data: "",
            type: "text",
        },
        email: {
            data: "",
            type: "text",
        },
        roleID: {
            data: [
                {
                    label: "User",
                    value: 1,
                },
                {
                    label: "Admin",
                    value: 2,
                }
            ],
            type: "selection",
            value: {
                value: 1, 
                label: "User"
            },
        },
    }), [])

    const getData = async () => {
        if(!authToken) return;
        const url = "http://localhost:8088/api/v1/admin/user";
        const opitons = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + authToken
            }
        }
        const response = await fetch(url, opitons);
        const fetchData = await response.json();
        if(response.ok)
        {
            setData(fetchData);
            setFilterData(fetchData);
        }
        else
        {
            toast.error("Error " + response.error)
        }
    }
    useData(getData, [JSON.stringify(authToken)])

    const onFilterRole = (selectedOption) => {
        return selectedOption.value === "All" ? setFilterData(data) : setFilterData(data.filter(e => e.role.name === selectedOption.value));
    }

    const onAddButton = () => {
        setForm(true)
    }

    const onCancelButton = () => {
        setForm(false);
    }

    const onAddUser = async (data) => {
        const url = "http://localhost:8088/api/v1/admin/user";
        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + authToken
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options);
        if(response.ok)
        {
            setForm(false);
            getData();
            toast.success("User added");
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
        <FuncContainer title={"Users"}>
            <div className="h-fit w-full flex flex-col mt-10 gap-10">
                <div className="w-full h-fit flex gap-3">
                    <Filter options={roleOptions} title={"Role"} onChange={onFilterRole}/>
                    <AddButton className='w-[100px]  h-[40px]' onClick={onAddButton}/>
                </div>
                {data && <ListUser data={filterData} getUser={getData}/>}
                {form && <Form data={blankData} onCancel={onCancelButton} onSubmit={onAddUser} titleSubmit={"Add"}/>}
            </div>
        </FuncContainer>
    )
}

export default AdminUser;