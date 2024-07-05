import { useState } from "react";
import DeleteButton from "../hcom/DeleteButton";
import EditButton from "../hcom/EditButton";
import Form from "../hcom/Form";
import { toast } from "react-toastify";
import { useAppContext } from "../AppContext";
import { countryOptions } from "../hcom/FilterOptions";

function ListCoach({data, getCoach})
{
    const [form, setForm] = useState(false);
    const [editData, setEditData] = useState(); 
    const {authToken} = useAppContext();
    const onClickEdit = (index) => {
        setEditData(() => ({
                id: {
                    data: data[index].id,
                    type: "text"
                },
                name: {
                    data: data[index].name,
                    type: "text",
                },
                dateOfBirth: {
                    data: data[index].dateOfBirth,
                    type: "date",
                },
                country: {
                    data: countryOptions,
                    type: "selection",
                    value: {
                        value: data[index].country.id,
                        label: data[index].country.name,
                    },
                },
                img: {
                    data: data[index].img,
                    type: "text",
                },
            }))
        setForm(true);
    }
    const onCancelButton = () => {
        setForm(false);
    }

    const onEditCoach = async (data) => {
        const url = "http://localhost:8088/api/v1/admin/coach";
        const options = {
            method: "PUT",
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
            getCoach();
            toast.success("Edit user successfully");
        }
        else
        {
            const errors = await response.json();
            errors.forEach((e, i) => {
                toast.error(`Error: ${e.message}`, {toastId: i});
            });
        }
    }

    const onClickDelete = async (index) => {
        const url = `http://localhost:8088/api/v1/admin/coach/${data[index].id}`;
        const options = {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + authToken
            }
        }
        const response = await fetch(url, options);
        if(response.ok)
        {
            getCoach();
            toast.success("Delete user successfully");
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
        <div className="flex flex-col w-full h-fit gap-3 px-5">
            <div className="grid grid-cols-9 w-full h-fit gap-4">
                <label className="col-span-3 item">Name</label>
                <label className="col-span-3">Nationality</label>
                <label className="">DOB</label>
                <label className="text-center">Edit</label>
                <label className="text-center">Delete</label>
            </div>
            {
                data.map((coach, index) => {
                    return (
                        <div className="grid grid-cols-9 w-full h-[40px] gap-4 items-center border-b-2 border-solid border-gray-200" key={`user${index}`}>
                            <div className="col-span-3 flex items-center h-full">
                                <img src={coach.img} alt={coach.name} className="w-[30px] h-[30px] rounded-full"/>
                                <label className="ml-2">{coach.name}</label>
                            </div>
                            <label className="col-span-3 flex items-center h-full">{coach.country.name}</label>
                            <label className="flex items-center h-full">{coach.dateOfBirth}</label>
                            <EditButton onClick={onClickEdit} index={index} className="h-full w-full"/>
                            <DeleteButton onClick={onClickDelete} index={index}/>
                        </div>
                    )
                })
            }
            {form && <Form data={editData} onCancel={onCancelButton} onSubmit={(onEditCoach)} titleSubmit={"Edit"} titleForm={"Edit Coach"}/>}
        </div>
    )
}

export default ListCoach;