import { useState } from "react";
import Filter from "../hcom/Filter";
import FuncContainer from "../hcom/FuncContainer";
import useData from "../hook/useData";
import ClubListBox from "./ClubListBox";

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


function ClubContainer() {
    const [data, setData] = useState();
    useData(async () => {
        const url = "http://localhost:3000/clubs";
        const response = await fetch(url);
        try{
            const fetchData = await response.json();
            setData(fetchData);
        }
        catch (error) {
            console.log("Error: " + error);
        }
    });
    return (
        <FuncContainer title={"Clubs"}>
            <div className="h-full w-full flex gap-2 mt-5">
                <Filter options={options1} title={"Search your club ..."} />
                <Filter options={options1} title={"Search your club ..."} />
                <Filter options={options1} title={"Search your club ..."} />
            </div>
            <ClubListBox data={data}/>
        </FuncContainer>
    )
}

export default ClubContainer;