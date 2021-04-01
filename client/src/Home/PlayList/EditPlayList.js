import {Spacer } from '@chakra-ui/layout';
import {Box, Button, Flex } from '@chakra-ui/react';
import SongSearchInput from '../SongSearchInput';
import {SongListItemWithAction} from '../SongListItem';
import { useCallback, useState } from 'react';
import { Link, Link as RouteLink, Route, Switch } from 'react-router-dom';

import {ToggleButton} from '../../App/Common/ToggleButton'

const PlayListActionButton = (props)=>(<Button bg="teal.400" color="white" mr="4" _hover={
    {bg:"teal.500"}
} {...props} >{props.children}</Button>);

const mockSongList = [{}, {}, {}, {}]


const Edit =()=>{
    const [songsList, setSongsList] = useState(()=>mockSongList);

    const [isOn, setToggleOn] = useState(false);

    const getSongListItems = useCallback(()=>{
        return songsList.map((value, i)=><SongListItemWithAction key={i} actionComponent={()=><Link>Delete</Link>}></SongListItemWithAction>)
    },[songsList]);

    const id="123";
    
    return (<Box>
                <Flex>
                    <Spacer />
                    <Box m="2" mr="10">
                        <ToggleButton mr="4" isOn={isOn} onChange={()=>setToggleOn(!isOn)}>Shuffle Play {isOn? "on" :"off"}</ToggleButton>
                        <PlayListActionButton as={RouteLink} to={`/playlists/${id}/addsongs`}>Add Song</PlayListActionButton>
                    </Box>
                </Flex>
                <Box>
                    { getSongListItems()}
                </Box>
            </Box>)
}

const AddSongs = ()=>{
    const [songsList, setSongsList] = useState(()=>mockSongList);

    const getSongListItems = useCallback(()=>{
        return songsList.map((value, i)=><SongListItemWithAction key={i} actionComponent={()=><Link>Add song</Link>}></SongListItemWithAction>)
    },[songsList]);
   return(<Box>
            <SongSearchInput songsListUpdate = {setSongsList}/>
            {getSongListItems()}
        </Box>)
}

const EditPlayList = ()=>{
    return (
        <Switch>
            <Route exact path="/playlists/:id/addsongs">
                <AddSongs></AddSongs>
            </Route>
            <Route path="/">
                <Edit></Edit>
            </Route>
        </Switch>
    )
}

export default EditPlayList