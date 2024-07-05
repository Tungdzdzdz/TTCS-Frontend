import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext";
import { FaBell } from "react-icons/fa";
import Notifycation from "../notifycation/Notifycation";
import { useCallback, useEffect, useRef, useState } from "react";

const appFunc = [
    {
        title: "Home",
        path: "/"
    },
    {
        title: "Result",
        path: "/result"
    },
    {
        title: "Fixture",
        path: "/fixture"
    },
    {
        title: "Table",
        path: "/table"
    },
    {
        title: "Stat",
        path: "/stat"
    },
    {
        title: "Club",
        path: "/club"
    },
    {
        title: "Player",
        path: "/player"
    },
    {
        title: "Coach",
        path: "/coach"
    },
]

const authFunc = [
    {
        title: 'Login',
        path: '/auth/login'
    },
    {
        title: 'Register',
        path: '/auth/register'
    },
]

const welFunc = [
    {
        title: 'Log out',
        path: '/auth/login'
    }
]

function Header({ authenticated }) {
    const navigate = useNavigate();
    const { authToken, setAuthToken, notifycation, setNotifycation, notifycationCount, setNotifycationCount, setUserInfo} = useAppContext();
    const [notify, setNotify] = useState(false);
    const [positionNotify, setPositionNotify] = useState();
    const onLogout = () => {
        sessionStorage.removeItem('token');
        setAuthToken('');
        setUserInfo(false);
    }

    const onNotify = async (e) => {
        e.preventDefault();
        if(notify)
        {
            const newNotifycation = [...notifycation];
            newNotifycation.map(e => {
                if(e === "loader")
                    return e;
                if(!e.status)
                    e.status = true;
                return e;
            })
            setNotifycation(newNotifycation);
            setNotifycationCount(0);
            const url = `http://localhost:8088/api/v1/notifycation/seen`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    "Authorization": "Bearer " + authToken,
                },
            })
            if(!response.ok)
            {
                console.log("Error: " + response.status);
                return;
            }
        }
        setNotify(!notify);
    }

    const setPosNotify = useCallback((e) => {
        if(e)
            setPositionNotify(e.getBoundingClientRect())
        else
            setPositionNotify(e);
    }, [notify])

    const handleClick = e => {
        const posX = e.clientX;
        const posY = e.clientY;
        if(posX > positionNotify.right || posY > positionNotify.bottom || posX < positionNotify.left)
            setNotify(false)
    }
    

    useEffect(() => {
        if(!positionNotify) return;
        window.addEventListener("click", e => handleClick(e))
        return () => {
            window.removeEventListener("click", e => handleClick(e));
        }
    }, [positionNotify])


    return (
        <div className="h-[60px] bg-[#37003c] w-full flex items-center ">
            <img
                src="https://www.premierleague.com/resources/rebrand/v7.140.5/i/elements/pl-main-logo.png"
                alt="league-logo"
                className="h-[60px] mx-6 hover:cursor-pointer hover:h-[65px] absolute"
                onClick={e => navigate("/")}
            />
            <div className="flex flex-auto justify-between h-full ml-[6rem]">
                <div className="flex items-center static">
                    {
                        appFunc.map((e, i) => {
                            return <Link
                                className={`px-3 text-white hover:underline`}
                                key={`func${i}`}
                                to={e.path}>{e.title}</Link>
                        })
                    }
                </div>
                {!authenticated && (
                    <div className="flex items-center pr-5">
                        {
                            authFunc.map((e, i) => {
                                return <Link
                                    className="px-3 text-white hover:underline"
                                    key={`authFunc${i}`}
                                    to={e.path}>{e.title}</Link>
                            })
                        }
                    </div>
                )}
                {authenticated && (
                    <div className="flex items-center pr-5">
                        <div className="h-full flex items-center justify-center mr-3">
                            <FaBell 
                                className="text-white hover:cursor-pointer"
                                onClick={onNotify}
                            />
                            <span className="bg-red-700 h-2 w-2 rounded-full absolute right-28 top-4" style={{display: notifycationCount ? "block" : "none"}}></span>
                        </div>
                        {
                            welFunc.map((e, i) => {
                                return <Link
                                    className="px-3 text-white hover:underline"
                                    key={`welFunc${i}`}
                                    to={e.path}
                                    onClick={e.title === 'Log out' ? onLogout : () => {}}>{e.title}</Link>
                            })
                        }
                    </div>
                )}
                {notify && notifycation && (
                    <Notifycation notifycationRef={setPosNotify}/>
                )}                
            </div>
        </div>
    )
}

export default Header;