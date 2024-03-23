import { useEffect } from "react"

export default function useData(fetchApi, dep){
    useEffect(() => {
    fetchApi()}
    , [dep])
}