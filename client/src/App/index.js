import {
    Switch,
    Route,
    useLocation
  } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from '../Login/context.js';
import StoreProvider from './store/useStore';
  
import Header from './Header';
// import Footer from './Footer';

import HomePage from '../Home';
import LoginPage from '../Login';
import {AppProgressIndicator, progressIndContext, AppProgressIndicatorProvider} from './Common/AppProgressIndicator/';
import { Box } from "@chakra-ui/layout";
import { useContext } from "react";

const HEADERLESS_PATHNAMES = {
    '/login':1
}

const App = ()=>{
    const {pathname:currentPathName} = useLocation();
    const {showingProgressIndicator} = useContext(progressIndContext);
    return (
        <ChakraProvider>
            <StoreProvider>
                <AuthProvider>
                    <AppProgressIndicatorProvider>
                        <Box>
                            {(showingProgressIndicator) && (<AppProgressIndicator />)}
                            {(!HEADERLESS_PATHNAMES[currentPathName])&&(<Header></Header>)}
                            <Switch>
                                <Route exact path="/login">
                                    <LoginPage></LoginPage>
                                </Route>
                                <Route path="/">
                                    <HomePage></HomePage>
                                </Route>
                            </Switch>
                            {/* {(!HEADERLESS_PATHNAMES[currentPathName])&&(<Footer></Footer>)} */}
                        </Box>
                    </AppProgressIndicatorProvider>
                </AuthProvider>
            </StoreProvider>
        </ChakraProvider>
    )
}

export default App;