import { Box, Button, Flex, Spacer, Link } from '@chakra-ui/react';
import SongSearchInput from '../SongSearchInput';
import {SongListItemWithAction} from '../SongListItem';
import { useCallback, useState } from 'react';
import { Link as RouteLink, Route, Switch } from 'react-router-dom';

import {ToggleButton} from '../../App/Common/ToggleButton'
import {useProgressIndicator} from '../../App/Common/AppProgressIndicator';

const PlayListActionButton = (props)=>(<Button bg="teal.400" color="white" mr="4" _hover={
    {bg:"teal.500"}
} {...props} >{props.children}</Button>);

const mockSongList = [{}, {}, {}, {}]


const EditPlayList =()=>{
    const [songsList, setSongsList] = useState(()=>mockSongList);

    const [isOn, setToggleOn] = useState(false);

    const { showProgressIndicator, hideProgressIndicator} = useProgressIndicator();

    const getSongListItems = useCallback(()=>{
        return songsList.map((value, i)=><SongListItemWithAction key={i} actionComponent={()=><Link>Delete</Link>}></SongListItemWithAction>)
    },[songsList]);

    const id="123";

    const onToggleClick = ()=>{
        showProgressIndicator();
        setTimeout(()=>{
            hideProgressIndicator();
        },2000)
    }
    
    return (<Box>
                <Switch>
                    <Route exact path="/playlists/:id/addsongs">
                       <SongSearchInput 
                       loadFlagUpdate = {()=>{}}
                       songListUpdate = {setSongsList} 
                       rightElement={
                         <Button as={RouteLink} to={`/playlists/123`} size="sm" mt="2.5">Cancel</Button>
                       }/>
                    </Route>
                    <Route path="/">
                        <Flex>
                            <Spacer />
                            <Box m="2" mr="10">
                                <ToggleButton onClick={onToggleClick} mr="4" isOn={isOn} onChange={()=>setToggleOn(!isOn)}>Shuffle Play {isOn? "on" :"off"}</ToggleButton>
                                <PlayListActionButton as={RouteLink} to={`/playlists/${id}/addsongs`}>Add Song</PlayListActionButton>
                            </Box>
                        </Flex>
                    </Route>
                </Switch>
                <Box>
                    {getSongListItems()}
                </Box>
            </Box>)
}

export default EditPlayList