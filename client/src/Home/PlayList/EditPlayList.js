import { Box, Button, Flex, Spacer, Link, Center } from '@chakra-ui/react';
import SongSearchInput from '../SongSearchInput';
import {SongListItemWithAction} from '../SongListItem';
import { useCallback, useEffect, useState } from 'react';
import { Link as RouteLink, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import _get from 'lodash.get';
import {getPlayListDetailById} from '../actions/playlist';

import {ToggleButton} from '../../App/Common/ToggleButton'
import {useProgressIndicator} from '../../App/Common/AppProgressIndicator';
import { useStore } from '../../App/store/useStore';

const PlayListActionButton = (props)=>(<Button bg="teal.400" color="white" mr="4" _hover={
    {bg:"teal.500"}
} {...props} >{props.children}</Button>);

const mockSongList = [{}, {}, {}, {}]


const EditPlayList =()=>{
    const {state:{playLists}, dispatch} = useStore();
    // const [songsList, setSongsList] = useState(()=>mockSongList);
    const [isOn, setToggleOn] = useState(false);
    const {id} = useParams();
    const { showProgressIndicator, hideProgressIndicator} = useProgressIndicator();
    const playListDetailsMatch = useRouteMatch('/playlists/:id');

    const setSongsList = useCallback((list)=>{
        dispatch({type: 'UPDATE_CURRENT_SONG_LIST', value: list});
    },[dispatch])

    const setSearchedSongList = useCallback((list)=>{
        dispatch({type:'UPDATE_SEARCHED_SONG_LIST', value: list});
    },[dispatch])

    useEffect(async ()=>{
        if(playListDetailsMatch.isExact){
           const [error, data] = await getPlayListDetailById(id);
           if(!error){
               setSongsList(_get(data,'[0].songs'));
           }else{
               setSongsList([]);
           }
        }else{
            setSearchedSongList([]);
        }
    },[playListDetailsMatch.isExact])

    const deleteSongListInPlaylist = (playlistId, value)=>{
        console.log(playlistId, value);
    }

    const addSongListInPlaylist = (playlistId, value)=>{
        console.log(playlistId, value);
    }

    const getSongListWithDeleteAction = useCallback(()=>{
        if(!playLists.currentSongList || playLists.currentSongList.length ===0){
            return <Center mt="30" color="gray.500" fontStyle="italic">No Songs in the playlist</Center>
        }else{
            return (playLists.currentSongList || []).map(
                (value)=>
                    <SongListItemWithAction
                    {...value}
                     actionComponent={
                         ()=><Link onClick={()=>deleteSongListInPlaylist(id, value)}>Delete</Link>
                     }>
                     </SongListItemWithAction>)
        }
    },[playLists.currentSongList, id]);

    const getSongListWithAddAction = useCallback(()=>{
        if(!playLists.searchedSongList || playLists.searchedSongList.length ===0){
            return <Center mt="30" color="gray.500" fontStyle="italic">No Songs found for the search Term</Center>
        }else{
            return (playLists.searchedSongList || []).map(
                (value)=>
                    <SongListItemWithAction
                    {...value}
                     actionComponent={
                         ()=><Link onClick={()=>addSongListInPlaylist(id, value)}>Add</Link>
                     }>
                     </SongListItemWithAction>)
        }
    },[playLists.searchedSongList, id])

    // const onToggleClick = ()=>{
    //     showProgressIndicator();
    //     setTimeout(()=>{
    //         hideProgressIndicator();
    //     },2000)
    // }
    
    return (<Box>
                <Switch>
                    <Route exact path="/playlists/:id/addsongs">
                       <SongSearchInput 
                       loadFlagUpdate = {()=>{}}
                       songListUpdate = {setSearchedSongList} 
                       rightElement={
                         <Button as={RouteLink} to={`/playlists/${id}`} size="sm" mt="2.5">Cancel</Button>
                       }/>
                       {getSongListWithAddAction()}
                    </Route>
                    <Route path="/">
                        <Flex>
                            <Spacer />
                            <Box m="2" mr="10">
                                <ToggleButton mr="4" isOn={isOn} onChange={()=>setToggleOn(!isOn)}>Shuffle Play {isOn? "on" :"off"}</ToggleButton>
                                <PlayListActionButton as={RouteLink} to={`/playlists/${id}/addsongs`}>Add Song</PlayListActionButton>
                            </Box>
                        </Flex>
                        <Box>
                            {getSongListWithDeleteAction()}
                        </Box>
                    </Route>
                </Switch>
            </Box>)
}

export default EditPlayList