import { useEffect, useMemo, useState } from "react";
import Filter from "../hcom/Filter";
import FuncContainer from "../hcom/FuncContainer";
import useData from "../hook/useData"
import { toast } from "react-toastify";
import ClubListBox from "../club/ClubListBox";
import Loader from "../hcom/Loader";
import AddButton from "../hcom/AddButton";
import Form from "../hcom/Form";
import { locationOptions } from "../hcom/FilterOptions";
import { useAppContext } from "../AppContext";
import { MdDelete } from "react-icons/md";
import Alert from "../hcom/Alert";
import { useNavigate } from "react-router-dom";

function AdminClub()
{
    const [filterClub, setFilterClub] = useState();
    const [data, setData] = useState();
    const [optionsClub, setOptionClub] = useState();
    const [formAdd, setFormAdd] = useState(false);
    const [formEdit, setFormEdit] = useState(false);
    const [editData, setEditData] = useState(); 
    const [alert, setAlert] = useState(false);  

    const {authToken, admin} = useAppContext();

    const blankData = useMemo(() => {
        return {
            name: {
                data: "",
                type: "text"
            },
            shortName: {
                data: "",
                type: "text"
            }, 
            founded: {
                data: "",
                type: "text"
            },
            stadiumName: {
                data: "",
                type: "text"
            },
            location: {
                data: locationOptions,
                type: "selection",
                value: {
                    value: 1,
                    label: locationOptions[0].label,
                }
            },
            logo: {
                data: "",
                type: "text"
            }
        }
    }, [])

    const getData = async () => {
        const url = "http://localhost:8088/api/v1/club"
        const response = await fetch(url);
        if(response.ok)
        {
            const clubs = await response.json();
            setData(clubs)
            setFilterClub(clubs)
            setOptionClub([
                {
                    value: 0,
                    label: 'All'
                },
                ...clubs.map(club => {
                    return {
                        value: club.id,
                        label: club.name
                    }
                })
            ])
        }
        else
        {
            const error = await response.json();
            toast.error("Error: " + error.message)
        }
    }

    useData(async() => {
        getData()
    }, [])
    
    const onChangeClubFilter = (optionSelected) => {
        if(optionSelected.value === 0)
        {
            setFilterClub(data)
        }
        else
        {
            setFilterClub(data.filter(club => club.id === optionSelected.value))
        }
    }

    const onAddClick = () => {
        setFormAdd(true)
    }

    const onAddClub = async (requestData) => {
        const url = "http://localhost:8088/api/v1/admin/club"
        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + authToken
            },
            body: JSON.stringify(requestData)
        }
        const response = await fetch(url, options);
        if(response.ok)
        {
            toast.success("Add club successfully!");
            getData();
        }
        else
        {
            toast.error("Error")
        }
        setFormAdd(false);
    }

    const onClickEdit = (id) => {
        const club = data.find(club => club.id === id);
        setEditData(
            {
                id: {
                    data: id,
                    type: "text"
                },
                name: {
                    data: club.name,
                    type: "text"
                },
                shortName: {
                    data: club.shortName,
                    type: "text"
                },
                founded: {
                    data: club.founded,
                    type: "text"
                },
                location: {
                    type: "selection",
                    data: locationOptions,
                    value: {
                        value: club.location.id,
                        label: club.location.name
                    }
                },
                stadiumName: {
                    data: club.stadiumName,
                    type: "text"
                },
                logo: {
                    data: club.logo,
                    type: "text"
                }
            }
        )
        setFormEdit(true)
    }

    const onEditClub = async (requestData) => {
        const url = "http://localhost:8088/api/v1/admin/club"
        const options = {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + authToken
            },
            body: JSON.stringify(requestData)
        }
        const response = await fetch(url, options);
        if(response.ok)
        {
            getData();
            toast.success("Edit club successfully!");
        }
        else
        {
            const error = response.json();
            toast.error("Error: " + error.message)
        }
        setFormEdit(false);
    }

    const onDeleteClick = (id) => {
        setAlert(id);
    }

    const onDeleteClub = async () => {
        const url = `http://localhost:8088/api/v1/admin/club/${alert}`
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
            getData();
            toast.success("Delete club successfully!");
        }
        else
        {
            const error = await response.json();
            toast.error("Error: " + error.message)
        }
        setAlert(false);
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
        <FuncContainer title={"Clubs"}>
            <div className="w-full h-fit mt-5 flex gap-4">
                <Filter 
                    title={"Club"} 
                    options={optionsClub ? optionsClub : {value: 0, label: 'All'}}
                    onChange={onChangeClubFilter}/>
                <AddButton className={"w-[100px] h-[40px]"} onClick={onAddClick}/>
            </div>
            <ClubListBox 
                data={filterClub} 
                onClickClub={onClickEdit} 
                icon={<MdDelete className="text-red-500 text-2xl"/>}
                onClickIcon={onDeleteClick}
                />
            {!filterClub && <Loader/>}
            {formAdd && <Form 
                            data={blankData} 
                            onCancel={() => setFormAdd(false)} 
                            onSubmit={onAddClub} 
                            titleForm={"Add Club"} 
                            titleSubmit={"Add"}/>}
            {formEdit && <Form 
                            data={editData} 
                            onCancel={() => setFormEdit(false)}
                            onSubmit={onEditClub}   
                            titleForm={"Edit Club"}
                            titleSubmit={"Edit"} 
                            />}
            {alert && <Alert 
                        title={"Are you sure to do action?"}
                        onCancel={() => setAlert(false)}
                        onConfirm={onDeleteClub}
                        />}
        </FuncContainer>
    )
}

export default AdminClub;