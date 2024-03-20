import { MdOutlineStadium } from "react-icons/md";

function Match({ match }) {
    return (
        <div className="w-full h-fit flex p-4 gap-2 hover:bg-gradient-to-r hover:from-sky-400 hover:to-purple-500 hover:text-white hover:cursor-pointer border-b-2 justify-between text-[##37003c]">
            <div className="w-[600px] flex items-center ml-4 hover:cursor-pointer justify-between">
                <div className="flex items-center w-[250px] gap-2 justify-end">
                    <label className="hover:cursor-pointer">{match.homeTeam}</label>
                    <img className="hover:cursor-pointer h-[50px]" src={match.homeLogo} />
                </div>
                <label className="border-solid border-[1px] border-[#ebe5eb] p-2 hover:cursor-pointer">{match.time ? match.time : match.result}</label>
                <div className="flex items-center w-[250px] gap-2">
                    <img className="hover:cursor-pointer h-[50px]" src={match.awayLogo} />
                    <label className="hover:cursor-pointer">{match.awayTeam}</label>
                </div>
            </div>
            <div className="flex justify-center items-center w-fit ml-8 gap-2 ">
                <label className="text-[12px] hover:cursor-pointer">{match.stadium}</label>
                <MdOutlineStadium className="size-5" />
            </div>
            <div className="flex justify-center items-center gap-4">
                <label className="border-solid border-[1px] border-[#ebe5eb] p-2 rounded text-[#37003c] bg-white hover:cursor-pointer hover:bg-slate-100">Quick View</label>
                <label className="border-solid border-[1px] border-[#ebe5eb] p-2 rounded text-[#37003c] bg-white hover:cursor-pointer hover:bg-slate-100">Follow</label>
            </div>
        </div>
    )
}

export default Match;