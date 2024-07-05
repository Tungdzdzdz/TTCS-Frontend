import { toast } from "react-toastify";
import { useAppContext } from "../AppContext";
import FuncContainer from "../hcom/FuncContainer";
import useData from "../hook/useData";
import CoachList from "./CoachList";
import { useRef, useState } from "react";
import Filter from "../hcom/Filter";
import { useNavigate } from "react-router-dom";

function CoachContainer()
{
    const [coachData, setCoachData] = useState([]);
    const [coachFilter, setCoachFilter] = useState();
    const [filterData, setFilterData] = useState();
    const { seasons } = useAppContext();
    const navigate = useNavigate(); 
    const getData = async () => {
        if(!seasons)
            return;
        const url = `http://localhost:8088/api/v1/coach/${seasons[seasons.length - 1].value}`;
        const response = await fetch(url);
        if(response.ok)
        {
            const data = await response.json();
            setCoachData(data);
            setFilterData(data);
            setCoachFilter([{
                label: "All Coaches",
                value: 0
            }].concat(data.map(e => {
                return {
                    label: e.coach.name,
                    value: e.coach.id
                }
            })));
        }
        else
        {
            toast.error("The data is not found");
        }
    }

    useData(getData, [seasons]);

    const onChangeFilter = (selectedOption) => {
        if(selectedOption.value === 0)
        {
            setFilterData(coachData);
            return;
        }
        const data = coachData.filter(e => e.coach.id === selectedOption.value);
        setFilterData(data);
    }

    const onChangeFilterSeason = async (selectedOption) => {
        const url = `http://localhost:8088/api/v1/coach/${selectedOption.value}`;
        const response = await fetch(url);
        if(response.ok)
        {
            const data = await response.json();
            coachFilterRef.current.setValue({
                label: "All Coaches",
                value: 0
            });
            setCoachData(data);
            setFilterData(data);
            setCoachFilter([{
                label: "All Coaches",
                value: 0
            }].concat(data.map(e => {
                return {
                    label: e.coach.name,
                    value: e.coach.id
                }
            })));
        }
        else
        {
            toast.error("The data is not found");
        }
    }

    const coachFilterRef = useRef();
    const seasonFilterRef = useRef();

    const onClickCoach = (id) => {
        navigate(`/coach/${id}`, {state: {seasonId: seasonFilterRef.current.getValue()[0].value}});
    }

    return(
        <FuncContainer title={"Coaches"}>
            <div className="flex flex-col justify-center w-full h-fit gap-2 mt-10">
                { coachFilter && 
                    <div className="flex w-full h-fit gap-4">
                        <Filter options={seasons} onChange={onChangeFilterSeason} defaultValue={seasons[seasons.length-1]} ref={seasonFilterRef}/>
                        <Filter options={coachFilter} onChange={onChangeFilter} ref={coachFilterRef}/>
                    </div>
                }
                <div className="flex w-full h-fit">            
                    <CoachList coachData={filterData} onClickCoach={onClickCoach}></CoachList>
                </div>
            </div>
        </FuncContainer>
    )
}

export default CoachContainer;