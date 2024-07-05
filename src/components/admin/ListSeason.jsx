import { useEffect, useState } from "react";
import DeleteButton from "../hcom/DeleteButton";
import EditButton from "../hcom/EditButton";
import Alert from "../hcom/Alert";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext";
import { toast } from "react-toastify";

function ListSeason({seasons, getData})
{
    const [alert, setAlert] = useState(false);

    const navigate = useNavigate();

    const {getSeasons, admin, authToken} = useAppContext();

    useEffect(() => {
         
        if(!admin)
        {
            navigate("/notFound")
            return;
        }
    }, [admin])

    const onClickEdit = async (index) => {
        const state = {
            id: seasons[index].id,
            name: seasons[index].name,
            startSeason: seasons[index].startSeason,
            endSeason: seasons[index].endSeason,
            sponsor: seasons[index].sponsor,
            quanity: seasons[index].clubStats.length,
            clubs: await Promise.all(seasons[index].clubStats.map(async (e, i) => {
                const {players, ...club} = e.club;
                const url = `http://localhost:8088/api/v1/playerstat/players/${club.id}/${seasons[index].id}`;    
                const response = await fetch(url);
                const dataPlayer = await response.json();

                const urlCoach = `http://localhost:8088/api/v1/coach/clubCoach/${club.id}/${seasons[index].id}`;
                const responseCoach = await fetch(urlCoach);
                const dataCoach = await responseCoach.json();

                return {
                    club: {
                        ...club,
                        location: club.location.id,
                    },
                    players: dataPlayer.map(player => {
                        return {
                            ...player.player,
                            country: player.player.country.id
                        }
                    }),
                    positions: dataPlayer.map(player => player.position),
                    coach: {
                        ...dataCoach,
                        country: dataCoach.country.id
                    }, 
                    numberJersey: dataPlayer.map(player => player.numberJersey)
                }
            }))
        }
        navigate(`${seasons[index].id}`, {state: state})
    }

    const onClickDelete = (index) => {
        setAlert(seasons[index].id);
    }

    const onDeleteSeason = () => {
        const url = `http://localhost:8088/api/v1/admin/season/${alert}`;
        const options = {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
        }
        fetch(url, options).then(response => {
            if (response.ok) {
                toast.success("Delete season successfully");
                getSeasons();
                getData();
            }
            else {
                toast.error("Error delete season");
            }
        })
        setAlert(false);
    }

    return (
        <div className="w-full h-fit flex flex-col gap-3 px-5">
            <div className="grid grid-cols-9 w-full h-fit gap-4">
                <label>Id</label>
                <label className="col-span-2">Name</label>
                <label className="col-span-2">Sponsor</label>
                <label>Start Date</label>
                <label>End Date</label>
                <label className="text-center">Edit</label>
                <label className="text-center">Delete</label>
            </div>
            <div className="flex flex-col w-full h-fit gap-4">
                {
                    seasons.map((e, i) => {
                        return (
                            <div key={i} className="grid grid-cols-9 w-full h-[40px] gap-4 border-b-2 border-solid border-gray-200 p-b-2">
                                <label className="self-center">{e.id}</label>
                                <label className="col-span-2 self-center">{e.name}</label>
                                <label className="col-span-2 self-center">{e.sponsor}</label>
                                <label className="self-center">{e.startSeason}</label>
                                <label className="self-center">{e.endSeason}</label>
                                <EditButton onClick={onClickEdit} index={i}/>
                                <DeleteButton onClick={onClickDelete} index={i}/>
                                {alert && <Alert 
                                            onCancel={() => setAlert(false)}
                                            title={"Are you sure to do this action?"}
                                            onConfirm={onDeleteSeason}
                                            key={i}
                                            />
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ListSeason;