import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext";
import { FaBell } from "react-icons/fa";

const appFunc = [
    {
        title: "Season",
        path: "admin/season"
    },
    {
        title: "Fixture",
        path: "admin/fixture"
    },
    {
        title: "Result",
        path: "admin/result"
    },
    {
        title: "Club",
        path: "admin/club"
    },
    {
        title: "Player",
        path: "admin/player"
    },
    {
        title: "Coach",
        path: "admin/coach"
    },
    {
        title: "User",
        path: "admin/user"
    },
]

const welFunc = [
    {
        title: 'Log out',
        path: '/auth/login/admin'
    }
]

function HeaderAdmin({ authenticated }) {
    const navigate = useNavigate();
    const { setAuthToken, setAdmin } = useAppContext();
    const onLogout = () => {
        setAuthToken('');
        sessionStorage.removeItem('token');
        setAdmin(false);
        sessionStorage.removeItem('admin')
        setUserInfo(false)
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

export default HeaderAdmin;