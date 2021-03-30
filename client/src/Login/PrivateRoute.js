import {Route, Redirect} from 'react-router-dom'
import { useContext } from 'react';
import {authContext} from './context';

const PrivateRoute = ({ children, ...rest })=>{
  let auth = useContext(authContext);
  return (
    <Route
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
    />
  );
}


export default PrivateRoute