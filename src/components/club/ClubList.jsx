import ClubColumnField from "../hcom/ClubColumnField";
import ClubRow from "./ClubRow";

function ClubList({columnField, dataClub})
{
    return dataClub && (
        <div className="h-fit w-full flex flex-col">
            <ClubColumnField data={columnField} />
            <div className="h-[500px] w-full flex flex-col">
                {
                    dataClub.map((e, i) => {
                        return (
                            <ClubRow data={e} key={`ClubRow${i}`}/>
                        )                    
                    })
                }
            </div>
        </div>
    )
}

export default ClubList;