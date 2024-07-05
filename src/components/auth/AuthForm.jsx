import { Link } from "react-router-dom";
import styles from "./Auth.module.css";

function AuthForm({titleForm, titleLink, titleButton, pathLink, onClickButton, children}) {
    return (
        <div className={"flex items-center justify-center h-full "}>
            <form
                onSubmit={onClickButton}
                className={
                    "flex flex-col py-4 px-8 justify-center items-center border-2 border-black rounded gap-4 " +
                    styles.slide
                }
            >
                <h1 className="text-3xl font-bold">{titleForm}</h1>
                {children}
                <div className="flex justify-between items-center w-full">
                    <Link
                        className={
                            "hover:underline hover:text-[#E90052] flex-auto hover:font-medium"
                        }
                        to={pathLink}
                    >
                        {titleLink}
                    </Link>
                    <button 
                        className="bg-purple-500 h-10 rounded-[8px] text-white hover:bg-purple-600 px-4"
                        type="submit">
                            {titleButton}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AuthForm;
