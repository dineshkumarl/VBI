import {Route, Redirect} from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import _get from 'lodash.get';
import {authContext} from './context';
import {getSession} from './actions/auth';

const PrivateRoute = ({ children, ...rest })=>{
  let auth = useContext(authContext);
  let [loading, setIsLoading] = useState(true);
  
  useEffect(async()=>{
    const [e, data] = await getSession();
    if(!e){
      auth.updateSession(data.user);
    }
    setIsLoading(false);
  },[]);

  return (
    <>
      {(!loading)&&(<Route
        {...rest}
        render={({ location }) =>
          auth.user.name ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />)}
    </>
  );
}


export default PrivateRoute