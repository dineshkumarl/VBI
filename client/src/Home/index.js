import {
    Switch,
    Route
  } from "react-router-dom";
import PrivateRoute from '../Login/PrivateRoute';
import EditPlayList from '../PlayList/EditPlayList';
import PlayLists from "../PlayList/PlayList";
import SongList from './SongList';
import Navigation from './Navigation';
import { Center, Box } from "@chakra-ui/layout";

const HomePage = ()=>{
    return (
    <section>
        <Center>
            <Navigation></Navigation>
        </Center>
        <Box>
            <Switch>
                <PrivateRoute path="/playlists/:id">
                    <EditPlayList></EditPlayList>
                </PrivateRoute>
                <PrivateRoute path="/playlists">
                    <PlayLists></PlayLists>
                </PrivateRoute>
                <Route exact path="/">
                    <SongList></SongList>
                </Route>
            </Switch>
        </Box>
        
    </section>
    )
}

export default HomePage;