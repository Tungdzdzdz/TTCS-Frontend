import InputComponent from "../hcom/InputComponent";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Auth.module.css"
import { useEffect, useState } from "react";
import AuthForm from "./AuthForm";
import { toast } from "react-toastify";
import { useAppContext } from "../AppContext";

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [email, setEmail] = useState('');
    const [admin, setAdmin] = useState(false);

    const onSetUsername = e => setUsername(e.target.value);
    const onSetPassword = e => setPassword(e.target.value);
    const onSetRetypePassword = e => setRetypePassword(e.target.value);
    const onSetEmail = e => setEmail(e.target.value);

    const navigate = useNavigate();

    const {authToken} = useAppContext();

    const onRegister = async(e) => {
        e.preventDefault();
        const url = "http://localhost:8088/api/v1/auth/register"
        const options = {
            headers: {"Content-type" : "application/json"},
            method: "POST",
            body: JSON.stringify({username, password, retypePassword, email, roleId: admin ? 2 : 1}),
        }
        try{
            const response = await fetch(url, options);
            if(response.ok)
            {
                navigate("/auth/login");
            }
            else
            {
                const errors = await response.json();
                errors.forEach((e, i) => {
                    toast.error(`Error: ${e.message}`, {toastId: i});
                });
            }
        }
        catch(error) {
            toast.error(`Error: Internal error`);
        }
    }

    useEffect(() => {
        if(authToken)
            navigate('/')
    }, [authToken]);
    return (
        <AuthForm 
            pathLink={"/auth/login"} 
            titleButton={"Sign up"} 
            titleForm={"Register"} 
            titleLink={"Have already an account?"} 
            onClickButton={onRegister}
            >
                <InputComponent type="text" field="Username" valueInput={username} onChangeInput={onSetUsername} />
                <InputComponent type="password" field={"Password"} valueInput={password} onChangeInput={onSetPassword} />
                <InputComponent type="password" field={"Retype Password"} valueInput={retypePassword} onChangeInput={onSetRetypePassword} />
                <InputComponent type="email" field="Email" valueInput={email} onChangeInput={onSetEmail}/>
        </AuthForm>
    )
}

export default Register;