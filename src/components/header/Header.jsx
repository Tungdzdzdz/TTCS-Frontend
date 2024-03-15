import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext";

const appFunc = [
    {
        title: "Home",
        path: "/"
    },
    {
        title: "Result",
        path: "/"
    },
    {
        title: "Fixture",
        path: "/"
    },
    {
        title: "Table",
        path: "/"
    },
    {
        title: "Stat",
        path: "/"
    },
    {
        title: "Club",
        path: "/"
    },
    {
        title: "Player",
        path: "/"
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