import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../AppContext";
import { BeatLoader } from "react-spinners";

function Notifycation({notifycationRef}){
    const divRef = useRef();
    const {userInfo, notifycation, setNotifycation} = useAppContext();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(loading) return;
        const observer = new IntersectionObserver(entries => {
            entries.forEach(async (entry) => {
                if(entry.isIntersecting && loading === false)
                {
                    const url = `http://localhost:8088/api/v1/notifycation/user/${userInfo.id}?from=${notifycation.length}`;
                    setLoading(true);
                    const response = await fetch(url);
                    
                    if(response.ok){
                        const fetchData = await response.json();
                        setTimeout(() => {
                            const newNotifycation = [...notifycation.slice(0, notifycation.length - 1), ...fetchData];
                            if(fetchData.length < 10)
                            {   
                                setNotifycation(newNotifycation);
                                setLoading(true)
                            }
                            else
                            {
                                setNotifycation(newNotifycation.concat("loader"));
                                setLoading(false);
                            }
                        }, 1000); 
                    }
                    else{
                        setLoading(false);
                    }
                }
            })
        })
        if(!divRef.current) return;
        observer.observe(divRef.current);
        return () => {
            if(!divRef.current)
            {
                observer.disconnect();
                return;
            }
            observer.unobserve(divRef.current);
            observer.disconnect()
        };
    }, [notifycation])

    return (
        <div 
            onClick={(e) => e.stopPropagation()}
            ref={notifycationRef}
            className="notif-container absolute flex flex-col z-10 w-fit h-fit top-[56.68px] right-10 rounded-lg shadow-xl mt-2" 
            style={{backgroundColor: "rgba(255, 255, 255)"}}>
            <div className="w-[30rem] h-[50rem] overflow-y-scroll">
            {
                notifycation.map((item, i) => {
                    if(item === "loader")
                        return (
                            <div className="flex w-full justify-center items-center p-5" ref={divRef} key={i}>
                                <BeatLoader color="#37003c" size={20}/>
                            </div>
                        )
                    return (<div className="w-full h-[100px] flex border-b-2 p-4 hover:bg-slate-200" key={i}>
                        <div className="w-[90%] flex flex-col">
                            <h3 className="font-bold text-lg">{item.title}</h3>
                            <p>{item.message}</p>
                        </div>
                        <div className="w-[10%] flex justify-center items-center">
                            {!item.status && <span className="w-2 h-2 rounded-full bg-red-600"></span>}
                        </div>
                    </div>)
                })     
            }
            </div>
        </div>
    )
}

export default Notifycation;