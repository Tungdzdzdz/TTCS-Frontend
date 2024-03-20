import Filter from "../hcom/Filter";
import FuncContainer from "../hcom/FuncContainer";
import CoachList from "./CoachList";
const options1 = [
    {
        value: "all",
        label: "All Club"
    },
    {
        value: "1",
        label: "Manchester United",
    },
    {
        value: "2",
        label: "Manchester United",
    },
    {
        value: "3",
        label: "Manchester United",
    },
    {
        value: "4",
        label: "Manchester United",
    },
    {
        value: "5",
        label: "Manchester United",
    },
]
function CoachContainer()
{
    return(
        <FuncContainer title={"Coaches"}>
            <div className="h-full w-full flex gap-2 mt-5">
                <Filter options={options1} title={"Search your club ..."} />
                <Filter options={options1} title={"Search your club ..."} />
                <Filter options={options1} title={"Search your club ..."} />
            </div>
            <CoachList></CoachList>
        </FuncContainer>
    )
}

export default CoachContainer;