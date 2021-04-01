import { useEffect } from "react";
import { useAuth } from "./hooks/auth"

export const LoginPage = ()=>{
    const { logOut } = useAuth();
    useEffect(()=>{
        logOut();
    },[logOut])
    return (<section>
        <input type="text" />
        <input type="password" />
        <section>
            <button>Login</button>
            <button>Cancel</button>
        </section>
    </section>)
}
export default LoginPage