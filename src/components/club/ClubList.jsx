import ClubColumnField from "../hcom/ClubColumnField";
import ColumnField from "../hcom/ColumnField";
import ClubRow from "./ClubRow";

function ClubList({columnField, dataClub, stat})
{
    return (
        <div className="h-fit w-full flex flex-col">
            <ClubColumnField data={columnField} />
            <div className="h-[500px] w-full flex flex-col">
                {
                    dataClub.map((e, i) => {
                        const data = {
                            ...e,
                            stat: stat ? stat : undefined,
                            position: i+1
                        }   
                        return (
                            <ClubRow data={data} key={`ClubRow${i}`}/>
                        )                    
                    })
                }
            </div>
        </div>
    )
}

export default ClubList;