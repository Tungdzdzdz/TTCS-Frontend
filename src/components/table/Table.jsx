function Table({ column, data, fontSize = 14}) {
    const { pos, club, match, point, win, lost, draw, gf, ga, gd } = column;
    return (
        <table className="table-auto border-collapse w-full text-sm">
            <thead className="border-b-2">
                <tr className={`text-[${fontSize}px]`}>
                    {Object.keys(column).map((e, i) => {
                        return (
                            <td className="p-2 text-center" key={`columnTable${i}`}><h4>{column[e]}</h4></td>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {
                    data.map((e, i) => {
                        return (
                            <tr className={`border-b-2 text-[${fontSize}px]`} key={`row${i}`}>
                                {pos && <td className="p-2 text-center">{e.rank}</td>}
                                {
                                    club &&
                                    <td className="p-2 flex">
                                        <div className="w-1/4 flex justify-end">
                                            <img className="mr-5 h-[30px]" src={e.club.logo} />
                                        </div>
                                        <label className="self-center grow">{e.club.name}</label>
                                    </td>
                                }
                                {match && <td className="p-2 text-center">{e.matchNumber}</td>}
                                {win && <td className="p-2 text-center">{e.win}</td>}
                                {draw && <td className="p-2 text-center">{e.draw}</td>}
                                {lost && <td className="p-2 text-center">{e.lose}</td>}
                                {gf && <td className="p-2 text-center">{e.goalTaken}</td>}
                                {ga && <td className="p-2 text-center">{e.goalReceived}</td>}
                                {gd && <td className="p-2 text-center">{e.goalTaken - e.goalReceived}</td>}
                                {point && <td className="p-2 text-center">{e.point}</td>}
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default Table;