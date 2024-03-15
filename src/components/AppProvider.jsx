import { useEffect, useState } from "react";
import { AppContext } from "./AppContext"

function AppProvider({ children }) {
    const tokenStorage = sessionStorage.getItem('token');
    const [authToken, setAuthToken] = useState(tokenStorage);

    useEffect(() => {
        sessionStorage.setItem("token", authToken);
    }, [authToken]);
    return (
        <AppContext.Provider value={{authToken, setAuthToken}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;