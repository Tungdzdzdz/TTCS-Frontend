import { MdOutlineStadium } from "react-icons/md";
import { useAppContext } from "../AppContext";

function Match({ match, followEdit, onFollowEdit, disabled, onNavigateMatch}) {   
    const {admin} = useAppContext();

    return (
        <div className="w-full min-w-fit h-fit flex p-4 gap-2 hover:bg-gradient-to-r hover:from-sky-400 hover:to-purple-500 hover:text-white hover:cursor-pointer border-b-2 justify-between text-[##37003c]" onClick={() => onNavigateMatch(match.matchId)}>
            <div className="w-fit flex items-center ml-4 hover:cursor-pointer justify-between gap-3">
                <div className="flex items-center w-[300px] gap-2 justify-end">
                    <label className="hover:cursor-pointer">{match.homeTeam}</label>
                    <img className="hover:cursor-pointer h-[50px]" src={match.homeLogo} />
                </div>
                <label className="border-solid border-[1px] border-[#ebe5eb] p-2 hover:cursor-pointer w-20 text-center">{match.result ? match.result : match.time}</label>
                <div className="flex items-center w-[300px] gap-2">
                    <img className="hover:cursor-pointer h-[50px]" src={match.awayLogo} />
                    <label className="hover:cursor-pointer">{match.awayTeam}</label>
                </div>
            </div>
            <div className="flex justify-end items-center gap-2 min-w-[12rem]">
                <label className="text-[12px] hover:cursor-pointer">{match.stadiumName}</label>
                <MdOutlineStadium className="size-5 w-[2rem]"/>
            </div>
            {followEdit && <div 
                            className="flex min-w-24 justify-center items-center border-solid border-[2px] border-[#ebe5eb] bg-slate-100 hover:cursor-pointer hover:bg-slate-200 p-2 rounded-lg gap-4 shadow-lg overflow-hidden"
                            onClick={(e) => {
                                e.stopPropagation();
                                if(admin)
                                {
                                    if(!disabled) onFollowEdit();
                                }
                                else
                                {
                                    onFollowEdit();
                                }
                            }}>
                {!admin && followEdit === 'follow' && <label className="text-[#37003c] hover:cursor-pointer">Unfollow</label>}
                {!admin && followEdit === 'unfollow' && <label className="text-[#37003c] hover:cursor-pointer">Follow</label>}
                {admin && <label className="text-[#37003c] hover:cursor-pointer">{disabled ? 'Disabled' : 'Edit'}</label>}   
            </div>}
        </div>
    )
}

export default Match;