import { useContext, useEffect, useState } from "react";
import { IoMdFootball } from "react-icons/io";
import { GiBaseballGlove, GiCardRandom, GiGoalKeeper } from "react-icons/gi";
import { IoIosSwap } from "react-icons/io";
import { MdOutlineTimer, MdStadium } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import useData from "../hook/useData";
import { toast } from "react-toastify";
import yellowcard from "../../assets/yellowcard.svg";
import MatchSquadSub from "./MatchSquadSub";
import { useLocation, useNavigate } from "react-router-dom";
import FuncContainer from "../hcom/FuncContainer";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Client } from "@stomp/stompjs";
import { useAppContext } from "../AppContext";
function MatchDetail() {
    const { state } = useLocation();
    const [data, setData] = useState(state);
    const [matchDetail, setMatchDetail] = useState();
    const [statistics, setStatistics] = useState();
    const [mainSquad, setMainSquad] = useState();
    const [subSquad, setSubSquad] = useState();

    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const { client } = useAppContext();

    useEffect(() => {
        console.log(state)
        if(!state)
        {
            navigate("/not-found")
            return;
        }
    }, [state])

    useEffect(() => {
        if(!client || !data) 
        {
            return;
        }
        let subscription = client.subscribe('/topic/match/' + data.id, (message) => {
            const md = JSON.parse(message.body);
            if(md.type === "DELETE")
                setMatchDetail(pre => pre.filter(e => e.id !== md.matchDetail.id));
            else if(md.type === "CREATE")
                setMatchDetail(pre => [...pre, md.matchDetail].sort((a, b) => a.eventTime - b.eventTime));
        });
        return () => {
            if (subscription)
                subscription.unsubscribe();
        }
    }, [data, client])

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

    const getSquad = async (clubStatId, home) => {
        const url = `http://localhost:8088/api/v1/squad/match/${data.id}`;
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            setMainSquad(fetchData.filter(e => e.type === true));
            setSubSquad(fetchData.filter(e => e.type === false));
        } catch (error) {
            toast.error("Error: " + error);
        }
    }

    useData(getResult, [matchDetail]);
    useData(getMatchDetail, []);
    useData(getStatistics, [matchDetail]);
    useData(getSquad, []);

    const matchDetailGoal = (md, home, i) => {
        return (
            <div className="h-fit w-full grid grid-cols-3 gap-5 justify-items-center items-center" key={i}>
                <div className="flex gap-3">
                    <label>{home && md.playerStat.player.name}</label>
                    {home && <GiGoalKeeper size={20} />}
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

    return state ? (
        <FuncContainer title={"Result"}>
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
                                <Tab>Squad</Tab>
                            </TabList>
                            <TabPanel>
                                {matchDetail && matchDetail.map((md, i) => {
                                    if (md.event.id === 1 || md.event.id === 2 || md.event.id === 3 || md.event.id === 6 || md.event.id === 7 || md.event.id === 10)
                                        return (
                                            <div className="flex w-full min-w-[800px] h-fit gap-4 p-2" key={i}>
                                                {matchDetailContent(md, i)}
                                            </div>)
                                })}
                            </TabPanel>
                            <TabPanel style={{ marginTop: "20px", display: "flex", flexDirection: "column", rowGap: "20px" }}>
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
                            <TabPanel>
                                <div className="w-full h-fit flex gap-4">
                                    <MatchSquadSub
                                        data={mainSquad}
                                        type="main"
                                        home={data.homeClubStat}
                                        away={data.awayClubStat}
                                    />
                                    <MatchSquadSub
                                        data={subSquad}
                                        type="sub"
                                        home={data.homeClubStat}
                                        away={data.awayClubStat}
                                    />
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
                <div className="h-fit w-fit border-2 rounded-xl">
                    <div className="h-fit w-full flex flex-col gap-5 p-5">
                        <div className="h-fit w-full flex items-center gap-5">
                            <FaCalendarAlt size={30} />
                            <label>{new Date(data.matchDate).toDateString()}</label>
                        </div>
                        <div className="h-fit w-full flex items-center gap-5">
                            <MdStadium size={30} />
                            <label>{data.homeClubStat.club.stadiumName}</label>
                        </div>
                        <div className="h-fit w-full flex items-center gap-5">
                            <MdOutlineTimer size={30} />
                            <label>{new Date(data.matchDate).toLocaleTimeString()}</label>
                        </div>
                    </div>
                </div>
            </div>
        </FuncContainer>
    ) : <></>
}

export default MatchDetail;