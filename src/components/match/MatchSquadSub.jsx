function MatchSquadSub({ data, type, home, away}) {
    const title = type === 'main' ? 'Main Squad' : 'Substitutes';
    return (
        <div className="flex flex-col w-full rounded-xl overflow-hidden gap-4 shadow-xl p-5">
            <div className="w-full h-fit flex justify-between items-center">
                <img src={home.club.logo} alt={home.club.name} className="w-10 h-10" />
                <p className="text-lg font-semibold">{title}</p>
                <img src={away.club.logo} alt={away.club.name} className="w-10 h-10" />
            </div>
            <div className="flex justify-between w-full h-fit gap-2">
                <div className="flex flex-col items-start  gap-2">
                    {
                        data.filter(e => e.clubStat.id === home.id).map((e, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <img src={e.playerStat.player.img} alt={e.playerStat.player.name} className="w-8 h-8 rounded-full" />
                                <p className="text-sm">{e.playerStat.numberJersey}</p>
                                <p className="text-sm">{e.playerStat.player.name}</p>
                            </div>
                        ))
                    }
                </div>
                <div className="flex flex-col items-end gap-2">
                    {
                        data.filter(e => e.clubStat.id === away.id).map((e, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <p className="text-sm">{e.playerStat.player.name}</p>
                                <p className="text-sm">{e.playerStat.numberJersey}</p>
                                <img src={e.playerStat.player.img} alt={e.playerStat.player.name} className="w-8 h-8 rounded-full" />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default MatchSquadSub;