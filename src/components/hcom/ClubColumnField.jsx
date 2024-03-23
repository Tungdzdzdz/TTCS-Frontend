function ClubColumnField({ data }) {
    return (
        <div className="h-fit w-full flex">
            {
                data.map((e, i) => {
                    return (
                        <div className={`flex p-2 min-w-[50px] ${e === 'Club' ? "grow items-start" : 'items-center'}`} key={`columnField${i}`}>
                            <h4>{e}</h4>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ClubColumnField;