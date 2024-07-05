import { useNavigate } from "react-router-dom"

export default function NotFound()
{
    const navigate = useNavigate();
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <img src="./src/assets/404.png" className="h-fit w-fit hover:cursor-pointer"/>
            <div className="absolute w-full h-fit flex justify-center items-center bottom-7">
                <button 
                    className="text-[40px] text-sky-600 hover:text-[45px] p-2"
                    onClick={() => navigate("/")}
                >Back to home</button>
            </div>
        </div>
    )
}