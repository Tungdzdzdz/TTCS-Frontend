import { useLocation, useNavigate } from "react-router-dom";
import FuncContainer from "../hcom/FuncContainer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useData from "../hook/useData";
import { IoIosSwap } from "react-icons/io";
import yellowcard from "../../assets/yellowcard.svg";
import SelectEvent from "./SelectEvent";
import { GiBaseballGlove, GiGoalKeeper } from "react-icons/gi";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import { FiDelete } from "react-icons/fi";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useAppContext } from "../AppContext";

function ManageResult() {
    const { state } = useLocation();

    const [data, setData] = useState(state);
    const [matchDetail, setMatchDetail] = useState();
    const [statistics, setStatistics] = useState();

    const [result, setResult] = useState(null);
    const {admin} = useAppContext();

    const getResult = async () => {
        const url = `http://localhost:8088/api/v1/matchdetail/result/match/${data.id}`;
        const response = await fetch(url);
        try {
            const fetchData = await response.text();
            setResult(fetchData);
        } catch (error) {
            toast.error("Error: " + error);
        }
    };

    const getMatchDetail = async () => {
        const url = `http://localhost:8088/api/v1/matchdetail/match/${data.id}`;
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            setMatchDetail(fetchData);
        } catch (error) {
            toast.error("Error: " + error);
        }
    };

    const getStatistics = async () => {
        const url = `http://localhost:8088/api/v1/matchdetail/statistic/match/${data.id}`;
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            setStatistics(fetchData);
        } catch (error) {
            toast.error("Error: " + error);
        }
    }

    useData(getResult, [matchDetail]);
    useData(getMatchDetail, []);
    useData(getStatistics, [matchDetail]);

    const matchDetailGoal = (md, home, i) => {
        return (
            <div className="h-fit w-full grid grid-cols-3 gap-5 justify-items-center items-center" key={i}>
                <div className="flex gap-3">
                    <label>{home && md.playerStat.player.name}</label>
                    {home && <GiGoalKeeper size={20}/>}
                </div>
                <label>{md.eventTime}'</label>
                <div className="flex gap-3">
                    {!home && <GiGoalKeeper size={20} />}
                    <label>{!home && md.playerStat.player.name}</label>
                </div>
            </div>
        )
    }

    const matchDetailSave = (md, home, i) => {
        return (
            <div className="h-fit w-full grid grid-cols-3 gap-5 justify-items-center items-center" key={i}>
                <div className="flex gap-3">
                    <label>{home && md.playerStat.player.name}</label>
                    {home && <GiBaseballGlove size={20} />}
                </div>
                <label>{md.eventTime}'</label>
                <div className="flex gap-3">
                    {!home && <GiBaseballGlove size={20} />}
                    <label>{!home && md.playerStat.player.name}</label>
                </div>
            </div>
        )
    }

    const matchDetailBooking = (md, home, i) => {
        return (
            <div className="w-full grid grid-cols-3 gap-5 justify-items-center items-center" key={i}>
                <div className="flex gap-3">
                    <label className>{home && md.playerStat.player.name}</label>
                    {home && md.event.id === 3 && <img src={yellowcard} className="h-[20px] bg-yellow-400" />}
                    {home && md.event.id === 2 && <img src={yellowcard} className="h-[20px] bg-red-400" />}
                </div>
                <label>{md.eventTime}'</label>
                <div className="flex gap-3">
                    {!home && md.event.id === 3 && <img src={yellowcard} className="h-[20px] bg-yellow-400" />}
                    {!home && md.event.id === 2 && <img src={yellowcard} className="h-[20px] bg-red-400" />}
                    <label>{!home && md.playerStat.player.name}</label>
                </div>
            </div>
        )
    }

    const matchDetailSubstitution = (md, home, i) => {
        return (
            <div className="w-full grid grid-cols-3 gap-5 justify-items-center items-center" key={i}>
                <div className="flex flex-col gap-5">
                    {md.event.id === 6 && <div className="flex gap-3">
                        <label>{home && md.playerStat.player.name}</label>
                        {home && <IoIosSwap color="#00FF00" className="shadow-none outline-none border-none" size={20} />}
                    </div>}
                    {md.event.id === 7 && <div className="flex gap-3">
                        <label>{home && md.playerStat.player.name}</label>
                        {home && <IoIosSwap color="red" size={20} />}
                    </div>}
                </div>
                <label>{md.eventTime}'</label>
                <div className="flex flex-col gap-5">
                    {md.event.id === 6 && <div className="flex gap-3">
                        {!home && <IoIosSwap color="#00FF00" size={20} />}
                        <label>{!home && md.playerStat.player.name}</label>
                    </div>}
                    {md.event.id === 7 && <div className="flex gap-3">
                        {!home && <IoIosSwap color="red" size={20} />}
                        <label>{!home && md.playerStat.player.name}</label>
                    </div>}
                </div>
            </div>
        )
    }

    const matchDetailContent = (md, i) => {
        if (md.clubStat.id === data.homeClubStat.id) {
            if (md.event.id === 1) {
                return matchDetailGoal(md, true, i)
            }
            else if (md.event.id === 2 || md.event.id === 3) {
                return matchDetailBooking(md, true, i)
            }
            else if (md.event.id === 6 || md.event.id === 7) {
                return matchDetailSubstitution(md, true, i)
            }
            else if (md.event.id === 10) {
                return matchDetailSave(md, true, i)
            }
        }
        else {
            if (md.event.id === 1) {
                return matchDetailGoal(md, false, i)
            }
            else if (md.event.id === 2 || md.event.id === 3) {
                return matchDetailBooking(md, false, i)
            }
            else if (md.event.id === 6 || md.event.id === 7) {
                return matchDetailSubstitution(md, false, i)
            }
            else if (md.event.id === 10) {
                return matchDetailSave(md, false, i)
            }
        }
    }

    const tranformKey = (key) => { 
        switch (key) {
            case "shot":
                return "Shot";
            case "foul":
                return "Foul";
            case "offside":
                return "Offside";
            case "yellowCard":
                return "Yellow card";
            case "redCard":
                return "Red card";
            case "saves":
                return "Saves";
            default:
                return key;
        }
    }

    const onDeleteEvent = async (md) => {
        const url = `http://localhost:8088/api/v1/admin/matchDetail/${md.id}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.ok) {
            getMatchDetail();
            toast.success("Delete event successfully");
        }
        else {
            toast.error("Error: " + response.status);
        }
    }

    const onEditEvent = async (md) => {
        const url = `http://localhost:8088/api/v1/matchDetail/update/${md.id}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        try {
            const fetchData = await response.text();
            toast.success(fetchData);
        } catch (error) {
            toast.error("Error: " + error);
        }
    }

    return data ? (
        <FuncContainer title={"Edit result"}>
            <div className="w-full h-full flex justify-around mt-10 gap-5">
                <div className="h-full w-3/4 flex flex-col items-center gap-6 overflow-hidden rounded-xl border-2 p-5">
                    <div className="h-fit w-full flex justify-center gap-10 items-center">
                        <div className="h-[100px] flex items-center justify-end gap-4 w-1/3">
                            <h3>{data.homeClubStat.club.name}</h3>
                            <img src={data.homeClubStat.club.logo} className="h-[80px]" />
                        </div>
                        {result && <div className="h-fit p-2 w-1/3 justify-center items-center flex flex-col">
                            <h3 className="text-[30px] text-center">{result}</h3>
                            {
                                matchDetail && matchDetail.find((md, i) => {
                                    return md.event.id === 5;
                                }) === undefined && new Date(data.matchDate) < Date.now() &&
                                <span class="animate-ping w-2 h-2 rounded-full bg-red-800 opacity-90"></span>
                            }
                        </div>}
                        <div className="h-[100px] flex items-center gap-4 w-1/3 justify-start">
                            <img src={data.awayClubStat.club.logo} className="h-[80px] " />
                            <h3>{data.awayClubStat.club.name}</h3>
                        </div>
                    </div>
                    <div className="flex flex-col h-fit w-full px-10">
                        <Tabs defaultIndex={0}>
                            <TabList>
                                <Tab>Match Detail</Tab>
                                <Tab>Statistics</Tab>
                            </TabList>
                            <TabPanel>
                                {matchDetail && matchDetail.map((md, i) => {
                                    if(md.event.id === 1 || md.event.id === 2 || md.event.id === 3 || md.event.id === 6 || md.event.id === 7 || md.event.id === 10)
                                        return (
                                            <div className="flex w-full min-w-[800px] h-fit gap-4 p-2" key={i}>
                                                {matchDetailContent(md, i)}
                                                {<FaEdit 
                                                    size={20} 
                                                    className="hover:cursor-pointer hover:text-gray-800 text-gray-400"
                                                />}
                                                {<FaDeleteLeft 
                                                    size={20} 
                                                    color="red" 
                                                    className="hover:cursor-pointer"
                                                    onClick={() => onDeleteEvent(md)}
                                                />}
                                            </div>)
                                })}
                            </TabPanel>
                            <TabPanel style={{marginTop: "20px", display: "flex", flexDirection: "column", rowGap: "20px"}}>
                                {
                                    statistics && Object.keys(statistics).map((key, i) => {
                                        return (
                                            <div className="w-full h-fit grid grid-cols-5" key={i}>
                                                <div className="flex justify-center col-span-2">
                                                    <label className="text-[#37003C]">{statistics[key][0]}</label>
                                                </div>
                                                <div className="flex justify-center">
                                                    <label className="text-[#37003C]">{tranformKey(key)}</label>
                                                </div>
                                                <div className="flex justify-center col-span-2">
                                                    <label className="text-[#37003C]">{statistics[key][1]}</label>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
                <div className="w-1/4 h-[500px] border-gray-200 shadow-lg rounded-lg  border-2">
                    {data && <SelectEvent
                        homeClubStat={data.homeClubStat}
                        awayClubStat={data.awayClubStat}
                        match={data.id}
                        getMatchDetail={getMatchDetail}
                    />}
                </div>
            </div>
        </FuncContainer>
    ) : <></>
}

export default ManageResult;