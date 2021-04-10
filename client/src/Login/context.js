import { createContext } from "react";
import { useProvideAuth } from "./hooks/auth";

export const authContext = createContext();

export const AuthProvider = ({children})=>{
    const auth = useProvideAuth();

    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
}