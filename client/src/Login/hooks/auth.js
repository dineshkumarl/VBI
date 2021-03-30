import { useContext, useState } from "react";
import {logIn as userLogin, logOut as userLogout} from '../actions/auth';
import {authContext} from '../context';

export const useAuth = ()=>{
   return useContext(authContext)
}

export const useProvideAuth = ()=>{
    const [user, setUser] = useState({
        name:"sample@sample.com"
    });
  
    const logIn = (creds) => {
      return userLogin(creds).then(() => {
            setUser("user");
        })
    };
  
    const logOut = () => {
        return userLogout().then(() => {
            setUser({});
        })
    };
  
    return {
      user,
      logIn,
      logOut
    };
}