import {
    Switch,
    Route,
    Link
  } from "react-router-dom";
import PrivateRoute from '../Login/PrivateRoute';
import PlayLists from "./PlayList";
import SongList from './SongList';

const HomePage = ()=>{
    return (
    <section>
        <ul>
            <li>
              <Link to="/">Songs</Link>
            </li>
            <li>
              <Link to="/playlists">PlayLists</Link>
            </li>
        </ul>
        <Switch >
            <PrivateRoute exact path="/playlists">
                <PlayLists></PlayLists>
            </PrivateRoute>
            <Route exact path="/">
                <SongList></SongList>
            </Route>
        </Switch>
    </section>
    )
}

export default HomePage;