import { useState } from "react";
import { IoMdFootball } from "react-icons/io";
import { GiCardRandom } from "react-icons/gi";
import { IoIosSwap } from "react-icons/io";
import { MdOutlineTimer, MdStadium } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import useData from "../hook/useData";
import { toast } from "react-toastify";
import ListContainer from "../hcom/ListContainer";
import MatchSquadSub from "./MatchSquadSub";
function MatchDetail() {
    const [match, setMatch] = useState();
    const [matchDetail, setMatchDetail] = useState();
    useData(async () => {
        const response = await fetch("http://localhost:3000/matchDetail");
        try {
            const rawMatch = await response.json();
            const goals = rawMatch.goals.map(e => ({
                ...e,
                type: "goal"
            }));
            const bookings = rawMatch.bookings.map(e => ({
                ...e,
                type: "booking"
            }))
            const substitutions = rawMatch.substitutions.map(e => ({
                ...e,
                type: "substitution"
            }))
            setMatchDetail([...goals, ...bookings, ...substitutions].sort((a, b) => a.minute - b.minute));
            setMatch(rawMatch);
        } catch (error) {
            toast.error("Error: " + error);
        }
    })

    const eventGoal = (event, home, i) => {
        return (
            <div className="h-fit w-full grid grid-cols-3 gap-5 text-white justify-items-center items-center" key={i}>
                <div className="flex gap-3">
                    <label className="text-white">{home && event.scorer.name}</label>
                    {home && <IoMdFootball color="white" size={20} />}
                </div>
                <label>{event.minute}'</label>
                <div className="flex gap-3">
                    {!home && <IoMdFootball color="white" size={20} />}
                    <label className="text-white">{!home && event.scorer.name}</label>
                </div>
            </div>
        )
    }

    const eventBooking = (event, home, i) => {
        return (
            <div className="w-full grid grid-cols-3 gap-5 text-white justify-items-center items-center" key={i}>
                <div className="flex gap-3">
                    <label className="text-white">{home && event.player.name}</label>
                    {home && <GiCardRandom color={event.card} size={20} />}
                </div>
                <label>{event.minute}'</label>
                <div className="flex gap-3">
                    {!home && <GiCardRandom color={event.card} size={20} />}
                    <label className="text-white">{!home && event.player.name}</label>
                </div>
            </div>
        )
    }

    const eventSubstitution = (event, home, i) => {
        return (
            <div className="w-full grid grid-cols-3 gap-5 text-white justify-items-center items-center" key={i}>
                <div className="flex flex-col gap-5">
                    <div className="flex gap-3">
                        <label className="text-white">{home && event.playerIn.name}</label>
                        {home && <IoIosSwap color="green" size={20} />}
                    </div>
                    <div className="flex gap-3">
                        <label className="text-white">{home && event.playerOut.name}</label>
                        {home && <IoIosSwap color="red" size={20} />}
                    </div>
                </div>
                <label>{event.minute}'</label>
                <div className="flex flex-col gap-5">
                    <div className="flex gap-3">
                        {!home && <IoIosSwap color="green" size={20} />}
                        <label className="text-white">{!home && event.playerIn.name}</label> 
                    </div>
                    <div className="flex gap-3">
                        {!home && <IoIosSwap color="red" size={20} />}
                        <label className="text-white">{!home && event.playerOut.name}</label>
                    </div>
                </div>
            </div>
        )
    }

    const eventContent = (event, i) => {
        if (event.team.id === match.homeTeam.id) {
            if (event.type === "goal") {
                return eventGoal(event, true, i)
            }
            else if (event.type === "booking") {
                return eventBooking(event, true, i)
            }
            else if (event.type === "substitution") {
                return eventSubstitution(event, true, i)
            }
        }
        else {
            if (event.type === "goal") {
                return eventGoal(event, false, i)
            }
            else if (event.type === "booking") {
                return eventBooking(event, false, i)
            }
            else if (event.type === "substitution") {
                return eventSubstitution(event, false, i)
            }
        }
    }

    const formattedDate = (d) => {
        const date = new Date('2022-02-12T12:30:00Z');
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const formattedTime = (d) => {
        const date = new Date('2022-02-12T12:30:00Z');
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        return `${hour}:${minute}`;
    }

    if (match !== undefined) {
        return (
            <div className="h-fit w-full flex flex-col absolute gap-5">
                <div className="h-fit w-full bg-gradient-to-r from-sky-400 to-purple-500 mt-10 flex flex-col items-center justify-center gap-5">
                    <div className="w-fit h-fit flex items-center p-10 gap-5">
                        <div className="h-fit w-fit flex items-center gap-2">
                            <h1 className="text-white text-[60px]">{match.homeTeam.shortName}</h1>
                            <img className="h-[100px]" src={match.homeTeam.crest} />
                        </div>
                        <div className="h-[100px] w-fit">
                            <h1 className="text-white text-[60px]">{match.score.fullTime.home} - {match.score.fullTime.away}</h1>
                        </div>
                        <div className="h-fit w-fit flex items-center gap-2">
                            <img className="h-[100px]" src={match.awayTeam.crest} />
                            <h1 className="text-white text-[60px]">{match.awayTeam.shortName}</h1>
                        </div>
                    </div>
                    <div className="w-3/4 h-fit flex flex-col items-center p-5 gap-5">
                        {
                            matchDetail.map((e, i) => {
                                return eventContent(e, i);
                            })
                        }
                    </div>
                </div>
                <div className="h-fit w-full flex p-20 gap-5">
                    <div className="h-fit w-1/4 flex flex-col rounded-xl overflow-hidden shadow-xl">
                        <div className="h-fit flex justify-center items-center w-full bg-gradient-to-r from-sky-400 to-blue-600 p-3">
                            <h1 className="text-white self-center">Statistics</h1>
                        </div>
                        {
                            Object.keys(match.homeTeam.statistics).map((field, i) => {
                                const standardField = (field.slice(0, 1).toUpperCase() + field.slice(1)).split('_').join(' ');
                                return (
                                    <div key={i} className="h-[40px] w-full flex justify-between items-center border-b-2 p-2">
                                        <label>{match.homeTeam.statistics[field]}</label>
                                        <label>{standardField}</label>
                                        <label>{match.awayTeam.statistics[field]}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="w-full h-fit flex flex-col gap-8">
                        <div className="flex flex-col w-full rounded-xl overflow-hidden gap-3 shadow-xl">
                            <div className="h-fit flex justify-center items-center w-full bg-gradient-to-r from-sky-400 to-blue-600 p-3">
                                <h3 className="text-white">Time & Place</h3>
                            </div>
                            <div className="grid grid-cols-4 justify-items-center items-center py-3">
                                <label>Matchday {match.matchday}</label>
                                <div className="flex gap-3">
                                    <FaCalendarAlt size={20} />
                                    <label>{formattedDate(match.utcDate)}</label>
                                </div>
                                <div className="flex gap-3">
                                    <MdOutlineTimer size={20} />
                                    <label>{formattedTime(match.utcDate)}</label>
                                </div>
                                <div className="flex gap-3">
                                    <MdStadium size={20} />
                                    <label>{match.venue }</label>
                                </div>
                            </div>
                        </div>
                        <MatchSquadSub homeTeam={match.homeTeam} awayTeam={match.awayTeam} title="Lineup" type="lineup" />
                        <MatchSquadSub homeTeam={match.homeTeam} awayTeam={match.awayTeam} title="Substitution" type="substitution" />
                    </div>
                </div>
            </div>
        );
    }
}

export default MatchDetail;