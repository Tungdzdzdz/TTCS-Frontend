function MatchSquadSub({ homeTeam, awayTeam, title, type }) {
    const home = type === 'lineup' ? homeTeam.lineup : homeTeam.bench;
    const away = type === 'lineup' ? awayTeam.lineup : awayTeam.bench;
    return (
        <div className="flex flex-col w-full rounded-xl overflow-hidden gap-3 shadow-xl">
            <div className="h-fit flex justify-center items-center w-full bg-gradient-to-r from-sky-400 to-blue-600 p-3">
                <h3 className="text-white">{title}</h3>
            </div>
            <div className="grid grid-cols-2 justify-items-center items-center py-3">
                <div className="flex gap-3 items-center">
                    <img className="h-[80px]" src={homeTeam.crest} />
                    {type==='lineup' && <label>{homeTeam.formation}</label>}
                </div>
                <div className="flex gap-3 items-center">
                    {type==='lineup' && <label>{awayTeam.formation}</label>}
                    <img className="h-[80px]" src={awayTeam.crest} />
                </div>
            </div>
            <div className="grid grid-cols-2 justify-items-center items-center py-3 gap-5">
                <div className="flex flex-col w-full">
                    {
                        home.map((e, i) => {
                            return (
                                <div key={i} className="flex justify-between items-center p-2 border-b-2">
                                    <div className="flex w-fit h-fit gap-3 items-center">
                                        <img className="h-[30px] w-[30px] rounded-full" src="https://resources.premierleague.com/premierleague/photos/players/250x250/p176297.png" />
                                        <div className="flex flex-col justify-center gap-1">
                                            <h4>{e.name}</h4>
                                            <label className="text-[#37003c]">{e.shirtNumber}</label>
                                        </div>
                                    </div>
                                    <label className="text-[#37003c]">{e.position}</label>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="flex flex-col w-full">
                    {
                        away.map((e, i) => {
                            return (
                                <div key={i} className="flex justify-between items-center p-2 border-b-2">
                                    <div className="flex w-fit h-fit gap-3 items-center">
                                        <img className="h-[30px] w-[30px] rounded-full" src="https://resources.premierleague.com/premierleague/photos/players/250x250/p176297.png" />
                                        <div className="flex flex-col justify-center gap-1">
                                            <h4>{e.name}</h4>
                                            <label className="text-[#37003c]">{e.shirtNumber}</label>
                                        </div>
                                    </div>
                                    <label className="text-[#37003c]">{e.position}</label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default MatchSquadSub;