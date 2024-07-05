import ReactSelect from "react-select";
import InputComponent from "../hcom/InputComponent";
import AddButton from "../hcom/AddButton";
import { useState } from "react";
import { eventOptions } from "../hcom/FilterOptions";
import { toast } from "react-toastify";
import useData from "../hook/useData";

function SelectEvent({homeClubStat, awayClubStat, match, getMatchDetail})
{
    const optionsClub = [
        { value: homeClubStat, label: homeClubStat.club.shortName },
        { value: awayClubStat, label: awayClubStat.club.shortName }
    ]

    const initData = () => ({
        type: undefined,
        clubStat: undefined,
        playerStat: undefined,
        minute: undefined,
    })

    const [data, setData] = useState(initData);
    const [optionPlayer, setOptionPlayer] = useState([]);

    const getPlayerData = async () => {
        if(data.type === undefined || data.clubStat === undefined)
            return;
        let url = "";
        if(data.type === 6)
            url = `http://localhost:8088/api/v1/squad/match/${match}/clubStat/${data.clubStat}?type=false&inField=false`;
        else
            url = `http://localhost:8088/api/v1/squad/match/${match}/clubStat/${data.clubStat}?type=null&inField=true`;
        const response = await fetch(url);
        const fetchData = await response.json();
        console.log(fetchData)
        setOptionPlayer(fetchData.map(e => ({
            value: e.playerStat.id,
            label: e.playerStat.player.name
        })));
    }

    useData(getPlayerData, [data.clubStat, data.type]);

    const onChangeClubFilter = (optionSelected) => {
        setData((pre) => ({
            ...pre,
            clubStat: optionSelected.value.id
        }))
    }

    const onChangeEventFilter = (optionSelected) => {
        setData(pre => ({
            ...pre,
            type: optionSelected.value
        }))
    }

    const onChangePlayerFilter = (optionSelected) => {
        setData(pre => ({
            ...pre,
            playerStat: optionSelected.value
        }))
    }

    const onChangeMinute = (e) => {
        setData(pre => {
            return {
                ...pre,
                minute: e.target.value
            }
        })
    }

    const onAddEvent = async () => {
        if(!onValidData())
            return;
        console.log(data)
        const url = "http://localhost:8088/api/v1/admin/matchDetail/match/" + match;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        if(response.ok)
        {
            toast.success("Add event success");
            getMatchDetail();
        }
        else
        {
            toast.error("Add event fail");
        }
    }

    const onValidData = () => {
        if(data.type === undefined)
        {   
            toast.error("Please select type");
            return false;
        }
        else if(data.type === 4 || data.type === 5)
            return true;   
        if(data.clubStat && data.playerStat && data.minute)
        {
            if(Number.parseInt(data.minute) > 0)
            {
                return true;
            }
        }
        toast.error("Please fill all field");
        return false;
    }

    return (
        <div className="w-full h-fit flex flex-col items-center py-5 px-10 mt-10 gap-5 min-h-[400px] justify-around">
            <h3>Event</h3>
            <div className="flex w-full gap-4 items-center">
                <label className="min-w-[50px]">Type</label>
                <ReactSelect
                    className="w-[200px] h-[36px]"
                    options={eventOptions}
                    onChange={onChangeEventFilter}
                />
            </div>
            <div className="flex w-full gap-4 items-center">
                <label className="min-w-[50px]">Club</label>
                <ReactSelect
                    className="w-[200px] h-[36px]"
                    options={optionsClub}
                    onChange={onChangeClubFilter}
                />
            </div>
            <div className="flex w-full gap-4 items-center">
                <label className="min-w-[50px]">Player</label>
                <ReactSelect
                    className="w-[200px] h-[36px]"
                    options={optionPlayer}
                    onChange={onChangePlayerFilter}
                />
            </div>
            <div className="flex w-full gap-4 items-center">
                <label className="min-w-[50px]">Minute</label>
                <input 
                    type="text" 
                    className="w-44 h-[36px] border-gray-200 border-2 p-2 focus:border-blue-400 rounded-md"
                    placeholder="fill here"
                    onChange={onChangeMinute}
                    />
            </div>
            <AddButton 
                className="h-[40px] w-[100px] hover:bg-green-800"
                onClick={onAddEvent}
                />
        </div>
    )
}

export default SelectEvent;