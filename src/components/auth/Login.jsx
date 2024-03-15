import { useNavigate } from "react-router-dom";
import InputComponent from "../hcom/InputComponent";
import { useEffect, useLayoutEffect, useState } from "react";
import AuthForm from "./AuthForm";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAppContext } from "../AppContext";
function Login() {
    const {setAuthToken, authToken} = useAppContext();
    const [username, setUsesrname] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const onSetUsername = e => {
        setUsesrname(e.target.value);
    }

    const onSetPassword = e => {
        setPassword(e.target.value);
    }

    const onLogin = async (e) => {
        e.preventDefault();
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password })
        }
        const url = "http://localhost:8088/api/v1/auth/login"
        const response = await fetch(url, options);
        if (response.ok) {
            const token = await response.json();
            setAuthToken(token.token);
            navigate('/');
        }
        else {
            const errors = await response.json();
            errors.forEach((e, i) => {
                toast.error(`Error: ${e.message}`, {position:"top-center", autoClose:3000, toastId: i});
            });
        }
    }

    useEffect(() => {
        authToken && navigate('/');
    }, [authToken]);

    return (
        <>
            <AuthForm pathLink={"/auth/login"} titleButton={"Sign in"} titleForm={"Login"} titleLink={"Forget login detail?"} onClickButton={onLogin}>
                <InputComponent type={"text"} field={"Username"} onChangeInput={onSetUsername} valueInput={username} />
                <InputComponent type={"password"} field={"Password"} onChangeInput={onSetPassword} valueInput={password} />
            </AuthForm>
        </>
    )
}

export default Login;