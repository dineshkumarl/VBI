import {
    Switch,
    Route,
    useLocation
  } from "react-router-dom";

import Header from './Header';
import Footer from './Footer';

import HomePage from '../Home';
import LoginPage from '../Login';

const HEADERLESS_PATHNAMES = {
    '/login':1
}

const App = ()=>{
    const {pathname:currentPathName} = useLocation();
    return <section>
            {(!HEADERLESS_PATHNAMES[currentPathName])&&(<Header></Header>)}
            <Switch>
                <Route exact path="/login">
                    <LoginPage></LoginPage>
                </Route>
                <Route path="/">
                    <HomePage></HomePage>
                </Route>
            </Switch>
            {(!HEADERLESS_PATHNAMES[currentPathName])&&(<Footer></Footer>)}
    </section>
}

export default App;