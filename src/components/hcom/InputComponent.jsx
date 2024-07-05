import { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function InputComponent({ field, type, onChangeInput, valueInput }) {
    const [typeInput, setTypeInput] = useState(type);
    const onShowPassword = e => {
        setTypeInput(pre => pre === type ? "text" : type)
        console.log(type)
    }

    return (
        <div className="flex items-center w-fit gap-2 relative">
            <label className="flex-initial w-[6rem] text-lg">{field}:</label>
            <input
                type={typeInput}
                placeholder={field}
                className="border-2 border-gray rounded-lg py-2 pl-2 w-[20rem] text-lg"
                onChange={onChangeInput}
                value={valueInput}
                style={{paddingRight: type === "password" ? "3rem" : "0.5rem"}}
            />
            {typeInput === "password" && <FaRegEye size={30} className="absolute right-4" onClick={onShowPassword}/>}
            {typeInput !== "password" && <FaRegEyeSlash size={30} className="absolute right-4" style={{display: type === "password" ? "block" : "none"}} onClick={onShowPassword}/>}
        </div>
    )
}