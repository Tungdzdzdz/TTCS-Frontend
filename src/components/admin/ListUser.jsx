import { useState } from "react";
import DeleteButton from "../hcom/DeleteButton";
import EditButton from "../hcom/EditButton";
import Form from "../hcom/Form";
import { toast } from "react-toastify";
import { useAppContext } from "../AppContext";

function ListUser({data, getUser})
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
                username: {
                    data: data[index].username,
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
                    data: data[index].email,
                    type: "text",
                },
                roleId: {
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
                        value: data[index].role.id,
                        label: data[index].role.name[0] + data[index].role.name.slice(1).toLowerCase(),
                    }
                },
            }))
        setForm(true);
    }
    const onCancelButton = () => {
        setForm(false);
    }

    const onEditUser = async (data) => {
        const url = "http://localhost:8088/api/v1/admin/user";
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
            getUser();
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
        const url = `http://localhost:8088/api/v1/admin/user/${data[index].id}`;
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
            getUser();
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
                <label className="col-span-3 item">Username</label>
                <label className="col-span-3">Email</label>
                <label className="">Role</label>
                <label className="text-center">Edit</label>
                <label className="text-center">Delete</label>
            </div>
            {
                data.map((user, index) => {
                    return (
                        <div className="grid grid-cols-9 w-full h-[40px] gap-4 items-center border-b-2 border-solid border-gray-200" key={`user${index}`}>
                            <label className="col-span-3 flex items-center h-full">{user.username}</label>
                            <label className="col-span-3 flex items-center h-full">{user.email}</label>
                            <label className="flex items-center h-full">{user.role.name}</label>
                            <EditButton onClick={onClickEdit} index={index} className="h-full w-full"/>
                            <DeleteButton onClick={onClickDelete} index={index}/>
                        </div>
                    )
                })
            }
            {form && <Form data={editData} onCancel={onCancelButton} onSubmit={onEditUser} titleSubmit={"Edit"}/>}
        </div>
    )
}

export default ListUser;