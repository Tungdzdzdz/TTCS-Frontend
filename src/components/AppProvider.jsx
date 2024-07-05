import { useEffect, useMemo, useState } from "react";
import { AppContext } from "./AppContext"
import useData from "./hook/useData";
import { toast } from "react-toastify";
import { Client } from "@stomp/stompjs";

function AppProvider({ children }) {
    const tokenStorage = sessionStorage.getItem('token') === null ? '' : sessionStorage.getItem('token');
    const adminStorage = (sessionStorage.getItem('admin') === 'false' || !sessionStorage.getItem('admin')) ? false : true

    const [admin, setAdmin] = useState(adminStorage);
    const [authToken, setAuthToken] = useState(tokenStorage);
    const [seasons, setSeasons] = useState();
    const [currentWeek, setCurrentWeek] = useState();
    const [userInfo, setUserInfo] = useState(false);
    const [notifycation, setNotifycation] = useState([]);
    const [notifycationCount, setNotifycationCount] = useState(0);
    const [client, setClient] = useState(null);

    useEffect(() => {
        sessionStorage.setItem("token", authToken);
        if(authToken)
            sessionStorage.setItem("admin", admin)
    }, [authToken]);

    useEffect(() => {
        const client = new Client({
            brokerURL: `ws://localhost:8088/ws`,
        });
        client.onConnect = () => {
            setClient(client)
        };
        client.activate();

        return () => {
            client.deactivate();
        };
    }, []);

    useEffect(() => {
        if(!client || !userInfo) return;
        let subscription;
        subscription = client.subscribe(`/topic/notifycation/user/${userInfo.id}`, message => {
            setNotifycation(pre => {
                const newNotifycation = [JSON.parse(message.body), ...pre];
                return newNotifycation;

            });
            setNotifycationCount(1);
        });
        return () => {
            if(subscription)
                subscription.unsubscribe();
        }
    }, [client, userInfo])

    const getSeasons = async () => {
        const url = "http://localhost:8088/api/v1/season";
        const response = await fetch(url);
        if (response.ok) {
            const fetchData = await response.json();
            setSeasons(fetchData.map(e => {
                const startYear = new Date(e.startSeason).getFullYear();
                const endYear = new Date(e.endSeason).getFullYear();
                return {
                    value: e.id,
                    label: `${e.name}(${startYear}-${endYear})`
                }
            }));
        }
        else {
            toast.error("Error fetching season data");
        }
    }

    useData(getSeasons, [])

    useData(async () => {
        if (seasons === undefined) return;
        const url = "http://localhost:8088/api/v1/season/currentweek/" + seasons[seasons.length - 1].value;
        const response = await fetch(url);
        try {
            const fetchData = await response.json();
            if (response.ok) {
                setCurrentWeek(fetchData);
            }
            else {
                toast.error(fetchData.name + ": " + fetchData.message);
            }
        }
        catch (error) {
            toast.error("Internal server error!");
        }
    }, [seasons])

    useData(async () => {
        if (!authToken) return;
        const url = "http://localhost:8088/api/v1/auth/me";
        const options = {
            headers: {
                "Authorization": "Bearer " + authToken
            }
        }
        const response = await fetch(url, options);
        if (response.ok) {
            const fetchData = await response.json();
            setUserInfo(fetchData);
        }
        else {
            toast.error("Error fetching season data");
        }
    }, [authToken])

    useData(async () => {
        if (!userInfo) return;
        const url = `http://localhost:8088/api/v1/notifycation/user/${userInfo.id}?from=0`;
        const response = await fetch(url);
        if (response.ok) {
            const fetchData = await response.json();
            setNotifycation(fetchData.concat("loader"));
            setNotifycationCount(fetchData.filter(e => !e.status).length);
        }
        else {
            toast.error("Error fetching notifycation data");
        }
    }, [userInfo])

    return (
        <AppContext.Provider
            value={{
                authToken,
                setAuthToken,
                seasons,
                currentWeek,
                setAdmin,
                admin,
                getSeasons,
                userInfo,
                notifycation,
                setNotifycation,
                notifycationCount,
                setNotifycationCount,
                client,
            }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;