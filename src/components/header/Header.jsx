import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext";
import { FaBell } from "react-icons/fa";

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
        title: 'Your Account',
        path: '/'
    },
    {
        title: 'Log out',
        path: '/auth/login'
    }
]

function Header({ authenticated }) {
    const navigate = useNavigate();
    const { setAuthToken } = useAppContext();
    const onLogout = () => {
        setAuthToken('');
    }
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
                            <FaBell className="text-white hover:cursor-pointer"/>
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
            </div>
        </div>
    )
}

export default Header;