import { useContext, useState } from "react";
import {logIn as userLogin, logOut as userLogout} from '../actions/auth';
import _get from 'lodash.get';
import {authContext} from '../context';

export const useAuth = ()=>{
   return useContext(authContext)
}

export const useProvideAuth = ()=>{
    const [user, setUser] = useState({});
  
    const logIn = (creds) => {
        return userLogin(creds).then(([error, successData]) => {
            if(error){
                setUser({});
            }else{
                setUser({name:creds.userName});
            }
            return [error, successData];
        })
    };

    const updateSession = (creds)=>{
        setUser({...user, name:_get(creds,'userName')})
    }
  
    const logOut = () => {
        return userLogout().then(() => {
            setUser({});
        })
    };
  
    return {
      user,
      logIn,
      logOut,
      updateSession
    };
}