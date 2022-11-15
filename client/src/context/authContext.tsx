import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

interface loginInputParams {
    username: string;
    password: string;
}

interface AuthContextInterface {
    currentUser: string | null;
    login: (inputs: loginInputParams) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthContextProvider = ({children}: {children: any}) => {
    const [currentUser, setCurrentUser] = useState<string | null>(JSON.parse(localStorage.getItem("user") || ""))

    const login = async (inputs: loginInputParams) => {
        const res = await axios.post("/auth/login", inputs)
        setCurrentUser(res.data)
    }

    const logout = async () => {
        const res = await axios.get("/auth/logout")
        setCurrentUser(null)
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
