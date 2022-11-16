import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

interface loginInputParams {
    username: string;
    password: string;
}

interface AuthContextInterface {
    currentUser: string | {};
    login: (inputs: loginInputParams) => void;
    logout: () => void;
}

export const authContext = createContext<AuthContextInterface | null>(null);

export const AuthContextProvider = ({children}: {children: any}) => {
    const [currentUser, setCurrentUser] = useState<string | {}>(JSON.parse(localStorage.getItem("user") || "{}"))

    const login = async (inputs: loginInputParams) => {
        const res = await axios.post("/auth/login", inputs, {withCredentials: true})
        setCurrentUser(res.data)
    }

    const logout = async () => {
        const res = await axios.post("/auth/logout", {}, {withCredentials: true})
        setCurrentUser({})
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <authContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </authContext.Provider>
    )
}
