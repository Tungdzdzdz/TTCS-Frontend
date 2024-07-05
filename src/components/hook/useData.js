import { useEffect } from "react"
import { toast } from "react-toastify";

export default function useData(fetchApi, dep){
    useEffect(() => {
    fetchApi()}
    , dep)
}

export function getOptionsClub(setOptionsClub, seasons)
{
    useData(async () => {
        if(seasons === undefined)
            return;
        const url = `http://localhost:8088/api/v1/clubstat?seasonId=${seasons[seasons.length - 1].value}`;
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            setOptionsClub([
                {
                    value: "all",
                    label: "All Club"
                }, ...fetchData.map(e => {
                    return {
                        value: e.club.id,
                        label: e.club.name
                    }
                })
            ]);
        } catch (error) {
            toast.error("Error: " + error);
        }        
    }, JSON.stringify(seasons));
}